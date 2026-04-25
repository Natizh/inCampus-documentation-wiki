# InCampus Project Wiki

This folder is the long-lived project wiki for the InCampus mobile app.
It can be opened as an Obsidian vault or browsed through the local viewer in `../wiki-web-viewer/`.

InCampus is a student-team project for a mobile app that helps reduce isolation in university campus life by making ordinary shared moments easier to find. The current rollout focus is Tongji University, Jiading Campus.

## How This Repository Works

The team uses AFFiNE as the live collaborative workspace.
AFFiNE is where weekly documents are drafted, discussed, and updated.

This repository preserves selected AFFiNE work in two layers:

- `raw/` stores immutable snapshots exported from AFFiNE and other source material.
- `wiki/` stores derived, structured project knowledge maintained from those snapshots.

The raw layer is the source record.
The wiki layer is the navigable project memory.

## Folder Map

```text
raw/
  affine/       Dated AFFiNE export batches.
  assets/       Exported or downloaded attachments when needed.

wiki/
  index.md      Content-oriented catalog and starting point.
  log.md        Append-only chronological wiki log.
  project/      Overview, decisions, and weekly continuity.
  requirements/ Use cases, narratives, and traceability.
  planning/     Team workflow and wiki maintenance process.
```

## Weekly AFFiNE Snapshot Flow

1. Work in AFFiNE during the week.
2. Export selected documents at a checkpoint.
3. Place the export in `raw/affine/YYYY-MM-DD-short-batch-name/`.
4. Do not edit old files in `raw/`.
5. Ask Codex to ingest the new snapshot.
6. Codex updates the relevant pages in `wiki/`, updates `wiki/index.md`, and appends to `wiki/log.md`.

If an AFFiNE document changes later, export a new dated snapshot instead of overwriting the old one.

## Navigation

Start with [[wiki/index|Wiki Index]].
It links to the main project pages and should stay short enough to scan.

The most important current pages are:
- [[wiki/project/overview|Project Overview]]
- [[wiki/requirements/use-cases|Use Cases]]
- [[wiki/requirements/use-case-narratives|Use Case Narratives]]
- [[wiki/requirements/traceability|Traceability]]
- [[wiki/planning/workflow|Workflow]]

## Current Phase

The project is currently in the use-case phase.

Current priorities:
- use cases
- use case narratives
- traceability among user stories, functional requirements, non-functional requirements, and use cases
- preserving decisions and unresolved points across weekly iterations

## Ground Rules

- Do not invent project facts.
- Mark undecided items as unresolved.
- Keep raw snapshots immutable.
- Keep the wiki concise, structured, and useful.
- Use `wiki/index.md` as the first navigation point.
- Use `wiki/log.md` as an append-only record of important wiki work.
