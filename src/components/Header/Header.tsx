'use client';

import { SecondaryButton } from '../uikit/Buttons/SecondaryButton/SecondaryButton';
import styles from './header.module.scss';
import LogoutIcon from '../../../public/icons/logout.svg';

import { ClipLoader } from 'react-spinners';
import { UI_MESSAGES } from '@/config/constants';
import { useLogout } from '@/hooks/useAuth';

export const Header = () => {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className={styles['header']}>
      <SecondaryButton
        content={UI_MESSAGES.BUTTONS.LOGOUT}
        widthSize="8"
        handler={handleLogout}
        icon={logoutMutation.isPending ? <ClipLoader /> : <LogoutIcon />}
      />
    </header>
  );
};
