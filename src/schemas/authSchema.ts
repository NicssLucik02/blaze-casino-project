import { z } from 'zod';
import { VALIDATION, VALIDATION_MESSAGES } from '@/config/constants';

export const loginSchema = z.object({
  email: z
    .string()
    .min(VALIDATION.EMAIL.MIN, VALIDATION_MESSAGES.EMAIL.REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL.INVALID),
  password: z
    .string()
    .min(VALIDATION.PASSWORD.MIN_LOGIN, VALIDATION_MESSAGES.PASSWORD.MIN_LOGIN),
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(VALIDATION.USERNAME.MIN, VALIDATION_MESSAGES.USERNAME.MIN)
    .max(VALIDATION.USERNAME.MAX, VALIDATION_MESSAGES.USERNAME.MAX)
    .regex(VALIDATION.USERNAME.PATTERN, VALIDATION_MESSAGES.USERNAME.PATTERN),
  email: z
    .string()
    .min(VALIDATION.EMAIL.MIN, VALIDATION_MESSAGES.EMAIL.REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL.INVALID),
  password: z
    .string()
    .min(
      VALIDATION.PASSWORD.MIN_SIGNUP,
      VALIDATION_MESSAGES.PASSWORD.MIN_SIGNUP
    )
    .regex(
      VALIDATION.PASSWORD.REQUIRES_UPPERCASE,
      VALIDATION_MESSAGES.PASSWORD.REQUIRES_UPPERCASE
    )
    .regex(
      VALIDATION.PASSWORD.REQUIRES_NUMBER,
      VALIDATION_MESSAGES.PASSWORD.REQUIRES_NUMBER
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
