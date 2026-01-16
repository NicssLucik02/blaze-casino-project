import { QueryClient } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { LoginRequestData, RegisterRequestData } from '@/types/auth';
import { tokenStorage } from '@/services/token.service';
import { authApi } from '@/services/auth.api';
import { ROUTES, QUERY_KEYS, LOGGER_CONFIG } from '@/config/constants';
import { socketService } from './socket.service';
import { UI_MESSAGES } from '@/config/uiMessages';

type AuthSuccessResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  userName: string;
};

class AuthFlowService {
  handleAuthSuccess(
    response: AuthSuccessResponse,
    queryClient: QueryClient,
    router: AppRouterInstance
  ): void {
    tokenStorage.setAccessToken(response.accessToken);
    tokenStorage.setRefreshToken(response.refreshToken);
    tokenStorage.setUserInfo(response.userId, response.userName);

    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER });
    router.push(ROUTES.DASHBOARD);
  }

  handleLogoutCleanup(
    queryClient: QueryClient,
    router: AppRouterInstance
  ): void {
    socketService.disconnect();
    tokenStorage.clearAll();
    queryClient.clear();
    router.push(ROUTES.LOGIN);
  }

  handleAuthError(error: Error, operation: string): void {
    if (LOGGER_CONFIG.ENABLED) {
      console.error(`${operation} error:`, error);
    }
  }

  async executeLogin(data: LoginRequestData): Promise<AuthSuccessResponse> {
    return authApi.login(data);
  }

  async executeRegister(
    data: RegisterRequestData
  ): Promise<AuthSuccessResponse> {
    await authApi.register(data);
    return authApi.login({
      email: data.email,
      password: data.password,
    });
  }

  async executeLogout(): Promise<void> {
    const accessToken = tokenStorage.getAccessToken();
    if (!accessToken) {
      throw new Error(UI_MESSAGES.ERRORS.NO_ACCESS_TOKEN);
    }
    await authApi.logout(accessToken);
  }

  async executeRefreshToken(): Promise<{
    accessToken: string;
    refreshToken: string;
    userId: string;
  }> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error(UI_MESSAGES.ERRORS.NO_REFRESH_TOKEN);
    }
    return authApi.refresh({ refreshToken });
  }

  handleRefreshSuccess(response: {
    accessToken: string;
    refreshToken: string;
  }): void {
    tokenStorage.setAccessToken(response.accessToken);
    tokenStorage.setRefreshToken(response.refreshToken);
  }
}

export const authFlowService = new AuthFlowService();
