// middleware.js or middleware.ts
import { NextResponse } from 'next/server';
import { linkedList } from './app/LinkedList'

export function middleware(request) {
  //console.log('middleware', linkedList)
  const queryParams = request.nextUrl.searchParams;
  const pageUrl = queryParams.get('page');
  console.log('Page URL param:', pageUrl);
  if (request.method === 'POST' && Number(pageUrl) === 0) {
    // You can add additional logic here, e.g., rate limiting or authentication checks
    console.log('mstop')
    // To stop the request, return a response immediately. 
    // This prevents the request from reaching the intended API route or page.
    return new NextResponse(JSON.stringify({ message: 'POST requests are not allowed for this route' }), {
      status: 400, // Use an appropriate HTTP status code (e.g., 400, 401, 403, 405)
      headers: {
        'content-type': 'application/json',
      },
    });
  }
  // Assume a user is authenticated if they have a 'session' cookie
  /*const isAuthenticated = request.cookies.has('session');
  const loginUrl = new URL('/login', request.url);

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect them to the login page
    return NextResponse.redirect(loginUrl);
  }*/

  // If authenticated, continue with the request to the original destination
  return NextResponse.next();
}

// You can use a matcher to specify which paths the middleware should run on
// This is more efficient than running on every single request
export const config = {
  matcher: ['/', '/categories'
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    /*'/((?!api|_next/static|_next/image|favicon.ico).*)',*/
  ],
};
