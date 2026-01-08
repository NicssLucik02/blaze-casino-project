import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  LogoutResponse,
} from '@/types/auth';
import { API_CONFIG } from '@/config/constants';
import { apiService } from './api.servise';

export const authApi = {
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return apiService.post<RegisterResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      data
    );
  },

  login: async (data: LoginRequest): Promise<LoginResponse> => {
    return apiService.post<LoginResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      data
    );
  },

  refresh: async (data: RefreshTokenRequest): Promise<RefreshTokenResponse> => {
    return apiService.post<RefreshTokenResponse>(
      API_CONFIG.ENDPOINTS.AUTH.REFRESH,
      data
    );
  },

  logout: async (accessToken: string): Promise<LogoutResponse> => {
    return apiService.post<LogoutResponse>(
      API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
      undefined,
      accessToken
    );
  },
};
