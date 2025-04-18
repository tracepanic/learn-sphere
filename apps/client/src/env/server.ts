import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.string().url(),
    SITE_URL: z.string().url(),
    SITE_NAME: z.string(),
    SESSION_SECRET: z.string(),
    JWT_SECRET: z.string(),
  },
  experimental__runtimeEnv: process.env,
});
