---
title: お問い合わせフォームを作成
description: Astro ActionsとResendを使って、お問い合わせフォームから送信された内容をメールで受信できるようにしました。
pubDate: 2026-07-19
---

このサイトでお問い合わせフォームが絶対に必要というわけではないけれど、AstroのActionsを試してみたかったこともあり、技術の確認・キャッチアップを兼ねて実装してみた。

Astroでは、お問い合わせフォームからメールを送信する方法として、ActionsまたはAPIルートを利用できる。今回は、お問い合わせフォームから送信された内容をResend経由でメールとして受信するだけなので、Actionsを使用した。

## フォームとActions

まずは、名前、メールアドレス、問い合わせ内容だけのシンプルなフォームを作成し、`src/actions/index.ts`からサーバー側で内容を受け取り、`console.log`で動作を確認した。

```astro
// src/components/ContactForm.astro

<script>
  import { actions } from "astro:actions";

  const form = document.querySelector<HTMLFormElement>(".contact-form");

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const { error } = await actions.contact(formData);

    if (error) {
      console.error(error);
      return;
    }

    console.log("送信に成功しました");
  });
</script>
```

```ts
// src/actions/index.ts

import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const server = {
  contact: defineAction({
    input: z.object({
      name: z.string().trim().max(100),
      email: z.email(),
      message: z.string().trim().min(1),
    }),

    accept: "form",
    handler: async ({ name, email, message }) => {
      console.log({
        name,
        email,
        message,
      });
      return { success: true };
    },
  }),
};
```

## Resend

<a href="https://resend.com/" target="_blank" rel="noopener noreferrer">Resend</a>は今日時点で、3,000通/月の無料枠がある。アカウントを作成して、ドメイン（`hayama.me`）を追加するとCloudflareとの連携によって必要なDNSレコードも自動で追加された。Resendのダッシュボードでステータスが「Verified」になって完了。

![Resend verified](../../assets/journals/resend-verified.jpg)

ローカル開発環境では`.dev.vars`に`RESEND_API_KEY`を設定し、本番環境ではCloudflareのSecretとして設定した。

当初は環境変数を`import.meta.env`から取得していたが、本番環境では期待どおり動作しなかった。Cloudflare Workersでは`cloudflare:workers`の`env`から取得するのが正しい方法だった。

```ts
import { env } from "cloudflare:workers";
import { Resend } from "resend";

export const server = {
  contact: defineAction({
    // ...

    handler: async ({ name, email, message }) => {
      const apiKey = env.RESEND_API_KEY;
      const toEmail = env.CONTACT_TO_EMAIL;

      const resend = new Resend(apiKey);

      const { data, error } = await resend.emails.send({
        // 送信内容
      });
    },
  }),
};
```

## Cloudflareの設定

Cloudflareのダッシュボードから`RESEND_API_KEY`をSecretとして、また`CONTACT_TO_EMAIL`をPlaintext変数として追加していた。ところが、デプロイ後に`CONTACT_TO_EMAIL`が消えてしまった。Wranglerからデプロイすると、設定ファイルに含まれていない通常の変数が上書きされるためだった。

そこで、秘密情報ではない`CONTACT_TO_EMAIL`は`wrangler.jsonc`の`vars`で管理することにした。

```jsonc
{
  "vars": {
    "CONTACT_TO_EMAIL": "メールアドレス",
  },
}
```

これで試しにiPhoneからサイトのお問い合わせフォームにアクセスして送信したら「hayama.meからのメール」が無事に届いた。🎉

## スパム対策

今後、お問い合わせフォームからスパムメールが届くようになったらCloudflare Turnstileなどの対策を検討。
