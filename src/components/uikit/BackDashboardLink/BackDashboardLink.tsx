import styles from './backDashboardLink.module.scss';
import { ROUTES } from '@/config/constants';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const BackDashboardLink = () => {
  return (
    <Link href={ROUTES.DASHBOARD} className={styles['backDashboardLink']}>
      <ArrowLeft className={styles['backDashboardLinkIcon']} />
      All games
    </Link>
  );
};
