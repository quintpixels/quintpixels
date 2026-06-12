import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/auth/session";

const PROTECTED_PREFIXES = [
  "/pixels/dashboard",
  "/pixels/hero",
  "/pixels/services",
  "/pixels/portfolio",
  "/pixels/products",
  "/pixels/team",
  "/pixels/testimonials",
  "/pixels/forms",
  "/pixels/messages",
  "/pixels/settings",
  "/pixels/admins",
  "/pixels/seo",
];

const PUBLIC_ADMIN_PATHS = ["/pixels/login", "/pixels/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  
  if (!pathname.startsWith("/pixels")) return NextResponse.next();

  const token = request.cookies.get("pix_admin_session")?.value;
  const session = token ? await decrypt(token) : null;

  const isPublicPath = PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p));
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  
  if (isPublicPath && session) {
    return NextResponse.redirect(new URL("/pixels/dashboard", request.url));
  }

  
  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/pixels/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pixels/:path*"],
};
