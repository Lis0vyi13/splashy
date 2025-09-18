import { NextRequest, NextResponse } from 'next/server';

import { ROUTES } from './shared/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === ROUTES.AUTH || pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/auth/:path*'],
};
