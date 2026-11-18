// Zero-config static site generator for the affiliate blog.
// content/articles/*.md (with --- frontmatter ---) -> dist/
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const cfg = JSON.parse(fs.readFileSync(path.join(ROOT, "site.config.json"), "utf8"));
const OUT = path.join(ROOT, "dist");
const BP = (process.env.BASE_PATH ?? cfg.basePath).replace(/\/$/, "");
const BASE_URL = (process.env.BASE_URL ?? cfg.baseUrl).replace(/\/$/, "");
const AMAZON_TAG = process.env.AMAZON_TAG || cfg.affiliate.amazonTag;
const RAKUTEN_ID = process.env.RAKUTEN_AFFILIATE_ID || cfg.affiliate.rakutenAffiliateId;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const url = (p) => `${BP}${p}`;

// ---------- frontmatter ----------
function parseFront(src, file) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`frontmatter missing: ${file}`);
  const data = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (v.startsWith("[") && v.endsWith("]")) v = v.slice(1, -1).split(",").map((x) => x.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    else v = v.replace(/^["']|["']$/g, "");
    data[k] = v;
  }
  for (const req of ["title", "date", "category", "description"]) if (!data[req]) throw new Error(`${file}: "${req}" is required`);
  if (!cfg.categories[data.category]) throw new Error(`${file}: unknown category "${data.category}"`);
  return { data, body: m[2] };
}

// ---------- affiliate shortcodes ----------
// [[amazon:検索キーワード|表示テキスト]]  [[rakuten:検索キーワード|表示テキスト]]
// [[shop:検索キーワード]] -> Amazon / 楽天 の両ボタン
function amazonUrl(q) {
  const u = new URL("https://www.amazon.co.jp/s");
  u.searchParams.set("k", q);
  if (AMAZON_TAG) u.searchParams.set("tag", AMAZON_TAG);
  return u.toString();
}
function rakutenUrl(q) {
  const search = `https://search.rakuten.co.jp/search/mall/${encodeURIComponent(q)}/`;
  if (!RAKUTEN_ID) return search;
  return `https://hb.afl.rakuten.co.jp/hgc/${RAKUTEN_ID}/?pc=${encodeURIComponent(search)}&m=${encodeURIComponent(search)}`;
}
let affiliateCount = 0;
function shortcodes(md) {
  return md.replace(/\[\[(amazon|rakuten|shop):([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_, kind, q, label) => {
    affiliateCount++;
    q = q.trim();
    const a = `<a class="btn btn-amazon" href="${esc(amazonUrl(q))}" rel="sponsored noopener" target="_blank">Amazonで${esc(label || q)}を探す</a>`;
    const r = `<a class="btn btn-rakuten" href="${esc(rakutenUrl(q))}" rel="sponsored noopener" target="_blank">楽天市場で${esc(label || q)}を探す</a>`;
    if (kind === "amazon") return a;
    if (kind === "rakuten") return r;
    return `<div class="shop-box"><p class="shop-q">${esc(label || q)}</p>${a}${r}</div>`;
  });
}

// ---------- layout ----------
const CSS = fs.readFileSync(path.join(ROOT, "static", "style.css"), "utf8");
function layout({ title, description, canonical, body, jsonld, ogType = "website" }) {
  const full = title ? `${title} | ${cfg.title}` : `${cfg.title} | ${cfg.tagline}`;
  const nav = Object.entries(cfg.categories).map(([k, v]) => `<a href="${url(`/category/${k}/`)}">${esc(v)}</a>`).join("");
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(full)}</title><meta name="description" content="${esc(description || cfg.description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(description || cfg.description)}">
<meta property="og:type" content="${ogType}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:site_name" content="${esc(cfg.title)}">
<meta name="twitter:card" content="summary">
<link rel="alternate" type="application/rss+xml" title="${esc(cfg.title)}" href="${url("/feed.xml")}">
<style>${CSS}</style>${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head><body>
<header class="site-header"><div class="wrap"><a class="logo" href="${url("/")}">${esc(cfg.title)}</a><p class="tagline">${esc(cfg.tagline)}</p></div>
<nav class="cats"><div class="wrap">${nav}</div></nav></header>
<main class="wrap">${body}</main>
<footer class="site-footer"><div class="wrap">
<p><a href="${url("/about/")}">運営者情報</a> ・ <a href="${url("/privacy/")}">プライバシーポリシー・免責事項</a> ・ <a href="${url("/feed.xml")}">RSS</a></p>
<p class="small">当サイトはアフィリエイトプログラム（Amazonアソシエイト等）に参加しており、記事内のリンクから商品が購入されると運営者に紹介料が支払われる場合があります。</p>
<p class="small">© ${new Date().getFullYear()} ${esc(cfg.title)}</p></div></footer>
</body></html>`;
}

function card(a) {
  return `<article class="card"><a href="${url(`/articles/${a.slug}/`)}"><span class="cat">${esc(cfg.categories[a.category])}</span>
<h2>${esc(a.title)}</h2><p>${esc(a.description)}</p><time datetime="${a.date}">${a.date.slice(0, 10)}</time></a></article>`;
}

// ---------- build ----------
fs.rmSync(OUT, { recursive: true, force: true });
const write = (p, s) => { const f = path.join(OUT, p); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, s); };

const dir = path.join(ROOT, "content", "articles");
const now = new Date();
const articles = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
  const { data, body } = parseFront(fs.readFileSync(path.join(dir, f), "utf8"), f);
  return { ...data, slug: f.replace(/\.md$/, ""), body, tags: Array.isArray(data.tags) ? data.tags : [] };
}).filter((a) => a.draft !== "true" && new Date(a.date) <= now)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const slugs = new Set();
for (const a of articles) {
  if (slugs.has(a.slug)) throw new Error(`duplicate slug ${a.slug}`);
  slugs.add(a.slug);
  affiliateCount = 0;
  const html = marked.parse(shortcodes(a.body));
  const hasAff = affiliateCount > 0;
  const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 4);
  const canonical = `${BASE_URL}/articles/${a.slug}/`;
  const body = `<article class="post">
${hasAff ? `<p class="pr-label">PR｜この記事にはアフィリエイトリンク（広告）が含まれます</p>` : ""}
<p class="crumbs"><a href="${url("/")}">ホーム</a> › <a href="${url(`/category/${a.category}/`)}">${esc(cfg.categories[a.category])}</a></p>
<h1>${esc(a.title)}</h1>
<p class="meta"><time datetime="${a.date}">公開 ${a.date.slice(0, 10)}</time>${a.updated ? ` ・ 更新 ${a.updated.slice(0, 10)}` : ""} ・ ${esc(cfg.author)}</p>
<div class="content">${html}</div>
</article>
${related.length ? `<section class="related"><h2>関連記事</h2><div class="grid">${related.map(card).join("")}</div></section>` : ""}`;
  write(`articles/${a.slug}/index.html`, layout({
    title: a.title, description: a.description, canonical, body, ogType: "article",
    jsonld: { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, datePublished: a.date, dateModified: a.updated || a.date, author: { "@type": "Organization", name: cfg.author } },
  }));
}

write("index.html", layout({ canonical: `${BASE_URL}/`, body: `<section class="hero"><h1>${esc(cfg.tagline)}</h1><p>${esc(cfg.description)}</p></section>
<h2 class="section-title">新着記事</h2><div class="grid">${articles.slice(0, 30).map(card).join("")}</div>` }));

for (const [k, v] of Object.entries(cfg.categories)) {
  const list = articles.filter((a) => a.category === k);
  write(`category/${k}/index.html`, layout({ title: v, canonical: `${BASE_URL}/category/${k}/`, description: `${v}に関する記事一覧`,
    body: `<h1 class="section-title">${esc(v)}</h1>${list.length ? `<div class="grid">${list.map(card).join("")}</div>` : "<p>記事を準備中です。</p>"}` }));
}

for (const page of ["about", "privacy"]) {
  const src = fs.readFileSync(path.join(ROOT, "content", `${page}.md`), "utf8").replaceAll("{{SITE}}", cfg.title).replaceAll("{{CONTACT}}", cfg.contactUrl);
  const [, t] = src.match(/^# (.+)$/m);
  write(`${page}/index.html`, layout({ title: t, canonical: `${BASE_URL}/${page}/`, body: `<article class="post"><div class="content">${marked.parse(src)}</div></article>` }));
}

write("404.html", layout({ title: "ページが見つかりません", canonical: `${BASE_URL}/404.html`, body: `<h1>ページが見つかりません</h1><p><a href="${url("/")}">トップへ戻る</a></p>` }));

const pages = ["/", ...articles.map((a) => `/articles/${a.slug}/`), ...Object.keys(cfg.categories).map((k) => `/category/${k}/`), "/about/", "/privacy/"];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${BASE_URL}${p}</loc></url>`).join("")}</urlset>`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`);
write("feed.xml", `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(cfg.title)}</title><link>${BASE_URL}/</link><description>${esc(cfg.description)}</description>
${articles.slice(0, 20).map((a) => `<item><title>${esc(a.title)}</title><link>${BASE_URL}/articles/${a.slug}/</link><guid>${BASE_URL}/articles/${a.slug}/</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`).join("\n")}
</channel></rss>`);
write(".nojekyll", "");

console.log(`built ${articles.length} articles -> dist/  (amazonTag: ${AMAZON_TAG ? "set" : "NOT SET"}, rakuten: ${RAKUTEN_ID ? "set" : "NOT SET"})`);
