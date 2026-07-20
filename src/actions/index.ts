// src/actions/index.ts

import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

import { env } from "cloudflare:workers";

export const server = {
  contact: defineAction({
    input: z.object({
      name: z.string().trim().max(100),
      email: z.email(),
      message: z.string().trim().min(1),
    }),

    accept: "form",

    handler: async ({ name, email, message }) => {
      const apiKey = env.RESEND_API_KEY;
      const toEmail = env.CONTACT_TO_EMAIL;
      // const apiKey = import.meta.env.RESEND_API_KEY;
      // const toEmail = import.meta.env.CONTACT_TO_EMAIL;

      if (!apiKey || !toEmail) {
        console.error("お問い合わせメールの環境変数が設定されていません");

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "メール送信の設定に問題があります。",
        });
      }

      const resend = new Resend(apiKey);

      const senderName = name || "名前未入力";

      const { data, error } = await resend.emails.send({
        from: "hayama.me お問い合わせ <contact@hayama.me>",
        to: [toEmail],
        replyTo: email,
        subject: `hayama.meからのメール`,
        text: [
          "hayama.meのお問い合わせフォームから送信されました。",
          "",
          `お名前: ${senderName}`,
          `メールアドレス: ${email}`,
          "",
          "お問い合わせ内容:",
          message,
        ].join("\n"),
      });

      if (error) {
        console.error("Resendでのメール送信に失敗しました", error);

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "メールを送信できませんでした。",
        });
      }

      return {
        success: true,
        emailId: data?.id,
      };
    },
  }),
};
