import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// This little program loads the one-word entry from the file next to it.
// It checks the word is really one word and short enough to count.
// Then it copies that same word into the output folder the grader gave us.
// If anything looks wrong, it stops with an error instead of writing.

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "entry.txt"), "utf8");

if (entry.length === 0 || entry.trim().length === 0) {
  console.error("entry is empty or only whitespace");
  process.exit(1);
}
if (entry.length > 20) {
  console.error("entry is longer than 20 characters");
  process.exit(1);
}
if (/\s/.test(entry)) {
  console.error("entry must be a single word (no whitespace)");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
