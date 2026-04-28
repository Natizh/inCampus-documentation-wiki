export const HOMEPAGE_SECTION_KEYS = [
  "featured",
  "topConnected",
  "people",
  "recentPages",
] as const;

export type HomepageSectionKey = (typeof HOMEPAGE_SECTION_KEYS)[number];

export interface TopicAliasConfig {
  label?: string;
  emoji?: string;
  color?: string;
}

export type PeopleMode = "explicit" | "hybrid" | "off";

export interface WikiOsConfigInput {
  siteTitle?: string;
  tagline?: string;
  searchPlaceholder?: string;
  navigation?: {
    graphLabel?: string;
    statsLabel?: string;
    backToWikiLabel?: string;
    articlesLabel?: string;
    conceptsLabel?: string;
    connectionsLabel?: string;
  };
  homepage?: {
    sectionOrder?: HomepageSectionKey[];
    labels?: {
      featured?: string;
      topConnected?: string;
      people?: string;
      recentPages?: string;
      spotlightBadge?: string;
      statsEyebrow?: string;
      statsDescription?: string;
    };
  };
  theme?: {
    variables?: Record<string, string>;
  };
  categories?: {
    aliases?: Record<string, TopicAliasConfig>;
    hidden?: string[];
    maxTopics?: number;
    folderDepth?: number;
    frontmatterKeys?: string[];
  };
  people?: {
    enabled?: boolean;
    mode?: PeopleMode;
    frontmatterKeys?: string[];
    folderNames?: string[];
    tagNames?: string[];
  };
}

export interface WikiOsConfig {
  siteTitle: string;
  tagline: string;
  searchPlaceholder: string;
  navigation: {
    graphLabel: string;
    statsLabel: string;
    backToWikiLabel: string;
    articlesLabel: string;
    conceptsLabel: string;
    connectionsLabel: string;
  };
  homepage: {
    sectionOrder: HomepageSectionKey[];
    labels: {
      featured: string;
      topConnected: string;
      people: string;
      recentPages: string;
      spotlightBadge: string;
      statsEyebrow: string;
      statsDescription: string;
    };
  };
  theme: {
    variables: Record<string, string>;
  };
  categories: {
    aliases: Record<string, TopicAliasConfig>;
    hidden: string[];
    maxTopics: number;
    folderDepth: number;
    frontmatterKeys: string[];
  };
  people: {
    enabled: boolean;
    mode: PeopleMode;
    frontmatterKeys: string[];
    folderNames: string[];
    tagNames: string[];
  };
}

export const DEFAULT_WIKI_OS_CONFIG: WikiOsConfig = {
  siteTitle: "inCampus",
  tagline: "Build the product that helps students turn ordinary moments into shared ones.",
  searchPlaceholder: "Search requirements, use cases, architecture, decisions, and notes...",
  navigation: {
    graphLabel: "Map",
    statsLabel: "Pulse",
    backToWikiLabel: "Back to docs",
    articlesLabel: "notes",
    conceptsLabel: "concepts",
    connectionsLabel: "links",
  },
  homepage: {
    sectionOrder: [...HOMEPAGE_SECTION_KEYS],
    labels: {
      featured: "Focus Docs",
      topConnected: "Shared Context",
      people: "People",
      recentPages: "Latest Notes",
      spotlightBadge: "Spotlight",
      statsEyebrow: "Project Pulse",
      statsDescription: "Signals from the product memory shaping inCampus.",
    },
  },
  theme: {
    variables: {
      "--background": "#07120e",
      "--background-tint": "#0d2018",
      "--foreground": "#edf8f0",
      "--card": "#10261d",
      "--card-foreground": "#edf8f0",
      "--popover": "#11281f",
      "--popover-foreground": "#edf8f0",
      "--teal": "#9be7bd",
      "--teal-soft": "rgba(155, 231, 189, 0.15)",
      "--peach": "#d3b679",
      "--peach-soft": "rgba(211, 182, 121, 0.14)",
      "--lavender": "#7ec7a5",
      "--lavender-soft": "rgba(126, 199, 165, 0.14)",
      "--primary": "#9be7bd",
      "--primary-foreground": "#062117",
      "--secondary": "#153126",
      "--secondary-foreground": "#dff1e5",
      "--muted": "#10261d",
      "--muted-foreground": "#9eb5a8",
      "--accent": "#1d3b2e",
      "--accent-foreground": "#edf8f0",
      "--border": "rgba(188, 237, 206, 0.14)",
      "--border-strong": "rgba(188, 237, 206, 0.24)",
      "--ring": "rgba(155, 231, 189, 0.58)",
      "--surface": "rgba(12, 30, 23, 0.9)",
      "--surface-raised": "rgba(16, 41, 31, 0.95)",
      "--surface-highlight": "rgba(155, 231, 189, 0.12)",
      "--surface-selected": "rgba(155, 231, 189, 0.18)",
      "--surface-warm": "rgba(211, 182, 121, 0.12)",
      "--link": "#a9f0c6",
      "--code-bg": "#081a13",
    },
  },
  categories: {
    aliases: {},
    hidden: [],
    maxTopics: 6,
    folderDepth: 2,
    frontmatterKeys: ["tags", "topics", "topic", "category", "categories"],
  },
  people: {
    enabled: true,
    mode: "explicit",
    frontmatterKeys: ["person", "people", "type", "kind", "entity"],
    folderNames: ["people", "person", "biographies", "biography"],
    tagNames: ["person", "people", "biography", "biographies"],
  },
};

const TOPIC_COLOR_PALETTE = [
  "#9be7bd",
  "#d3b679",
  "#7ec7a5",
  "#a8d6b5",
  "#b7c985",
  "#ddb18a",
  "#83d0bf",
  "#c4d7aa",
] as const;

const TOPIC_EMOJI_PALETTE = ["🧠", "📚", "🧭", "⚙️", "🌱", "🔬", "✨", "🗂️"] as const;

function uniqueStrings(values: Iterable<string>) {
  return [...new Set([...values].map((value) => value.trim()).filter(Boolean))];
}

function normalizeAliasMap(aliases: Record<string, TopicAliasConfig> | undefined) {
  const normalized: Record<string, TopicAliasConfig> = {};

  for (const [key, value] of Object.entries(aliases ?? {})) {
    const normalizedKey = normalizeTopicKey(key);
    if (!normalizedKey) {
      continue;
    }
    normalized[normalizedKey] = value;
  }

  return normalized;
}

export function normalizeTopicKey(value: string) {
  return value.trim().toLowerCase().replace(/^#/, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ");
}

export function formatTopicLabel(value: string) {
  const normalized = value
    .trim()
    .replace(/^#/, "")
    .replace(/[\\/]+/g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

  if (!normalized) {
    return "";
  }

  return normalized
    .split(" ")
    .map((word) => {
      if (word === word.toUpperCase()) {
        return word;
      }

      if (/^\d+$/.test(word)) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function resolvePeopleMode(mode: PeopleMode | undefined, enabled: boolean | undefined): PeopleMode {
  if (mode === "explicit" || mode === "hybrid" || mode === "off") {
    return mode;
  }

  if (enabled === false) {
    return "off";
  }

  return DEFAULT_WIKI_OS_CONFIG.people.mode;
}

export function resolveWikiOsConfig(input?: WikiOsConfigInput): WikiOsConfig {
  const peopleMode = resolvePeopleMode(input?.people?.mode, input?.people?.enabled);

  return {
    siteTitle: input?.siteTitle?.trim() || DEFAULT_WIKI_OS_CONFIG.siteTitle,
    tagline: input?.tagline?.trim() || DEFAULT_WIKI_OS_CONFIG.tagline,
    searchPlaceholder:
      input?.searchPlaceholder?.trim() || DEFAULT_WIKI_OS_CONFIG.searchPlaceholder,
    navigation: {
      graphLabel:
        input?.navigation?.graphLabel?.trim() ||
        DEFAULT_WIKI_OS_CONFIG.navigation.graphLabel,
      statsLabel:
        input?.navigation?.statsLabel?.trim() ||
        DEFAULT_WIKI_OS_CONFIG.navigation.statsLabel,
      backToWikiLabel:
        input?.navigation?.backToWikiLabel?.trim() ||
        DEFAULT_WIKI_OS_CONFIG.navigation.backToWikiLabel,
      articlesLabel:
        input?.navigation?.articlesLabel?.trim() ||
        DEFAULT_WIKI_OS_CONFIG.navigation.articlesLabel,
      conceptsLabel:
        input?.navigation?.conceptsLabel?.trim() ||
        DEFAULT_WIKI_OS_CONFIG.navigation.conceptsLabel,
      connectionsLabel:
        input?.navigation?.connectionsLabel?.trim() ||
        DEFAULT_WIKI_OS_CONFIG.navigation.connectionsLabel,
    },
    homepage: {
      sectionOrder:
        input?.homepage?.sectionOrder?.filter((section): section is HomepageSectionKey =>
          HOMEPAGE_SECTION_KEYS.includes(section),
        ) || DEFAULT_WIKI_OS_CONFIG.homepage.sectionOrder,
      labels: {
        featured:
          input?.homepage?.labels?.featured?.trim() ||
          DEFAULT_WIKI_OS_CONFIG.homepage.labels.featured,
        topConnected:
          input?.homepage?.labels?.topConnected?.trim() ||
          DEFAULT_WIKI_OS_CONFIG.homepage.labels.topConnected,
        people:
          input?.homepage?.labels?.people?.trim() ||
          DEFAULT_WIKI_OS_CONFIG.homepage.labels.people,
        recentPages:
          input?.homepage?.labels?.recentPages?.trim() ||
          DEFAULT_WIKI_OS_CONFIG.homepage.labels.recentPages,
        spotlightBadge:
          input?.homepage?.labels?.spotlightBadge?.trim() ||
          DEFAULT_WIKI_OS_CONFIG.homepage.labels.spotlightBadge,
        statsEyebrow:
          input?.homepage?.labels?.statsEyebrow?.trim() ||
          DEFAULT_WIKI_OS_CONFIG.homepage.labels.statsEyebrow,
        statsDescription:
          input?.homepage?.labels?.statsDescription?.trim() ||
          DEFAULT_WIKI_OS_CONFIG.homepage.labels.statsDescription,
      },
    },
    theme: {
      variables: { ...DEFAULT_WIKI_OS_CONFIG.theme.variables, ...input?.theme?.variables },
    },
    categories: {
      aliases: normalizeAliasMap(input?.categories?.aliases),
      hidden: uniqueStrings(
        (input?.categories?.hidden ?? DEFAULT_WIKI_OS_CONFIG.categories.hidden).map(
          normalizeTopicKey,
        ),
      ),
      maxTopics: Math.max(
        1,
        Math.floor(input?.categories?.maxTopics ?? DEFAULT_WIKI_OS_CONFIG.categories.maxTopics),
      ),
      folderDepth: Math.max(
        0,
        Math.floor(input?.categories?.folderDepth ?? DEFAULT_WIKI_OS_CONFIG.categories.folderDepth),
      ),
      frontmatterKeys: uniqueStrings(
        input?.categories?.frontmatterKeys ?? DEFAULT_WIKI_OS_CONFIG.categories.frontmatterKeys,
      ),
    },
    people: {
      enabled: peopleMode !== "off",
      mode: peopleMode,
      frontmatterKeys: uniqueStrings(
        input?.people?.frontmatterKeys ?? DEFAULT_WIKI_OS_CONFIG.people.frontmatterKeys,
      ).map(normalizeTopicKey),
      folderNames: uniqueStrings(
        input?.people?.folderNames ?? DEFAULT_WIKI_OS_CONFIG.people.folderNames,
      ).map(normalizeTopicKey),
      tagNames: uniqueStrings(
        input?.people?.tagNames ?? DEFAULT_WIKI_OS_CONFIG.people.tagNames,
      ).map(normalizeTopicKey),
    },
  };
}

function hashString(value: string) {
  let hash = 0;

  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  return hash;
}

export function getTopicAlias(
  topic: string,
  aliases: Record<string, TopicAliasConfig>,
) {
  return aliases[normalizeTopicKey(topic)];
}

export function getTopicLabel(topic: string, aliases: Record<string, TopicAliasConfig>) {
  return getTopicAlias(topic, aliases)?.label ?? formatTopicLabel(topic);
}

export function getTopicColor(topic: string, aliases: Record<string, TopicAliasConfig>) {
  const aliasColor = getTopicAlias(topic, aliases)?.color;
  if (aliasColor) {
    return aliasColor;
  }

  const key = normalizeTopicKey(topic) || topic;
  return TOPIC_COLOR_PALETTE[hashString(key) % TOPIC_COLOR_PALETTE.length];
}

export function getTopicEmoji(topic: string, aliases: Record<string, TopicAliasConfig>) {
  const aliasEmoji = getTopicAlias(topic, aliases)?.emoji;
  if (aliasEmoji) {
    return aliasEmoji;
  }

  const key = normalizeTopicKey(topic) || topic;
  return TOPIC_EMOJI_PALETTE[hashString(key) % TOPIC_EMOJI_PALETTE.length];
}

export function isTopicHidden(topic: string, hiddenTopics: string[]) {
  const normalized = normalizeTopicKey(topic);
  return hiddenTopics.includes(normalized);
}
