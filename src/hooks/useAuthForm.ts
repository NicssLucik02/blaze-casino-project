import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LoginFormData,
  loginSchema,
  SignupFormData,
  signupSchema,
} from '@/schemas/authSchema';

export const useLoginForm = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (_data: LoginFormData) => {};

  return { ...form, onSubmit };
};

export const useSignupForm = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (_data: SignupFormData) => {};

  return { ...form, onSubmit };
};
