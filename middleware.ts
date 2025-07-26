// import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";
 
// export async function middleware(request: NextRequest) {
// 	const sessionCookie = getSessionCookie(request);
 
// 	if (!sessionCookie) {
// 		return NextResponse.redirect(new URL("/", request.url));
// 	}
 
// 	return NextResponse.next();
// }
 
// export const config = {
// 	matcher: ["/dashboard/:path*"], // Specify the routes the middleware applies to
// };
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;
 
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
 
    // If user is logged in and tries to access auth pages, redirect to dashboard
    if (sessionCookie && (pathname === '/login' || pathname === '/signup' || pathname === '/')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
 
    return NextResponse.next();
}
 
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/signup',
        '/'
    ],
};
