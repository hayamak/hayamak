---
title: Cloudflareにデプロイ
description: 開発環境を構築し、AstroをインストールしてCloudflare Pagesにデプロイしました。構築からデプロイまで15分もかからず、その表示速度に驚きました。
pubDate: 2026-06-22
---

## 開発環境の構築

まずはプロジェクト用のディレクトリを作成し、VS Codeで開いて .devcontainer ディレクトリを作成しました。
最近は開発環境をコンテナで統一することが多いため、devcontainer.json と Dockerfile を用意してコンテナ内で作業を進めます。

## Astroのインストール

コンテナ内のプロジェクトルートでAstroをインストール。

```sh
npm create astro@latest .
```

そして、開発サーバーを起動

```sh
npm run dev -- --host
```

ブラウザでlocalhost:4321にアクセスするとAstroのWelcomeページが表示される。

## Cloudflare Pagesへのデプロイ

とりあえずベースはできたので、Git commitして、事前に作成しておいたGitHubのhayamakレポジトリにPush。

Cloudflareでアカウントを作成して、Compute > Workers & Pages > Create applicationをクリックして、PagesからGet startedしてImport an existing Git repositoryでGitHub上のhayamakリポジトリを選択。Begin Setupをクリックしてデプロイ完了。

## デプロイ完了！

ここまで日曜日の午後にお酒を飲みながらダラダラやって15分程度。Cloudflare Pagesが発行するURL https://hayamak.pages.dev/ をiPhoneのSafariに入力して、エンターを押したら瞬時にAstroのWelcomeページが表示された。

もちろん、まだAstroのWelcomeページを表示しているだけなので、コンテンツ量が少ないことも影響していると思う。

それでも、iPhoneでURLを入力してエンターを押した瞬間にページが表示された感覚には驚いた。

Cloudflareのエッジサーバから静的なHTMLを返すというシンプルな構成が、これほど快適な体験につながるのかとあらためて感じた。

ウェブサイトを作るのは久しぶりだったけれど、「速いサイトは気持ちがいい」という当たり前のことを再認識した日曜日の午後でした。
