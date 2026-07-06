---
title: GA4は導入せず、SEO基本設定とSearch Console登録
description: GA4は導入しないで、Cloudflare Web Analyticsを利用することにしました。sitemap・canonical・robots.txtを設定し、Google Search Consoleへ登録しました。
pubDate: 2026-07-04
---

## Analyticsの検討

ウェブサイトを作ると、Google Analytics 4（GA4）を導入することが多いと思うけど、改めて今回そして今、本当に必要なのか考えてみた。

GA4を導入すると、計測のために`gtag.js`（135kB程度）を読み込むことになる。もちろん`gtag.js`だけで劇的に遅くなるわけではないと思うけど、それでも、GA4で取得する情報が「本当に必要なのか」が気になった。

Cloudflareでは標準でCloudflare Web Analyticsが使用できる。Cookie不要で、Page Views、Referer、Pathsなど、今の自分に必要な情報は十分取得できる。

「あった方がいいかもしれない」という情報のために、サイトのシンプルさやパフォーマンスを犠牲にするのは、まさにYAGNIだと思った。
ということで、GA4は必要になったら導入することにした。

ちょうど、なぜかGoogleのFounder's letterにある

> "Google is not a conventional company. We do not intend to become one."

という一節を思い出した。

## SEO基本設定

### sitemap

Astroは`@astrojs/sitemap`を公式に提供していて、`npx astro add sitemap`を実行するだけで導入できる。

### robots.txt

`/public`に、まずは以下の`robots.txt`を作成。

```
User-agent: *
Allow: /

Sitemap: https://hayama.me/sitemap-index.xml
```

### canonical

`src/layouts/Layout.astro`の`<head>`内に以下を追加。

```astro
<link
  rel="canonical"
  href={new URL(Astro.url.pathname, Astro.site).toString()}
/>
```

## Google Search Consoleへの登録

Google Search Consoleでドメインプロパティとして`hayama.me`を登録。

Cloudflareとの連携を承認すると、Googleが必要なTXTレコードをCloudflareへ自動で追加してくれた。

最後にサイトマップとして`sitemap-index.xml`を送信して完了。✅

## ※念のためGEO/AIO/AEOなど

今はAIが直接回答を生成する検索も増えていると思うので、これに対する取り組みはどうしたらいいか？
念のためChatGPT・Gemini・Claudeに聞いてみる。

基本的にはみんなAI用のハックではなく、以下のような王道のSEOを固めろという回答。

- わかりやすいHTML構造
- 独自性・専門性のあるコンテンツ
- サイト外での情報発信や引用

結局のところ、AI向けだからと特別なことをするよりも、自分で考えたことや経験を、検索エンジンにも人にも読みやすい形で発信することが一番大切なんだね。
