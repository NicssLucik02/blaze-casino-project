import { NextResponse, type NextRequest } from 'next/server';
import { STORAGE_KEYS, ROUTES } from '@/config/constants';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  console.log('[Middleware] pathname:', pathname, 'hasToken:', !!token);

  if (pathname === '/') {
    if (!token) {
      console.log('[Middleware] Root without token → /login');
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    console.log('[Middleware] Root with token → show dashboard');
    return NextResponse.next();
  }

  if (pathname.startsWith('/profile') && !token) {
    console.log('[Middleware] Profile without token → /login');
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if ((pathname === ROUTES.LOGIN || pathname === ROUTES.SIGNUP) && token) {
    console.log('[Middleware] Auth route with token → /');
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  console.log('[Middleware] Pass through');
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/signup'],
};
