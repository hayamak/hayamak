---
title: npmパッケージのアップデート
description: 定期的にNode.jsプロジェクトのnpmパッケージをアップデートしようと思い、手順をまとめた備忘録。
pubDate: 2026-10-07
---

今までnpmパッケージのアップデートは気が向いたら行っていたけど、定期的（月初）にルーティンとして行うことにした。ただし脆弱性対応のセキュリティアップデートは月初を待たずに随時対応する。さらにNext.jsのMajorアップデートなども定期更新に混ぜずリリースノートを確認して個別に対応。

基本的なアップデートの手順は以下。

```bash
# アップデート用のブランチを切る 
$ git switch -c chore/update-dependencies

# Current/Wanted バージョンを確認
$ npm outdated

# パッケージを更新
$ npm update

# lintを設定している場合は、エラーがないことを確認
$ npm run lint

# ビルドしてエラーがないことを確認
$ npm run build

# 問題が無ければcommit
$ git add .
$ git commit -m "chore: update dependencies"

# GitHubにpush
$ git push -u origin chore/update-dependencies

```
