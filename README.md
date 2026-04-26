# InCampus LLM Wiki

This repository contains the InCampus project wiki and a local web viewer for browsing it.

InCampus is a mobile app concept for reducing isolation in university campus life by helping students find low-pressure opportunities to share ordinary campus moments, such as lunch, coffee breaks, study sessions, sports, and small activities.

## Repository Layout

- `inCampusLLMwiki/` contains the canonical Markdown wiki and raw source archive.
- `inCampusLLMwiki/wiki/` is the maintained source of truth for project requirements, use cases, traceability, decisions, and architecture notes.
- `inCampusLLMwiki/raw/` stores immutable source snapshots and evidence material.
- `wiki-web-viewer/` contains the local WikiOS-based viewer adapted for this project.

The viewer is a convenience layer. The canonical project memory remains the Markdown content in `inCampusLLMwiki/wiki/`.
Its main search is intentionally canonical-only. Raw source files are browsed separately through the local Raw Archive view.

## Run The Local Viewer

Install Node.js first if needed. Then run:

```bash
cd wiki-web-viewer
npm install
npm start
```

Open the viewer at:

```text
http://localhost:5211
```

Stop the server with `Ctrl + C`.

The viewer also exposes a local-only Raw Archive section at:

```text
http://localhost:5211/raw-archive
```

Canonical pages can link to original source material with local `/raw/...` links, for example:

```md
[Original source](/raw/affine/25:04:2026/example.md)
```

## Start Reading

For project context, start with:

```text
inCampusLLMwiki/wiki/index.md
```

For wiki governance and update rules, read:

```text
inCampusLLMwiki/AGENTS.md
```

## Ground Rules

- Keep `inCampusLLMwiki/raw/` snapshots immutable.
- Treat `inCampusLLMwiki/wiki/` as the canonical source for stable project knowledge.
- Do not commit `node_modules`, build output, temporary SQLite indexes, or `.env` files.
- Preserve the original WikiOS license and attribution in `wiki-web-viewer/`.
