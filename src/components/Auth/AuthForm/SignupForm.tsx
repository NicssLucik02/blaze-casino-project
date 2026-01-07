'use client';
import { useSignupForm } from '@/hooks/useAuthForm';
import { AuthInput } from '../../uikit/AuthInput/AuthInput';
import { PrimaryButton } from '../../uikit/Buttons/PrimaryButton/PrimaryButton';
import styles from '../auth.module.scss';
import { ButtonTypes, InputTypes } from '@/types/enums';
import LoginIcon from '../../../../public/icons/login.svg';

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    onSubmit,
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['authForm']}>
      <div className={styles['authFormInputContainer']}>
        <p className={styles['authFormInputTitle']}>Username</p>
        <AuthInput
          pholder="Enter username"
          type={InputTypes.TEXT}
          error={errors.username?.message}
          {...register('username')}
        />
      </div>

      <div className={styles['authFormInputContainer']}>
        <p className={styles['authFormInputTitle']}>Email</p>
        <AuthInput
          pholder="Enter Email"
          type={InputTypes.EMAIL}
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className={styles['authFormInputContainer']}>
        <p className={styles['authFormInputTitle']}>Password</p>
        <AuthInput
          pholder="Enter password"
          type={InputTypes.PASSWORD}
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <div className={styles['authFormButton']}>
        <PrimaryButton
          content="Sign Up"
          widthSize="100"
          icon={<LoginIcon />}
          type={ButtonTypes.SUBMIT}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};
