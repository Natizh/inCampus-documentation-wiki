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
  people: {
    mode: "explicit",
  },
};

export default config;
