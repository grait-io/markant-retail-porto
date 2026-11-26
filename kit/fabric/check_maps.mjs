#!/usr/bin/env node
// Check every module map (context/<module>/context.md) against the repository.
// No AI, no dependencies. Run from the repository root:
//   node context/check_maps.mjs
// Exit code 1 when a map names a path that does not exist, has no `updated:` date,
// or contains something that looks like a secret. Use it before a commit or in CI.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const CONTEXT = join(ROOT, "context");
const SKIP_DIRS = new Set([".git", "node_modules", "dist", "build", "target", ".venv", "venv", "__pycache__"]);
const STALE_DAYS = 90;
const SECRET = /(AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|[a-z][a-z0-9+]*:\/\/[^\s:@/`]+:[^\s@/`]+@|(password|passwd|secret|token|api[_-]?key)\s*[:=]\s*["']?[A-Za-z0-9+/_-]{12,})/i;

if (!existsSync(CONTEXT)) {
  console.log("No context/ folder here. Run this from the repository root.");
  process.exit(1);
}

let allFiles = null;
function repoFiles() {
  if (allFiles) return allFiles;
  allFiles = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(join(dir, entry.name));
      } else {
        allFiles.push(relative(ROOT, join(dir, entry.name)).split(sep).join("/"));
      }
    }
  };
  walk(ROOT);
  return allFiles;
}

function globToRegex(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        re += ".*";
        i++;
        if (glob[i + 1] === "/") i++;
      } else re += "[^/]*";
    } else if (c === "?") re += "[^/]";
    else re += c.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  }
  return new RegExp("^" + re + "$");
}

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (!m) return data;
  let key = null;
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s+-\s+(.*)$/);
    const pair = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (pair) {
      key = pair[1];
      data[key] = pair[2] ? pair[2].trim() : [];
    } else if (item && key && Array.isArray(data[key])) {
      data[key].push(item[1].trim().replace(/^["']|["']$/g, ""));
    }
  }
  return data;
}

let errors = 0;
let warnings = 0;
let maps = 0;
const error = (map, msg) => { errors++; console.log(`FAIL  ${map}: ${msg}`); };
const warn = (map, msg) => { warnings++; console.log(`warn  ${map}: ${msg}`); };

for (const entry of readdirSync(CONTEXT, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = join(CONTEXT, entry.name, "context.md");
  if (!existsSync(file)) continue;
  maps++;
  const map = `context/${entry.name}/context.md`;
  const text = readFileSync(file, "utf8");
  const meta = frontmatter(text);

  // 1. updated: date
  const updated = typeof meta.updated === "string" ? meta.updated : "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(updated)) error(map, "no `updated: YYYY-MM-DD` date");
  else {
    const days = Math.floor((Date.now() - Date.parse(updated)) / 86400000);
    if (days > STALE_DAYS) warn(map, `last updated ${days} days ago`);
  }

  // 2. sources: every pattern must match at least one file
  const sources = Array.isArray(meta.sources) ? meta.sources : [];
  if (sources.length === 0) warn(map, "no `sources:` list, so nobody can tell which code this map covers");
  for (const pattern of sources) {
    if (pattern.includes("<")) { error(map, `sources still has a placeholder: ${pattern}`); continue; }
    const re = globToRegex(pattern.replace(/\/$/, "/**"));
    if (!repoFiles().some((f) => re.test(f))) error(map, `sources pattern matches no file: ${pattern}`);
  }

  // 3. related: local paths must exist
  for (const rel of Array.isArray(meta.related) ? meta.related : []) {
    if (/^(n\/a|https?:|git@)/i.test(rel) || rel.includes("<")) continue;
    if (!existsSync(join(ROOT, rel))) warn(map, `related path not found from here: ${rel}`);
  }

  // 4. every path in backticks must exist
  const body = text.replace(/^---[\s\S]*?---/, "");
  const seen = new Set();
  for (const m of body.matchAll(/`([^`\n]+)`/g)) {
    const token = m[1].trim().replace(/:\d+(-\d+)?$/, "");
    if (!/^[A-Za-z0-9_.\/-]+$/.test(token) || !token.includes("/")) continue; // not a path
    if (token.startsWith("/") || token.toLowerCase() === "n/a") continue; // HTTP route, not a file
    if (token.startsWith("path/to/") || seen.has(token)) continue;
    seen.add(token);
    const top = token.replace(/^\.\//, "").split("/")[0];
    if (!existsSync(join(ROOT, token))) {
      // Top folder unknown: probably a package or route name, not a repository path.
      if (existsSync(join(ROOT, top))) error(map, `path does not exist: ${token}`);
      else warn(map, `not a path in this repository? ${token}`);
    }
    else if (statSync(join(ROOT, token)).isDirectory() && readdirSync(join(ROOT, token)).length === 0)
      warn(map, `folder is empty: ${token}`);
  }

  // 5. secrets
  text.split(/\r?\n/).forEach((line, i) => {
    if (SECRET.test(line)) error(map, `line ${i + 1} looks like a secret. Remove it.`);
  });
}

if (maps === 0) console.log("No maps found (context/<module>/context.md).");
console.log(`${maps} map(s) checked: ${errors} error(s), ${warnings} warning(s).`);
process.exit(errors > 0 ? 1 : 0);
