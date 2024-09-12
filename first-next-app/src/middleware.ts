import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("Middleware triggered...");

  const url = request.nextUrl.clone();
  const isLoggedIn = request.cookies.get("loggedIn");

  // Redirect logged-in users away from the sign-in and sign-up pages
  if (isLoggedIn) {
    if (url.pathname === '/users/sign-in' || url.pathname === '/users/sign-up') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    // Redirect unauthenticated users to the sign-in page if they are not accessing the sign-up page
    if (url.pathname !== '/users/sign-in' && url.pathname !== '/users/sign-up') {
      return NextResponse.redirect(new URL('/users/sign-in', request.url));
    }
  }

  // Allow the request to proceed if none of the conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/supplier/:path*',
    '/order/:path*',
    '/product/:path*',
    '/dashboard',
    '/users/sign-in',
    '/users/sign-up',
  ], // Apply middleware to the specified routes
};
