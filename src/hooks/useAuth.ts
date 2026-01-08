'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { LoginRequestData, RegisterRequestData } from '@/types/auth';
import { tokenStorage } from '@/services/token.service';
import { authFlowService } from '@/services/auth-flow.service';

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequestData) => authFlowService.executeLogin(data),
    onSuccess: response =>
      authFlowService.handleAuthSuccess(response, queryClient, router),
    onError: (error: Error) => authFlowService.handleAuthError(error, 'Login'),
  });
};

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterRequestData) =>
      authFlowService.executeRegister(data),
    onSuccess: response =>
      authFlowService.handleAuthSuccess(response, queryClient, router),
    onError: (error: Error) =>
      authFlowService.handleAuthError(error, 'Register'),
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authFlowService.executeLogout(),
    onSuccess: () => authFlowService.handleLogoutCleanup(queryClient, router),
    onError: (error: Error) => {
      authFlowService.handleAuthError(error, 'Logout');
      authFlowService.handleLogoutCleanup(queryClient, router);
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => authFlowService.executeRefreshToken(),
    onSuccess: response => authFlowService.handleRefreshSuccess(response),
    onError: () => {
      tokenStorage.clearAll();
    },
  });
};
