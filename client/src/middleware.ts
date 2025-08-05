import { NextRequest, NextResponse } from 'next/server';

import { ROUTES } from './shared/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === ROUTES.AUTH || pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
