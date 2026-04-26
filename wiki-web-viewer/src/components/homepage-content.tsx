import { type ComponentType, type ReactNode } from "react";
import { Archive, Clock3, Compass, FileStack, Network } from "lucide-react";
import { Link } from "react-router-dom";

import { useWikiConfig } from "@/client/wiki-config";
import { type HomepageData, type PageSummary } from "@/lib/wiki-shared";

const categoryAccents = ["chip-teal", "chip-peach", "chip-lavender"];

const projectAreas = [
  { label: "Overview", to: "/wiki/project/overview" },
  { label: "Requirements", to: "/wiki/requirements/use-cases" },
  { label: "Use Cases", to: "/wiki/requirements/use-case-narratives" },
  { label: "Traceability", to: "/wiki/requirements/traceability" },
  { label: "Architecture", to: "/wiki/architecture/overview" },
  { label: "Decisions", to: "/wiki/project/decisions" },
  { label: "Planning", to: "/wiki/planning/workflow" },
  { label: "Raw Archive", to: "/raw-archive", icon: Archive },
];

function SectionHeader({
  icon: Icon,
  label,
  colorClass,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  colorClass: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className={`surface flex h-11 w-11 items-center justify-center rounded-lg ${colorClass}`}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
        {label}
      </p>
    </div>
  );
}

function PageChip({ page, index }: { page: PageSummary; index: number }) {
  const accent = categoryAccents[index % categoryAccents.length];

  return (
    <Link
      to={`/wiki/${page.slug}`}
      className={`${accent} group inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-base transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_28px_-22px_rgba(0,0,0,0.9)] active:scale-[0.97]`}
    >
      <span className="font-display text-[1.02rem]">{page.title}</span>
      <span className="rounded-sm bg-[var(--surface-highlight)] px-2 py-0.5 text-[0.74rem] font-semibold tabular-nums">
        {page.backlinkCount}
      </span>
    </Link>
  );
}

function PageCard({
  page,
  index,
  compact = false,
}: {
  page: PageSummary;
  index: number;
  compact?: boolean;
}) {
  const accentRail = [
    "before:bg-[var(--teal)]",
    "before:bg-[var(--peach)]",
    "before:bg-[var(--lavender)]",
  ][index % 3];

  return (
    <Link
      to={`/wiki/${page.slug}`}
      className={`surface hover-lift relative overflow-hidden rounded-lg px-5 py-5 text-left before:absolute before:left-0 before:top-0 before:h-full before:w-1 ${accentRail} ${
        compact ? "min-h-[180px]" : "min-h-[220px]"
      }`}
    >
      <p className={`truncate pl-1 font-display text-[var(--foreground)] ${compact ? "text-[1.12rem]" : "text-[1.16rem]"}`}>
        {page.title}
      </p>
      <p
        className={`mt-3 pl-1 text-[var(--muted-foreground)] ${
          compact ? "line-clamp-3 text-[0.9rem] leading-7" : "line-clamp-4 text-[0.92rem] leading-7"
        }`}
      >
        {page.summary}
      </p>
      <div className="mt-5 flex items-center gap-2 pl-1 text-[0.74rem] font-medium text-[var(--muted-foreground)]">
        <span>{page.wordCount.toLocaleString()} words</span>
        <span>·</span>
        <span>{page.backlinkCount} backlinks</span>
      </div>
    </Link>
  );
}

function ProjectAreasSection() {
  return (
    <section>
      <SectionHeader
        icon={Compass}
        label="Project Areas"
        colorClass="text-[var(--lavender)]"
      />
      <div className="surface-raised overflow-hidden rounded-lg">
        {projectAreas.map((area, index) => {
          const Icon = area.icon;

          return (
            <Link
              key={area.to}
              to={area.to}
              className={`group flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors duration-150 hover:bg-[var(--surface-highlight)] ${
                index > 0 ? "border-t border-[var(--border)]" : ""
              }`}
            >
              <span className="flex min-w-0 items-center gap-2">
                {Icon && <Icon className="h-4 w-4 shrink-0 text-[var(--teal)]" />}
                <span className="truncate font-medium text-[var(--foreground)]">
                  {area.label}
                </span>
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--teal)] opacity-45 transition-opacity duration-150 group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function HomepageContent({
  homepage,
}: {
  homepage: HomepageData;
}) {
  const config = useWikiConfig();
  const labels = config.homepage.labels;

  const sections: Record<"featured" | "topConnected" | "recentPages", ReactNode> = {
    featured: homepage.featured.length > 0 ? (
      <section>
        <SectionHeader
          icon={FileStack}
          label={labels.featured}
          colorClass="text-[var(--peach)]"
        />
        <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
          {homepage.featured.map((page, index) => (
            <PageCard key={page.file} page={page} index={index} />
          ))}
        </div>
      </section>
    ) : null,
    topConnected: (
      <section>
        <SectionHeader
          icon={Network}
          label={labels.topConnected}
          colorClass="text-[var(--teal)]"
        />
        <div className="flex flex-wrap gap-2.5">
          {homepage.topConnected.map((page, index) => (
            <PageChip key={page.file} page={page} index={index} />
          ))}
        </div>
      </section>
    ),
    recentPages: (
      <section>
        <SectionHeader
          icon={Clock3}
          label={labels.recentPages}
          colorClass="text-[var(--peach)]"
        />
        <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
          {homepage.recentPages.map((page, index) => (
            <PageCard key={page.file} page={page} index={index} compact />
          ))}
        </div>
      </section>
    ),
  };

  return (
    <div
      className="w-full space-y-10 pt-4 sm:space-y-12 sm:pt-6"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 4rem)" }}
    >
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)_minmax(19rem,0.78fr)] xl:items-start">
        <div className="space-y-8 sm:space-y-10">{sections.featured}</div>
        <div className="space-y-8 sm:space-y-10">{sections.recentPages}</div>
        <aside className="space-y-8 sm:space-y-10">
          {sections.topConnected}
          <ProjectAreasSection />
        </aside>
      </div>
    </div>
  );
}
