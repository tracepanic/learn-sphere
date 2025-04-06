"use server";

import { env } from "@/env/server";
import { UserType } from "@workspace/db";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export type UserSession = {
  id: string;
  name: string;
  username: string;
  type: UserType;
};

export type Session = {
  user: UserSession;
  accessToken: string;
};

export type CreateSession = {
  name: string;
  username: string;
  accessToken: string;
};

type DecodeAccessTokenRes = {
  userId: string;
  type: UserType;
};

const sessionSecret = new TextEncoder().encode(env.SESSION_SECRET);
const jwtSecret = new TextEncoder().encode(env.JWT_SECRET);

export async function createSession(data: CreateSession) {
  const res = await decodeAcessToken(data.accessToken);
  if (!res) {
    console.error("Failed to decode access token");
    return;
  }

  const payload: Session = {
    accessToken: data.accessToken,
    user: {
      id: res.userId,
      username: data.username,
      name: data.name,
      type: res.type,
    },
  };

  const session = await new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime("7d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(sessionSecret);

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
    const { payload } = await jwtVerify(session, sessionSecret, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch {
    console.error("Failed to verify the session");
    await deleteSession();
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function decodeAcessToken(
  accessToken: string,
): Promise<DecodeAccessTokenRes | null> {
  try {
    const { payload } = await jwtVerify(accessToken, jwtSecret, {
      algorithms: ["HS256"],
    });
    return payload as DecodeAccessTokenRes;
  } catch {
    console.error("Failed to decode access token");
    return null;
  }
}
