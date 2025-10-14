    // middleware.ts
    import { NextResponse, NextRequest } from 'next/server'
    //export function middleware(request: NextRequest) {

    export function middleware(request) {
      console.log('middleware',request.url)
      //const isAuthenticated = /* your authentication logic here, e.g., check cookie or token */

      // Example: Redirect to login page if not authenticated and trying to access a protected route
      //if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/categories', request.url))
      //}

      // Allow the request to proceed if no redirect is needed
      //return NextResponse.next()
    }

    // Optional: Define a matcher to specify which paths the middleware should run on
    export const config = {
      matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - login (login page itself)
         */
        '/((?!_next/static|_next/image|favicon.ico|login).*)',
      ],
    }