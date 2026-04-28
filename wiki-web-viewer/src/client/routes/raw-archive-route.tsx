import { useMemo } from "react";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {
  Activity,
  Archive,
  ChevronRight,
  ExternalLink,
  FileArchive,
  FileCode2,
  FileDown,
  FileImage,
  FileText,
  Folder,
  Network,
} from "lucide-react";

import { useWikiConfig } from "@/client/wiki-config";
import type {
  RawArchiveEntry,
  RawArchiveFile,
  RawArchiveTree,
  RawPreviewKind,
} from "@/lib/wiki-shared";

import { fetchJson } from "../api";
import { RouteErrorBoundary } from "../route-error-boundary";

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeHighlight];

interface RawArchiveLoaderData {
  tree: RawArchiveTree;
  selectedPath: string | null;
  file: RawArchiveFile | null;
}

function encodeRawPath(rawPath: string) {
  return rawPath.split("/").map(encodeURIComponent).join("/");
}

function rawPathToUrl(rawPath: string) {
  return `/raw/${encodeRawPath(rawPath)}`;
}

function normalizeRawRelativePath(value: string) {
  const parts: string[] = [];

  for (const part of value.replace(/\\/g, "/").split("/")) {
    if (!part || part === ".") {
      continue;
    }

    if (part === "..") {
      parts.pop();
      continue;
    }

    parts.push(part);
  }

  return parts.join("/");
}

function resolveRawReference(filePath: string, value: string | undefined) {
  const reference = value?.trim() ?? "";
  if (!reference || reference.startsWith("#") || reference.startsWith("/")) {
    return reference;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(reference)) {
    return reference;
  }

  const [, rawPath = reference, suffix = ""] = reference.match(/^([^?#]*)([?#].*)?$/) ?? [];
  const basePath = filePath.split("/").slice(0, -1).join("/");
  const resolvedPath = normalizeRawRelativePath(basePath ? `${basePath}/${rawPath}` : rawPath);

  return `${rawPathToUrl(resolvedPath)}${suffix}`;
}

function formatBytes(size: number | null) {
  if (size === null) return "";
  if (size < 1024) return `${size} B`;

  const units = ["KB", "MB", "GB"] as const;
  let value = size / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`;
}

function formatDate(timestamp: number | null) {
  if (timestamp === null) return "";

  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function rawPathToViewerPath(rawPath: string) {
  return `/raw-archive?path=${encodeURIComponent(rawPath)}`;
}

function markdownComponentsForRawFile(file: RawArchiveFile): Components {
  return {
    a: ({ href, ...props }) => (
      <a href={resolveRawReference(file.path, href)} {...props} />
    ),
    img: ({ src, alt, ...props }) => (
      <img src={resolveRawReference(file.path, src)} alt={alt ?? ""} {...props} />
    ),
  };
}

function fileIconFor(kind: RawPreviewKind | null) {
  if (kind === "image") return FileImage;
  if (kind === "source" || kind === "html-source") return FileCode2;
  if (kind === "download") return FileArchive;
  if (kind === "pdf") return FileDown;
  return FileText;
}

function isEntrySelected(entry: RawArchiveEntry, selectedPath: string | null) {
  return selectedPath === entry.path || selectedPath?.startsWith(`${entry.path}/`) === true;
}

function RawTreeEntry({
  entry,
  depth,
  selectedPath,
}: {
  entry: RawArchiveEntry;
  depth: number;
  selectedPath: string | null;
}) {
  const selected = isEntrySelected(entry, selectedPath);

  if (entry.type === "directory") {
    return (
      <li>
        <details open={depth < 2 || selected} className="group">
          <summary
            className={`flex list-none items-center gap-2 rounded-md py-1.5 pr-2 text-sm transition-colors duration-150 hover:bg-[var(--surface-highlight)] hover:text-[var(--foreground)] [&::-webkit-details-marker]:hidden ${
              selected
                ? "bg-[var(--surface-selected)] text-[var(--foreground)]"
                : "text-[var(--muted-foreground)]"
            }`}
            style={{ paddingLeft: `${0.5 + depth * 0.9}rem` }}
          >
            <ChevronRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 group-open:rotate-90" />
            <Folder className="h-4 w-4 shrink-0 text-[var(--teal)]" />
            <span className="min-w-0 truncate">{entry.name}</span>
          </summary>
          {entry.children && entry.children.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {entry.children.map((child) => (
                <RawTreeEntry
                  key={child.path}
                  entry={child}
                  depth={depth + 1}
                  selectedPath={selectedPath}
                />
              ))}
            </ul>
          )}
        </details>
      </li>
    );
  }

  const Icon = fileIconFor(entry.previewKind);

  return (
    <li>
      <Link
        to={rawPathToViewerPath(entry.path)}
        aria-current={selected ? "page" : undefined}
        className={`flex items-center gap-2 rounded-md py-1.5 pr-2 text-sm transition-colors duration-150 ${
          selected
            ? "bg-[var(--surface-selected)] text-[var(--foreground)] ring-1 ring-[var(--border-strong)]"
            : "text-[var(--muted-foreground)] hover:bg-[var(--surface-highlight)] hover:text-[var(--foreground)]"
        }`}
        style={{ paddingLeft: `${1.6 + depth * 0.9}rem` }}
      >
        <Icon className="h-4 w-4 shrink-0 text-[var(--peach)]" />
        <span className="min-w-0 flex-1 truncate">{entry.name}</span>
        {entry.size !== null && (
          <span className="hidden shrink-0 font-mono text-[0.65rem] text-[var(--muted-foreground)] sm:inline">
            {formatBytes(entry.size)}
          </span>
        )}
      </Link>
    </li>
  );
}

function RawTree({
  entries,
  selectedPath,
}: {
  entries: RawArchiveEntry[];
  selectedPath: string | null;
}) {
  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border)] px-4 py-5 text-sm text-[var(--muted-foreground)]">
        Raw archive is empty.
      </div>
    );
  }

  return (
    <ul className="space-y-0.5">
      {entries.map((entry) => (
        <RawTreeEntry key={entry.path} entry={entry} depth={0} selectedPath={selectedPath} />
      ))}
    </ul>
  );
}

function RawFileMeta({ file }: { file: RawArchiveFile }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
      <span>{formatBytes(file.size)}</span>
      <span className="select-none">·</span>
      <span>{formatDate(file.modifiedAt)}</span>
      {file.extension && (
        <>
          <span className="select-none">·</span>
          <span>{file.extension}</span>
        </>
      )}
    </div>
  );
}

function OpenRawLink({ file }: { file: RawArchiveFile }) {
  return (
    <a
      href={file.rawUrl}
      target="_blank"
      rel="noreferrer"
      className="surface inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--surface-highlight)] active:scale-[0.97]"
    >
      <ExternalLink className="h-4 w-4 text-[var(--teal)]" />
      Open
    </a>
  );
}

function RawPreview({ file }: { file: RawArchiveFile | null }) {
  if (!file) {
    return (
      <section className="surface-raised flex min-h-[24rem] flex-col items-center justify-center rounded-lg px-6 py-10 text-center">
        <Archive className="h-10 w-10 text-[var(--teal)]" />
        <h2 className="mt-4 font-display text-2xl text-[var(--foreground)]">Raw Archive</h2>
        <p className="mt-2 max-w-md text-sm leading-7 text-[var(--muted-foreground)]">
          Original snapshots, diagrams, exports, and evidence stay here, separate from the canonical wiki.
        </p>
      </section>
    );
  }

  const isTextPreview =
    file.previewKind === "text" ||
    file.previewKind === "source" ||
    file.previewKind === "html-source";

  return (
    <section className="space-y-4">
      <div className="markdown-document px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="break-words font-mono text-xs leading-6 text-[var(--muted-foreground)]">
              {file.path}
            </p>
            <h1 className="mt-1 break-words font-display text-2xl leading-tight text-[var(--foreground)] sm:text-3xl">
              {file.name}
            </h1>
            <div className="mt-2">
              <RawFileMeta file={file} />
            </div>
          </div>
          <OpenRawLink file={file} />
        </div>
      </div>

      {file.previewKind === "image" && (
        <div className="surface-raised overflow-hidden rounded-lg p-3">
          <img
            src={file.rawUrl}
            alt={file.name}
            className="max-h-[72vh] w-full rounded-md object-contain"
          />
        </div>
      )}

      {file.previewKind === "pdf" && (
        <div className="surface-raised overflow-hidden rounded-lg">
          <iframe src={file.rawUrl} title={file.name} className="h-[72vh] w-full" />
        </div>
      )}

      {file.previewKind === "markdown" && file.textContent !== null && (
        <article className="prose-wiki markdown-document px-4 py-6 sm:px-7 sm:py-8">
          <ReactMarkdown
            components={markdownComponentsForRawFile(file)}
            rehypePlugins={file.textContent.includes("```") ? rehypePlugins : []}
            remarkPlugins={remarkPlugins}
          >
            {file.textContent}
          </ReactMarkdown>
          {file.truncated && (
            <p className="mt-4 border-t border-[var(--border)] pt-3 text-xs text-[var(--muted-foreground)]">
              Preview truncated. Open the raw file for the full source.
            </p>
          )}
        </article>
      )}

      {isTextPreview && file.textContent !== null && (
        <div className="surface-raised overflow-hidden rounded-lg">
          <pre className="max-h-[72vh] overflow-auto p-4 text-sm leading-7 text-[var(--foreground)]">
            <code>{file.textContent}</code>
          </pre>
          {file.truncated && (
            <p className="border-t border-[var(--border)] px-4 py-3 text-xs text-[var(--muted-foreground)]">
              Preview truncated. Open the raw file for the full source.
            </p>
          )}
        </div>
      )}

      {file.previewKind === "download" && (
        <div className="surface-raised rounded-lg px-5 py-8 text-center">
          <FileDown className="mx-auto h-10 w-10 text-[var(--peach)]" />
          <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">
            Binary or unsupported file. Open it directly from the local raw route.
          </p>
          <div className="mt-5">
            <OpenRawLink file={file} />
          </div>
        </div>
      )}
    </section>
  );
}

export async function loader({ request }: LoaderFunctionArgs): Promise<RawArchiveLoaderData> {
  const url = new URL(request.url);
  const selectedPath = url.searchParams.get("path");
  const tree = await fetchJson<RawArchiveTree>("/api/raw/tree");
  const file = selectedPath
    ? await fetchJson<RawArchiveFile>(`/api/raw/file/${encodeRawPath(selectedPath)}`)
    : null;

  return { tree, selectedPath, file };
}

export function Component() {
  const { tree, selectedPath, file } = useLoaderData() as RawArchiveLoaderData;
  const config = useWikiConfig();
  const totalLabel = useMemo(() => {
    if (!tree.available) return "Archive unavailable";
    return `${tree.totalFiles.toLocaleString()} files · ${tree.totalFolders.toLocaleString()} folders`;
  }, [tree.available, tree.totalFiles, tree.totalFolders]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-2 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+1.5rem)] sm:gap-3 sm:px-6 sm:pb-4 sm:pt-[calc(env(safe-area-inset-top)+1.25rem)]">
        <Link to="/" className="font-display text-lg text-[var(--foreground)] sm:text-xl">
          {config.siteTitle}
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <Link
            to="/graph"
            className="surface hidden items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-[transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] sm:flex sm:px-4"
          >
            <Network className="h-4.5 w-4.5 text-[var(--teal)]" />
            {config.navigation.graphLabel}
          </Link>
          <Link
            to="/stats"
            className="surface hidden items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-[transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] md:flex md:px-4"
          >
            <Activity className="h-4.5 w-4.5 text-[var(--peach)]" />
            {config.navigation.statsLabel}
          </Link>
          <span className="rounded-lg bg-[var(--primary)] px-3.5 py-2 text-sm font-medium text-[var(--primary-foreground)] sm:px-4">
            Raw Archive
          </span>
        </div>
      </header>

      <main
        className="mx-auto w-full max-w-[92rem] px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 4rem)" }}
      >
        <div className="animate-in space-y-6">
          <div>
            <span className="chip-teal inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
              {tree.rootLabel}
            </span>
            <h1 className="mt-3 font-display text-[2.75rem] leading-[1.05] text-[var(--foreground)] sm:text-5xl">
              Raw Archive
            </h1>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">{totalLabel}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(19rem,25rem)_minmax(0,1fr)] lg:items-start">
            <aside className="surface-raised rounded-lg px-2 py-3 lg:sticky lg:top-6 lg:max-h-[calc(100vh-7rem)] lg:overflow-auto">
              <div className="mb-3 border-b border-[var(--border)] px-3 pb-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                  File tree
                </p>
                <p className="mt-1 truncate font-mono text-[0.72rem] text-[var(--foreground)]">
                  {selectedPath ?? tree.rootLabel}
                </p>
              </div>
              {tree.available ? (
                <RawTree entries={tree.entries} selectedPath={selectedPath} />
              ) : (
                <div className="px-3 py-4 text-sm leading-7 text-[var(--muted-foreground)]">
                  The local raw archive folder was not found.
                </div>
              )}
            </aside>
            <RawPreview file={file} />
          </div>
        </div>
      </main>

      <footer className="pb-10" />
    </div>
  );
}

export const ErrorBoundary = RouteErrorBoundary;
