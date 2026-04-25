import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("legacy naming audit", () => {
  it("does not contain legacy project identifiers in tracked text files", () => {
    const patterns = [
      ["Ans", "ubpedia"].join(""),
      ["ans", "ubpedia"].join(""),
      ["ANS", "UBPEDIA"].join(""),
      ["enzo", ".local"].join(""),
      ["enzo", "-vault"].join(""),
      ["open", "claw"].join(""),
      ["com", ".enzo"].join(""),
    ];

    if (!existsSync(path.join(process.cwd(), ".git"))) {
      const ignoredDirectories = new Set([
        ".git",
        "coverage",
        "dist",
        "dist-server",
        "node_modules",
      ]);
      const matches: string[] = [];

      function scanDirectory(directory: string) {
        for (const entry of readdirSync(directory, { withFileTypes: true })) {
          if (entry.isDirectory()) {
            if (!ignoredDirectories.has(entry.name)) {
              scanDirectory(path.join(directory, entry.name));
            }
            continue;
          }

          if (!entry.isFile()) {
            continue;
          }

          const filePath = path.join(directory, entry.name);
          if (statSync(filePath).size > 2_000_000) {
            continue;
          }

          const content = readFileSync(filePath, "utf8");
          if (content.includes("\0")) {
            continue;
          }

          for (const pattern of patterns) {
            if (content.includes(pattern)) {
              matches.push(`${path.relative(process.cwd(), filePath)}: ${pattern}`);
            }
          }
        }
      }

      scanDirectory(process.cwd());
      expect(matches).toEqual([]);
      return;
    }

    try {
      const output = execFileSync(
        "git",
        ["grep", "-n", "-I", ...patterns.flatMap((pattern) => ["-e", pattern]), "--", "."],
        {
          cwd: process.cwd(),
          encoding: "utf8",
          stdio: ["ignore", "pipe", "pipe"],
        },
      );

      expect(output.trim()).toBe("");
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 1
      ) {
        expect(true).toBe(true);
        return;
      }

      throw error;
    }
  });
});
