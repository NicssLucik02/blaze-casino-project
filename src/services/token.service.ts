import { STORAGE_KEYS, TOKEN_CONFIG } from '@/config/constants';
import Cookies from 'js-cookie';

export const tokenStorage = {
  setAccessToken: (token: string) => {
    Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, token, {
      expires: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRES,
      secure: TOKEN_CONFIG.COOKIE_SECURE,
      sameSite: TOKEN_CONFIG.COOKIE_SAME_SITE,
    });
  },

  getAccessToken: (): string | undefined => {
    return Cookies.get(STORAGE_KEYS.ACCESS_TOKEN);
  },

  removeAccessToken: () => {
    Cookies.remove(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setRefreshToken: (token: string) => {
    Cookies.set(STORAGE_KEYS.REFRESH_TOKEN, token, {
      expires: TOKEN_CONFIG.REFRESH_TOKEN_EXPIRES,
      secure: TOKEN_CONFIG.COOKIE_SECURE,
      sameSite: TOKEN_CONFIG.COOKIE_SAME_SITE,
    });
  },

  getRefreshToken: (): string | undefined => {
    return Cookies.get(STORAGE_KEYS.REFRESH_TOKEN);
  },

  removeRefreshToken: () => {
    Cookies.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setUserInfo: (userId: string, userName: string) => {
    Cookies.set(STORAGE_KEYS.USER_ID, userId, {
      expires: TOKEN_CONFIG.USER_INFO_EXPIRES,
    });
    Cookies.set(STORAGE_KEYS.USER_NAME, userName, {
      expires: TOKEN_CONFIG.USER_INFO_EXPIRES,
    });
  },

  getUserId: (): string | undefined => {
    return Cookies.get(STORAGE_KEYS.USER_ID);
  },

  getUserName: (): string | undefined => {
    return Cookies.get(STORAGE_KEYS.USER_NAME);
  },

  removeUserInfo: () => {
    Cookies.remove(STORAGE_KEYS.USER_ID);
    Cookies.remove(STORAGE_KEYS.USER_NAME);
  },

  clearAll: () => {
    tokenStorage.removeAccessToken();
    tokenStorage.removeRefreshToken();
    tokenStorage.removeUserInfo();
  },
};
