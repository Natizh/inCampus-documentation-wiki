import { useMemo } from "react";
import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Activity, Archive, ExternalLink, Network } from "lucide-react";

import { useWikiConfig } from "@/client/wiki-config";

import { fetchJson } from "../api";
import { RouteErrorBoundary } from "../route-error-boundary";

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeHighlight];

interface ProjectDocumentFile {
  name: string;
  path: string;
  size: number;
  modifiedAt: number;
  extension: string;
  sourceUrl: string;
  textContent: string;
  truncated: boolean;
}

function encodeDocumentPath(documentPath: string) {
  return documentPath.split("/").map(encodeURIComponent).join("/");
}

function normalizeProjectRelativePath(value: string) {
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

function documentPathToViewerPath(documentPath: string) {
  return `/document-viewer?path=${encodeURIComponent(documentPath)}`;
}

function documentPathToSourcePath(documentPath: string) {
  return `/document-source/${encodeDocumentPath(documentPath)}`;
}

function resolveProjectReference(filePath: string, value: string | undefined, forImage = false) {
  const reference = value?.trim() ?? "";
  if (!reference || reference.startsWith("#") || reference.startsWith("/")) {
    return reference;
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(reference)) {
    return reference;
  }

  const [, targetPath = reference, suffix = ""] = reference.match(/^([^?#]*)([?#].*)?$/) ?? [];
  const basePath = filePath.split("/").slice(0, -1).join("/");
  const resolvedPath = normalizeProjectRelativePath(basePath ? `${basePath}/${targetPath}` : targetPath);

  if (!forImage && /\.md$/i.test(resolvedPath)) {
    return `${documentPathToViewerPath(resolvedPath)}${suffix}`;
  }

  return `${documentPathToSourcePath(resolvedPath)}${suffix}`;
}

function formatBytes(size: number) {
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

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function markdownComponentsForDocument(file: ProjectDocumentFile): Components {
  return {
    a: ({ href, ...props }) => {
      const resolvedHref = resolveProjectReference(file.path, href);
      return (
        <a
          href={resolvedHref}
          target={/^https?:\/\//i.test(resolvedHref) ? "_blank" : undefined}
          rel={/^https?:\/\//i.test(resolvedHref) ? "noreferrer" : undefined}
          {...props}
        />
      );
    },
    img: ({ src, alt, ...props }) => (
      <img src={resolveProjectReference(file.path, src, true)} alt={alt ?? ""} {...props} />
    ),
  };
}

export async function loader({ request }: LoaderFunctionArgs): Promise<ProjectDocumentFile> {
  const url = new URL(request.url);
  const selectedPath = url.searchParams.get("path") || "README.md";

  return await fetchJson<ProjectDocumentFile>(`/api/document/file/${encodeDocumentPath(selectedPath)}`);
}

export function Component() {
  const file = useLoaderData() as ProjectDocumentFile;
  const config = useWikiConfig();
  const markdownComponents = useMemo(() => markdownComponentsForDocument(file), [file]);

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
            to="/raw-archive"
            className="surface flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-[transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] sm:px-4"
          >
            <Archive className="h-4.5 w-4.5 text-[var(--lavender)]" />
            <span className="hidden sm:inline">Raw Archive</span>
            <span className="sm:hidden">Raw</span>
          </Link>
          <Link
            to="/stats"
            className="surface hidden items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-[transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] md:flex md:px-4"
          >
            <Activity className="h-4.5 w-4.5 text-[var(--peach)]" />
            {config.navigation.statsLabel}
          </Link>
        </div>
      </header>

      <main
        className="animate-in mx-auto w-full max-w-4xl px-4 pt-6 sm:px-6 sm:pt-10 lg:px-8"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 4rem)" }}
      >
        <section className="markdown-document overflow-hidden">
          <div className="border-b border-[var(--border)] px-4 py-5 sm:px-7 sm:py-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="break-words font-mono text-xs leading-6 text-[var(--muted-foreground)]">
                  {file.path}
                </p>
                <h1 className="mt-2 break-words font-display text-[2rem] font-light leading-[1.08] text-[var(--foreground)] sm:text-5xl">
                  {file.name}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface-highlight)] px-2.5 py-1">
                    Project document
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1">
                    {formatBytes(file.size)}
                  </span>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1">
                    Updated {formatDate(file.modifiedAt)}
                  </span>
                </div>
              </div>
              <a
                href={file.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="surface inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--surface-highlight)] active:scale-[0.97]"
              >
                <ExternalLink className="h-4 w-4 text-[var(--teal)]" />
                Open
              </a>
            </div>
          </div>

          <article className="prose-wiki px-4 py-6 sm:px-7 sm:py-8">
            <ReactMarkdown
              components={markdownComponents}
              rehypePlugins={file.textContent.includes("```") ? rehypePlugins : []}
              remarkPlugins={remarkPlugins}
            >
              {file.textContent}
            </ReactMarkdown>
            {file.truncated && (
              <p className="mt-4 border-t border-[var(--border)] pt-3 text-xs text-[var(--muted-foreground)]">
                Preview truncated. Open the source file for the full document.
              </p>
            )}
          </article>
        </section>

      </main>

      <footer className="pb-10" />
    </div>
  );
}

export const ErrorBoundary = RouteErrorBoundary;
