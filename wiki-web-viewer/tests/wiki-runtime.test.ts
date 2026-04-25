import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

const originalHome = process.env.HOME;
const originalNodeEnv = process.env.NODE_ENV;

afterEach(() => {
  if (originalHome === undefined) {
    delete process.env.HOME;
  } else {
    process.env.HOME = originalHome;
  }

  delete process.env.WIKI_ROOT;
  delete process.env.WIKIOS_FORCE_WIKI_ROOT;
  delete process.env.WIKIOS_INDEX_DB;
  delete process.env.WIKIOS_SETUP_CONFIG;
  if (originalNodeEnv === undefined) {
    delete process.env.NODE_ENV;
  } else {
    process.env.NODE_ENV = originalNodeEnv;
  }
  vi.doUnmock("../src/server/app-paths");
  vi.resetModules();
});

describe("wiki runtime settings", () => {
  it("persists a saved vault path and reloads it from the local setup config", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const wikiRoot = path.join(tempDir, "vault");
    const expectedHash = createHash("sha1").update(wikiRoot).digest("hex");

    try {
      process.env.HOME = tempDir;
      await mkdir(wikiRoot, { recursive: true });

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");
      await runtime.saveWikiRuntimeConfig({ wikiRoot });

      vi.resetModules();
      const reloadedRuntime = await import("../src/server/wiki-runtime");
      const settings = await reloadedRuntime.resolveWikiRuntimeSettings();
      const status = await reloadedRuntime.getWikiSetupStatus();

      expect(settings).toMatchObject({
        wikiRoot,
        wikiRootSource: "saved",
        setupConfigPath: path.join(tempDir, ".wiki-os", "config.json"),
        indexDbPath: path.join(tempDir, ".wiki-os", "indexes", `${expectedHash}.sqlite`),
      });

      expect(status).toMatchObject({
        configured: true,
        wikiRoot,
        wikiRootSource: "saved",
        hasEnvOverride: false,
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("prefers the saved setup config over WIKI_ROOT after a vault has been chosen", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const savedRoot = path.join(tempDir, "saved-vault");
    const envRoot = path.join(tempDir, "env-vault");

    try {
      process.env.HOME = tempDir;
      await mkdir(savedRoot, { recursive: true });
      await mkdir(envRoot, { recursive: true });

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");
      await runtime.saveWikiRuntimeConfig({ wikiRoot: savedRoot });

      process.env.WIKI_ROOT = envRoot;
      vi.resetModules();
      const reloadedRuntime = await import("../src/server/wiki-runtime");
      const settings = await reloadedRuntime.resolveWikiRuntimeSettings();
      const status = await reloadedRuntime.getWikiSetupStatus();

      expect(settings.wikiRoot).toBe(savedRoot);
      expect(settings.wikiRootSource).toBe("saved");
      expect(status).toMatchObject({
        configured: true,
        wikiRoot: savedRoot,
        wikiRootSource: "saved",
        hasEnvOverride: false,
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("allows an explicit forced env override when WIKIOS_FORCE_WIKI_ROOT is set", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const savedRoot = path.join(tempDir, "saved-vault");
    const forcedRoot = path.join(tempDir, "forced-vault");

    try {
      process.env.HOME = tempDir;
      await mkdir(savedRoot, { recursive: true });
      await mkdir(forcedRoot, { recursive: true });

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");
      await runtime.saveWikiRuntimeConfig({ wikiRoot: savedRoot });

      process.env.WIKIOS_FORCE_WIKI_ROOT = forcedRoot;
      vi.resetModules();
      const reloadedRuntime = await import("../src/server/wiki-runtime");
      const settings = await reloadedRuntime.resolveWikiRuntimeSettings();
      const status = await reloadedRuntime.getWikiSetupStatus();

      expect(settings.wikiRoot).toBe(forcedRoot);
      expect(settings.wikiRootSource).toBe("env");
      expect(status).toMatchObject({
        configured: true,
        wikiRoot: forcedRoot,
        wikiRootSource: "env",
        hasEnvOverride: true,
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("uses the app-relative InCampus wiki root as the default when no override is set", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const defaultRoot = path.join(tempDir, "repo", "inCampusLLMwiki", "wiki");
    const expectedHash = createHash("sha1").update(defaultRoot).digest("hex");

    try {
      process.env.HOME = tempDir;
      process.env.NODE_ENV = "development";
      await mkdir(defaultRoot, { recursive: true });

      vi.doMock("../src/server/app-paths", async () => {
        const actual = await vi.importActual<typeof import("../src/server/app-paths")>(
          "../src/server/app-paths",
        );

        return {
          ...actual,
          getDefaultInCampusWikiRoot: () => defaultRoot,
        };
      });

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");
      const settings = await runtime.resolveWikiRuntimeSettings();
      const status = await runtime.getWikiSetupStatus();

      expect(settings).toMatchObject({
        wikiRoot: defaultRoot,
        selectedWikiRoot: defaultRoot,
        wikiRootSource: "default",
        indexDbPath: path.join(tempDir, ".wiki-os", "indexes", `${expectedHash}.sqlite`),
      });

      expect(status).toMatchObject({
        configured: true,
        wikiRoot: defaultRoot,
        wikiRootSource: "default",
        hasEnvOverride: false,
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("uses the default wiki root instead of a saved parent folder", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const savedRoot = path.join(tempDir, "repo", "inCampusLLMwiki");
    const defaultRoot = path.join(savedRoot, "wiki");

    try {
      process.env.HOME = tempDir;
      process.env.NODE_ENV = "development";
      await mkdir(defaultRoot, { recursive: true });

      vi.doMock("../src/server/app-paths", async () => {
        const actual = await vi.importActual<typeof import("../src/server/app-paths")>(
          "../src/server/app-paths",
        );

        return {
          ...actual,
          getDefaultInCampusWikiRoot: () => defaultRoot,
        };
      });

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");
      await runtime.saveWikiRuntimeConfig({ wikiRoot: savedRoot });

      vi.resetModules();
      const reloadedRuntime = await import("../src/server/wiki-runtime");
      const settings = await reloadedRuntime.resolveWikiRuntimeSettings();
      const status = await reloadedRuntime.getWikiSetupStatus();

      expect(settings.wikiRoot).toBe(defaultRoot);
      expect(settings.wikiRootSource).toBe("default");
      expect(status).toMatchObject({
        configured: true,
        wikiRoot: defaultRoot,
        wikiRootSource: "default",
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("uses the default wiki root instead of a stale saved folder", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const defaultRoot = path.join(tempDir, "repo", "inCampusLLMwiki", "wiki");
    const staleSavedRoot = path.join(tempDir, "repo", "inCampus");

    try {
      process.env.HOME = tempDir;
      process.env.NODE_ENV = "development";
      await mkdir(defaultRoot, { recursive: true });

      vi.doMock("../src/server/app-paths", async () => {
        const actual = await vi.importActual<typeof import("../src/server/app-paths")>(
          "../src/server/app-paths",
        );

        return {
          ...actual,
          getDefaultInCampusWikiRoot: () => defaultRoot,
        };
      });

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");
      await runtime.saveWikiRuntimeConfig({ wikiRoot: staleSavedRoot });

      vi.resetModules();
      const reloadedRuntime = await import("../src/server/wiki-runtime");
      const settings = await reloadedRuntime.resolveWikiRuntimeSettings();
      const status = await reloadedRuntime.getWikiSetupStatus();

      expect(settings.wikiRoot).toBe(defaultRoot);
      expect(settings.wikiRootSource).toBe("default");
      expect(status).toMatchObject({
        configured: true,
        wikiRoot: defaultRoot,
        wikiRootSource: "default",
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("loads person overrides scoped to the active vault", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const firstRoot = path.join(tempDir, "first-vault");
    const secondRoot = path.join(tempDir, "second-vault");

    try {
      process.env.HOME = tempDir;
      await mkdir(firstRoot, { recursive: true });
      await mkdir(secondRoot, { recursive: true });

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");
      await runtime.saveWikiRuntimeConfig({
        wikiRoot: firstRoot,
        personOverridesByVault: {
          [firstRoot]: {
            "Ada Lovelace.md": "person",
          },
          [secondRoot]: {
            "Reading People.md": "not-person",
          },
        },
      });

      const firstSettings = await runtime.resolveWikiRuntimeSettings();
      expect(firstSettings.personOverrides).toEqual({
        "Ada Lovelace.md": "person",
      });

      await runtime.saveWikiRuntimeConfig({
        wikiRoot: secondRoot,
        personOverridesByVault: {
          [firstRoot]: {
            "Ada Lovelace.md": "person",
          },
          [secondRoot]: {
            "Reading People.md": "not-person",
          },
        },
      });

      vi.resetModules();
      const reloadedRuntime = await import("../src/server/wiki-runtime");
      const secondSettings = await reloadedRuntime.resolveWikiRuntimeSettings();

      expect(secondSettings.personOverrides).toEqual({
        "Reading People.md": "not-person",
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("surfaces corrupt local config and requires an explicit repair before replacing it", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const wikiRoot = path.join(tempDir, "vault");
    const setupDir = path.join(tempDir, ".wiki-os");
    const setupConfigPath = path.join(setupDir, "config.json");

    try {
      process.env.HOME = tempDir;
      await mkdir(wikiRoot, { recursive: true });
      await mkdir(setupDir, { recursive: true });
      await writeFile(setupConfigPath, '{"wikiRoot":', "utf8");

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");

      const settings = await runtime.resolveWikiRuntimeSettings();
      const status = await runtime.getWikiSetupStatus();

      expect(settings.wikiRoot).toBeNull();
      expect(settings.wikiRootSource).toBe("none");
      expect(settings.configError).toMatchObject({
        code: "INVALID_JSON",
        path: setupConfigPath,
      });

      expect(status).toMatchObject({
        configured: false,
        wikiRoot: null,
        wikiRootSource: "none",
        configError: {
          code: "INVALID_JSON",
          path: setupConfigPath,
        },
      });

      await expect(runtime.loadWikiRuntimeConfig()).rejects.toMatchObject({
        name: "WikiRuntimeConfigFileError",
      });

      await expect(runtime.saveWikiRuntimeConfig({ wikiRoot })).rejects.toMatchObject({
        name: "WikiRuntimeConfigFileError",
      });

      await runtime.saveWikiRuntimeConfig({ wikiRoot }, { overwriteCorrupt: true });

      vi.resetModules();
      const reloadedRuntime = await import("../src/server/wiki-runtime");
      const repairedSettings = await reloadedRuntime.resolveWikiRuntimeSettings();

      expect(repairedSettings.wikiRoot).toBe(wikiRoot);
      expect(repairedSettings.wikiRootSource).toBe("saved");
      expect(repairedSettings.configError).toBeNull();
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("falls back into setup mode when the saved vault path no longer exists", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "wiki-os-runtime-"));
    const missingWikiRoot = path.join(tempDir, "missing-vault");

    try {
      process.env.HOME = tempDir;

      vi.resetModules();
      const runtime = await import("../src/server/wiki-runtime");
      await runtime.saveWikiRuntimeConfig({ wikiRoot: missingWikiRoot });

      vi.resetModules();
      const reloadedRuntime = await import("../src/server/wiki-runtime");
      const settings = await reloadedRuntime.resolveWikiRuntimeSettings();
      const status = await reloadedRuntime.getWikiSetupStatus();

      expect(settings.wikiRoot).toBeNull();
      expect(settings.selectedWikiRoot).toBe(missingWikiRoot);
      expect(settings.wikiRootSource).toBe("saved");
      expect(settings.configError).toMatchObject({
        code: "INVALID_WIKI_ROOT",
        path: missingWikiRoot,
      });

      expect(status).toMatchObject({
        configured: false,
        wikiRoot: missingWikiRoot,
        wikiRootSource: "saved",
        hasEnvOverride: false,
        configError: {
          code: "INVALID_WIKI_ROOT",
          path: missingWikiRoot,
        },
      });
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});
