---
title: Dev Containerで開発環境構築
description: MacにNode.jsをインストールせず、VS CodeのDev ContainerでNext.jsやAstroを開発するための手順をまとめた備忘録。
pubDate: 2026-08-02
---

自分のMacに開発環境構築のためだけにNode.jsをインストールするのは、なんとなくローカル環境が汚れるような感覚がある。

なので、VS CodeのDev Containerを使って開発している。ただ、開発環境を構築する機会はそれほど多くないので、毎回手順を調べ直してしまう。

ということで、自分用の手順メモ。

まずは、適当なプロジェクト用のディレクトリを作成して、そこに移動してVS Codeを起動する。

```bash
% mkdir project-name
% cd project-name
% code .
```

## Dev Containerの作成

VS Codeのターミナルで`.devcontainer/`を作成して、`devcontainer.json`と`Dockerfile`を作成。

```bash
% mkdir .devcontainer
% touch .devcontainer/devcontainer.json
% touch .devcontainer/Dockerfile
```

```jsonc
// devcontainer.json

{
  "name": "project-name",
  "build": {
    "dockerfile": "Dockerfile",
  },
  "forwardPorts": [3000], //Next.jsなら3000、Astroなら4321

  "remoteUser": "node",

  "customizations": {
    // カスタム設定
  },
}
```

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/devcontainers/javascript-node:22
```

コマンドパレットから Reopen in Container を選択して、コンテナ内でプロジェクトを開く。

## フレームワークのインストール

```bash
$ npx create-next-app@latest project-name
```

※コンテナ内の`/workspaces/project-name`で例えば、`npx create-next-app@latest .`を実行するとディレクトリが空ではない（`.devcontainer/`があるから）ということでインストールができない。

インストールが完了すると、以下のような構造になる。

```bash
$ tree -a -L 2
```

```tree
. ← project-name/
├── .devcontainer
│   ├── devcontainer.json
│   └── Dockerfile
└── project-name
    ├── eslint.config.mjs
    ├── .git
    ├── .gitignore
    ├── .next
    ├── next.config.ts
    ├── next-env.d.ts
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    ├── public
    ├── README.md
    ├── src
    └── tsconfig.json
```

作成された project-name/ 内の必要なファイルを、一つ上のディレクトリへ移動してから削除する。

```bash
$ mv project-name/* . # 隠しファイル以外が移動される
$ mv project-name/.gitignore . # .gitignoreも移動
$ rm -rf project-name # project-nameディレクトリ（中の.gitや.nextなども含め）を削除。
```

移動してきた node_modules は一旦削除し、package-lock.jsonをもとに依存関係を再インストールする。

```bash
$ rm -rf node_modules
$ npm ci
```

## Git

Gitでの管理を始める。

```bash
$ git init
$ git branch -m main # masterならmainに変更
```

git initした直後のディレクトリ構成は以下。

```bash
$ tree -a -L 1
```

```tree
. ← project-name/
├── .devcontainer
├── eslint.config.mjs
├── .git
├── .gitignore
├── next.config.ts
├── next-env.d.ts
├── node_modules
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── public
├── README.md
├── src
└── tsconfig.json
```

git addして、Initial commitする。

```bash
$ git add .
$ git commit -m "Initial commit"
```

## GitHub

GitHubのダッシュボードでリポジトリを作成して、ローカルで`git remote add`して、プッシュして完了。🎉

```bash
$ git remote add origin https://github.com/hayamak/project-name.git
$ git remote -v
  origin  https://github.com/hayamak/project-name.git (fetch)
  origin  https://github.com/hayamak/project-name.git (push)
$ git push -u origin main
```
