import styles from '../auth.module.scss';
import { useLoginForm } from '@/hooks/useAuthForm';
import { AuthInput } from '../../uikit/AuthInput/AuthInput';
import { PrimaryButton } from '../../uikit/Buttons/PrimaryButton/PrimaryButton';
import { ButtonTypes, InputTypes } from '@/types/enums';
import LoginIcon from '../../../../public/icons/login.svg';
import { ErrorMessage } from '@/components/uikit/ErrorMessage';
import { ClipLoader } from 'react-spinners';
import { UI_MESSAGES } from '@/config/constants';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isLoading,
    error,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles['authForm']}>
      {error && <ErrorMessage error={error} />}

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
          content={UI_MESSAGES.BUTTONS.LOGIN}
          widthSize="100%"
          icon={isLoading ? <ClipLoader /> : <LoginIcon />}
          type={ButtonTypes.SUBMIT}
          disabled={isLoading}
        />
      </div>
    </form>
  );
};
