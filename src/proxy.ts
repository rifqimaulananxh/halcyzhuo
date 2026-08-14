import { NextResponse, type NextRequest } from "next/server";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1"]);

export default function proxy(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  if (
    LOCAL_HOSTS.has(hostname) ||
    hostname.endsWith(".local") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(hostname) ||
    hostname.includes(":")
  ) {
    return NextResponse.next();
  }

  const proto = request.headers.get("x-forwarded-proto");
  if (proto && proto !== "https") {
    const url = new URL(request.url);
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
