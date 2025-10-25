export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  SIGN_UP: '/auth/sign-up',
  FORGOT_PASSWORD: '/auth/forgot-password',
  FEED: '/feed',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const PRIVATE_ROUTES: string[] = [
  ROUTES.FEED,
  ROUTES.PROFILE,
  ROUTES.SETTINGS,
] as const;

export const AUTH_ROUTES: string[] = [
  ROUTES.LOGIN,
  ROUTES.SIGN_UP,
  ROUTES.AUTH,
  ROUTES.FORGOT_PASSWORD,
] as const;

export const DEFAULT_LOGIN_REDIRECT = ROUTES.FEED;
