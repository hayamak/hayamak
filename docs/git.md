## Git 運用

作業は `main` ブランチでは行わない。

新しい作業を始めるときは、最新の `main` を取得してからブランチを作成する。

```bash
git switch main
git pull
git switch -c <branch-name>
```

ブランチは次の命名規則を使用する。

| プレフィックス | 用途           | 例                         |
| -------------- | -------------- | -------------------------- |
| `feature/`     | 新機能         | `feature/contact-form`     |
| `fix/`         | バグ修正・調整 | `fix/ipad-layout`          |
| `journal/`     | 記事執筆       | `journal/trailing-slash`   |
| `chore/`       | 雑務           | `chore/creste-docs-git.md` |

作業完了後は GitHub へ Push し、Cloudflare のプレビューで確認してから Pull Request を作成し、`main` へマージする。
