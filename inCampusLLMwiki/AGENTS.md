# AGENTS.md

## Purpose

This repository is the long-lived project wiki for the InCampus mobile app.
It supports the team from requirements analysis through design, planning, implementation, and later project maintenance.

The repository is both:
- the Obsidian vault
- the VS Code workspace

AFFiNE is the live collaborative workspace for weekly work and shared editing.
This repository turns selected AFFiNE exports into stable project memory.

## Project Identity

InCampus is a mobile app designed to reduce isolation in university campus life.
It helps students find low-pressure opportunities to share ordinary campus moments with nearby students, such as lunch, coffee breaks, study sessions, sports, and small campus activities.

Product stance:
- InCampus is not a dating app.
- The product must feel local, simple, believable, safe, and easy to use.
- The current rollout focus is Tongji University, Jiading Campus.
- The project is developed by a student team and will evolve from requirements analysis to full app design and development.

## Source Model

### `raw/`

`raw/` contains immutable exported source material.
Codex and other assistants may read from this directory, but must not rewrite old snapshots.

Expected structure:
- `raw/affine/` stores dated AFFiNE export batches.
- `raw/assets/` stores exported or downloaded attachments when needed.

If an AFFiNE document changes, add a new dated snapshot instead of overwriting the old one.
Old raw snapshots are part of the project record.

### `wiki/`

`wiki/` contains derived, structured, updated project knowledge synthesized from raw snapshots and explicit team decisions.

The wiki is not a dump of temporary notes.
It should contain stable pages that help the team understand requirements, use cases, traceability, decisions, workflow, and later implementation context.

Wiki pages may be revised as newer raw snapshots appear.
When newer material supersedes older understanding, update the derived wiki and preserve the raw history.

## Agent Roles

### Codex

Codex is the primary wiki writer and maintainer.

Codex may:
- create and update wiki pages
- maintain the wiki structure
- update `wiki/index.md`
- append entries to `wiki/log.md`
- ingest new raw snapshots into stable wiki knowledge
- update cross-references and traceability tables
- identify contradictions, unresolved points, and stale claims
- create missing wiki pages when clearly justified by project needs

Codex should keep the wiki pragmatic and maintainable.
Do not introduce databases, embeddings, RAG infrastructure, or autonomous subagent workflows unless the user explicitly asks for them later.

### GitHub Copilot

Copilot is a secondary helper.

Copilot may:
- help draft local text
- help format Markdown
- help with code and documentation tasks
- suggest edits when explicitly used by the team

Copilot must not become the governing agent of the wiki.
Copilot should not manage `wiki/index.md`, `wiki/log.md`, or wiki structure unless the user explicitly asks.

### Trae

Trae is a secondary non-governing assistant.

Trae may:
- read repository context
- answer targeted questions
- help with local secondary tasks
- draft candidate text when explicitly asked

Trae must not:
- manage `wiki/index.md`
- manage `wiki/log.md`
- redefine wiki structure
- create autonomous governance roles
- create or assume a "Librarian", "Archivist", or similar workflow unless explicitly requested by the user

## Governance Files

### `wiki/index.md`

`wiki/index.md` is the content-oriented catalog of the wiki.
It is the first file Codex should read before answering project questions or making wiki updates.

Each listed page should have:
- a link
- a one-line description
- an optional status or note

Update the index whenever a wiki page is created, removed, renamed, or materially changed.
Keep it concise enough to scan.

Only Codex should maintain this file unless the user explicitly says otherwise.

### `wiki/log.md`

`wiki/log.md` is the append-only chronological project wiki log.

Use it to record:
- AFFiNE snapshot ingests
- important wiki updates
- traceability updates
- lint or health-check passes
- structural changes
- notable answered questions that are filed back into the wiki

Log entries should use this heading pattern:

```markdown
## [YYYY-MM-DD] type | Short title
```

Do not rewrite old log history except to fix obvious formatting mistakes.

Only Codex should maintain this file unless the user explicitly says otherwise.

## Workflow For Updated AFFiNE Documents

AFFiNE documents are live working documents.
They may change from week to week.

When the team wants to preserve a checkpoint:
1. Export selected AFFiNE documents.
2. Place the exported files in `raw/affine/YYYY-MM-DD-short-batch-name/`.
3. Treat that batch as immutable.
4. Ask Codex to ingest the new batch.
5. Codex reads the new raw snapshot, compares it with existing wiki understanding where useful, and updates the relevant derived pages in `wiki/`.
6. Codex updates `wiki/index.md`.
7. Codex appends a concise entry to `wiki/log.md`.

If a new snapshot contradicts older material:
- preserve both raw snapshots
- update the wiki to show the latest stable understanding
- mark unresolved contradictions clearly when the team has not decided
- record important resolution decisions in `wiki/project/decisions.md`

Do not assume AFFiNE exports are complete or lossless.
If a source is partial, ambiguous, or inconsistent, state that clearly in the wiki.

## Current Project Phase

The team is currently in the use-case phase.

Current documentation priorities:
- use cases
- use case narratives
- traceability among user stories, functional requirements, non-functional requirements, and use cases
- requirements coherence
- project decisions
- weekly status continuity

## Writing Rules

- Do not invent project facts.
- When something is not decided, label it as unresolved.
- Prefer stable, reusable pages over chat-like notes.
- Keep pages concise but structured.
- Use Markdown that works well in Obsidian and VS Code.
- Prefer relative Markdown links inside `wiki/`.
- Preserve traceability whenever requirements are updated.
- When updating a wiki page because of new raw material, reflect the latest stable understanding and cite or name the source snapshot when available.
- Avoid unnecessary complexity.

## Query Workflow

When answering project questions:
1. Read `wiki/index.md` first.
2. Read the relevant wiki pages.
3. Search `raw/` only when the wiki is insufficient, when source verification is needed, or when ingesting new snapshots.
4. Answer with clear status labels such as known, inferred, unresolved, or needs source.
5. If the answer produces durable project knowledge, offer to file it back into the wiki or update the relevant page directly when asked.

## Wiki Health Checks

Periodic lint passes may look for:
- stale claims
- contradictions between pages
- orphan pages
- missing cross-references
- missing use case narratives
- traceability gaps
- requirements without use case support
- use cases without linked requirements

Keep lint results actionable and lightweight.
