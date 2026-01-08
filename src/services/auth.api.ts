import { apiService } from '@/services/api.serviсe';
import { API_CONFIG } from '@/config/constants';
import {
  RegisterRequestData,
  RegisterResponseData,
  LoginRequestData,
  LoginResponseData,
  RefreshTokenRequestData,
  RefreshTokenResponseData,
  LogoutResponseData,
} from '@/types/auth';

class AuthApi {
  async register(data: RegisterRequestData): Promise<RegisterResponseData> {
    return apiService.post<RegisterResponseData>(
      API_CONFIG.ENDPOINTS.AUTH.REGISTER,
      data
    );
  }

  async login(data: LoginRequestData): Promise<LoginResponseData> {
    return apiService.post<LoginResponseData>(
      API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      data
    );
  }

  async refresh(
    data: RefreshTokenRequestData
  ): Promise<RefreshTokenResponseData> {
    return apiService.post<RefreshTokenResponseData>(
      API_CONFIG.ENDPOINTS.AUTH.REFRESH,
      data
    );
  }

  async logout(accessToken: string): Promise<LogoutResponseData> {
    return apiService.post<LogoutResponseData>(
      API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
      undefined,
      accessToken
    );
  }
}

export const authApi = new AuthApi();
