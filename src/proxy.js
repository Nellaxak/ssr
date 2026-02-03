// middleware.ts (or proxy.ts in Next.js 16+)
import { NextResponse, NextRequest } from 'next/server';
//import Item from './app/Item';
//import type { NextRequest } from 'next/server';

export function proxy(request) { // Function might be named 'proxy' in Next.js 16+
    // Assume a cookie is set for authenticated users
    //const isAuthenticated = request.cookies.has('authenticated');
    //console.log('middleware request.method', request.method)

    // If user is not authenticated and trying to access a protected route, redirect to login
    /*if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }*/

    // Continue to the intended route if authenticated or accessing a public page
    return NextResponse.next();
}

// Configuration to specify which paths the middleware should apply to
export const config = {
    matcher: ['/:path*','/dashboard/:path*', '/about/:path*'], // Applies to /dashboard and /about pages
};
