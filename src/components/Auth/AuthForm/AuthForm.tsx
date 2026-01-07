'use client';
import { usePathname } from 'next/navigation';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';
import { AppRoutes } from '@/types/enums';

export const AuthForm = () => {
  const pathname = usePathname();

  return pathname === AppRoutes.SIGNUP ? <SignupForm /> : <LoginForm />;
};
