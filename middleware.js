import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    if (
        pathname === "/login" ||
        pathname.startsWith("/api/auth")
    ) {
        return NextResponse.next();
    }

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/dashboard") && token.role !== "admin") {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/redirect",
        "/dashboard/:path*",
        "/home/:path*",
    ],
};
