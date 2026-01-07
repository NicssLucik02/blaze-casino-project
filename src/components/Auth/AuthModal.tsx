import Image from 'next/image';
import styles from './auth.module.scss';
import { AuthForm } from './AuthForm/AuthForm';
import { AuthBottom } from './AuthBottom';

export const AuthModal = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['auth']}>
        <div className={styles['authContainer']}>
          <div className={styles['authTop']}>
            <div className={styles['authTopLogo']}>
              <Image
                src="/icons/logo.svg"
                alt="Blaze Casino Logo"
                width={40}
                height={40}
              />
            </div>

            <div className={styles['authTopText']}>
              <h1 className={styles['authTopTitle']}>Blaze Casino</h1>
              <h2 className={styles['authTopSubtitle']}>Welcome back!</h2>
            </div>
          </div>

          <AuthForm />

          <AuthBottom />
        </div>
      </div>
    </div>
  );
};
