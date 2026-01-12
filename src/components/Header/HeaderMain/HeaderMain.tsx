'use client';
import { UI_MESSAGES } from '@/config/constants';
import styles from './headerMain.module.scss';
import { ClipLoader } from 'react-spinners';
import { Settings } from 'lucide-react';
import LogoutIcon from '../../../../public/icons/login.svg';
import { BurgerMenu } from '@/components/BurgerMenu/BurgerMenu';
import Image from 'next/image';
import { SecondaryButton } from '@/components/uikit/Buttons/SecondaryButton/SecondaryButton';
import coinIcon from '../../../../public/icons/coin.png';
import userAvatar from '../../../assets/images/userAvatar.png';
import { useLogout } from '@/hooks/useAuth';

export const HeaderMain = () => {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className={styles['headerMain']}>
      <div className={styles['headerMainUserContainer']}>
        <BurgerMenu
          logoutAction={handleLogout}
          isLoggingOut={logoutMutation.isPending}
        />
        <div className={styles['headerMainBalance']}>
          <Image src={coinIcon} alt="coin" width={24} height={24} />
          <span>10,000.00</span>
        </div>
        <Image src={userAvatar} alt="avatar" width={32} height={32} />
      </div>
      <div className={styles['headerMainActions']}>
        <Settings />
        <SecondaryButton
          content={UI_MESSAGES.BUTTONS.LOGOUT}
          widthSize="118px"
          handler={handleLogout}
          icon={logoutMutation.isPending ? <ClipLoader /> : <LogoutIcon />}
        />
      </div>
    </div>
  );
};
