# 在宅ワーク環境ラボ（アフィリエイトブログ）

在宅ワークのデスク環境をテーマにした静的アフィリエイトサイト。GitHub Pages で無料公開し、Claude の定期実行で3時間ごとに記事を追加する。

## 構成
- `content/articles/*.md` … 記事（frontmatter + Markdown）。未来日付は予約投稿扱い
- `src/build.mjs` … 静的サイト生成（記事・カテゴリ・sitemap・RSS・PR表記の自動付与）
- `scripts/check.mjs` … 品質チェック（文字数・リンク数・禁止表現・出典）
- `topics.json` … 記事ネタのバックログ
- `CLAUDE.md` … 自動記事作成の手順と品質ルール
- `.github/workflows/deploy.yml` … push時＋3時間ごとにビルドして Pages へデプロイ

## 公開までの手順
1. GitHub 組織 life-style-lab に `life-style-lab.github.io` リポジトリを作成して push
2. Settings → Pages → Source を「GitHub Actions」に
3. 公開URL: https://life-style-lab.github.io/
4. Amazonアソシエイト / 楽天アフィリエイトに登録し、Settings → Secrets and variables → Actions → Variables に
   `AMAZON_TAG`（例: xxxx-22）と `RAKUTEN_AFFILIATE_ID` を登録
5. Google Search Console にサイトと sitemap.xml を登録

## ローカル
    npm ci && npm run check && npm run build
