export const VALIDATION_MESSAGES = {
  EMAIL: {
    REQUIRED: 'Email is required',
    INVALID: 'Invalid email address',
  },
  PASSWORD: {
    MIN_LOGIN: 'Password must be at least 6 characters',
    MIN_SIGNUP: 'Password must be at least 8 characters',
    REQUIRES_UPPERCASE: 'Password must contain at least one uppercase letter',
    REQUIRES_NUMBER: 'Password must contain at least one number',
  },
  USERNAME: {
    MIN: 'Username must be at least 3 characters',
    MAX: 'Username must be less than 20 characters',
    PATTERN: 'Only letters, numbers and underscore allowed',
  },
} as const;

export const UI_MESSAGES = {
  PLACEHOLDERS: {
    EMAIL: 'Enter Email',
    PASSWORD: 'Enter password',
    USERNAME: 'Enter username',
  },
  BUTTONS: {
    LOGIN: 'Log In',
    SIGNUP: 'Sign Up',
    SIGNUP_LOADING: 'Creating account...',
    LOGOUT: 'Log Out',
  },
  AUTH_BOTTOM: {
    ALREADY_HAVE_ACCOUNT: 'Already have an account? Login',
    NO_ACCOUNT: "Don't have an account? Register",
    DATA_STORAGE: 'Your account data is stored locally in your browser',
  },
  ERRORS: {
    TOO_MANY_ATTEMPTS:
      'Too many login attempts. Please wait a minute and try again.',
    NO_ACCESS_TOKEN: 'No access token',
    NO_REFRESH_TOKEN: 'No refresh token',
  },
  AUTH_MODAL: {
    TITLE: 'Blaze Casino',
    SUBTITLE: 'Welcome back!',
    LOGO_ALT: 'Blaze Casino Logo',
  },
} as const;
