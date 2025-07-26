import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    try {
        // Get session using the auth API with request headers
        const session = await auth.api.getSession({
            headers: request.headers
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

        return NextResponse.next();
    } catch (error) {
        // If there's an error getting the session, treat as unauthenticated
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
    matcher: ['/dashboard/:path*'],
};
