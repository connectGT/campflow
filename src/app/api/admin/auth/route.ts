import { NextResponse } from "next/server";
import { createHmac } from "crypto";

const ADMIN_USER = process.env.ADMIN_USERNAME || "";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "";
const ADMIN_SECRET = process.env.ADMIN_JWT_SECRET || "change-this-in-production";

// Token is a HMAC of username+password — changes if either env var changes
export function makeAdminToken() {
  return createHmac("sha256", ADMIN_SECRET)
    .update(ADMIN_USER + ":" + ADMIN_PASS)
    .digest("hex");
}

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!ADMIN_USER || !ADMIN_PASS) {
    return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 });
  }

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = makeAdminToken();
  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
