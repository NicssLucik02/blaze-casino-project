'use client';
import { usePathname } from 'next/navigation';
import styles from './auth.module.scss';
import Link from 'next/link';
import { AppRoutes } from '@/types/enums';

export const AuthBottom = () => {
  const pathname = usePathname();

  return (
    <div className={styles['authBottom']}>
      <Link
        href={
          pathname === AppRoutes.SIGNUP ? AppRoutes.LOGIN : AppRoutes.SIGNUP
        }
        className={styles['authBottomLink']}
      >
        {pathname === AppRoutes.SIGNUP
          ? 'Already have an account? Login'
          : `Don't have an account? Register`}
      </Link>

      <div className={styles['authBottomDivider']} />

      <p className={styles['authBottomText']}>
        Your account data is stored locally in your browser
      </p>
    </div>
  );
};
