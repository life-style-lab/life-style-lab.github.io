---
title: USB-Cハブとドッキングステーションの違いと選び方
date: 2026-11-19T03:35:00+09:00
category: monitor
description: USB-Cハブとドッキングステーションの違いを、給電（USB PD）・映像出力（4K 30Hz／60Hz）・Thunderbolt対応の観点で整理。ノートPCを1本のケーブルで在宅ワーク環境につなぐための選び方と、よくある失敗をまとめました。
tags: [USB-Cハブ, ドッキングステーション, Thunderbolt, USB PD, ノートPC]
---

:::reader
ノートPCのUSB-C端子が2つしかなくて足りない…。ハブとドッキングステーションって何が違うの？　どっちを買えばいいかわからない！
:::

:::writer
どちらも「端子を増やす機器」ですが、**給電できる電力や映像出力の性能、置き方**が違います。PC側の端子の対応状況とあわせて、選び方を整理しますね！
:::

ノートPCで在宅ワークをすると、外付けモニター、キーボード、マウス、充電ケーブル、LANケーブルなど、つなぐ機器が一気に増えます。

この記事では、==USB-Cハブとドッキングステーションの違い==と、買う前に確認したい給電・映像出力の数値を整理します。==PC側のUSB-C端子が何に対応しているか==が、選び方の出発点です。

:::summary 忙しい人向け：この記事の結論
1. **まずPCのUSB-C端子を確認**（映像出力・給電に対応しているか、Thunderboltか）
2. **持ち運びや最小構成ならUSB-Cハブ**、モニター2台・有線LANまで机に固定するなら**ドッキングステーション**
3. **映像は「4K 60Hz」か「4K 30Hz」かを必ず確認**。30Hzだとマウスの動きがカクついて見えやすい
:::

## USB-Cハブとドッキングステーションの違い

呼び方に厳密な定義はありませんが、一般的には次のように分けられます。

| 項目 | USB-Cハブ | ドッキングステーション |
|---|---|---|
| 電源 | PCから電力をもらう（バスパワー）タイプが多い | 専用ACアダプターで動く |
| PCへの給電 | 充電器をハブにつなぐ「パススルー充電」 | ドック自体からPCへ給電する製品が多い |
| 映像出力 | HDMI 1つが中心 | 2〜3画面出力に対応する製品もある |
| 端子の数 | 4〜8個程度 | 10個前後の製品も多い |
| 大きさ | 手のひらサイズで持ち運べる | 据え置き型 |
| 価格帯 | 比較的手頃 | ハブより高めの傾向 |

==机に固定して「ケーブル1本で全部つながる」環境を作るならドッキングステーション==、外出先でも使いたいならUSB-Cハブが向いています。

:::figure USB-Cハブでの接続のイメージ（ケーブル1本でPCにつなぐ）
<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
<g font-size="11" fill="#2b2d2f">
<rect x="10" y="95" width="80" height="50" rx="4" fill="#5f6670"/>
<text x="50" y="125" text-anchor="middle" fill="#ffffff" font-weight="700">ノートPC</text>
<rect x="160" y="85" width="70" height="70" rx="8" fill="#1f8a70"/>
<text x="195" y="117" text-anchor="middle" fill="#ffffff" font-weight="700">USB-C</text>
<text x="195" y="132" text-anchor="middle" fill="#ffffff" font-weight="700">ハブ</text>
<line x1="90" y1="120" x2="160" y2="120" stroke="#1f8a70" stroke-width="5"/>
<text x="125" y="110" text-anchor="middle" font-size="10" fill="#1f8a70" font-weight="700">USB-C 1本</text>
<text x="90" y="170" font-size="10" fill="#1f8a70">映像・データ・給電をまとめて</text>
<g stroke="#b9bfc4" stroke-width="2.5" fill="none">
<path d="M230 95L290 40"/><path d="M230 110L290 90"/><path d="M230 130L290 150"/><path d="M230 145L290 200"/></g>
<rect x="290" y="25" width="100" height="30" rx="4" fill="none" stroke="#2b2d2f"/><text x="340" y="44" text-anchor="middle">モニター（HDMI）</text>
<rect x="290" y="75" width="100" height="30" rx="4" fill="none" stroke="#2b2d2f"/><text x="340" y="94" text-anchor="middle">キーボード等</text>
<rect x="290" y="135" width="100" height="30" rx="4" fill="none" stroke="#2b2d2f"/><text x="340" y="154" text-anchor="middle">有線LAN</text>
<rect x="290" y="185" width="100" height="30" rx="4" fill="none" stroke="#c07a10"/><text x="340" y="204" text-anchor="middle" fill="#c07a10">USB PD充電器</text>
<text x="10" y="232" font-size="10">充電器をハブにつなぐと、ハブ経由でPCも充電（パススルー充電）</text>
</g>
</svg>
:::

## チェック① PCのUSB-C端子が何に対応しているか

USB-Cは端子の形の名前で、同じ形でも機能はPCによって違います。

:::check PCの仕様表で確認すること
- **映像出力**：「DisplayPort Alt Mode」「映像出力対応」の表記があるか
- **給電（充電）**：「USB Power Delivery」「USB PD充電対応」の表記があるか
- **Thunderbolt／USB4**：雷マークや「Thunderbolt 4」「USB4」の表記があるか
- **端子の位置**：左右どちらの端子が上記に対応しているか（端子ごとに違うことがある）
:::

:::warn 映像出力に対応していない端子もある
データ転送専用のUSB-C端子に映像出力付きのハブをつないでも、画面は映りません。==ハブの性能より、PC側の端子の対応が優先==です。
:::

## チェック② 給電（USB Power Delivery）

USB PDは、USB-Cケーブルで電力をやり取りするための規格です。USB-IFが2021年に公表したUSB PD 3.1では、従来の最大100Wの範囲が「Standard Power Range（SPR）」と呼ばれ、最大240Wまでの「Extended Power Range（EPR）」が追加されました。

| 確認すること | 目安 |
|---|---|
| PCの充電に必要な電力 | 付属ACアダプターのW数を確認（例：65W、100W） |
| ハブのパススルー充電の上限 | PCに必要なW数以上あるか |
| 充電器のW数 | ハブ自体が使う電力の分、余裕を持たせる |

:::point パススルー充電は「目減り」する
ハブ経由で充電すると、ハブ自体の動作に電力の一部が使われます。製品ページに「最大○Wのパススルー充電」とある場合も、==充電器の出力より少ない電力がPCに届く==ことを前提に、余裕のある充電器を選びましょう。
:::

## チェック③ 映像出力（解像度とリフレッシュレート）

外付けモニターにつなぐなら、解像度とリフレッシュレート（1秒あたりの描き換え回数）を確認します。

| 表記 | 見え方の目安 |
|---|---|
| 4K 60Hz | マウスやスクロールがなめらか |
| 4K 30Hz | 文字は表示できるが、マウスの動きがカクついて見えやすい |
| フルHD 60Hz | フルHDモニターなら十分 |

4Kモニターを使う場合は、==「4K対応」だけでなく「60Hz」まで書かれているか==を確認しましょう。モニターのサイズと解像度の選び方は[在宅ワーク用モニターのサイズと解像度の選び方](/articles/monitor-size-resolution-guide/)で解説しています。

:::item Anker 341 USB-C ハブ (7-in-1) A8348|-|https://www.ankerjapan.com/products/a8348
1つのUSB-C端子から、HDMIやUSBなどを増やせる持ち運び向けハブの一例です。

- HDMIポート：最大4K（30Hz）
- パススルー充電：最大85W
- 製品型番：A83480A1（グレー）

4K 60Hzで使いたい場合は、HDMI出力の仕様が60Hz対応の製品を選ぶ必要があります。
:::

## チェック④ モニター2台・Thunderbolt

外付けモニターを2台つなぎたい場合は、ハブよりドッキングステーションやThunderbolt対応ドックが候補になります。

Intelが発表したThunderbolt 4の要件では、4Kディスプレイ2台（または8Kディスプレイ1台）への出力、40Gbpsの転送速度、少なくとも1つのPC側ポートでの充電対応などが定められています。

:::memo Macは画面数の上限に注意
Macは機種によって、接続できる外部ディスプレイの数に上限があります。ドックが2画面出力に対応していても、Mac側が1画面までしか対応していないことがあるため、Appleの技術仕様ページで「外部ディスプレイのサポート」を確認しましょう。
:::

## 用途別の選び方

| 使い方 | おすすめ |
|---|---|
| 持ち運び、モニター1台＋USB機器を少し | USB-Cハブ（パススルー充電対応） |
| 机に固定、モニター1台＋有線LAN＋充電 | 有線LAN付きのUSB-Cハブ、またはドッキングステーション |
| 机に固定、モニター2台 | 2画面出力対応のドッキングステーション（PC側の対応も確認） |
| Thunderbolt対応PCで高速ストレージも使う | Thunderboltドック |

ノートPCを机に固定するなら、スタンドで画面を上げて外付けキーボードと組み合わせると姿勢も整います。[ノートPCで首が痛い人へ｜PCスタンドと外付けキーボードの選び方](/articles/laptop-stand-external-keyboard/)もあわせてご覧ください。

## よくある失敗

:::warn 買ってから気づきやすいポイント
- **画面が映らない**：PCのUSB-C端子が映像出力に対応していなかった
- **4Kモニターがカクつく**：ハブのHDMIが4K 30Hzまでだった
- **充電が遅い・減っていく**：パススルー充電の上限や充電器のW数が足りない
- **2画面目が映らない**：PCが複数画面の出力に対応していない、または同じ画面が複製表示になる
- **ケーブルが原因**：付属以外のUSB-Cケーブルが、映像や高速データ転送に対応していない
:::

## おすすめ（用途の広さ順）

:::writer
特定ブランドの順位ではなく、タイプごとに紹介します。順位は「在宅ワークで使える場面の広さ」で付けています。
:::

:::product 1|パススルー充電対応のUSB-Cハブ（HDMI付き）|USB-C ハブ HDMI 4K 60Hz PD
**こんな人に**：ノートPCに外付けモニター1台とUSB機器をつなぎたい人

- 1本のUSB-CケーブルでHDMI・USB・充電をまとめられる
- 小型で、外出先にも持ち出しやすい
- 製品数が多く、有線LAN付きのモデルも選べる

**選ぶときのチェック**：HDMIの解像度とリフレッシュレート（4K 60Hzか）、パススルー充電の最大W数
:::

:::product 2|USB-Cドッキングステーション（2画面出力対応）|ドッキングステーション USB-C デュアルモニター
**こんな人に**：机に固定して、モニター2台や有線LANを使いたい人

- 専用電源で動き、PCへの給電も安定しやすい
- 映像出力や端子の数が多い
- ケーブル1本でPCを抜き差しでき、片付けが楽

**選ぶときのチェック**：PC側の複数画面出力対応、PCへの給電W数、対応OS
:::

:::product 3|Thunderboltドック|Thunderbolt 4 ドック
**こんな人に**：Thunderbolt対応のPCを使っている人

- 高速なデータ転送と複数画面出力を1本のケーブルでまとめられる
- 外付けSSDなど大容量データを扱う作業に向く
- Thunderbolt機器を数珠つなぎにできる製品もある

**選ぶときのチェック**：PCがThunderbolt対応か、付属ケーブルの長さ、PCへの給電W数
:::

## よくある質問

### Q. スマホ用の充電器をハブにつないでもいい？

USB PD対応の充電器なら使えますが、W数が足りないとPCの充電が遅くなったり、使用中に電池が減ったりします。PC付属のACアダプターと同等以上の出力が目安です。

### Q. ハブを挿したままPCを持ち歩いても大丈夫？

ハブが端子からはみ出していると、ぶつけたときに端子に負担がかかります。持ち運ぶときは外し、短いケーブル付きのタイプを選ぶと扱いやすくなります。

### Q. 有線LANは必要？

Wi-Fiが安定していれば必須ではありませんが、Web会議の多い人は有線LANがあると通信が安定しやすくなります。LANポート付きのハブやドックなら、端子を増やさずに対応できます。

## まとめ

:::summary USB-Cハブ・ドッキングステーションはここを見て選ぶ
- まずPCのUSB-C端子が映像出力・給電・Thunderboltに対応しているか確認
- 持ち運ぶならUSB-Cハブ、机に固定して2画面ならドッキングステーション
- 4Kモニターは「4K 60Hz」対応か確認
- パススルー充電は、PCに必要なW数＋余裕のある充電器を用意
:::

まずはPCの仕様表でUSB-C端子の対応状況を確認し、つなぎたい機器を書き出してみてください。必要な端子と給電のW数がわかれば、ハブかドックかは自然に決まります。

[[shop:USB-C ハブ HDMI 4K 60Hz PD|USB-Cハブ]]

## 参考情報

- Anker Japan「Anker 341 USB-C ハブ (7-in-1)」製品ページ：https://www.ankerjapan.com/products/a8348
- AnandTech「USB-C Power Delivery Hits 240W With Extended Power Range」：https://anandtech.com/print/16712/usbc-power-delivery-hits-240w-with-extended-power-range
- PCWorld「Intel unveils the Thunderbolt 4 spec」：https://www.pcworld.com/article/3564374/intel-unveils-the-thunderbolt-4-spec-which-amd-believes-it-can-use.html
- StarTech.com「Introducing Thunderbolt 4」：https://www.startech.com/en-us/blog/introducing-thunderbolt-4
