'use client';

import { useState } from 'react';
import styles from './burgerMenu.module.scss';
import BurgerIcon from '../../../public/icons/burger.svg';
import CloseIcon from '../../../public/icons/close.svg';
import Logo from '../../../public/icons/logo.svg';
import Settings from '../../../public/icons/settings.svg';
import LoginIcon from '../../../public/icons/login.svg';
import { SecondaryButton } from '../uikit/Buttons/SecondaryButton/SecondaryButton';
import { UI_MESSAGES } from '@/config/constants';
import { ClipLoader } from 'react-spinners';

type Props = {
  logoutAction: () => void;
  isLoggingOut: boolean;
};

export const BurgerMenu: React.FC<Props> = ({ logoutAction, isLoggingOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logoutAction();
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={styles['burgerButton']}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isOpen ? <CloseIcon /> : <BurgerIcon />}
      </button>

      {isOpen && (
        <div className={styles['overlay']} onClick={toggleMenu}>
          <div className={styles['menu']} onClick={e => e.stopPropagation()}>
            <div className={styles['menuHeader']}>
              <h2 className={styles['menuLogo']}>
                <span>Blaze</span>
                <Logo size={40} />
                <span>Casino</span>
              </h2>
            </div>

            <div className={styles['menuContent']}>
              <button className={styles['menuItem']}>
                <Settings />
                <span>Settings</span>
              </button>

              <SecondaryButton
                content={UI_MESSAGES.BUTTONS.LOGOUT}
                widthSize="100%"
                handler={handleLogout}
                icon={isLoggingOut ? <ClipLoader /> : <LoginIcon />}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
