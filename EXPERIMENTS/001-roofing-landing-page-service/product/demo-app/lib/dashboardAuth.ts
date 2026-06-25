import "server-only";

import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DASHBOARD_SESSION_COOKIE = "local_growth_preview_dashboard_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const DEFAULT_PASSWORD_HASH =
  "sha256:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8";

type DashboardRole = "admin" | "user";

type DashboardUserConfig = {
  username: string;
  role?: DashboardRole;
  password?: string;
  passwordHash?: string;
};

export type DashboardSession = {
  username: string;
  role: DashboardRole;
  expiresAt: number;
};

const fallbackUsers: DashboardUserConfig[] = [
  {
    username: "digidap",
    role: "admin",
    passwordHash: DEFAULT_PASSWORD_HASH,
  },
];

function base64UrlEncode(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf8");
}

function getDashboardAuthSecret() {
  return process.env.DASHBOARD_AUTH_SECRET ?? "local-growth-preview-dashboard-dev-secret";
}

function getConfiguredUsers() {
  const rawUsers = process.env.DASHBOARD_USERS_JSON;

  if (!rawUsers) {
    return fallbackUsers;
  }

  try {
    const parsedUsers = JSON.parse(rawUsers) as DashboardUserConfig[];

    if (!Array.isArray(parsedUsers)) {
      return [];
    }

    return parsedUsers.filter((user) => user.username && (user.password || user.passwordHash));
  } catch (error) {
    console.error("Invalid DASHBOARD_USERS_JSON value", error);
    return [];
  }
}

function hashPassword(password: string) {
  return `sha256:${createHash("sha256").update(password, "utf8").digest("hex")}`;
}

function safeCompare(first: string, second: string) {
  const firstDigest = createHash("sha256").update(first).digest();
  const secondDigest = createHash("sha256").update(second).digest();
  return timingSafeEqual(firstDigest, secondDigest);
}

function verifyPassword(user: DashboardUserConfig, password: string) {
  if (user.passwordHash) {
    return safeCompare(hashPassword(password), user.passwordHash);
  }

  if (user.password) {
    return safeCompare(password, user.password);
  }

  return false;
}

function signPayload(payload: string) {
  return base64UrlEncode(createHmac("sha256", getDashboardAuthSecret()).update(payload).digest());
}

function createSessionCookieValue(session: DashboardSession) {
  const payload = base64UrlEncode(JSON.stringify(session));
  return `${payload}.${signPayload(payload)}`;
}

function parseSessionCookieValue(value: string): DashboardSession | null {
  const [payload, signature] = value.split(".");

  if (!payload || !signature || !safeCompare(signature, signPayload(payload))) {
    return null;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as DashboardSession;

    if (!session.username || !session.role || session.expiresAt < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function normalizeDashboardNextPath(value: FormDataEntryValue | string | null | undefined) {
  const nextPath = typeof value === "string" ? value : "";

  if (nextPath === "/dashboard" || nextPath.startsWith("/dashboard/")) {
    return nextPath;
  }

  return "/dashboard";
}

export function authenticateDashboardUser(username: string, password: string) {
  const user = getConfiguredUsers().find((configuredUser) => configuredUser.username === username);

  if (!user || !verifyPassword(user, password)) {
    return null;
  }

  return {
    username: user.username,
    role: user.role ?? "user",
  };
}

export async function setDashboardSession(user: { username: string; role: DashboardRole }) {
  const cookieStore = await cookies();
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;

  cookieStore.set(
    DASHBOARD_SESSION_COOKIE,
    createSessionCookieValue({
      username: user.username,
      role: user.role,
      expiresAt,
    }),
    {
      httpOnly: true,
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  );
}

export async function clearDashboardSession() {
  const cookieStore = await cookies();
  cookieStore.delete(DASHBOARD_SESSION_COOKIE);
}

export async function getDashboardSession() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(DASHBOARD_SESSION_COOKIE)?.value;

  if (!cookieValue) {
    return null;
  }

  return parseSessionCookieValue(cookieValue);
}

export async function requireDashboardSession(nextPath = "/dashboard") {
  const session = await getDashboardSession();

  if (!session) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return session;
}
