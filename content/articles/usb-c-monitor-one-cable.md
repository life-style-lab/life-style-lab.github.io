---
title: USB-Cケーブル1本でつながるモニター｜給電と映像出力の確認点
date: 2026-11-28T00:35:00+09:00
category: monitor
description: ノートPCをUSB-Cケーブル1本でモニターにつなぎ、映像・充電・USB機器をまとめたい人へ。PC側のUSB-C端子の対応（DisplayPort Alt Mode・Thunderbolt）、モニターの給電W数、映像に対応したケーブルの見分け方、ハブ機能付きモニターの注意点をまとめました。
tags: [USB-Cモニター, USB PD, DisplayPort Alt Mode, ノートPC, ケーブル]
---

:::reader
ノートPCをUSB-Cケーブル1本でモニターにつなげば、充電も映像もまとめてできるって聞いたんだけど…。手持ちのケーブルでつないだら、映らなかったんだよね。
:::

:::writer
USB-C 1本でつなぐには、**PCの端子・モニター・ケーブル**の3つがそろって対応している必要があります。どこか1つでも合わないと、映らなかったり充電されなかったりするんです。確認ポイントを整理しますね！
:::

USB-Cでつなぐモニターの中には、1本のケーブルで映像の出力、ノートPCへの給電、モニターについたUSB端子の利用をまとめてできるものがあります。机に戻ってケーブルを1本挿すだけで作業を始められるので、在宅ワークで人気の組み合わせです。

この記事では、==USB-C 1本でつなぐために確認したい3つのポイント==と、==ハブ機能付きモニターを選ぶときの注意点==をまとめます。USB-Cハブやドッキングステーションとの違いは[USB-Cハブとドッキングステーションの違いと選び方](/articles/usb-c-hub-docking-station/)で解説しています。

:::summary 忙しい人向け：この記事の結論
1. **PCのUSB-C端子が映像出力（DisplayPort Alt ModeやThunderbolt）に対応しているか確認する**
2. **モニターの給電W数が、ノートPCに必要な電力に足りるか確認する**
3. **ケーブルは映像に対応したものを使う**。充電専用のケーブルでは映らないことがある
:::

## USB-C 1本でできること

USB-Cの端子は、映像・データ・電力をまとめて送れるしくみを備えています。DisplayPortの規格団体VESAは、USB-Cの「DisplayPort Alt Mode」によって、==1本のUSB-Cケーブルで映像と音声、USBのデータ、電力をまとめて送れる==と説明しています。

:::figure USB-Cケーブル1本でつなぐ構成（例）
<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg">
<defs><marker id="ar34" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#1f8a70"/></marker></defs>
<g font-size="11" fill="#2b2d2f">
<rect x="20" y="90" width="110" height="64" rx="6" fill="#b9bfc4"/>
<text x="75" y="126" text-anchor="middle">ノートPC</text>
<rect x="230" y="30" width="150" height="90" rx="4" fill="#e6e8ea" stroke="#2b2d2f" stroke-width="2"/>
<text x="305" y="70" text-anchor="middle">USB-C対応モニター</text>
<text x="305" y="88" text-anchor="middle" font-size="10" fill="#5f6670">（電源は壁のコンセント）</text>
<path d="M132 122C180 122 190 80 228 80" stroke="#1f8a70" stroke-width="4" fill="none"/>
<text x="20" y="176" font-size="10" fill="#1f8a70" font-weight="700">USB-Cケーブル1本でつなぐ</text>
<text x="20" y="36" font-size="10" fill="#1f8a70">PC→モニター：映像</text>
<text x="20" y="52" font-size="10" fill="#1f8a70">モニター→PC：給電</text>
<text x="20" y="68" font-size="10" fill="#1f8a70">USBデータ（双方向）</text>
<rect x="230" y="150" width="70" height="24" rx="3" fill="#e6e8ea" stroke="#2b2d2f"/>
<text x="265" y="166" text-anchor="middle" font-size="10">キーボード</text>
<rect x="310" y="150" width="70" height="24" rx="3" fill="#e6e8ea" stroke="#2b2d2f"/>
<text x="345" y="166" text-anchor="middle" font-size="10">有線LAN</text>
<path d="M265 120V148M345 120V148" stroke="#2b2d2f" stroke-width="1.5"/>
<text x="305" y="192" text-anchor="middle" font-size="10">モニターのUSB端子・LAN端子につなぐ</text>
<rect x="20" y="206" width="360" height="54" rx="6" fill="#eef7f4"/>
<text x="200" y="224" text-anchor="middle" font-size="10" fill="#1f8a70">① PCのUSB-Cが映像出力・給電の受け取りに対応</text>
<text x="200" y="240" text-anchor="middle" font-size="10" fill="#1f8a70">② モニターの給電W数がPCに足りる　③ 映像対応のケーブル</text>
<text x="200" y="256" text-anchor="middle" font-size="10" fill="#5f6670">※端子の構成は製品によって異なる</text>
</g>
</svg>
:::

ノートPCとモニターをUSB-C 1本でつなぎ、キーボードや有線LANはモニター側の端子に挿しておけば、==PCを持ち出すときも、ケーブル1本を抜くだけ==で済みます。

## ① PCのUSB-C端子が映像出力に対応しているか

USB-Cの形の端子でも、すべてが映像出力に対応しているわけではありません。PCの仕様表やマニュアルで、次の点を確認しましょう。

:::check PC側で確認すること
- **映像出力に対応しているか**：「DisplayPort Alt Mode」「DP出力」「Thunderbolt」「USB4」などの記載
- **給電を受け取れるか**：「USB PD（Power Delivery）で充電」などの記載
- **どの端子が対応しているか**：複数のUSB-C端子のうち、一部だけが対応していることもある
- **端子の近くのマーク**：DisplayPortやThunderboltのマークが付いている機種もある
:::

==同じPCでも、端子によって対応が違う==ことがあるため、使う端子を間違えないようにしましょう。

## ② モニターの給電W数がPCに足りるか

USB-Cモニターの仕様表には、「USB-C給電 最大65W」「最大90W」のように、PCに送れる電力が書かれています。

| 確認すること | 見るポイント |
|---|---|
| モニターの給電W数 | 仕様表の「USB-C給電」「Power Delivery」の最大W数 |
| PCに必要な電力 | PCに付属している電源アダプタの出力（W数） |
| 比べ方 | モニターの給電W数が、電源アダプタの出力と同じか上回っていると安心 |

給電W数が足りない場合でも、充電できることはありますが、==負荷の高い作業をするとバッテリーが減っていく==ことがあります。PCに付属の電源アダプタのW数と比べておくと安心です。

:::item Dell Pro 24 Plus USB-C ハブ モニター P2425HE|-|https://www.dell.com/ja-jp/shop/dell-pro-24-plus-usb-c%E3%83%8F%E3%83%96-%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC-p2425he/apd/210-bmmw/%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC-%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC%E7%94%A8%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8
USB-C 1本でノートPCとつなげる、ハブ機能付きモニターの一例です。

- 解像度：1920×1080、リフレッシュレート：100Hz
- アップストリームのUSB-C（DP1.4 Altモード対応）で最大90Wを給電
- RJ45（1GbE）の有線LAN端子、デイジーチェーン接続に対応

仕様はメーカー公式の製品ページの記載です。スタンドの有無などで型番が分かれる場合があるため、購入時に確認してください。
:::

## ③ 映像に対応したケーブルを使う

USB-Cケーブルには、充電や低速のデータ転送だけに対応したものと、映像や高速なデータ転送にも対応したものがあります。==充電専用のケーブルでは、映像が出ないことがあります==。

:::point ケーブル選びのコツ
- **まずはモニターに付属のケーブルを使う**：対応が確かなことが多い
- **買い足すなら、映像出力（DisplayPort Alt Mode）や高速データ転送に対応と書かれたものを**
- **給電のW数も確認する**：USB-IFの認証ロゴでは60W・240Wなどの電力が表示される
- **長すぎるケーブルは避ける**：長いと対応する性能が下がる製品もある
:::

USB規格の団体USB-IFは、認証を受けたUSB-Cケーブルに、対応する電力（60W・240W）やデータ速度（20Gbps・40Gbpsなど）を示すロゴを定めています。パッケージやケーブル本体の表示も参考にしましょう。

## ハブ機能付きモニターの注意点

モニター側にUSB端子や有線LAN端子があると、PCの端子を増やす「ハブ」として使えます。ただし、次の点に注意しましょう。

:::warn 注意したいこと
- **USB機器の転送速度**：映像とデータで帯域を分け合うため、モニターの設定によってUSB端子の速度が変わる製品もある
- **PCの電源を切ったときの動き**：モニターのUSB端子に給電が続くか、製品によって異なる
- **Macで使う場合の対応**：対応する解像度や機能を確認する（MacBookのモニター選びは[MacBookにつなぐ外部モニターの選び方](/articles/monitor-for-macbook/)で解説）
- **会社PCのルール**：私物のモニターや周辺機器を会社PCにつないでよいか確認する
:::

## よくある失敗

:::warn やりがちなこと
- **映像出力に対応していないUSB-C端子に挿す**：PCの仕様で対応する端子を確認する
- **充電専用のケーブルを使う**：映像が出ないことがある。付属ケーブルか映像対応のケーブルを
- **給電W数が足りない**：作業中にバッテリーが減っていく。電源アダプタのW数と比べる
- **USBハブ経由でモニターにつなぐ**：映像が出ない、解像度が下がることがある。まずは直接つなぐ
- **モニターの電源を入れ忘れる**：モニター側の電源が入っていないと給電もされない
:::

## 買い足すならこの順番

:::writer
特定ブランドの順位ではなく、タイプごとに紹介します。順位は「ノートPCをUSB-C 1本でつなぐ環境を作るときに使える場面の広さ」です。
:::

:::product 1|給電対応のUSB-Cモニター|USB-C モニター 給電 65W
**こんな人に**：ノートPCをケーブル1本でつなぎたい人

- 映像・充電・USB機器を1本にまとめられる
- 机の上のケーブルや電源アダプタを減らせる
- ハブ機能付きなら周辺機器もまとめてつなげる

**選ぶときのチェック**：給電のW数、USB-C（DisplayPort Alt Mode）対応、ハブの端子の種類
:::

:::product 2|映像・給電対応のUSB-Cケーブル|USB-C ケーブル 映像出力 100W 4K
**こんな人に**：付属ケーブルが短い、なくした人

- 映像と給電を1本でつなげる
- 机の配置に合わせて長さを選べる
- 対応する電力や速度がパッケージに書かれた製品を選べる

**選ぶときのチェック**：映像出力対応、給電のW数（60W・240Wなど）、データ速度、長さ
:::

:::product 3|モニターアーム|モニターアーム クランプ 24インチ
**こんな人に**：モニターの高さや位置を自由に調整したい人

- 画面の高さを目に合わせやすい
- 台座がなくなり、ノートPCを置くスペースができる
- ケーブルをアームに沿わせて整理できる製品もある

**選ぶときのチェック**：対応するモニターの重さ・サイズ、VESA規格、天板の厚み
:::

## よくある質問

### Q. 給電W数が足りないとどうなる？

充電できても、負荷の高い作業をするとバッテリーが少しずつ減ったり、充電が遅くなったりすることがあります。PCに付属の電源アダプタのW数を目安に、モニターの給電W数を選びましょう。

### Q. モニターを2台つなげる？

デイジーチェーン（モニター同士をつなぐ方法）に対応したモニターなら、1本目のモニターから2台目へつなげる場合があります。ただし、PCやOSが対応している必要があり、Macでは使えない場合もあるため、仕様を確認しましょう。2画面の配置は[デュアルモニターの配置と設定](/articles/dual-monitor-setup/)で解説しています。

### Q. スマホやタブレットもつなげる？

映像出力に対応したUSB-C端子を持つスマホやタブレットなら、つなげる場合があります。機種の仕様で対応を確認しましょう。

## まとめ

:::summary USB-C 1本でつなぐポイント
- PCのUSB-C端子が映像出力（DisplayPort Alt Mode・Thunderbolt）と給電に対応しているか
- モニターの給電W数が、PCの電源アダプタのW数に足りるか
- ケーブルは付属品か、映像・給電対応と明記されたものを使う
- ハブ機能のUSB速度や、会社PCのルールも確認する
:::

まずはノートPCの仕様表で、USB-C端子が映像出力と給電に対応しているか確認してみてください。対応していれば、ケーブル1本の快適な机に一歩近づきます。

[[shop:USB-C モニター 給電 65W|給電対応のUSB-Cモニター]]

## 参考情報

- VESA「VESA Brings DisplayPort to New USB Type-C Connector」：https://vesa.org/featured-articles/vesa-brings-displayport-to-new-usb-type-c-connector/
- DisplayPort.org「DisplayPort over USB-C」：https://www.displayport.org/displayport-over-usb-c/
- USB-IF「USB Type-C Cable Power Rating Logo Usage Guidelines」：https://www.usb.org/sites/default/files/usb_type-c_cable_power_rating_logo_usage_guidelines_020222.pdf
- Dell「Dell Pro 24 Plus USB-C ハブ モニター P2425HE」：https://www.dell.com/ja-jp/shop/dell-pro-24-plus-usb-c%E3%83%8F%E3%83%96-%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC-p2425he/apd/210-bmmw/%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC-%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC%E7%94%A8%E5%91%A8%E8%BE%BA%E6%A9%9F%E5%99%A8
