"use server";

export async function constructUrl(url: string): Promise<string> {
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_URL environment variable is not defined.");
  }

  try {
    return new URL(url, backendUrl).toString();
  } catch (error: any) {
    console.error("Error constructing URL:", error.message);
    throw new Error(`Invalid URL: ${url} or BACKEND_URL: ${backendUrl}`);
  }
}
