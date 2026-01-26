import { NextResponse, type NextRequest } from 'next/server';
import { STORAGE_KEYS, ROUTES } from '@/config/constants';

export function middleware(request: NextRequest) {
  const token = request.cookies.get(STORAGE_KEYS.ACCESS_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    if (!token) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/profile') && !token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if ((pathname === ROUTES.LOGIN || pathname === ROUTES.SIGNUP) && token) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/signup'],
};
