import styles from '../auth.module.scss';
import { useSignupForm } from '@/hooks/useAuthForm';
import { AuthInput } from '../../uikit/AuthInput/AuthInput';
import { PrimaryButton } from '../../uikit/Buttons/PrimaryButton/PrimaryButton';
import { ButtonTypes, InputTypes } from '@/types/enums';
import LoginIcon from '../../../../public/icons/login.svg';
import { ErrorMessage } from '@/components/uikit/ErrorMessage';
import { UI_MESSAGES } from '@/config/constants';

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isLoading,
    error,
  } = useSignupForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['authForm']}>
      {error && <ErrorMessage error={error} />}

      <div className={styles['authFormInputContainer']}>
        <p className={styles['authFormInputTitle']}>Username</p>
        <AuthInput
          pholder={UI_MESSAGES.PLACEHOLDERS.USERNAME}
          type={InputTypes.TEXT}
          error={errors.username?.message}
          {...register('username')}
        />
      </div>

      <div className={styles['authFormInputContainer']}>
        <p className={styles['authFormInputTitle']}>Email</p>
        <AuthInput
          pholder={UI_MESSAGES.PLACEHOLDERS.EMAIL}
          type={InputTypes.EMAIL}
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className={styles['authFormInputContainer']}>
        <p className={styles['authFormInputTitle']}>Password</p>
        <AuthInput
          pholder={UI_MESSAGES.PLACEHOLDERS.PASSWORD}
          type={InputTypes.PASSWORD}
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <div className={styles['authFormButton']}>
        <PrimaryButton
          content={
            isLoading
              ? UI_MESSAGES.BUTTONS.SIGNUP_LOADING
              : UI_MESSAGES.BUTTONS.SIGNUP
          }
          widthSize="100%"
          icon={<LoginIcon />}
          type={ButtonTypes.SUBMIT}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};
