---
title: トレイリングスラッシュ
description: URLの最後に付くスラッシュ（トレイリングスラッシュ）が気になったので、AstroとCloudflareで付かないように設定しました。
pubDate: 2026-07-26
---

Google Search Consoleを見ていたら、ページのインデックス登録で登録されていないページがあった。登録されなかった原因はページにリダイレクトがあるから、とのこと。

サイトにアクセスして、ブラウザのアドレスバーに`https://hayama.me/music`を入力してエンターを押すと、`https://hayama.me/music/`になる。他のURLも同様に最後に/が付く。

<a href="https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/" target="_blank" rel="noopener noreferrer">CloudflareのWorkers公式</a>を確認すると、デフォルトはフォルダのindexファイルはトレイリングスラッシュが付けられる。

また、<a href="https://docs.astro.build/ja/reference/configuration-reference/#trailingslash" target="_blank" rel="noopener noreferrer">Astro公式</a>を確認すると、デフォルトは、"ignore"でAstro側ではトレイリングスラッシュの有無を強制しない。

## astro.config.mjs

まずはAstroで、トレイリングスラッシュを付けないように設定。

```mjs
export default defineConfig({
  trailingSlash: "never",
  // その他
});
```

## wrangler.jsonc

Cloudflare側でも、wrangler.jsoncに以下を設定。

```jsonc
{
  // その他
  "assets": {
    "html_handling": "drop-trailing-slash",
    // その他
  },
}
```

上記を設定して、コミット&プッシュ。

確認のためターミナルで、`curl -I https://hayama.me/music`を実行すると、`HTTP/2 200`。そして、`curl -I https://hayama.me/music/`を実行すると、`HTTP/2 307`で`/music`にリダイレクトされる。

どちらが正しいというものではないようだけど、URLの表記を統一できてスッキリ。
