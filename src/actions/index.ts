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
