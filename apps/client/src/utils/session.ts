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
  accessInfo: string;
  accessToken: string;
};

type DecodeAccessInfoRes = {
  userId: string;
  type: UserType;
};

const encodedKey = new TextEncoder().encode(env.SESSION_SECRET_KEY);
const sharedKey = new TextEncoder().encode(env.SHARED_JWT_SECRET);

export async function createSession(data: CreateSession) {
  const res = await decodeAcessInfo(data.accessInfo);
  if (!res) {
    console.error("Failed to decode access info");
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
  } catch {
    console.error("Failed to verify the session");
    await deleteSession();
    return null;
  }
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function decodeAcessInfo(
  accessInfo: string,
): Promise<DecodeAccessInfoRes | null> {
  try {
    const { payload } = await jwtVerify(accessInfo, sharedKey, {
      algorithms: ["HS256"],
    });
    return payload as DecodeAccessInfoRes;
  } catch {
    console.error("Failed to decode access info");
    await deleteSession();
    return null;
  }
}
