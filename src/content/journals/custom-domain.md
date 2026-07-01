---
title: ドメインをhayama.meに
description: サイトにカスタムドメインを設定しました。Cloudflare Registrarでhayama.meを取得し、ルートドメインで公開。www.hayama.meからルートドメインへのリダイレクトも設定しました。
pubDate: 2026-07-01
---

昨日まででウェブサイトのベースができたので、今後は以下の設定や調整を進めていく予定です。

- カスタムドメインの取得・設定
- GA4導入
- SEO基本設定（canonical・robots・sitemap）
- Search Console登録
- OGP画像作成
- favicon・各種アイコン作成
- パフォーマンス調整（Lighthouse確認）
- プライバシーポリシー作成

まずはカスタムドメインの設定から。

シンプルで分かりやすく、個人サイトに合うドメインを探していたところ、`hayama.me` が取得できたので、Cloudflare RegistrarでUS$18.22で購入しました。

Cloudflareのダッシュボードからルートドメインとして設定すると、DNSも自動で設定され、すぐに `https://hayama.me` でアクセスできるようになりました。

あわせて、`https://www.hayama.me` にアクセスした場合は、ルートドメインへリダイレクトされるように設定しました。

最後に、`astro.config.mjs` に `site` を追加してデプロイします。

```js
export default defineConfig({
  site: "https://hayama.me", // 追加
  adapter: cloudflare({
    imageService: "compile",
  }),
});
```

これでカスタムドメインの取得・設定は完了です。✅

次はGA4を導入して、公開後のアクセス状況を確認できるようにしていきます。
