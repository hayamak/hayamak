---
title: ウェブサイトの作成
description: 最近の技術のキャッチアップを目的に、久しぶりにウェブサイトを作成してみました。
pubDate: 2026-06-21
---

最近の技術のキャッチアップを目的に久しぶりにウェブサイトを作成してみました。

## 何で作るか

まずは使用するツールの選定から。Vanilla HTML/CSS/JavaScriptとWordPressは検討対象外。主に以下の３つの選択肢かな〜と。

- [Next.js](https://nextjs.org/)
- [Emdash](https://emdash.sh/)
- [Astro](https://astro.build/)

まず、静的なコンテンツ中心のサイトでデータベースも不要なので、今回はNext.jsは少しオーバースペックな気がする。
WordPressの精神的な後継を謳うEmdashは気になるけど、さすがに出たばかり（今日時点でv1.1.34）だから様子見。
ということでAstroで決定。

## どこに置くか

Astroで作成したサイトで、無料で利用できるけど、本番でもちゃんと使える場所がいいので選択肢としては以下かなと。

- [Vercel](https://vercel.com)
- [Cloudflare](https://www.cloudflare.com/)

Vercelにはすでにプロジェクトが1つあるし、Cloudflareはまだ使ったことがなかったので、検証も兼ねてCloudflare Pagesを選択。

## デザイン

サイトのデザインは[Tailwind Plus](https://tailwindcss.com/plus)にある、ミニマルでクリーンな感じの[Spotlight](https://tailwindcss.com/plus/templates/spotlight)を採用。SpotlightはNext.js + Tailwind CSS + MDXで作成されているので、これをChatGPTでシンプルなAstro + Vanilla CSS + Markdownに変換してもらった。
細かい部分は違うものの、全体の雰囲気はうまく再現できたと思う。

## コンテンツ

最近の技術のキャッチアップと確認が主目的なので、コンテンツはダミーでも良いっちゃ良いんだけど、それだとすぐに飽きてしまって続かない気がしたので、音楽、スペイン語、スノーボード、ジムなどを中心に自分の関心ごとを記録します。
