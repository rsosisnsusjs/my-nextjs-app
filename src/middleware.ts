import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
 
type Session = typeof auth.$Infer.Session;
 
export async function middleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
		baseURL: request.nextUrl.origin,
		headers: {
			cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
		},
	});
 
	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url));
	} else if (session.user.role === "user") {
        return NextResponse.redirect(new URL("/", request.url));
    }
 
	return NextResponse.next();
}
 
export const config = {
    // do not forget to protect api bro
    // matcher: ["/api/product, /contact, /about, /dashboard/:path*"]
	matcher: ["/dashboard/:path*"], //protect all route in dashboard
};