import { promises as fs } from "node:fs";
import path from "node:path";

import type {
  RawArchiveEntry,
  RawArchiveFile,
  RawArchiveTree,
  RawPreviewKind,
} from "../lib/wiki-shared";
import { getDefaultInCampusRawRoot } from "./app-paths";

const TEXT_PREVIEW_LIMIT_BYTES = 320 * 1024;

const MARKDOWN_EXTENSIONS = new Set([".md", ".markdown"]);
const TEXT_EXTENSIONS = new Set([".txt", ".json", ".csv", ".xml", ".yaml", ".yml"]);
const SOURCE_EXTENSIONS = new Set([
  ".css",
  ".js",
  ".jsx",
  ".mjs",
  ".puml",
  ".ts",
  ".tsx",
]);
const IMAGE_EXTENSIONS = new Set([".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

const CONTENT_TYPES: Record<string, string> = {
  ".csv": "text/csv; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/plain; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".markdown": "text/markdown; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".puml": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ts": "text/plain; charset=utf-8",
  ".tsx": "text/plain; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".yaml": "text/plain; charset=utf-8",
  ".yml": "text/plain; charset=utf-8",
};

export class RawArchiveError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "RawArchiveError";
    this.statusCode = statusCode;
  }
}

function isPathInside(parentPath: string, childPath: string) {
  const relativePath = path.relative(parentPath, childPath);
  return (
    relativePath === "" ||
    (relativePath.length > 0 &&
      !relativePath.startsWith(`..${path.sep}`) &&
      relativePath !== ".." &&
      !path.isAbsolute(relativePath))
  );
}

function safeDecodePath(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizeRawArchivePath(value: string | undefined) {
  const decoded = safeDecodePath(value ?? "").replace(/\\/g, "/");
  const normalized = path.posix.normalize(decoded).replace(/^\/+/, "");

  if (!normalized || normalized === ".") {
    return "";
  }

  if (normalized === ".." || normalized.startsWith("../")) {
    throw new RawArchiveError("Raw archive path is outside the archive.", 403);
  }

  return normalized;
}

export function getRawArchiveRoot() {
  return getDefaultInCampusRawRoot();
}

export function getRawPreviewKind(filePath: string): RawPreviewKind {
  const extension = path.extname(filePath).toLowerCase();

  if (MARKDOWN_EXTENSIONS.has(extension)) {
    return "markdown";
  }

  if (TEXT_EXTENSIONS.has(extension)) {
    return "text";
  }

  if (SOURCE_EXTENSIONS.has(extension)) {
    return "source";
  }

  if (extension === ".html" || extension === ".htm") {
    return "html-source";
  }

  if (IMAGE_EXTENSIONS.has(extension)) {
    return "image";
  }

  if (extension === ".pdf") {
    return "pdf";
  }

  return "download";
}

export function getRawContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  return CONTENT_TYPES[extension] ?? "application/octet-stream";
}

export function rawArchivePathToUrl(relativePath: string) {
  return `/raw/${relativePath.split("/").map(encodeURIComponent).join("/")}`;
}

function resolveRawArchivePath(rawRoot: string, relativePath: string) {
  const absolutePath = path.resolve(rawRoot, relativePath);

  if (!isPathInside(rawRoot, absolutePath)) {
    throw new RawArchiveError("Raw archive path is outside the archive.", 403);
  }

  return absolutePath;
}

async function assertRealPathInsideRawRoot(rawRoot: string, absolutePath: string) {
  const realRoot = await fs.realpath(rawRoot);
  const realPath = await fs.realpath(absolutePath);

  if (!isPathInside(realRoot, realPath)) {
    throw new RawArchiveError("Raw archive path is outside the archive.", 403);
  }

  return realPath;
}

async function pathIsDirectory(filePath: string) {
  try {
    const details = await fs.stat(filePath);
    return details.isDirectory();
  } catch {
    return false;
  }
}

async function readPreviewText(filePath: string, size: number) {
  const handle = await fs.open(filePath, "r");

  try {
    const bytesToRead = Math.min(size, TEXT_PREVIEW_LIMIT_BYTES + 1);
    const buffer = Buffer.alloc(bytesToRead);
    const { bytesRead } = await handle.read(buffer, 0, bytesToRead, 0);
    const truncated = bytesRead > TEXT_PREVIEW_LIMIT_BYTES;
    const content = buffer.subarray(0, Math.min(bytesRead, TEXT_PREVIEW_LIMIT_BYTES)).toString("utf8");

    return { content, truncated };
  } finally {
    await handle.close();
  }
}

async function listRawDirectory(
  rawRoot: string,
  relativePath = "",
): Promise<{
  entries: RawArchiveEntry[];
  totalFiles: number;
  totalFolders: number;
}> {
  const absolutePath = resolveRawArchivePath(rawRoot, relativePath);
  const dirents = await fs.readdir(absolutePath, { withFileTypes: true });
  const entries: RawArchiveEntry[] = [];
  let totalFiles = 0;
  let totalFolders = 0;

  for (const dirent of dirents.sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) {
      return a.isDirectory() ? -1 : 1;
    }

    return a.name.localeCompare(b.name);
  })) {
    if (dirent.isSymbolicLink()) {
      continue;
    }

    const entryPath = relativePath ? path.posix.join(relativePath, dirent.name) : dirent.name;
    const entryAbsolutePath = resolveRawArchivePath(rawRoot, entryPath);
    const details = await fs.stat(entryAbsolutePath);

    if (dirent.isDirectory()) {
      const childResult = await listRawDirectory(rawRoot, entryPath);
      totalFolders += 1 + childResult.totalFolders;
      totalFiles += childResult.totalFiles;
      entries.push({
        name: dirent.name,
        path: entryPath,
        type: "directory",
        size: null,
        modifiedAt: details.mtimeMs,
        extension: null,
        previewKind: null,
        children: childResult.entries,
      });
      continue;
    }

    if (!dirent.isFile()) {
      continue;
    }

    totalFiles += 1;
    const extension = path.extname(dirent.name).toLowerCase() || null;
    entries.push({
      name: dirent.name,
      path: entryPath,
      type: "file",
      size: details.size,
      modifiedAt: details.mtimeMs,
      extension,
      previewKind: getRawPreviewKind(entryPath),
    });
  }

  return { entries, totalFiles, totalFolders };
}

export async function getRawArchiveTree(): Promise<RawArchiveTree> {
  const rawRoot = getRawArchiveRoot();

  if (!(await pathIsDirectory(rawRoot))) {
    return {
      rootLabel: "inCampusLLMwiki/raw",
      available: false,
      totalFiles: 0,
      totalFolders: 0,
      entries: [],
    };
  }

  const tree = await listRawDirectory(rawRoot);

  return {
    rootLabel: "inCampusLLMwiki/raw",
    available: true,
    ...tree,
  };
}

export async function resolveRawArchiveFile(rawPath: string | undefined) {
  const rawRoot = getRawArchiveRoot();
  const relativePath = normalizeRawArchivePath(rawPath);

  if (!relativePath) {
    throw new RawArchiveError("Choose a raw archive file.", 400);
  }

  if (!(await pathIsDirectory(rawRoot))) {
    throw new RawArchiveError("Raw archive not found.", 404);
  }

  const absolutePath = resolveRawArchivePath(rawRoot, relativePath);

  try {
    const realPath = await assertRealPathInsideRawRoot(rawRoot, absolutePath);
    const details = await fs.stat(realPath);

    if (!details.isFile()) {
      throw new RawArchiveError("Raw archive file not found.", 404);
    }

    return {
      absolutePath: realPath,
      relativePath,
      details,
      previewKind: getRawPreviewKind(relativePath),
    };
  } catch (error) {
    if (error instanceof RawArchiveError) {
      throw error;
    }

    throw new RawArchiveError("Raw archive file not found.", 404);
  }
}

export async function getRawArchiveFile(rawPath: string | undefined): Promise<RawArchiveFile> {
  const { absolutePath, relativePath, details, previewKind } = await resolveRawArchiveFile(rawPath);
  const name = path.posix.basename(relativePath);
  const extension = path.extname(name).toLowerCase() || null;
  const canReadText =
    previewKind === "markdown" ||
    previewKind === "text" ||
    previewKind === "source" ||
    previewKind === "html-source";
  const textPreview = canReadText
    ? await readPreviewText(absolutePath, details.size)
    : { content: null, truncated: false };

  return {
    name,
    path: relativePath,
    size: details.size,
    modifiedAt: details.mtimeMs,
    extension,
    previewKind,
    rawUrl: rawArchivePathToUrl(relativePath),
    textContent: textPreview.content,
    truncated: textPreview.truncated,
  };
}
