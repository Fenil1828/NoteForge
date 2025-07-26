import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Get session using the auth API
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Check if trying to access protected dashboard routes
    if (pathname.startsWith('/dashboard')) {
        if (!session) {
            // Redirect to login with a redirect parameter
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            loginUrl.searchParams.set('message', 'login-required');
            
            return NextResponse.redirect(loginUrl);
        }
    }

    // Removed the automatic redirect logic for authenticated users
    // This allows users to access login/signup pages even when logged in
    // Useful for cases like incomplete email verification

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        // Removed '/login', '/signup', '/' from matcher since we're not handling redirects for them
    ],
};
