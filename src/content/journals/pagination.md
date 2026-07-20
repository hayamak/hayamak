---
title: ページネーションを追加
description: 「あれこれ」の記事が増えてきたので、一覧を10件ごとに分割してページネーションを追加しました。
pubDate: 2026-07-15
---

「あれこれ」は、`src/pages/journal/index.astro`で全件の一覧を表示していて、記事が増えてきたのでそろそろページネーションを追加する。

## ルート

ChatGPTに相談したら、最初は`src/pages/journal/index.astro`をそのまま残し、2ページ目以降を`[page].astro`で実装する方法を提案してくれた。

```text
src/pages/
└── journal/
      ├── index.astro
      ├── [page].astro
      └── [slug].astro
```

また、「paginate()を無理に使うより、自分でページングを書く方が理解しやすくて保守もしやすいと思う。」とのこと。

でも、なんとなくスッキリしない。

ClaudeとGeminiにも聞いてみると、`[...page].astro`（Rest parameter）を使えば、`/journal`、`/journal/2`、`/journal/3`…というキレイなルートになると教えてくれた。

Astro公式の*Routing Reference*を確認すると、次のように書かれていた。

- `/posts/[page].astro` → `/posts/1`, `/posts/2`, `/posts/3` ...
- `/posts/[...page].astro` → `/posts`, `/posts/2`, `/posts/3` ...

そこで改めて、ChatGPTに`[...page].astro`でいいんじゃないの？と聞くと、「実は私もその案をおすすめしたかった。」という、調子のいいそば屋の出前みたいな可愛い回答。

## 変更点

### 動的ルートファイルの作成

```diff
- src/pages/journal/index.astro
+ src/pages/journal/[...page].astro
```

### getStaticPathsとpaginate()

```ts
---
import type { GetStaticPaths } from "astro";

export const getStaticPaths = (async ({ paginate }) => {
  const journals = await getCollection("journals");

  journals.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  // 1ページあたり10件に分割
  return paginate(journals, { pageSize: 10 });
}) satisfies GetStaticPaths;

// Astro.propsからpageオブジェクトを受け取る
const { page } = Astro.props;
---
```

試しに`{ pageSize: 3 }`にして動作確認すると、ちゃんと3件ずつページネーションされていた。`{ pageSize: 10 }`へ戻してコミット。

これで「あれこれ」が増えても安心。
