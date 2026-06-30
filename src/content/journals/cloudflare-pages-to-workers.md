---
title: Cloudflare PagesからWorkersへ移行
description: Cloudflareは将来的にPagesをWorkersへ統合する予定で、新規プロジェクトでは静的サイトもWorkersへのデプロイが推奨されています。Astroサイトのデプロイ先をPagesからWorkersへ移行し、その手順と移行時に遭遇した問題をまとめました。
pubDate: 2026-06-30
---

## 移行準備

静的サイトだからCloudflareでのデプロイ先はPagesだろうと思っていた。ところが、Cloudflareは<a href="https://docs.astro.build/en/guides/deploy/cloudflare/" target="_blank" rel="noopener noreferrer">静的サイトでもWorkersへのデプロイを推奨</a>していた。将来的にPagesはWorkersへ統合する方針のようだ。そこで、今のうちにWorkersに移行しておこうと思う。

まずはwrangler.jsoncが必要なのでプロジェクトのルートで以下を実行する。

```sh
npx wrangler setup
```

wranglerはインストールされているけど、途中でエラーになり肝心のwrangler.jsoncが作成されない。エラーを確認すると@astrojs/cloudflareがAstro 7.0以上を要求していたので、<a href="https://astro.build/blog/astro-7/" target="_blank" rel="noopener noreferrer">公式</a>を参考にまずはAstroを7系にアップグレード。

```sh
npx @astrojs/upgrade
```

無事にAstroが7.0.3にアップグレードされたことを確認して、改めて`npx wrangler setup`を実行すると無事にwrangler.jsoncが作成されている。

## GitHubと連携

ここまでの変更をコミットしてGitHubにプッシュ。
CloudflareのダッシュボードでPagesのGitHub連携を解除してPage自体を削除。改めてWorkersでCreate ApplicationからGitHub連携するとすぐにビルドが走る。

## 画像が表示されない

デプロイしたサイトにアクセスすると画像の代わりにaltテキストが表示されている。どうやら`/public`配下の画像は表示されているけど、`src/assets`配下の画像が表示されていない。

調べるとWorkers上でAstroの画像変換がうまく動いていないみたい。astro.config.mjsに`imageService: "compile",`を以下の通り追加。

```js
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  adapter: cloudflare({
    imageService: "compile", // これを追加
  }),
});
```

変更をコミットしてGitHubにプッシュしたら、ちゃんと画像が表示されるようになった！🎉

これでCloudflare Workersへの移行は完了。
