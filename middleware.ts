import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    try {
        // First try to get session cookie (faster check)
        const sessionCookie = getSessionCookie(request);
        
        // Check if trying to access protected dashboard routes
        if (pathname.startsWith('/dashboard')) {
            if (!sessionCookie) {
                // Redirect to login with a redirect parameter
                const loginUrl = new URL('/login', request.url);
                loginUrl.searchParams.set('redirect', pathname);
                loginUrl.searchParams.set('message', 'login-required');
                
                return NextResponse.redirect(loginUrl);
            }
        }

        // If user has session cookie and tries to access auth pages, redirect to dashboard
        if (sessionCookie && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // If there's an error, fall back to the original behavior
        console.error('Middleware session error:', error);
        
        if (pathname.startsWith('/dashboard')) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            loginUrl.searchParams.set('message', 'login-required');
            
            return NextResponse.redirect(loginUrl);
        }
        
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/signup',
        '/'
    ],
};
