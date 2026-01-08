export interface RegisterRequestData {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface RefreshTokenRequestData {
  refreshToken: string;
}

export type RegisterRequest = RegisterRequestData & { type: 'register' };
export type LoginRequest = LoginRequestData & { type: 'login' };
export type RefreshTokenRequest = RefreshTokenRequestData & { type: 'refresh' };

export type AuthRequest = RegisterRequest | LoginRequest | RefreshTokenRequest;

export interface RegisterResponseData {
  username: string;
  email: string;
}

export interface LoginResponseData {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
}

export interface RefreshTokenResponseData {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export interface LogoutResponseData {
  message: string;
}

export type RegisterResponse = RegisterResponseData & { type: 'register' };
export type LoginResponse = LoginResponseData & { type: 'login' };
export type RefreshTokenResponse = RefreshTokenResponseData & {
  type: 'refresh';
};
export type LogoutResponse = LogoutResponseData & { type: 'logout' };

export type AuthResponse =
  | RegisterResponse
  | LoginResponse
  | RefreshTokenResponse
  | LogoutResponse;

export interface User {
  id: string;
  username: string;
  email: string;
}
