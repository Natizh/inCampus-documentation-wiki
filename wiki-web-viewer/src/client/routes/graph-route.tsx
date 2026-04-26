import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Graph from "graphology";
import forceAtlas2 from "graphology-layout-forceatlas2";
import { Archive } from "lucide-react";

import { useWikiConfig } from "@/client/wiki-config";
import { getTopicColor, type TopicAliasConfig } from "@/lib/wiki-config";
import type { GraphData, GraphNode } from "@/lib/wiki-shared";
import { fetchJson, isSetupRequiredResponse } from "../api";
import { RouteErrorBoundary } from "../route-error-boundary";

/* ── Colors ── */

const DEFAULT_NODE_COLOR = "#86a894";
const EDGE_DEFAULT = "rgba(148, 181, 160, 0.18)";
const EDGE_HOVER = "rgba(148, 181, 160, 0.76)";
const LABEL_COLOR = "#9eaea4";
const BG_COLOR = "#0f1511";
const MAX_FALLBACK_NODES = 42;
const MAX_FALLBACK_EDGES = 120;

interface SigmaCameraApi {
  animate: (target: { x: number; y: number; ratio: number }, options: { duration: number }) => void;
}

interface SigmaApi {
  getNodeDisplayData: (node: string) => { x: number; y: number } | null | undefined;
  getCamera: () => SigmaCameraApi;
  refresh: () => void;
  on: (event: string, handler: (payload: { node: string }) => void) => void;
  kill: () => void;
}

function getCategoryColor(
  categories: string[],
  aliases: Record<string, TopicAliasConfig>,
): string {
  for (const cat of categories) {
    return getTopicColor(cat, aliases);
  }
  return DEFAULT_NODE_COLOR;
}

/* ── Graph building ── */

function buildGraph(
  data: GraphData,
  aliases: Record<string, TopicAliasConfig>,
): Graph {
  const graph = new Graph();

  for (const node of data.nodes) {
    const size = Math.max(2.5, Math.min(16, 2.5 + Math.sqrt(node.backlinkCount) * 2));
    graph.addNode(node.slug, {
      label: node.title,
      size,
      color: getCategoryColor(node.categories, aliases),
      originalColor: getCategoryColor(node.categories, aliases),
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      categories: node.categories,
      backlinkCount: node.backlinkCount,
      wordCount: node.wordCount,
    });
  }

  for (const edge of data.edges) {
    if (graph.hasNode(edge.source) && graph.hasNode(edge.target)) {
      const key = `${edge.source}->${edge.target}`;
      if (!graph.hasEdge(key)) {
        graph.addEdgeWithKey(key, edge.source, edge.target, {
          weight: edge.weight,
          size: 0.3,
          color: EDGE_DEFAULT,
        });
      }
    }
  }

  return graph;
}

function runLayout(graph: Graph) {
  forceAtlas2.assign(graph, {
    iterations: 500,
    settings: {
      gravity: 1,
      scalingRatio: 10,
      barnesHutOptimize: true,
      strongGravityMode: true,
      slowDown: 3,
      outboundAttractionDistribution: false,
      linLogMode: true,
    },
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function canUseWebGL() {
  if (typeof document === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

interface FallbackGraphPoint {
  slug: string;
  title: string;
  backlinkCount: number;
  color: string;
  x: number;
  y: number;
  size: number;
  isNeighbor: boolean;
  showLabel: boolean;
}

interface FallbackGraphModel {
  points: FallbackGraphPoint[];
  pointMap: Map<string, FallbackGraphPoint>;
  edges: GraphData["edges"];
}

function createFallbackGraphModel(
  data: GraphData,
  aliases: Record<string, TopicAliasConfig>,
  focusedSlug: string | null,
): FallbackGraphModel {
  const sortedNodes = [...data.nodes].sort(
    (a, b) => b.backlinkCount - a.backlinkCount || a.title.localeCompare(b.title),
  );
  const focusedNode = focusedSlug
    ? data.nodes.find((node) => node.slug === focusedSlug) ?? null
    : null;
  const focusedNeighborSet = new Set(focusedNode?.neighbors ?? []);

  const visibleSlugs = new Set(
    sortedNodes.slice(0, MAX_FALLBACK_NODES).map((node) => node.slug),
  );

  if (focusedNode) {
    visibleSlugs.add(focusedNode.slug);
    for (const neighbor of focusedNode.neighbors.slice(0, 12)) {
      visibleSlugs.add(neighbor);
    }
  }

  const visibleNodes = sortedNodes
    .filter((node) => visibleSlugs.has(node.slug))
    .sort((a, b) => {
      const aRank =
        focusedNode && a.slug === focusedNode.slug
          ? 0
          : focusedNeighborSet.has(a.slug)
            ? 1
            : 2;
      const bRank =
        focusedNode && b.slug === focusedNode.slug
          ? 0
          : focusedNeighborSet.has(b.slug)
            ? 1
            : 2;

      return aRank - bRank || b.backlinkCount - a.backlinkCount || a.title.localeCompare(b.title);
    });

  const neighborCount = visibleNodes.filter((node) => focusedNeighborSet.has(node.slug)).length;
  let neighborIndex = 0;
  let orbitIndex = 0;

  const points = visibleNodes.map((node, index) => {
    const isFocused = focusedSlug === node.slug;
    const isNeighbor = focusedNeighborSet.has(node.slug);
    let x = 50;
    let y = 50;

    if (isFocused) {
      x = 50;
      y = 50;
    } else if (focusedNode && isNeighbor) {
      const angle = (neighborIndex / Math.max(1, neighborCount)) * Math.PI * 2 - Math.PI / 2;
      const ring = 18 + (neighborIndex % 2) * 5.5;
      x = 50 + Math.cos(angle) * ring;
      y = 50 + Math.sin(angle) * ring * 0.76;
      neighborIndex += 1;
    } else {
      const seed = focusedNode ? orbitIndex + 1 : index;
      const angle = seed * 2.399963229728653;
      const radius = focusedNode ? 31 + Math.sqrt(seed) * 6.1 : 10 + Math.sqrt(seed) * 8.4;
      x = 50 + Math.cos(angle) * radius;
      y = 50 + Math.sin(angle) * radius * 0.74;
      orbitIndex += 1;
    }

    const size = clamp(14 + Math.sqrt(node.backlinkCount) * 2.25 + (isFocused ? 6 : 0), 14, 32);

    return {
      slug: node.slug,
      title: node.title,
      backlinkCount: node.backlinkCount,
      color: getCategoryColor(node.categories, aliases),
      x: clamp(x, 6, 94),
      y: clamp(y, 10, 90),
      size,
      isNeighbor,
      showLabel: isFocused || isNeighbor || index < 10,
    };
  });

  const pointMap = new Map(points.map((point) => [point.slug, point]));
  const edges = [...data.edges]
    .filter((edge) => pointMap.has(edge.source) && pointMap.has(edge.target))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, MAX_FALLBACK_EDGES);

  return { points, pointMap, edges };
}

/* ── Search ── */

function GraphSearch({
  graph,
  sigmaRef,
  onSelect,
}: {
  graph: Graph | null;
  sigmaRef: React.RefObject<SigmaApi | null>;
  onSelect: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ slug: string; label: string }[]>([]);

  useEffect(() => {
    if (!graph || !query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const matched: { slug: string; label: string }[] = [];
    graph.forEachNode((slug, attrs) => {
      if (attrs.label?.toLowerCase().includes(q)) {
        matched.push({ slug, label: attrs.label });
      }
    });
    matched.sort((a, b) => a.label.localeCompare(b.label));
    setResults(matched.slice(0, 8));
  }, [graph, query]);

  const handleSelect = (slug: string) => {
    const sigma = sigmaRef.current;
    if (sigma) {
      const pos = sigma.getNodeDisplayData(slug);
      if (pos) {
        sigma.getCamera().animate({ x: pos.x, y: pos.y, ratio: 0.3 }, { duration: 400 });
      }
    }
    onSelect(slug);
    setQuery("");
    setResults([]);
  };

  return (
    <div
      className="absolute left-4 right-4 z-10 sm:right-auto sm:w-64"
      style={{ top: "calc(env(safe-area-inset-top) + 4.75rem)" }}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find a concept..."
        className="surface w-full rounded-lg px-4 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]"
      />
      {results.length > 0 && (
        <div className="surface-raised mt-2 overflow-hidden rounded-lg">
          {results.map((r) => (
            <button
              key={r.slug}
              type="button"
              onClick={() => handleSelect(r.slug)}
              className="block w-full px-4 py-2 text-left text-sm font-display text-[var(--foreground)] transition-colors hover:bg-[var(--surface-highlight)]"
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Info panel (shown when a node is focused) ── */

function InfoPanel({
  node,
  neighborNodes,
  onClose,
  onClickNeighbor,
  onNavigate,
  aliases,
}: {
  node: GraphNode;
  neighborNodes: GraphNode[];
  onClose: () => void;
  onClickNeighbor: (slug: string) => void;
  onNavigate: (slug: string) => void;
  aliases: Record<string, TopicAliasConfig>;
}) {
  const catColor = getCategoryColor(node.categories, aliases);

  return (
    <div
      className="surface-raised absolute left-4 right-4 z-20 overflow-hidden rounded-lg sm:left-auto sm:right-4 sm:w-80"
      style={{ top: "calc(env(safe-area-inset-top) + 4.75rem)" }}
    >
      {/* Header */}
      <div className="border-b border-[var(--border)] px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-display text-[1.1rem] text-[var(--foreground)]">
              {node.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-2">
              {node.categories.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: catColor, boxShadow: `0 0 8px ${catColor}80` }}
                  />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    {node.categories[0]}
                  </span>
                </div>
              )}
              <span className="text-[10px] text-[var(--muted-foreground)]">
                {node.backlinkCount} · {node.wordCount}w
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 3l8 8M11 3l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Summary */}
      {node.summary && (
        <div className="border-b border-[var(--border)] px-5 py-3">
          <p className="line-clamp-3 text-[0.8rem] leading-relaxed text-[var(--muted-foreground)]">
            {node.summary}
          </p>
        </div>
      )}

      {/* Open article button */}
      <div className="border-b border-[var(--border)] px-5 py-3">
        <button
          type="button"
          onClick={() => onNavigate(node.slug)}
          className="w-full rounded-lg bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] transition-[background,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[var(--lavender)] active:scale-[0.97]"
        >
          Open article →
        </button>
      </div>

      {/* Connections list */}
      {neighborNodes.length > 0 && (
        <div className="max-h-56 overflow-y-auto">
          <p className="px-5 pb-1.5 pt-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
            Connections ({neighborNodes.length})
          </p>
          {neighborNodes.map((n) => (
            <button
              key={n.slug}
              type="button"
              onClick={() => onClickNeighbor(n.slug)}
              className="group flex w-full items-center gap-2.5 px-5 py-2 text-left transition-colors hover:bg-[var(--surface-highlight)]"
            >
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200 group-hover:scale-125"
                style={{
                  backgroundColor: getCategoryColor(n.categories, aliases),
                  boxShadow: `0 0 6px ${getCategoryColor(n.categories, aliases)}60`,
                }}
              />
              <span className="truncate font-display text-[0.85rem] text-[var(--foreground)]">
                {n.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Tooltip ── */

function NodeTooltip({
  node,
  position,
  aliases,
}: {
  node: { label: string; categories: string[]; backlinkCount: number; wordCount: number } | null;
  position: { x: number; y: number };
  aliases: Record<string, TopicAliasConfig>;
}) {
  if (!node) return null;
  const catColor = getCategoryColor(node.categories, aliases);

  return (
    <div
      className="surface-raised pointer-events-none absolute z-20 max-w-xs rounded-lg px-4 py-2.5"
      style={{ left: position.x + 14, top: position.y - 12 }}
    >
      <p className="font-display text-[0.95rem] text-[var(--foreground)]">{node.label}</p>
      <div className="mt-1 flex items-center gap-1.5 text-[0.7rem] font-medium text-[var(--muted-foreground)]">
        <span>{node.backlinkCount} connections</span>
        <span>·</span>
        <span>{node.wordCount} words</span>
      </div>
      {node.categories.length > 0 && (
        <div className="mt-1.5 flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: catColor, boxShadow: `0 0 8px ${catColor}80` }}
          />
          <span className="text-[0.7rem] font-semibold text-[var(--muted-foreground)]">
            {node.categories.join(", ")}
          </span>
        </div>
      )}
    </div>
  );
}

function FallbackGraphMap({
  data,
  aliases,
  focusedSlug,
  onNodeClick,
  onClearFocus,
}: {
  data: GraphData;
  aliases: Record<string, TopicAliasConfig>;
  focusedSlug: string | null;
  onNodeClick: (slug: string) => void;
  onClearFocus: () => void;
}) {
  const model = useMemo(
    () => createFallbackGraphModel(data, aliases, focusedSlug),
    [aliases, data, focusedSlug],
  );
  const focusedNeighborSet = useMemo(() => {
    const focusedNode = focusedSlug
      ? data.nodes.find((node) => node.slug === focusedSlug) ?? null
      : null;
    return new Set(focusedNode?.neighbors ?? []);
  }, [data.nodes, focusedSlug]);

  return (
    <div className="absolute inset-0 overflow-hidden" onClick={onClearFocus}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(148, 181, 160, 0.14), transparent 34%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {model.edges.map((edge) => {
          const source = model.pointMap.get(edge.source);
          const target = model.pointMap.get(edge.target);

          if (!source || !target) {
            return null;
          }

          const touchesFocused =
            focusedSlug !== null &&
            (edge.source === focusedSlug ||
              edge.target === focusedSlug ||
              (focusedNeighborSet.has(edge.source) && focusedNeighborSet.has(edge.target)));
          const dimmed =
            focusedSlug !== null &&
            edge.source !== focusedSlug &&
            edge.target !== focusedSlug &&
            !focusedNeighborSet.has(edge.source) &&
            !focusedNeighborSet.has(edge.target);

          return (
            <line
              key={`${edge.source}-${edge.target}`}
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={touchesFocused ? EDGE_HOVER : EDGE_DEFAULT}
              strokeWidth={touchesFocused ? 0.42 : clamp(0.14 + edge.weight * 0.04, 0.14, 0.28)}
              opacity={dimmed ? 0.12 : touchesFocused ? 0.96 : 0.5}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0">
        {model.points.map((point) => {
          const isFocused = point.slug === focusedSlug;
          const dimmed = focusedSlug !== null && !isFocused && !point.isNeighbor;

          return (
            <button
              key={point.slug}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onNodeClick(point.slug);
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 text-left transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isFocused ? "z-20 scale-[1.04]" : point.isNeighbor ? "z-10" : "z-0"
              } ${dimmed ? "opacity-25" : "opacity-100 hover:scale-[1.03]"}`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              <span className="flex items-center gap-3">
                <span
                  className="shrink-0 rounded-full border border-white/12 shadow-[0_0_0_1px_rgba(15,21,17,0.4),0_14px_24px_-18px_rgba(0,0,0,0.95)]"
                  style={{
                    width: `${point.size}px`,
                    height: `${point.size}px`,
                    backgroundColor: point.color,
                    boxShadow: isFocused
                      ? `0 0 0 6px rgba(148, 181, 160, 0.12), 0 16px 28px -18px rgba(0, 0, 0, 0.95)`
                      : undefined,
                  }}
                />
                {point.showLabel && (
                  <span className="surface hidden rounded-md px-3 py-2 sm:block">
                    <span className="block max-w-[14rem] truncate font-display text-[0.95rem] text-[var(--foreground)]">
                      {point.title}
                    </span>
                    <span className="mt-0.5 block text-[0.7rem] font-medium text-[var(--muted-foreground)]">
                      {point.backlinkCount} links
                    </span>
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden sm:block">
        <div className="surface rounded-lg px-3.5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
          Lite map
        </div>
      </div>
    </div>
  );
}

/* ── Main Component ── */

export async function loader() {
  try {
    return await fetchJson<GraphData>("/api/graph");
  } catch (error) {
    if (isSetupRequiredResponse(error)) {
      throw redirect("/setup");
    }

    throw error;
  }
}

export function Component() {
  const data = useLoaderData() as GraphData;
  const config = useWikiConfig();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const sigmaRef = useRef<SigmaApi | null>(null);
  const graphRef = useRef<Graph | null>(null);
  const hoveredRef = useRef<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  const focusedRef = useRef<string | null>(null);
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    node: { label: string; categories: string[]; backlinkCount: number; wordCount: number };
    position: { x: number; y: number };
  } | null>(null);
  const [graphReady, setGraphReady] = useState(false);
  const [graphError, setGraphError] = useState<string | null>(null);
  const [useFallbackMap, setUseFallbackMap] = useState(false);

  // Build a lookup map for node data
  const nodeMap = useRef(new Map<string, GraphNode>());
  useEffect(() => {
    const map = new Map<string, GraphNode>();
    for (const n of data.nodes) map.set(n.slug, n);
    nodeMap.current = map;
  }, [data]);

  const focusedNode = focusedSlug ? nodeMap.current.get(focusedSlug) ?? null : null;
  const focusedNeighbors = focusedNode
    ? focusedNode.neighbors
        .map((s) => nodeMap.current.get(s))
        .filter((n): n is GraphNode => n !== undefined)
        .sort((a, b) => b.backlinkCount - a.backlinkCount)
    : [];

  const handleSearchSelect = useCallback((slug: string) => {
    focusedRef.current = slug;
    setFocusedSlug(slug);
    sigmaRef.current?.refresh();
  }, []);

  const handleMapNodeClick = useCallback(
    (slug: string) => {
      if (focusedRef.current === slug) {
        navigate(`/wiki/${slug}`);
        return;
      }

      focusedRef.current = slug;
      setFocusedSlug(slug);
      sigmaRef.current?.refresh();

      const pos = sigmaRef.current?.getNodeDisplayData(slug);
      if (pos) {
        sigmaRef.current?.getCamera().animate({ x: pos.x, y: pos.y, ratio: 0.5 }, { duration: 300 });
      }
    },
    [navigate],
  );

  const handleInfoClose = useCallback(() => {
    focusedRef.current = null;
    setFocusedSlug(null);
    sigmaRef.current?.refresh();
  }, []);

  const handleInfoNeighborClick = useCallback((slug: string) => {
    focusedRef.current = slug;
    setFocusedSlug(slug);
    sigmaRef.current?.refresh();
    const pos = sigmaRef.current?.getNodeDisplayData(slug);
    if (pos) {
      sigmaRef.current?.getCamera().animate({ x: pos.x, y: pos.y, ratio: 0.5 }, { duration: 300 });
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let sigma: SigmaApi | null = null;

    async function initGraph() {
      if (!containerRef.current) {
        return;
      }

      setGraphReady(false);
      setGraphError(null);
      setUseFallbackMap(false);

      const graph = buildGraph(data, config.categories.aliases);
      graphRef.current = graph;

      if (!canUseWebGL()) {
        setUseFallbackMap(true);
        setGraphReady(true);
        return;
      }

      try {
        const { default: SigmaLib } = await import("sigma");
        if (cancelled || !containerRef.current) {
          return;
        }

        runLayout(graph);

        sigma = new SigmaLib(graph, containerRef.current, {
          allowInvalidContainer: true,
          renderLabels: true,
          renderEdgeLabels: false,
          labelColor: { color: LABEL_COLOR },
          labelFont: '"Sora", -apple-system, BlinkMacSystemFont, sans-serif',
          labelSize: 11,
          labelWeight: "500",
          labelRenderedSizeThreshold: 6,
          defaultEdgeColor: EDGE_DEFAULT,
          defaultEdgeType: "line",
          defaultNodeColor: DEFAULT_NODE_COLOR,
          stagePadding: 60,
          edgeReducer(edge, edgeData) {
            const active = focusedRef.current ?? hoveredRef.current;
            const res = { ...edgeData };

            if (active) {
              const src = graph.source(edge);
              const tgt = graph.target(edge);
              if (src === active || tgt === active) {
                res.color = EDGE_HOVER;
                res.size = 1;
              } else {
                res.hidden = true;
              }
            }
            return res;
          },
          nodeReducer(node, nodeData) {
            const active = focusedRef.current ?? hoveredRef.current;
            const selected = selectedRef.current;
            const res = { ...nodeData };

            if (active) {
              const isActive = node === active;
              const isNeighbor = graph.hasEdge(active, node) || graph.hasEdge(node, active);

              if (isActive) {
                res.highlighted = true;
                res.zIndex = 2;
                res.size = (res.size ?? 4) * 1.3;
              } else if (isNeighbor) {
                res.zIndex = 1;
                if (focusedRef.current) res.forceLabel = true;
              } else {
                res.color = "#243029";
                res.label = "";
                res.zIndex = 0;
              }
            }

            if (selected === node) {
              res.highlighted = true;
              res.zIndex = 3;
              res.size = (res.size ?? 4) * 1.4;
            }

            return res;
          },
        }) as SigmaApi;
      } catch (error) {
        console.warn("Falling back to lite map mode", error);
        if (!cancelled) {
          setUseFallbackMap(true);
          setGraphReady(true);
        }
        return;
      }

      sigmaRef.current = sigma;
      setGraphReady(true);

      sigma.on("enterNode", ({ node }) => {
        hoveredRef.current = node;
        sigma?.refresh();
        if (containerRef.current) {
          containerRef.current.style.cursor = "pointer";
        }
      });

      sigma.on("leaveNode", () => {
        hoveredRef.current = null;
        sigma?.refresh();
        setTooltip(null);
        if (containerRef.current) {
          containerRef.current.style.cursor = "default";
        }
      });

      sigma.on("clickNode", ({ node }) => {
        handleMapNodeClick(node);
      });

      sigma.on("clickStage", () => {
        if (focusedRef.current) {
          focusedRef.current = null;
          setFocusedSlug(null);
          sigma?.refresh();
        }
      });
    }

    void initGraph().catch((error: unknown) => {
      console.error("Failed to initialize map mode", error);
      if (!cancelled) {
        setGraphError(error instanceof Error ? error.message : "Could not initialize map mode.");
      }
    });

    return () => {
      cancelled = true;
      sigma?.kill();
      sigmaRef.current = null;
      graphRef.current = null;
    };
  }, [config.categories.aliases, data, handleMapNodeClick]);

  // Tooltip tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const hovered = hoveredRef.current;
      if (!hovered || !graphRef.current || focusedRef.current) {
        if (!focusedRef.current) setTooltip(null);
        return;
      }
      const attrs = graphRef.current.getNodeAttributes(hovered);
      setTooltip({
        node: {
          label: attrs.label,
          categories: attrs.categories ?? [],
          backlinkCount: attrs.backlinkCount ?? 0,
          wordCount: attrs.wordCount ?? 0,
        },
        position: { x: e.clientX, y: e.clientY },
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0" style={{ background: BG_COLOR }}>
      {/* Header */}
      <header className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-2 px-4 pb-3 pt-[calc(env(safe-area-inset-top)+1.5rem)] sm:gap-3 sm:px-6 sm:pb-4 sm:pt-[calc(env(safe-area-inset-top)+1.25rem)]">
        <Link to="/" className="font-display text-lg text-[var(--foreground)] sm:text-xl">
          {config.siteTitle}
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <span className="surface hidden items-center gap-2 rounded-lg px-3.5 py-2 text-xs text-[var(--muted-foreground)] sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lavender)]" />
            <span className="font-semibold tabular-nums text-[var(--foreground)]">
              {data.nodes.length}
            </span>
            <span>{config.navigation.conceptsLabel}</span>
            <span>·</span>
            <span className="font-semibold tabular-nums text-[var(--foreground)]">
              {data.edges.length}
            </span>
            <span>{config.navigation.connectionsLabel}</span>
          </span>
          <Link
            to="/"
            className="surface rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-[transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] sm:px-4"
          >
            <span className="sm:hidden">Back</span>
            <span className="hidden sm:inline">{config.navigation.backToWikiLabel}</span>
          </Link>
          <Link
            to="/raw-archive"
            className="surface flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition-[transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] sm:px-4"
          >
            <Archive className="h-4.5 w-4.5 text-[var(--lavender)]" />
            <span className="hidden sm:inline">Raw Archive</span>
            <span className="sm:hidden">Raw</span>
          </Link>
        </div>
      </header>

      {/* Search */}
      <GraphSearch
        graph={graphReady ? graphRef.current : null}
        sigmaRef={sigmaRef}
        onSelect={handleSearchSelect}
      />

      {/* Tooltip (only when not focused) */}
      {!useFallbackMap && !focusedSlug && (
        <NodeTooltip
          node={tooltip?.node ?? null}
          position={tooltip?.position ?? { x: 0, y: 0 }}
          aliases={config.categories.aliases}
        />
      )}

      {/* Info panel (when focused) */}
      {focusedNode && (
        <InfoPanel
          node={focusedNode}
          neighborNodes={focusedNeighbors}
          onClose={handleInfoClose}
          onClickNeighbor={handleInfoNeighborClick}
          onNavigate={(slug) => navigate(`/wiki/${slug}`)}
          aliases={config.categories.aliases}
        />
      )}

      {/* Sigma canvas */}
      <div ref={containerRef} className={`${useFallbackMap ? "hidden" : "h-full w-full"}`} />

      {useFallbackMap && (
        <FallbackGraphMap
          data={data}
          aliases={config.categories.aliases}
          focusedSlug={focusedSlug}
          onNodeClick={handleMapNodeClick}
          onClearFocus={handleInfoClose}
        />
      )}

      {graphError && (
        <div className="pointer-events-none absolute inset-x-4 bottom-4 z-30 sm:left-4 sm:w-[28rem] sm:right-auto">
          <div className="surface-raised rounded-lg px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--peach)]">
              Map mode unavailable
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">{graphError}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export const ErrorBoundary = RouteErrorBoundary;
