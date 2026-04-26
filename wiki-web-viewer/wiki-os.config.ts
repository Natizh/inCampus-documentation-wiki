import type { WikiOsConfigInput } from "./src/lib/wiki-config";

const config: WikiOsConfigInput = {
  siteTitle: "inCampus",
  tagline:
    "Build the product that helps students turn ordinary moments into shared ones.",
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
    labels: {
      featured: "Focus Docs",
      topConnected: "Shared Context",
      people: "People",
      recentPages: "Latest Notes",
      statsEyebrow: "Project Pulse",
      statsDescription: "Signals from the product memory shaping inCampus.",
    },
  },
  theme: {
    variables: {
      "--background": "#0f1511",
      "--background-tint": "#141b16",
      "--foreground": "#ebf1ea",
      "--card": "#141b16",
      "--card-foreground": "#ebf1ea",
      "--popover": "#171f19",
      "--popover-foreground": "#ebf1ea",
      "--teal": "#7d9885",
      "--teal-soft": "rgba(125, 152, 133, 0.16)",
      "--peach": "#8e775d",
      "--peach-soft": "rgba(142, 119, 93, 0.16)",
      "--lavender": "#5f786a",
      "--lavender-soft": "rgba(95, 120, 106, 0.16)",
      "--primary": "#7d9885",
      "--primary-foreground": "#0f1511",
      "--secondary": "#1b241e",
      "--secondary-foreground": "#dce6dd",
      "--muted": "#171f19",
      "--muted-foreground": "#92a096",
      "--accent": "#202a23",
      "--accent-foreground": "#ebf1ea",
      "--border": "rgba(235, 241, 234, 0.09)",
      "--ring": "rgba(125, 152, 133, 0.52)",
      "--surface": "rgba(18, 24, 20, 0.92)",
      "--surface-raised": "rgba(22, 29, 24, 0.96)",
      "--surface-highlight": "rgba(125, 152, 133, 0.12)",
      "--link": "#9fb6a7",
      "--code-bg": "#111814",
    },
  },
  people: {
    mode: "explicit",
  },
};

export default config;
