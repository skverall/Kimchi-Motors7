import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { getServiceSupabase } from "@/lib/supabaseAdmin";

function parseBearerToken(request: Request): string | null {
  const header = request.headers.get("authorization") || request.headers.get("Authorization");
  if (!header) return null;

  const parts = header.split(" ");
  if (parts.length !== 2) return null;

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return null;

  return token.trim() || null;
}

function isAdminUser(user: User): boolean {
  const configuredAdmins = (process.env.ADMIN_EMAILS || process.env.NEXT_PUBLIC_ADMIN_EMAIL || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (configuredAdmins.length === 0) {
    return true; // No admin list configured; allow any authenticated user.
  }

  const email = (user.email || "").toLowerCase();
  return configuredAdmins.includes(email);
}

export async function assertAdminRequest(request: Request) {
  const token = parseBearerToken(request);
  if (!token) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data?.user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!isAdminUser(data.user)) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { ok: true as const, user: data.user };
}
