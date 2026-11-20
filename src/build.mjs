// Mobile-first static site generator for the affiliate blog.
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

const CAT_STYLE = {
  desk: { c1: "#2a9d8f", c2: "#1d6f66", icon: "🪑" },
  monitor: { c1: "#3d7cc9", c2: "#28558f", icon: "🖥️" },
  lighting: { c1: "#e9a23b", c2: "#b9741a", icon: "💡" },
  audio: { c1: "#8a6fd1", c2: "#5e479e", icon: "🎧" },
  health: { c1: "#e07a7a", c2: "#b24f5a", icon: "🧘" },
  productivity: { c1: "#4caf7a", c2: "#2f7f52", icon: "⏱️" },
};
const catStyle = (k) => CAT_STYLE[k] || CAT_STYLE.desk;

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

// ---------- affiliate links ----------
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
const btnAmazon = (q) => `<a class="cta cta-amazon" href="${esc(amazonUrl(q))}" rel="sponsored noopener" target="_blank">Amazonで見る</a>`;
const btnRakuten = (q) => `<a class="cta cta-rakuten" href="${esc(rakutenUrl(q))}" rel="sponsored noopener" target="_blank">楽天市場で見る</a>`;
const ctaBlock = (q, micro = "最新の価格・在庫をチェック") => `<div class="cta-wrap"><p class="micro">＼ ${esc(micro)} ／</p>${btnAmazon(q)}${btnRakuten(q)}</div>`;

// ---------- markdown extensions ----------
// Blocks are replaced with placeholders so their HTML survives marked untouched.
let slots = [];
let affiliateCount = 0;
const slot = (html) => { slots.push(html); return `\n\n<!--SLOT${slots.length - 1}-->\n\n`; };
const AVATARS = { reader: { icon: "🙋", name: "読者" }, writer: { icon: "🧑‍💻", name: "編集部" } };

function renderMd(md) {
  // ::: containers (one level of nesting supported by recursion on inner content)
  md = md.replace(/^:::(\w+)[ \t]*(.*)\n([\s\S]*?)^:::[ \t]*$/gm, (_, type, arg, inner) => {
    arg = arg.trim();
    const body = () => renderMd(inner);
    switch (type) {
      case "point": case "warn": case "memo": case "check": {
        const label = arg || { point: "ポイント", warn: "注意", memo: "メモ", check: "チェックリスト" }[type];
        return slot(`<div class="box box-${type}"><p class="box-title">${esc(label)}</p><div class="box-body">${body()}</div></div>`);
      }
      case "summary":
        return slot(`<div class="summary"><p class="summary-title">${esc(arg || "この記事の結論")}</p>${body()}</div>`);
      case "reader": case "writer": {
        const a = AVATARS[type];
        return slot(`<div class="balloon balloon-${type}"><div class="avatar"><span>${a.icon}</span><small>${esc(arg || a.name)}</small></div><div class="says">${body()}</div></div>`);
      }
      case "product": {
        // :::product <rank>|<商品カテゴリ名>|<検索キーワード>
        const [rank, name, q] = arg.split("|").map((s) => s.trim());
        affiliateCount++;
        return slot(`<section class="product">${rank && rank !== "-" ? `<span class="rank rank-${esc(rank)}">${esc(rank)}</span>` : ""}
<h3 class="product-name">${esc(name)}</h3><div class="product-body">${body()}</div>${ctaBlock(q || name)}</section>`);
      }
      case "figure": {
        // :::figure キャプション  +  raw <svg>...</svg>
        const svg = inner.trim().replace(/<script[\s\S]*?<\/script>/gi, "").replace(/\son\w+="[^"]*"/gi, "");
        if (!/^<svg[\s\S]*<\/svg>$/.test(svg)) throw new Error(`:::figure must contain a single <svg>: ${arg}`);
        return slot(`<figure class="fig">${svg.replace("<svg", `<svg role="img" aria-label="${esc(arg)}"`)}${arg ? `<figcaption>${esc(arg)}</figcaption>` : ""}</figure>`);
      }
      case "item": {
        // :::item 商品名|ASIN または -|出典URL（メーカー公式の仕様ページ）
        const [name, asin, src] = arg.split("|").map((x) => x.trim());
        affiliateCount++;
        const amz = asin && asin !== "-" ? `https://www.amazon.co.jp/dp/${encodeURIComponent(asin)}${AMAZON_TAG ? `?tag=${encodeURIComponent(AMAZON_TAG)}` : ""}` : amazonUrl(name);
        return slot(`<section class="item"><p class="item-label">注目モデル</p><h3 class="item-name">${esc(name)}</h3>
<div class="item-body">${body()}</div>${src ? `<p class="item-src">仕様の出典：<a href="${esc(src)}" target="_blank" rel="noopener">メーカー公式情報</a>（執筆時点。最新情報は販売ページでご確認ください）</p>` : ""}
<div class="cta-wrap"><p class="micro">＼ 価格・レビューをチェック ／</p><a class="cta cta-amazon" href="${esc(amz)}" rel="sponsored noopener" target="_blank">Amazonで見る</a>${btnRakuten(name)}</div></section>`);
      }
      default:
        return inner;
    }
  });
  // inline shortcodes
  md = md.replace(/\[\[(amazon|rakuten|shop):([^|\]]+)(?:\|([^\]]+))?\]\]/g, (_, kind, q, label) => {
    affiliateCount++;
    q = q.trim();
    if (kind === "amazon") return btnAmazon(q);
    if (kind === "rakuten") return btnRakuten(q);
    return slot(`<div class="shop-box"><p class="shop-q">${esc(label || q)}</p>${ctaBlock(q, "人気モデルを比較する")}</div>`);
  });
  md = md.replace(/==([^=\n]+)==/g, '<mark>$1</mark>');
  return marked.parse(md);
}
function render(md) {
  slots = [];
  let html = renderMd(md);
  for (let i = 0; i < 20 && /<!--SLOT\d+-->/.test(html); i++) html = html.replace(/<!--SLOT(\d+)-->/g, (_, n) => slots[+n]);
  // tables: scroll wrapper
  html = html.replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, "</table></div>");
  // headings: ids + toc
  const toc = [];
  let n = 0;
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, lv, inner) => {
    const id = `s${++n}`;
    toc.push({ lv: +lv, id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h${lv} id="${id}">${inner}</h${lv}>`;
  });
  return { html, toc };
}

// ---------- eyecatch (inline SVG) ----------
function wrapTitle(t, max = 13) {
  const main = t.split(/[｜|]/)[0].trim();
  const lines = [];
  for (let i = 0; i < main.length && lines.length < 3; i += max) lines.push(main.slice(i, i + max));
  if (main.length > max * 3) lines[2] = lines[2].slice(0, max - 1) + "…";
  return lines;
}
function eyecatch(a, size = "large") {
  const s = catStyle(a.category);
  const lines = wrapTitle(a.title);
  const fs_ = 46;
  const startY = 200 - ((lines.length - 1) * (fs_ + 14)) / 2 + 18;
  return `<svg class="eyecatch eyecatch-${size}" viewBox="0 0 750 400" role="img" aria-label="${esc(a.title)}" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="g-${a.slug}-${size}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${s.c1}"/><stop offset="1" stop-color="${s.c2}"/></linearGradient></defs>
<rect width="750" height="400" fill="url(#g-${a.slug}-${size})"/>
<circle cx="660" cy="70" r="140" fill="#fff" opacity=".08"/><circle cx="60" cy="380" r="120" fill="#fff" opacity=".07"/>
<rect x="40" y="36" rx="18" width="${cfg.categories[a.category].length * 26 + 70}" height="40" fill="#fff" opacity=".95"/>
<text x="62" y="64" font-size="22" font-weight="700" fill="${s.c2}">${s.icon} ${esc(cfg.categories[a.category])}</text>
${lines.map((l, i) => `<text x="375" y="${startY + i * (fs_ + 14)}" text-anchor="middle" font-size="${fs_}" font-weight="800" fill="#fff">${esc(l)}</text>`).join("")}
<text x="710" y="372" text-anchor="end" font-size="20" fill="#fff" opacity=".85">${esc(cfg.title)}</text></svg>`;
}

// ---------- layout ----------
const CSS = fs.readFileSync(path.join(ROOT, "static", "style.css"), "utf8");
function layout({ title, description, canonical, body, jsonld, ogType = "website", floating = "" }) {
  const full = title ? `${title} | ${cfg.title}` : `${cfg.title} | ${cfg.tagline}`;
  const nav = Object.entries(cfg.categories).map(([k, v]) => `<a href="${url(`/category/${k}/`)}">${catStyle(k).icon} ${esc(v)}</a>`).join("");
  return `<!doctype html><html lang="ja"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#ffffff">${cfg.googleSiteVerification ? `<meta name="google-site-verification" content="${esc(cfg.googleSiteVerification)}">` : ""}
<title>${esc(full)}</title><meta name="description" content="${esc(description || cfg.description)}">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:title" content="${esc(full)}"><meta property="og:description" content="${esc(description || cfg.description)}">
<meta property="og:type" content="${ogType}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:site_name" content="${esc(cfg.title)}">
<meta name="twitter:card" content="summary">
<link rel="alternate" type="application/rss+xml" title="${esc(cfg.title)}" href="${url("/feed.xml")}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;800&display=swap" rel="stylesheet">
<style>${CSS}</style>${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head><body>
<header class="site-header"><div class="bar"><a class="logo" href="${url("/")}"><span class="logo-mark">L</span>${esc(cfg.title)}</a></div>
<nav class="cats" aria-label="カテゴリ">${nav}</nav></header>
<main>${body}</main>
<footer class="site-footer">
<p class="foot-logo">${esc(cfg.title)}</p>
<p class="foot-links"><a href="${url("/about/")}">運営者情報</a><a href="${url("/privacy/")}">プライバシーポリシー</a><a href="${url("/feed.xml")}">RSS</a></p>
<p class="small">当サイトはアフィリエイトプログラム（Amazonアソシエイト等）に参加しています。記事内のリンクから商品が購入されると、運営者に紹介料が支払われる場合があります。</p>
<p class="small">© ${new Date().getFullYear()} ${esc(cfg.title)}</p></footer>
${floating}
<a href="#" class="to-top" aria-label="ページの先頭へ">▲</a>
</body></html>`;
}

function card(a) {
  return `<a class="card" href="${url(`/articles/${a.slug}/`)}"><div class="thumb">${eyecatch(a, "thumb")}</div>
<div class="card-text"><span class="cat cat-${a.category}">${esc(cfg.categories[a.category])}</span><h3>${esc(a.title)}</h3><time datetime="${a.date}">${a.date.slice(0, 10).replaceAll("-", ".")}</time></div></a>`;
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

for (const a of articles) {
  affiliateCount = 0;
  const { html, toc } = render(a.body);
  const hasAff = affiliateCount > 0;
  const related = articles.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 4);
  const others = articles.filter((x) => x.slug !== a.slug && x.category !== a.category).slice(0, 4 - related.length);
  const canonical = `${BASE_URL}/articles/${a.slug}/`;
  const tocHtml = toc.filter((t) => t.lv === 2).length >= 3 ? `<details class="toc" open><summary>目次</summary><ol>${toc.filter((t) => t.lv === 2).map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join("")}</ol></details>` : "";
  // insert TOC right before first h2
  const content = tocHtml ? html.replace(/<h2 id=/, `${tocHtml}<h2 id=`) : html;
  const body = `<article class="post">
<div class="post-head">
<p class="crumbs"><a href="${url("/")}">ホーム</a> › <a href="${url(`/category/${a.category}/`)}">${esc(cfg.categories[a.category])}</a></p>
<h1>${esc(a.title)}</h1>
<p class="meta"><time datetime="${a.date}">${a.date.slice(0, 10).replaceAll("-", ".")}</time>${a.updated ? ` <span>更新 ${a.updated.slice(0, 10).replaceAll("-", ".")}</span>` : ""}</p>
${hasAff ? `<p class="pr-label"><b>PR</b>本記事は広告（アフィリエイトリンク）を含みます</p>` : ""}
</div>
<div class="hero-img">${eyecatch(a)}</div>
<div class="content">${content}</div>
<aside class="author"><div class="author-icon">🧑‍💻</div><div><p class="author-name">${esc(cfg.author)}</p><p>公的機関の資料やメーカー公式情報をもとに、在宅ワークの環境づくりに役立つ情報をまとめています。<a href="${url("/about/")}">運営方針</a></p></div></aside>
</article>
${related.length + others.length ? `<section class="related"><h2 class="sec-title">あわせて読みたい</h2><div class="list">${[...related, ...others].map(card).join("")}</div></section>` : ""}`;
  write(`articles/${a.slug}/index.html`, layout({
    title: a.title, description: a.description, canonical, body, ogType: "article",
    floating: tocHtml ? `<a href="#s1" class="fab-toc" aria-label="目次へ">目次</a>` : "",
    jsonld: { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.description, datePublished: a.date, dateModified: a.updated || a.date, author: { "@type": "Organization", name: cfg.author } },
  }));
}

const [first, ...rest] = articles;
write("index.html", layout({ canonical: `${BASE_URL}/`, body: `<section class="hero"><p class="hero-kicker">在宅ワークをもっと快適に</p><h1>${esc(cfg.tagline)}</h1><p>${esc(cfg.description)}</p></section>
<section class="pick-cats"><h2 class="sec-title">カテゴリから探す</h2><div class="cat-grid">${Object.entries(cfg.categories).map(([k, v]) => `<a href="${url(`/category/${k}/`)}" style="--c:${catStyle(k).c1}"><span>${catStyle(k).icon}</span>${esc(v)}</a>`).join("")}</div></section>
${first ? `<section><h2 class="sec-title">新着記事</h2><a class="feature" href="${url(`/articles/${first.slug}/`)}">${eyecatch(first)}<div class="feature-text"><span class="cat cat-${first.category}">${esc(cfg.categories[first.category])}</span><h3>${esc(first.title)}</h3><p>${esc(first.description)}</p></div></a>
<div class="list">${rest.slice(0, 30).map(card).join("")}</div></section>` : ""}` }));

for (const [k, v] of Object.entries(cfg.categories)) {
  const list = articles.filter((a) => a.category === k);
  write(`category/${k}/index.html`, layout({ title: v, canonical: `${BASE_URL}/category/${k}/`, description: `${v}に関する記事一覧`,
    body: `<section class="cat-head" style="--c:${catStyle(k).c1}"><span>${catStyle(k).icon}</span><h1>${esc(v)}</h1><p>${list.length}件の記事</p></section>${list.length ? `<div class="list">${list.map(card).join("")}</div>` : `<p class="empty">記事を準備中です。</p>`}` }));
}

for (const page of ["about", "privacy"]) {
  const src = fs.readFileSync(path.join(ROOT, "content", `${page}.md`), "utf8").replaceAll("{{SITE}}", cfg.title).replaceAll("{{CONTACT}}", cfg.contactUrl);
  const [, t] = src.match(/^# (.+)$/m);
  write(`${page}/index.html`, layout({ title: t, canonical: `${BASE_URL}/${page}/`, body: `<article class="post page"><div class="content">${marked.parse(src)}</div></article>` }));
}

write("404.html", layout({ title: "ページが見つかりません", canonical: `${BASE_URL}/404.html`, body: `<section class="hero"><h1>ページが見つかりません</h1><p><a href="${url("/")}">トップへ戻る</a></p></section>` }));

const pages = ["/", ...articles.map((a) => `/articles/${a.slug}/`), ...Object.keys(cfg.categories).map((k) => `/category/${k}/`), "/about/", "/privacy/"];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((p) => `<url><loc>${BASE_URL}${p}</loc></url>`).join("")}</urlset>`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${BASE_URL}/sitemap.xml\n`);
write("feed.xml", `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(cfg.title)}</title><link>${BASE_URL}/</link><description>${esc(cfg.description)}</description>
${articles.slice(0, 20).map((a) => `<item><title>${esc(a.title)}</title><link>${BASE_URL}/articles/${a.slug}/</link><guid>${BASE_URL}/articles/${a.slug}/</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${esc(a.description)}</description></item>`).join("\n")}
</channel></rss>`);
write(".nojekyll", "");

console.log(`built ${articles.length} articles -> dist/  (amazonTag: ${AMAZON_TAG ? "set" : "NOT SET"}, rakuten: ${RAKUTEN_ID ? "set" : "NOT SET"})`);
