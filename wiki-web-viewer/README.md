# InCampus WikiOS Viewer

This folder contains the local documentation viewer for the InCampus Software Engineering project.
It is a personalized InCampus version of WikiOS, adapted so the team can browse, search, and inspect the project wiki from a local web app.

WikiOS was originally built by [Ansub](http://twitter.com/ansubkhan), co-founder of [Supafast](https://withsupafast.com/?utm_source=github&utm_medium=readme&utm_campaign=wikios). This adaptation does not replace or claim ownership of the original WikiOS project. Keep `LICENSE` and this attribution with the viewer.

## What This Viewer Is

The viewer runs on your computer. It uses the existing Node/Fastify server and a local SQLite index. 

In the full project repository:

- `inCampusLLMwiki/wiki/` is the canonical maintained project wiki and source of truth.
- `inCampusLLMwiki/raw/` is the raw archive/source material. It should stay separate from normal wiki browsing and search.
- `wiki-web-viewer/` is only the local viewer software.

By default, this viewer opens the canonical wiki at:

```text
../inCampusLLMwiki/wiki
```

That path is resolved relative to this `wiki-web-viewer` folder, so teammates should not need to configure an absolute path on their own computer.

The viewer also has a `Raw Archive` section for local browsing of:

```text
../inCampusLLMwiki/raw
```

Raw files remain original source/evidence material. They are not indexed into the main wiki search.

## Requirements

Install Node.js before running the viewer. Node.js includes `npm`.

If you do not already have Node.js, install the current LTS version from:

```text
https://nodejs.org/
```

After installing, close and reopen your terminal, then check:

```bash
node --version
npm --version
```

## Start The Viewer

From the repository root:

```bash
cd wiki-web-viewer
npm install
npm start
```

`npm start` builds the viewer and starts the local server. It normally opens your browser automatically.

If the browser does not open, go to:

```text
http://localhost:5211
```

To stop the server, click the terminal window that is running it and press:

```text
Ctrl + C
```

## If Port 5211 Is Busy

If you see an error saying the port is already in use, another local process is using `5211`.

Use a different port for this run:

```bash
PORT=5212 npm start
```

Then open:

```text
http://localhost:5212
```

## Refresh After Wiki Changes

After pulling new repository changes or after a new wiki ingest:

1. Stop the viewer with `Ctrl + C`.
2. Run `npm start` again.
3. Open the viewer in the browser.

The viewer also has a refresh/reindex control in the top bar next to the page count. Use it when the server is already running and you want the local index to pick up recent Markdown changes.

The watcher and manual reindex features are still useful for local teammates, so they are intentionally kept. The setup/change-vault screens are fallback controls for unusual cases; normal InCampus use should rely on the default `../inCampusLLMwiki/wiki` root.

## Optional Environment Settings

You usually do not need a `.env` file.

Use `.env.example` only as a reference. If you copy it to `.env`, do not commit `.env`.

Useful variables:

- `WIKI_ROOT` bootstraps a different wiki folder when no saved setup is present.
- `WIKIOS_FORCE_WIKI_ROOT` forces a temporary wiki root for one process.
- `PORT` changes the local server port.
- `WIKIOS_INDEX_DB` changes where the local SQLite index is stored.
- `WIKIOS_OPEN_BROWSER=0` stops the server from opening the browser automatically.

## Do Not Commit These Files

Do not commit local dependencies, build output, temporary indexes, or secrets:

- `node_modules/`
- `dist/`
- `dist-server/`
- `*.tsbuildinfo`
- SQLite index/temp files such as `*.sqlite`, `*.sqlite-wal`, `*.sqlite-shm`, and `*.db`
- `.env`

The root `.gitignore` and this folder's `.gitignore` should keep these out of normal commits.

## Git Workflow For The Team

The intended project repository should contain both:

- `inCampusLLMwiki/`
- `wiki-web-viewer/`

The viewer should be tracked as normal files inside the main repository, not accidentally as a submodule.

### First Publication Of The Full Repository

Before the first push, check whether this viewer is still its own nested Git checkout:

```bash
ls -la wiki-web-viewer | grep .git
```

If `.git` appears and the team wants one single repository, do not delete it casually. Move it aside as a backup:

```bash
mv wiki-web-viewer/.git /tmp/wiki-web-viewer-inner-git-backup
```

After that, `wiki-web-viewer` becomes normal files tracked by the main repository. Preserve:

- `wiki-web-viewer/LICENSE`
- this README's original WikiOS attribution

Then check what Git plans to commit:

```bash
git status
```

Make sure `node_modules`, build output, temporary SQLite files, and `.env` are not listed.

### After Every New Wiki Ingest

Use this simple rhythm:

```bash
git pull
cd wiki-web-viewer
npm install
npm start
```

Check the viewer locally. Then commit and push the updated wiki/archive material and any intentional viewer changes:

```bash
cd ..
git status
git add inCampusLLMwiki wiki-web-viewer
git commit -m "Update InCampus wiki"
git push
```

Adjust the commit message to describe the actual ingest or update.

## Raw Archive Principle

`inCampusLLMwiki/raw/` is source/evidence material, not the main wiki. Do not clean, rewrite, or move old raw snapshots while using the viewer. Main navigation and search stay focused on `inCampusLLMwiki/wiki/`.

Use the `Raw Archive` button in the viewer to browse raw folders, preview readable files, inspect images/PDFs, or open unsupported binaries. Canonical pages can link to raw material with local-only links:

```md
[Original source](/raw/affine/25:04:2026/example.md)
```

The `/raw/...` route is served by the local Node/Fastify viewer and is constrained to `inCampusLLMwiki/raw/`; it is not a GitHub Pages or static export feature.

## Useful Commands

```bash
npm run build
npm run test
npm run serve
```

`npm run serve` expects that `npm run build` has already created `dist/` and `dist-server/`.

## License

MIT. See `LICENSE`.
