import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  STORAGE_KEYS,
  PROTECTED_ROUTES,
  AUTH_ROUTES,
  ROUTES,
} from '@/config/constants';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  console.log('[Middleware] pathname:', pathname, 'token:', !!token);

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.includes(pathname as any);

  if (pathname === '/') {
    const redirectUrl = token ? ROUTES.DASHBOARD : ROUTES.LOGIN;
    console.log('[Middleware] Root → redirect to:', redirectUrl);

    if (pathname !== redirectUrl) {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  if (isProtectedRoute && !token) {
    console.log('[Middleware] Protected route, no token → /login');

    if (pathname !== ROUTES.LOGIN) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  if (isAuthRoute && token) {
    console.log('[Middleware] Auth route with token → /dashboard');

    if (pathname !== ROUTES.DASHBOARD) {
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/profile/:path*', '/login', '/signup'],
};
