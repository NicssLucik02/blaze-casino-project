import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginFormData,
  loginSchema,
  SignupFormData,
  signupSchema,
} from '@/schemas/authSchema';
import { useLogin, useRegister } from './useAuth';

export const useLoginForm = () => {
  const loginMutation = useLogin();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return {
    ...form,
    onSubmit,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message,
  };
};

export const useSignupForm = () => {
  const registerMutation = useRegister();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    registerMutation.mutate(data);
  };

  return {
    ...form,
    onSubmit,
    isLoading: registerMutation.isPending,
    error: registerMutation.error?.message,
  };
};
