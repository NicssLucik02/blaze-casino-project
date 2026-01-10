import Image from 'next/image';
import styles from './auth.module.scss';
import { AuthForm } from './AuthForm/AuthForm';
import { AuthBottom } from './AuthBottom/AuthBottom';
import { UI_MESSAGES } from '@/config/constants';

export const AuthModal = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['auth']}>
        <div className={styles['authContainer']}>
          <div className={styles['authTop']}>
            <div className={styles['authTopLogo']}>
              <Image
                src="/icons/logo.svg"
                alt={UI_MESSAGES.AUTH_MODAL.LOGO_ALT}
                className={styles['authTopLogoIcon']}
                width={40}
                height={40}
              />
            </div>

            <div className={styles['authTopText']}>
              <h1 className={styles['authTopTitle']}>
                {UI_MESSAGES.AUTH_MODAL.TITLE}
              </h1>
              <h2 className={styles['authTopSubtitle']}>
                {UI_MESSAGES.AUTH_MODAL.SUBTITLE}
              </h2>
            </div>
          </div>

          <AuthForm />

          <AuthBottom />
        </div>
      </div>
    </div>
  );
};
