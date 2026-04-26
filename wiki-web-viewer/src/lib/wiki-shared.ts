export interface SearchMatch {
  heading: string;
  snippet: string;
}

export type PersonOverrideValue = "person" | "not-person";

export interface SearchResult {
  file: string;
  score: number;
  matches: SearchMatch[];
}

export interface BacklinkStat {
  page: string;
  count: number;
}

export interface WikiStats {
  total_pages: number;
  total_words: number;
  top_backlinks: BacklinkStat[];
}

export interface WikiHeading {
  text: string;
  id: string;
  level: number;
}

export interface WikiNeighbor {
  slug: string;
  title: string;
  backlinkCount: number;
  categories: string[];
}

export interface WikiUnresolvedLink {
  target: string;
  slug: string;
  count: number;
}

export interface WikiPageData {
  slug: string;
  title: string;
  fileName: string;
  contentMarkdown: string;
  hasCodeBlocks: boolean;
  headings: WikiHeading[];
  modifiedAt: number;
  categories: string[];
  neighbors: WikiNeighbor[];
  outgoingLinks: WikiNeighbor[];
  backlinks: WikiNeighbor[];
  unresolvedWikiLinks: WikiUnresolvedLink[];
  isPerson: boolean;
  personOverride: PersonOverrideValue | null;
}

export interface PageSummary {
  file: string;
  slug: string;
  title: string;
  summary: string;
  backlinkCount: number;
  wordCount: number;
  modifiedAt: number;
}

export interface CategoryInfo {
  name: string;
  emoji: string;
  count: number;
  pages: PageSummary[];
}

export interface HomepageData {
  totalPages: number;
  totalWords: number;
  featured: PageSummary[];
  recentPages: PageSummary[];
  categories: CategoryInfo[];
  topConnected: PageSummary[];
  people: PageSummary[];
}

export interface GraphNode {
  slug: string;
  title: string;
  backlinkCount: number;
  wordCount: number;
  categories: string[];
  summary: string;
  neighbors: string[]; // slugs of connected nodes
}

export interface GraphEdge {
  source: string; // slug
  target: string; // slug
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export type RawArchiveEntryType = "directory" | "file";

export type RawPreviewKind =
  | "markdown"
  | "text"
  | "source"
  | "html-source"
  | "image"
  | "pdf"
  | "download";

export interface RawArchiveEntry {
  name: string;
  path: string;
  type: RawArchiveEntryType;
  size: number | null;
  modifiedAt: number | null;
  extension: string | null;
  previewKind: RawPreviewKind | null;
  children?: RawArchiveEntry[];
}

export interface RawArchiveTree {
  rootLabel: string;
  available: boolean;
  totalFiles: number;
  totalFolders: number;
  entries: RawArchiveEntry[];
}

export interface RawArchiveFile {
  name: string;
  path: string;
  size: number;
  modifiedAt: number;
  extension: string | null;
  previewKind: RawPreviewKind;
  rawUrl: string;
  textContent: string | null;
  truncated: boolean;
}

export function decodeSlugParts(parts: string[]) {
  return parts.map((part) => decodeURIComponent(part).trim()).filter(Boolean);
}

export function slugPartsFromFileName(fileName: string) {
  return fileName
    .replace(/\.md$/i, "")
    .split("/")
    .map((part) => encodeURIComponent(part));
}

export function slugFromFileName(fileName: string) {
  return slugPartsFromFileName(fileName).join("/");
}

export function normalizeWikiLinkTarget(target: string) {
  const pagePath = target
    .trim()
    .split("#", 1)[0]
    .split("^", 1)[0]
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^\.\//, "")
    .replace(/\/+/g, "/")
    .replace(/^(?:wiki|sources)\//i, "")
    .replace(/\.md$/i, "")
    .trim();

  if (!pagePath || pagePath === "." || pagePath.startsWith("../")) {
    return "";
  }

  return pagePath;
}

export function slugFromWikiLinkTarget(target: string) {
  const normalizedTarget = normalizeWikiLinkTarget(target);
  return normalizedTarget ? slugFromFileName(`${normalizedTarget}.md`) : "";
}

export function titleFromFileName(fileName: string) {
  const withoutExtension = fileName.replace(/\.md$/i, "");
  const parts = withoutExtension.split("/");
  return parts[parts.length - 1] ?? withoutExtension;
}
