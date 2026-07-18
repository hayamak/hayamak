---
title: ダークモードに対応
description: サイトをダークモード対応にしました。CSSの固定色をデザイントークン（CSS変数）へ置き換え、ライト/ダークテーマを切り替えられるようにしました。
pubDate: 2026-07-18
---

このサイトは余白を使ったデザイン・レイアウトで、白背景のクリーンな雰囲気は気に入っているんだけど、、環境によって、また人によっては眩しいと感じると思ったのでダークモードも選択できるようにした。

Astro公式の<a href="https://docs.astro.build/ja/tutorial/6-islands/2/" target="_blank" rel="noopener noreferrer">チュートリアル</a>を参考に、Header内のメニューの横にライト/ダークテーマ切り替え用のボタンを設置。

`global.css`で色をCSS変数として定義し、サイト内で直接指定していた色をCSS変数へ置き換えた。実際に定義したデザイントークンはこんな感じ。

```css
:root {
  --color-text: #18181b;
  --color-muted: #71717a;
  --color-bg: #fafafa;
  --color-surface: #fff;
  --color-border: #f4f4f5;
  --color-hover: #fafafa;
  --color-divider: #e4e4e7;
  --color-accent: #2563eb;
}

html.dark {
  --color-text: #f4f4f5;
  --color-muted: #a1a1aa;
  --color-bg: #18181b;
  --color-surface: #27272a;
  --color-border: #3f3f46;
  --color-hover: #323238;
  --color-divider: #52525b;
  --color-accent: #60a5fa;
}
```
