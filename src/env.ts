import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    FRONTEND_URL: z.string().url(),
    AUTH_URL: z.string().url(),
    BACKEND_URL: z.string().url(),
  },

  client: {
    NEXT_PUBLIC_AUTH_URL: z.string().url(),
    NEXT_PUBLIC_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_FRONTEND_URL: z.string().url(),
  },

  runtimeEnv: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    AUTH_URL: process.env.AUTH_URL,
    BACKEND_URL: process.env.BACKEND_URL,

    NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  },
});