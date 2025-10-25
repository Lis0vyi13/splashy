import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PRIVATE_ROUTES,
  ROUTES,
} from './shared/config';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isHomePage = pathname === '/';

  const isPrivate = PRIVATE_ROUTES.some((route) => pathname.startsWith(route));
  if (isPrivate && !refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  if ((isAuthPage || isHomePage) && refreshToken) {
    const url = req.nextUrl.clone();
    url.pathname = DEFAULT_LOGIN_REDIRECT;
    return NextResponse.redirect(url);
  }

  if (isHomePage) {
    const url = req.nextUrl.clone();
    url.pathname = ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
