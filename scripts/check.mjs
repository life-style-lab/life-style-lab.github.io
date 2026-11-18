// Lint articles against the quality rules in CLAUDE.md
import fs from "node:fs";
import path from "node:path";
const dir = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../content/articles");
const banned = ["使ってみた", "試してみた", "実際に使用した", "最強", "絶対に", "100%"];
let bad = 0;
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const src = fs.readFileSync(path.join(dir, f), "utf8");
  const body = src.replace(/^---[\s\S]*?---\n/, "");
  const errs = [];
  if (!/^[a-z0-9-]+\.md$/.test(f)) errs.push("slug must be lowercase a-z0-9-");
  const len = body.replace(/\s/g, "").length;
  if (len < 2500) errs.push(`too short (${len} chars, need 2500+)`);
  const aff = (body.match(/\[\[(shop|amazon|rakuten):|^:::(product|item)/gm) || []).length;
  if (aff > 6) errs.push(`too many affiliate links (${aff})`);
  for (const m of body.matchAll(/^:::item (.+)$/gm)) {
    const [name, asin, src] = m[1].split("|").map((x) => x.trim());
    if (!name || !asin || !src) errs.push(`:::item needs 商品名|ASIN or -|出典URL: ${m[1]}`);
    else if (asin !== "-" && !/^[A-Z0-9]{10}$/.test(asin)) errs.push(`bad ASIN: ${asin}`);
    else if (!/^https?:\/\//.test(src)) errs.push(`item source must be URL: ${src}`);
  }
  if (!/##\s*参考/.test(body)) errs.push("missing ## 参考情報");
  for (const w of banned) if (body.includes(w)) errs.push(`banned phrase: ${w}`);
  if (errs.length) { bad++; console.error(`✗ ${f}\n  - ${errs.join("\n  - ")}`); } else console.log(`✓ ${f} (${len} chars, ${aff} links)`);
}
process.exit(bad ? 1 : 0);
