'use client';
import { usePathname } from 'next/navigation';
import styles from './authBottom.module.scss';
import Link from 'next/link';
import { ROUTES, UI_MESSAGES } from '@/config/constants';

export const AuthBottom = () => {
  const pathname = usePathname();

  return (
    <div className={styles['authBottom']}>
      <Link
        href={pathname === ROUTES.SIGNUP ? ROUTES.LOGIN : ROUTES.SIGNUP}
        className={styles['authBottomLink']}
      >
        {pathname === ROUTES.SIGNUP
          ? UI_MESSAGES.AUTH_BOTTOM.ALREADY_HAVE_ACCOUNT
          : UI_MESSAGES.AUTH_BOTTOM.NO_ACCOUNT}
      </Link>

      <div className={styles['authBottomDivider']} />

      <p className={styles['authBottomText']}>
        {UI_MESSAGES.AUTH_BOTTOM.DATA_STORAGE}
      </p>
    </div>
  );
};
