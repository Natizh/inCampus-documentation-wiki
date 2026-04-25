import { useState, type ComponentType, type ReactNode } from "react";
import { Clock3, FileStack, Network, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { useWikiConfig } from "@/client/wiki-config";
import { usePersonImage } from "@/client/use-person-image";
import { type HomepageData, type PageSummary } from "@/lib/wiki-shared";

const categoryAccents = ["chip-teal", "chip-peach", "chip-lavender"];

const personAvatarAccents = [
  "bg-[var(--teal-soft)] text-[#d8e6db]",
  "bg-[var(--peach-soft)] text-[#e0d6cc]",
  "bg-[var(--lavender-soft)] text-[#d3e0d8]",
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

function PersonCard({ person, index }: { person: PageSummary; index: number }) {
  const imageUrl = usePersonImage(person.title);
  const accentBg = personAvatarAccents[index % personAvatarAccents.length];
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link
      to={`/wiki/${person.slug}`}
      className="surface hover-lift grid grid-cols-[72px_1fr] items-center gap-4 rounded-lg px-4 py-4 text-left"
    >
      <span
        className={`relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-lg ${accentBg} font-display text-2xl font-medium`}
      >
        <span aria-hidden={imageUrl !== null && imgLoaded}>{person.title.charAt(0)}</span>
        {imageUrl && (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </span>
      <div className="min-w-0">
        <p className="truncate font-display text-[1.08rem] text-[var(--foreground)]">
          {person.title}
        </p>
        <p className="mt-1 text-[0.78rem] font-medium text-[var(--muted-foreground)]">
          {person.backlinkCount} connections
        </p>
      </div>
    </Link>
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

export function HomepageContent({
  homepage,
}: {
  homepage: HomepageData;
}) {
  const config = useWikiConfig();
  const labels = config.homepage.labels;

  const sections: Record<"featured" | "topConnected" | "people" | "recentPages", ReactNode> = {
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
    people: homepage.people.length > 0 ? (
      <section>
        <SectionHeader
          icon={Users}
          label={labels.people}
          colorClass="text-[var(--lavender)]"
        />
        <div className="grid grid-cols-1 gap-3">
          {homepage.people.map((person, index) => (
            <PersonCard key={person.file} person={person} index={index} />
          ))}
        </div>
      </section>
    ) : null,
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
          {sections.people}
        </aside>
      </div>
    </div>
  );
}
