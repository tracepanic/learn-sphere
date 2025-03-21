"use server";

import { env } from "@/env/server";

export async function constructUrl(url: string): Promise<string> {
  return new URL(url, env.BACKEND_URL).toString();
}
