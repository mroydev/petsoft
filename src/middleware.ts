import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

/**
 * Middleware function to check if the user is authenticated.
 * Redirects unauthenticated users to the sign-in page and
 * redirects authenticated users away from sign-in and sign-up pages to the dashboard.
 * @param request Next.js request object
 * @returns Next.js response object or continues to the next middleware
 */
export default async function middleware(request: NextRequest) {
  // Fetch the session information using the auth() function.
  const session = await auth();

  // If the user is not authenticated
  if (!session) {
    if (
      request.nextUrl.pathname !== '/' &&
      request.nextUrl.pathname !== '/sign-in' &&
      request.nextUrl.pathname !== '/sign-up'
    ) {
      // Redirect to sign-in page for unauthorized access to other pages
      const absoluteURL = new URL('/sign-in', request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    // Continue to the next middleware or route handler for allowed pages
    return NextResponse.next();
  }

  // If the user is authenticated but does not have hasAccess token
  if (session && !session.user.hasAccess) {
    if (
      request.nextUrl.pathname !== '/' &&
      (request.nextUrl.pathname === '/sign-in' ||
        request.nextUrl.pathname === '/sign-up' ||
        request.nextUrl.pathname === '/dashboard' ||
        request.nextUrl.pathname === '/account')
    ) {
      const absoluteURL = new URL('/payment', request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // If the user is authenticated and has hasAccess token
  if (session.user.hasAccess) {
    // Redirect away from sign-in and sign-up pages to dashboard
    if (
      request.nextUrl.pathname === '/sign-in' ||
      request.nextUrl.pathname === '/sign-up'
    ) {
      const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // Continue to the next middleware or route handler.
  return NextResponse.next();
}

export const config = {
  // Matcher configuration to exclude specific routes from middleware processing.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
