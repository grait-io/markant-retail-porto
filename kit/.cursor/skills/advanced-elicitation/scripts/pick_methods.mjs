#!/usr/bin/env node
/**
 * Zero-dependency Node 20+ selector for the BMAD Advanced Elicitation method catalog.
 * Ported from bmad-code-org/BMAD-METHOD (MIT License) so Cursor workshops need no Python/uv.
 *
 * Usage:
 *   node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs directions
 *   node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs list --tier core
 *   node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs list --direction wrong
 *   node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs list --all
 *   node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs show 2 20 "Red Team"
 *   node .cursor/skills/advanced-elicitation/scripts/pick_methods.mjs random -n 3 --tier core --spread
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.resolve(__dirname, "../assets/methods.csv");

const DIRECTIONS = {
  wrong: "Find what is wrong",
  missing: "Find what is missing",
  premise: "Challenge the premise",
  simplify: "Simplify or re-pitch",
  future: "Stress against the future",
  "other-side": "Argue the other side",
};

function parseCsvLine(line) {
  const fields = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      fields.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  fields.push(cur.trim());
  return fields;
}

function loadRows() {
  const raw = fs.readFileSync(CSV_PATH, "utf8").replace(/^\uFEFF/, "");
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const header = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const vals = parseCsvLine(line);
    const row = {};
    header.forEach((h, i) => {
      row[h] = vals[i] ?? "";
    });
    return row;
  });
}

function namesOf(r) {
  const aliases = (r.aliases || "")
    .split(";")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return [r.method_name.toLowerCase(), ...aliases];
}

function fmtRow(r, full = false) {
  if (full) {
    return `${r.num}\t${r.direction}\t${r.method_name}\t${r.description}\tform: ${r.form}\t${r.tier}`;
  }
  return `${r.num}\t${r.direction}\t${r.method_name}\t${r.description}\t${r.tier}`;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const args = process.argv.slice(2);
const cmd = args[0];
const rows = loadRows();

if (!cmd || cmd === "-h" || cmd === "--help") {
  console.log(
    "Commands: directions | list [--direction D] [--tier core|more] [--all] | show <num-or-name>... | random [-n 3] [--tier core] [--direction D] [--spread]"
  );
  process.exit(0);
}

if (cmd === "directions") {
  for (const [key, label] of Object.entries(DIRECTIONS)) {
    const core = rows.filter((r) => r.direction === key && r.tier === "core").length;
    const more = rows.filter((r) => r.direction === key && r.tier === "more").length;
    console.log(`${key}\t${label}\t${core} core\t${more} more`);
  }
  process.exit(0);
}

if (cmd === "list") {
  const dirs = [];
  let tier = null;
  let all = false;
  for (let i = 1; i < args.length; i++) {
    if (args[i] === "--direction" && args[i + 1]) dirs.push(args[++i].toLowerCase());
    else if (args[i] === "--tier" && args[i + 1]) tier = args[++i].toLowerCase();
    else if (args[i] === "--all") all = true;
  }
  if (!dirs.length && !tier && !all) {
    console.error("error: list needs --direction, --tier, or --all (use `directions` for the cheap map)");
    process.exit(2);
  }
  let out = rows;
  if (dirs.length) out = out.filter((r) => dirs.includes(r.direction));
  if (tier) out = out.filter((r) => r.tier === tier);
  out.forEach((r) => console.log(fmtRow(r, false)));
  process.exit(0);
}

if (cmd === "show") {
  const queries = args.slice(1);
  if (!queries.length) {
    console.error("error: show requires at least one method number or name");
    process.exit(2);
  }
  const byKey = new Map();
  for (const r of rows) byKey.set(r.method_name.toLowerCase(), r);
  for (const r of rows) {
    for (const a of namesOf(r).slice(1)) if (!byKey.has(a)) byKey.set(a, r);
    if (r.num && !byKey.has(r.num)) byKey.set(r.num, r);
  }
  let foundAny = false;
  for (const q of queries) {
    const hit = byKey.get(q.trim().toLowerCase());
    if (hit) {
      console.log(fmtRow(hit, true));
      foundAny = true;
    } else {
      console.error(`# not found: ${q}`);
    }
  }
  process.exit(foundAny ? 0 : 1);
}

if (cmd === "random") {
  let n = 1;
  let tier = null;
  const dirs = [];
  const excludes = new Set();
  let spread = false;
  for (let i = 1; i < args.length; i++) {
    if (args[i] === "-n" && args[i + 1]) n = Math.max(0, Number(args[++i]) || 1);
    else if (args[i] === "--tier" && args[i + 1]) tier = args[++i].toLowerCase();
    else if (args[i] === "--direction" && args[i + 1]) dirs.push(args[++i].toLowerCase());
    else if (args[i] === "--exclude" && args[i + 1]) excludes.add(args[++i].toLowerCase());
    else if (args[i] === "--spread") spread = true;
  }
  let pool = rows;
  if (dirs.length) pool = pool.filter((r) => dirs.includes(r.direction));
  if (tier) pool = pool.filter((r) => r.tier === tier);
  if (excludes.size) pool = pool.filter((r) => !excludes.has(r.method_name.toLowerCase()));

  let picks = [];
  if (spread) {
    const buckets = shuffle(
      Object.keys(DIRECTIONS)
        .map((d) => shuffle(pool.filter((r) => r.direction === d)))
        .filter((b) => b.length > 0)
    );
    while (buckets.length && picks.length < n) {
      for (let i = buckets.length - 1; i >= 0 && picks.length < n; i--) {
        picks.push(buckets[i].pop());
        if (!buckets[i].length) buckets.splice(i, 1);
      }
    }
  } else {
    picks = shuffle(pool).slice(0, n);
  }
  picks.forEach((r) => console.log(fmtRow(r, true)));
  process.exit(picks.length ? 0 : 1);
}

console.error(`error: unknown command '${cmd}'`);
process.exit(2);
