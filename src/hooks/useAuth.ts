import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginRequest, RegisterRequest } from '@/types/auth';
import { authApi } from '@/services/auth.service';
import { tokenStorage } from '@/services/token.service';
import { AppRoutes } from '@/types/enums';

const handleAuthSuccess = (
  response: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    userName: string;
  },
  router: ReturnType<typeof useRouter>,
  queryClient: ReturnType<typeof useQueryClient>
) => {
  tokenStorage.setAccessToken(response.accessToken);
  tokenStorage.setRefreshToken(response.refreshToken);
  tokenStorage.setUserInfo(response.userId, response.userName);

  queryClient.invalidateQueries({ queryKey: ['user'] });

  router.push(AppRoutes.DASHBOARD);
};

const handleLogoutCleanup = (
  router: ReturnType<typeof useRouter>,
  queryClient: ReturnType<typeof useQueryClient>
) => {
  tokenStorage.clearAll();
  queryClient.clear();
  router.push(AppRoutes.LOGIN);
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: response => handleAuthSuccess(response, router, queryClient),
    onError: (error: Error) => {
      console.error('Login error:', error);
    },
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      await authApi.register(data);
      return authApi.login({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: response => handleAuthSuccess(response, router, queryClient),
    onError: (error: Error) => {
      console.error('Register error:', error);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const accessToken = tokenStorage.getAccessToken();
      if (!accessToken) throw new Error('No access token');
      return authApi.logout(accessToken);
    },
    onSuccess: () => handleLogoutCleanup(router, queryClient),
    onError: (error: Error) => {
      console.error('Logout error:', error);
      handleLogoutCleanup(router, queryClient);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async () => {
      const refreshToken = tokenStorage.getRefreshToken();
      if (!refreshToken) throw new Error('No refresh token');
      return authApi.refresh({ refreshToken });
    },
    onSuccess: response => {
      tokenStorage.setAccessToken(response.accessToken);
      tokenStorage.setRefreshToken(response.refreshToken);
    },
    onError: () => {
      tokenStorage.clearAll();
    },
  });
};
