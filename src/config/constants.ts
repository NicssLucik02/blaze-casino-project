export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_URL ||
    'https://backend-internship-js-hw-03-blaze-casino.onrender.com/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login',
      REFRESH: '/auth/refresh',
      LOGOUT: '/auth/logout',
    },
  },
  HEADERS: {
    CONTENT_TYPE: 'application/json',
    AUTHORIZATION_PREFIX: 'Bearer',
  },
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ID: 'user_id',
  USER_NAME: 'user_name',
} as const;

export const TOKEN_CONFIG = {
  ACCESS_TOKEN_EXPIRES: 1 / 96,
  REFRESH_TOKEN_EXPIRES: 7,
  USER_INFO_EXPIRES: 7,
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  COOKIE_SAME_SITE: 'strict' as const,
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 1000 * 60 * 5,
  RETRY_COUNT: 1,
  REFETCH_ON_WINDOW_FOCUS: false,
  MUTATION_RETRY: false,
  DEVTOOLS_INITIAL_OPEN: false,
} as const;

export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/',
  PROFILE: '/profile',
} as const;

export const PROTECTED_ROUTES = [ROUTES.DASHBOARD, ROUTES.PROFILE] as const;
export const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.SIGNUP] as const;

export const VALIDATION = {
  USERNAME: {
    MIN: 3,
    MAX: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LOGIN: 6,
    MIN_SIGNUP: 8,
    REQUIRES_UPPERCASE: /[A-Z]/,
    REQUIRES_NUMBER: /[0-9]/,
  },
  EMAIL: {
    MIN: 1,
  },
} as const;

export const FORM_CONFIG = {
  MODE: 'onSubmit' as const,
  REVALIDATE_MODE: 'onChange' as const,
} as const;

export const QUERY_KEYS = {
  USER: ['user'] as const,
} as const;

export const LOGGER_CONFIG = {
  ENABLED: process.env.NODE_ENV !== 'production',
} as const;

export const MIDDLEWARE_CONFIG = {
  MATCHER: ['/dashboard/:path*', '/profile/:path*', '/login', '/signup'],
} as const;

export const CHAT_CONFIG = {
  VIRTUALIZER: {
    ESTIMATE_SIZE: 166,
    OVERSCAN: 30,
  },
  PADDING: {
    LEFT: 25,
    RIGHT: 5,
  },
} as const;
