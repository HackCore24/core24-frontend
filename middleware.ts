import { NextRequest, NextResponse } from "next/server";
import usersAPI from "./api/endpoints/users";
// import {verifyToken} from './lib/auth';

export async function middleware(req: NextRequest) {
  const { origin, pathname } = req.nextUrl;
  let user = null;
  try {
    user = await usersAPI.getMe();
  } catch (e) {}

  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/fonts") ||
    pathname.includes("/api/") ||
    pathname.includes("/logout") ||
    pathname.includes("/confirm-email") ||
    pathname.includes("/manifest.json") ||
    pathname.includes("/android") ||
    pathname.includes("/apple") ||
    pathname.includes("/favicon")
  ) {
    return NextResponse.next({ headers });
  }

  const redirectURLs = ["/login", "/register", "/reset-password"];

  if (Boolean(user) && redirectURLs.includes(pathname)) {
    return NextResponse.redirect(`${origin}/`, {
      headers,
    });
  }

  if (!Boolean(user) && !redirectURLs.includes(pathname)) {
    if (redirectURLs.includes(pathname) || pathname === "/") {
      return NextResponse.redirect(`${origin}/login`, {
        headers,
      });
    } else {
      return NextResponse.redirect(`${origin}/login?from=${pathname}`, {
        headers,
      });
    }
  }

  return NextResponse.next({ headers });
  // if (pathname === "/") {
  //   return NextResponse.redirect(`${origin}/profile`);
  // }
}
