"use server";

import { env } from "@/env/server";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type UserSession = {
  id: string;
  name: string;
  type: "ADMIN" | "TEACHER" | "STUDENT";
};

export type Session = {
  user: UserSession;
  accessToken: string;
};

const encodedKey = new TextEncoder().encode(env.SESSION_SECRET_KEY);

export async function createSession(payload: Session) {
  const session = await new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime("7d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();

  cookieStore.set({
    name: "session",
    value: session,
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (error) {
    console.error("Failed to verify the session: ", error);
    redirect("/auth/login");
  }
}

export async function deleteCookie() {
  (await cookies()).delete("session");
}
