---
title: ウェブサイトの作成
description: 最近の技術の確認とキャッチアップを目的に、久しぶりにウェブサイトを作成してみました。
pubDate: 2026-06-20
---

最近の技術の確認とキャッチアップを目的に久しぶりにウェブサイトを作成してみました。

## 何で作るか

まずは使用するツールの選定から。Vanilla HTML/CSS/JavaScriptとWordPressは検討対象外。主に以下の３つの選択肢かな〜と。

<a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>
<a href="https://emdash.sh/" target="_blank" rel="noopener noreferrer">Emdash</a>
<a href="https://astro.build/" target="_blank" rel="noopener noreferrer">Astro</a>

まず、静的なコンテンツ中心のサイトでデータベースも不要なので、今回はNext.jsは少しオーバースペックな気がする。
<a href="https://blog.cloudflare.com/ja-jp/emdash-wordpress/" target="_blank" rel="noopener noreferrer">WordPressの精神の後継を謳う</a>Emdashは気になるけど、さすがにまだ早い（今日時点でv1.1.34）気がして様子見。
ということでAstroを選択。

しばらくは、コンテンツ管理にCMSは使わずAstro + Markdownのシンプルな構成で行く予定。

## どこに置くか

Astroで作成したサイトで、無料で利用できるけど、本番でもちゃんと使える場所がいいので選択肢としては以下かなと。

<a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>
<a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>
<a href="https://www.cloudflare.com/" target="_blank" rel="noopener noreferrer">Cloudflare</a>

Vercelにはすでにプロジェクトが1つあるので除外。NetlifyとCloudflareでなんとなくCloudflareを選択。今はAstroもCloudflareの傘下だし。

## デザイン

サイトのデザインは<a href="https://tailwindcss.com/plus" target="_blank" rel="noopener noreferrer">Tailwind Plus</a>にある、ミニマルでクリーンな感じの<a href="https://tailwindcss.com/plus/templates/spotlight" target="_blank" rel="noopener noreferrer">Spotlight</a>を選択。SpotlightはNext.js + Tailwind CSS + MDXで作成されているので、これをChatGPTでシンプルなAstro + Vanilla CSS + Markdownに変換してもらった。
細かい部分は違うものの、全体の雰囲気はうまく再現できたと思う。

## コンテンツ

最近の技術の確認が主目的なので、コンテンツはダミーでも良いっちゃ良いんだけど、それだとすぐに飽きてしまって続かない気がしたので、音楽、スペイン語、スノーボード、ジムなどを中心に自分の関心ごとを記録します。
