import { STORAGE_KEYS, TOKEN_CONFIG } from '@/config/constants';
import Cookies from 'js-cookie';

class TokenStorageService {
  setAccessToken(token: string): void {
    Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, token, {
      expires: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRES,
      secure: TOKEN_CONFIG.COOKIE_SECURE,
      sameSite: TOKEN_CONFIG.COOKIE_SAME_SITE,
    });
  }

  getAccessToken(): string | undefined {
    return Cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
  }

  private removeAccessToken(): void {
    Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
  }

  setRefreshToken(token: string): void {
    Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, token, {
      expires: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRES,
      secure: TOKEN_CONFIG.COOKIE_SECURE,
      sameSite: TOKEN_CONFIG.COOKIE_SAME_SITE,
    });
  }

  getRefreshToken(): string | undefined {
    return Cookies.get(STORAGE_KEYS.REFRESH_TOKEN);
  }

  private removeRefreshToken(): void {
    Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setUserInfo(userId: string, userName: string): void {
    Cookies.set(STORAGE_KEYS.USER_ID, userId, {
      expires: TOKEN_CONFIG.USER_INFO_EXPIRES,
    });
    Cookies.set(STORAGE_KEYS.USER_NAME, userName, {
      expires: TOKEN_CONFIG.USER_INFO_EXPIRES,
    });
  }

  getUserId(): string | undefined {
    return Cookies.get(STORAGE_KEYS.USER_ID);
  }

  getUserName(): string | undefined {
    return Cookies.get(STORAGE_KEYS.USER_NAME);
  }

  private removeUserInfo(): void {
    Cookies.remove(STORAGE_KEYS.USER_ID);
    Cookies.remove(STORAGE_KEYS.USER_NAME);
  }

  clearAll(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
    this.removeUserInfo();
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const tokenStorage = new TokenStorageService();
