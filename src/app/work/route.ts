import { NextResponse } from "next/server";

// Use an absolute URL for redirects in app route handlers
export function GET(request: Request) {
  // Redirect /work to the home page
  return NextResponse.redirect(new URL("/", request.url));
}
