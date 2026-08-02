---
title: Gitのブランチ運用を見直した
description: GitHubのmainブランチへのプッシュを禁止して、開発用のブランチを切ってから変更を行い、コミット&プッシュ。プレビューを確認して問題なければマージする運用に変更しました。
pubDate: 2026-07-28
---

今までは、サイト構築の初期だったのでブランチを切らずに、コミットした変更はそのままGitHubのmainブランチにプッシュしていた。このサイトもある程度形になってきたので、変更内容をプレビューで確認してから、本番環境へ反映できるよう、Gitのブランチ運用を見直した。

## GitHub

まずは、GitHubのリポジトリの **Settings > Rules > Rulesets** でルールを設定した。

- Require a pull request before merging
- Block force pushes

これで、mainブランチへの直接プッシュができないようになった。

## ブランチ

一旦、ブランチは次の命名規則を使用することとした。

| プレフィックス | 用途           | 例                       |
| -------------- | -------------- | ------------------------ |
| `feature/`     | 新機能         | `feature/contact-form`   |
| `fix/`         | バグ修正・調整 | `fix/ipad-layout`        |
| `journal/`     | 記事執筆       | `journal/trailing-slash` |
| `chore/`       | 雑務           | `chore/create-docs-git`  |

## 作業手順

新しい作業を始めるときは、まず最新のmainブランチを取得してからブランチを作成する。

```bash
git switch main
git pull
git switch -c プレフィクス/作業内容
```

ファイルの修正が完了したら、

```bash
git status
git diff
git add .
git commit -m "作業内容を記録"
git push -u origin ブランチ名
```

`-u origin ブランチ名` は、そのブランチを初めてGitHubへプッシュするときだけ指定する。2回目以降は、`git push`のみ。

## プレビューの確認とマージ

次にGitHubで **Create Pullrequest** をクリックプルリクエスト（PR）を作成すると、Cloudflareからプレビュー画面のURLが記載されたメールが届く。
プレビュー画面で確認して問題がなければマージして完了。

GitHubとCloudflareを連携するだけで、この運用が簡単に実現できるのは本当にありがたい。
