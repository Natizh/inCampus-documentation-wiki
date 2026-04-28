import { createReadStream, promises as fs } from "node:fs";
import path from "node:path";

import fastifyStatic from "@fastify/static";
import Fastify, { type FastifyInstance, type FastifyReply } from "fastify";

import { getAppRoot, getBuiltClientRoot, getVersionInfoPath } from "./app-paths";
import { configureServerWikiCore } from "./wiki-core-adapter";
import { getWikiOsConfig } from "./wiki-config";
import {
  getRawArchiveFile,
  getRawArchiveTree,
  getRawContentType,
  RawArchiveError,
  resolveRawArchiveFile,
} from "./raw-archive";
import {
  getWikiSetupStatus,
  loadWikiRuntimeConfig,
  saveWikiPersonOverride,
  saveWikiRuntimeConfig,
  validateWikiRootPath,
  WikiRuntimeConfigFileError,
  type WikiSetupStatus,
} from "./wiki-runtime";
import { isFinderFolderPickerAvailable, pickFolderWithFinder } from "./folder-picker";
import {
  getWikiRootPath,
  getGraphData,
  getHomepageData,
  getWikiHealthStatus,
  getWikiPage,
  getWikiStats,
  isWikiConfigured,
  isWikiSetupRequiredError,
  primeWikiSnapshot,
  reindexWikiSnapshot,
  reloadWikiRuntime,
  searchWiki,
} from "../lib/wiki";

interface BuildServerOptions {
  clientRoot?: string;
  logger?: boolean;
  serveClient?: boolean;
}

interface VersionInfo {
  commit: string;
  commitShort: string;
  deployedAt: string | null;
}

const WIKI_SOURCE_CONTENT_TYPES: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};
const PROJECT_DOCUMENT_PREVIEW_LIMIT_BYTES = 320 * 1024;

configureServerWikiCore();

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

class WikiSourceError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "WikiSourceError";
    this.statusCode = statusCode;
  }
}

class ProjectDocumentError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "ProjectDocumentError";
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

function normalizeWikiSourcePath(value: string | undefined) {
  const decoded = safeDecodePath(value ?? "").replace(/\\/g, "/");
  const normalized = path.posix.normalize(decoded).replace(/^\/+/, "");

  if (!normalized || normalized === ".") {
    throw new WikiSourceError("Choose a wiki source file.", 400);
  }

  if (normalized === ".." || normalized.startsWith("../")) {
    throw new WikiSourceError("Wiki source path is outside the wiki.", 403);
  }

  const extension = path.extname(normalized).toLowerCase();
  if (!WIKI_SOURCE_CONTENT_TYPES[extension]) {
    throw new WikiSourceError("Only wiki markdown and image source files can be opened.", 415);
  }

  return normalized;
}

function getWikiSourceContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  return WIKI_SOURCE_CONTENT_TYPES[extension] ?? "application/octet-stream";
}

function getProjectRoot() {
  return path.resolve(getAppRoot(), "..");
}

function normalizeProjectDocumentPath(value: string | undefined) {
  const decoded = safeDecodePath(value ?? "").replace(/\\/g, "/");
  const normalized = path.posix.normalize(decoded).replace(/^\/+/, "");

  if (!normalized || normalized === ".") {
    throw new ProjectDocumentError("Choose a project document.", 400);
  }

  if (normalized === ".." || normalized.startsWith("../")) {
    throw new ProjectDocumentError("Project document path is outside the repository.", 403);
  }

  if (normalized === "inCampusLLMwiki/raw" || normalized.startsWith("inCampusLLMwiki/raw/")) {
    throw new ProjectDocumentError("Raw archive files must be opened through the raw archive.", 403);
  }

  const extension = path.extname(normalized).toLowerCase();
  if (!WIKI_SOURCE_CONTENT_TYPES[extension]) {
    throw new ProjectDocumentError("Only project markdown and image files can be opened.", 415);
  }

  return normalized;
}

function getProjectDocumentContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  return WIKI_SOURCE_CONTENT_TYPES[extension] ?? "application/octet-stream";
}

async function readPreviewText(filePath: string, size: number) {
  const handle = await fs.open(filePath, "r");

  try {
    const bytesToRead = Math.min(size, PROJECT_DOCUMENT_PREVIEW_LIMIT_BYTES + 1);
    const buffer = Buffer.alloc(bytesToRead);
    const { bytesRead } = await handle.read(buffer, 0, bytesToRead, 0);
    const truncated = bytesRead > PROJECT_DOCUMENT_PREVIEW_LIMIT_BYTES;
    const content = buffer
      .subarray(0, Math.min(bytesRead, PROJECT_DOCUMENT_PREVIEW_LIMIT_BYTES))
      .toString("utf8");

    return { content, truncated };
  } finally {
    await handle.close();
  }
}

async function resolveProjectDocumentSource(relativePathInput: string | undefined) {
  const projectRoot = getProjectRoot();
  const relativePath = normalizeProjectDocumentPath(relativePathInput);
  const absolutePath = path.resolve(projectRoot, relativePath);

  if (!isPathInside(projectRoot, absolutePath)) {
    throw new ProjectDocumentError("Project document path is outside the repository.", 403);
  }

  try {
    const realRoot = await fs.realpath(projectRoot);
    const realPath = await fs.realpath(absolutePath);

    if (!isPathInside(realRoot, realPath)) {
      throw new ProjectDocumentError("Project document path is outside the repository.", 403);
    }

    const details = await fs.stat(realPath);
    if (!details.isFile()) {
      throw new ProjectDocumentError("Project document not found.", 404);
    }

    return { absolutePath: realPath, relativePath, details };
  } catch (error) {
    if (error instanceof ProjectDocumentError) {
      throw error;
    }

    throw new ProjectDocumentError("Project document not found.", 404);
  }
}

async function getProjectMarkdownDocument(relativePathInput: string | undefined) {
  const sourceFile = await resolveProjectDocumentSource(relativePathInput);
  const extension = path.extname(sourceFile.relativePath).toLowerCase();

  if (extension !== ".md") {
    throw new ProjectDocumentError("Only markdown files can be opened in the document viewer.", 415);
  }

  const textPreview = await readPreviewText(sourceFile.absolutePath, sourceFile.details.size);

  return {
    name: path.posix.basename(sourceFile.relativePath),
    path: sourceFile.relativePath,
    size: sourceFile.details.size,
    modifiedAt: sourceFile.details.mtimeMs,
    extension,
    sourceUrl: `/document-source/${sourceFile.relativePath
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`,
    textContent: textPreview.content,
    truncated: textPreview.truncated,
  };
}

async function resolveWikiSourceFile(relativePathInput: string | undefined) {
  const wikiRoot = await getWikiRootPath();

  if (!wikiRoot) {
    throw new WikiSourceError("Wiki source is unavailable until setup is complete.", 409);
  }

  const wikiRootPath = path.resolve(wikiRoot);
  const relativePath = normalizeWikiSourcePath(relativePathInput);
  const absolutePath = path.resolve(wikiRootPath, relativePath);

  if (!isPathInside(wikiRootPath, absolutePath)) {
    throw new WikiSourceError("Wiki source path is outside the wiki.", 403);
  }

  try {
    const realRoot = await fs.realpath(wikiRootPath);
    const realPath = await fs.realpath(absolutePath);

    if (!isPathInside(realRoot, realPath)) {
      throw new WikiSourceError("Wiki source path is outside the wiki.", 403);
    }

    const details = await fs.stat(realPath);
    if (!details.isFile()) {
      throw new WikiSourceError("Wiki source file not found.", 404);
    }

    return { absolutePath: realPath, relativePath };
  } catch (error) {
    if (error instanceof WikiSourceError) {
      throw error;
    }

    throw new WikiSourceError("Wiki source file not found.", 404);
  }
}

async function canServeClient(clientRoot: string) {
  try {
    const stat = await fs.stat(path.join(clientRoot, "index.html"));
    return stat.isFile();
  } catch {
    return false;
  }
}

async function readVersionInfo(): Promise<VersionInfo> {
  const fallback: VersionInfo = {
    commit: "unknown",
    commitShort: "unknown",
    deployedAt: null,
  };

  try {
    const raw = await fs.readFile(getVersionInfoPath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<VersionInfo>;

    return {
      commit: parsed.commit ?? fallback.commit,
      commitShort: parsed.commitShort ?? fallback.commitShort,
      deployedAt: parsed.deployedAt ?? fallback.deployedAt,
    };
  } catch {
    return fallback;
  }
}

function buildSetupRequiredResponse(setup: Pick<WikiSetupStatus, "wikiRoot" | "configError">) {
  const hasConfigError = setup.configError !== null;
  const code =
    setup.configError?.code === "INVALID_WIKI_ROOT"
      ? "INVALID_WIKI_ROOT"
      : hasConfigError
        ? "CONFIG_ERROR"
        : "SETUP_REQUIRED";
  const error = setup.configError?.message ?? "Vault setup required";

  return {
    ok: false,
    error,
    code,
    configured: false,
    totalPages: 0,
    wikiRoot: setup.wikiRoot,
    configError: setup.configError,
    sync: {
      lastSyncAtMs: null,
      lastSyncAt: null,
      lastSyncSource: null,
      lastSyncError: null,
      periodicReconcileMs: null,
      periodicReconcileScheduled: false,
      periodicReconcileInFlight: false,
      pendingPaths: 0,
      pendingFullReconcile: false,
      watcherActive: false,
      watcherStarting: false,
      watcherFlushInFlight: false,
      revision: 0,
      cacheRevision: -1,
    },
    integrity: {
      ok: null,
      lastCheckAt: null,
      error: null,
      dbReady: false,
      pagesCount: null,
      ftsCount: null,
    },
  };
}

function replyForWikiError(
  error: unknown,
  reply: FastifyReply,
  fallback: string,
  notFoundStatus = 500,
) {
  if (isWikiSetupRequiredError(error)) {
    return reply.code(409).send({
      error: "Vault setup required",
      code: "SETUP_REQUIRED",
    });
  }

  return reply.code(notFoundStatus).send({ error: errorMessage(error, fallback) });
}

function replyForRawArchiveError(error: unknown, reply: FastifyReply) {
  if (error instanceof RawArchiveError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  return reply.code(500).send({ error: errorMessage(error, "Raw archive request failed") });
}

function replyForWikiSourceError(error: unknown, reply: FastifyReply) {
  if (error instanceof WikiSourceError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  return reply.code(500).send({ error: errorMessage(error, "Wiki source request failed") });
}

function replyForProjectDocumentError(error: unknown, reply: FastifyReply) {
  if (error instanceof ProjectDocumentError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  return reply.code(500).send({ error: errorMessage(error, "Project document request failed") });
}

export async function warmWikiSnapshot() {
  if (!(await isWikiConfigured())) {
    return null;
  }

  try {
    await primeWikiSnapshot();
  } catch (error) {
    const wikiRoot = await getWikiRootPath();
    throw new Error(
      `Failed to load wiki from ${wikiRoot ?? "unconfigured vault"}: ${errorMessage(error, "Unknown error")}`,
    );
  }
}

export async function buildServer({
  clientRoot = getBuiltClientRoot(),
  logger = true,
  serveClient = true,
}: BuildServerOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({ logger });

  app.get("/api/health", async (_request, reply) => {
    try {
      const setup = await getWikiSetupStatus();
      if (!setup.configured) {
        return reply.code(409).send(buildSetupRequiredResponse(setup));
      }

      const [stats, healthStatus] = await Promise.all([getWikiStats(), getWikiHealthStatus()]);
      return {
        ok: true,
        configured: true,
        totalPages: stats.total_pages,
        wikiRoot: setup.wikiRoot,
        ...healthStatus,
      };
    } catch (error) {
      return reply.code(500).send({ error: errorMessage(error, "Health check failed") });
    }
  });

  app.get("/api/version", async () => readVersionInfo());

  app.get("/api/config", async () => getWikiOsConfig());

  app.get("/api/setup/status", async () => getWikiSetupStatus());

  app.post<{ Body: { currentPath?: string } }>("/api/setup/pick-folder", async (request, reply) => {
    if (!isFinderFolderPickerAvailable()) {
      return reply.code(501).send({
        error: "Finder folder picker is available on macOS only.",
      });
    }

    try {
      const selectedPath = await pickFolderWithFinder(request.body?.currentPath);

      if (!selectedPath) {
        return {
          ok: true,
          cancelled: true,
          wikiRoot: null,
        };
      }

      return {
        ok: true,
        cancelled: false,
        wikiRoot: selectedPath,
      };
    } catch (error) {
      return reply.code(500).send({
        error: errorMessage(error, "Could not open Finder."),
      });
    }
  });

  app.post<{ Body: { wikiRoot?: string; useSampleVault?: boolean; resetCorruptConfig?: boolean } }>(
    "/api/setup/config",
    async (request, reply) => {
      try {
        const setupStatus = await getWikiSetupStatus();
        const shouldResetCorruptConfig = request.body?.resetCorruptConfig === true;
        const setupConfigError = setupStatus.configError;
        const requiresCorruptReset =
          setupConfigError !== null && setupConfigError.code !== "INVALID_WIKI_ROOT";

        if (setupStatus.hasEnvOverride) {
          return reply.code(409).send({
            error: "A vault path is already locked by environment variables for this process.",
          });
        }

        if (requiresCorruptReset && !shouldResetCorruptConfig) {
          return reply.code(409).send({
            error: setupConfigError.message,
            code: "CONFIG_ERROR",
            configError: setupConfigError,
          });
        }

        const requestedPath = request.body?.useSampleVault
          ? setupStatus.sampleVaultPath
          : request.body?.wikiRoot;

        if (!requestedPath) {
          return reply.code(400).send({ error: "Enter the path to your Obsidian vault." });
        }

        const wikiRoot = await validateWikiRootPath(requestedPath);
        let existingConfig = {};
        let rollbackConfig = {};

        if (!requiresCorruptReset) {
          existingConfig = await loadWikiRuntimeConfig();
          rollbackConfig = existingConfig;
        }

        try {
          await saveWikiRuntimeConfig({
            ...existingConfig,
            wikiRoot,
          }, {
            overwriteCorrupt: shouldResetCorruptConfig,
          });
          await reloadWikiRuntime();
          await warmWikiSnapshot();
        } catch (error) {
          try {
            await saveWikiRuntimeConfig(rollbackConfig, {
              overwriteCorrupt: shouldResetCorruptConfig,
            });
            await reloadWikiRuntime();
          } catch (rollbackError) {
            request.log.error(
              rollbackError,
              "Failed to restore the previous wiki runtime config after setup error",
            );
          }

          return reply.code(500).send({ error: errorMessage(error, "Setup failed") });
        }

        return {
          ok: true,
          wikiRoot,
          source: "saved",
        };
      } catch (error) {
        if (error instanceof WikiRuntimeConfigFileError) {
          return reply.code(409).send({
            error: error.configError.message,
            code: "CONFIG_ERROR",
            configError: error.configError,
          });
        }

        return reply.code(400).send({ error: errorMessage(error, "Setup failed") });
      }
    },
  );

  app.post<{ Body: { file?: string; override?: "person" | "not-person" | null } }>(
    "/api/setup/person-override",
    async (request, reply) => {
      try {
        const wikiRoot = await getWikiRootPath();
        if (!wikiRoot) {
          return reply.code(409).send({
            error: "Vault setup required",
            code: "SETUP_REQUIRED",
          });
        }

        const file = request.body?.file?.trim();
        if (!file) {
          return reply.code(400).send({ error: "Choose a valid wiki page first." });
        }

        const override = request.body?.override;
        if (override !== null && override !== undefined && override !== "person" && override !== "not-person") {
          return reply.code(400).send({ error: "Invalid person override." });
        }

        const nextOverride = await saveWikiPersonOverride(wikiRoot, file, override ?? null);
        await reloadWikiRuntime();
        await reindexWikiSnapshot();

        return {
          ok: true,
          file,
          override: nextOverride,
        };
      } catch (error) {
        return reply.code(400).send({ error: errorMessage(error, "Could not save person override") });
      }
    },
  );

  app.post("/api/admin/reindex", async (request, reply) => {
    const requiredToken = process.env.WIKIOS_ADMIN_TOKEN?.trim();
    const providedHeader = request.headers["x-admin-token"];
    const providedToken = Array.isArray(providedHeader) ? providedHeader[0] : providedHeader;

    if (requiredToken && providedToken !== requiredToken) {
      return reply.code(401).send({ error: "Unauthorized" });
    }

    try {
      const stats = await reindexWikiSnapshot();
      return {
        ok: true,
        rebuiltAt: new Date().toISOString(),
        totalPages: stats.total_pages,
        totalWords: stats.total_words,
      };
    } catch (error) {
      return replyForWikiError(error, reply, "Manual reindex failed");
    }
  });

  app.get("/api/home", async (_request, reply) => {
    try {
      return await getHomepageData();
    } catch (error) {
      return replyForWikiError(error, reply, "Homepage data failed");
    }
  });

  app.get<{ Querystring: { q?: string } }>("/api/search", async (request, reply) => {
    try {
      const q = request.query.q ?? "";
      return { query: q, results: await searchWiki(q) };
    } catch (error) {
      return replyForWikiError(error, reply, "Search failed");
    }
  });

  app.get("/api/stats", async (_request, reply) => {
    try {
      return await getWikiStats();
    } catch (error) {
      return replyForWikiError(error, reply, "Stats failed");
    }
  });

  app.get("/api/graph", async (_request, reply) => {
    try {
      return await getGraphData();
    } catch (error) {
      return replyForWikiError(error, reply, "Graph data failed");
    }
  });

  app.get("/api/raw/tree", async (_request, reply) => {
    try {
      return await getRawArchiveTree();
    } catch (error) {
      return replyForRawArchiveError(error, reply);
    }
  });

  app.get<{ Params: { "*": string } }>("/api/raw/file/*", async (request, reply) => {
    try {
      return await getRawArchiveFile(request.params["*"]);
    } catch (error) {
      return replyForRawArchiveError(error, reply);
    }
  });

  app.get<{ Params: { "*": string } }>("/api/document/file/*", async (request, reply) => {
    try {
      return await getProjectMarkdownDocument(request.params["*"]);
    } catch (error) {
      return replyForProjectDocumentError(error, reply);
    }
  });

  app.get<{ Params: { "*": string } }>("/api/wiki/*", async (request, reply) => {
    try {
      const slugParts = request.params["*"]?.split("/").filter(Boolean) ?? [];
      return await getWikiPage(slugParts);
    } catch (error) {
      return replyForWikiError(error, reply, "Wiki page not found", 404);
    }
  });

  app.get<{ Params: { "*": string } }>("/wiki-source/*", async (request, reply) => {
    try {
      const sourceFile = await resolveWikiSourceFile(request.params["*"]);
      const fileName = path.basename(sourceFile.relativePath).replace(/["\r\n]/g, "_");
      reply.header("cache-control", "no-store");
      reply.header("content-disposition", `inline; filename="${fileName}"`);
      return reply.type(getWikiSourceContentType(sourceFile.relativePath)).send(
        createReadStream(sourceFile.absolutePath),
      );
    } catch (error) {
      return replyForWikiSourceError(error, reply);
    }
  });

  app.get<{ Params: { "*": string } }>("/document-source/*", async (request, reply) => {
    try {
      const sourceFile = await resolveProjectDocumentSource(request.params["*"]);
      const fileName = path.basename(sourceFile.relativePath).replace(/["\r\n]/g, "_");
      reply.header("cache-control", "no-store");
      reply.header("content-disposition", `inline; filename="${fileName}"`);
      return reply.type(getProjectDocumentContentType(sourceFile.relativePath)).send(
        createReadStream(sourceFile.absolutePath),
      );
    } catch (error) {
      return replyForProjectDocumentError(error, reply);
    }
  });

  app.get<{ Params: { "*": string } }>("/raw/*", async (request, reply) => {
    try {
      const rawFile = await resolveRawArchiveFile(request.params["*"]);
      reply.header("cache-control", "no-store");
      return reply.type(getRawContentType(rawFile.relativePath)).send(
        createReadStream(rawFile.absolutePath),
      );
    } catch (error) {
      return replyForRawArchiveError(error, reply);
    }
  });

  if (serveClient && (await canServeClient(clientRoot))) {
    await app.register(fastifyStatic, {
      root: clientRoot,
      prefix: "/",
      decorateReply: false,
    });

    const indexHtml = await fs.readFile(path.join(clientRoot, "index.html"), "utf8");

    app.setNotFoundHandler((request, reply) => {
      if (request.raw.url?.startsWith("/api/")) {
        return reply.code(404).send({ error: "Not found" });
      }

      reply.header("cache-control", "no-cache");
      return reply.type("text/html; charset=utf-8").send(indexHtml);
    });
  } else {
    app.setNotFoundHandler((request, reply) => {
      if (request.raw.url?.startsWith("/api/")) {
        return reply.code(404).send({ error: "Not found" });
      }

      return reply.code(503).send({ error: "Client build not found" });
    });
  }

  return app;
}
