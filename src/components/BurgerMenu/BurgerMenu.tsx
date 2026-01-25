'use client';

import { useState } from 'react';
import styles from './burgerMenu.module.scss';
import BurgerIcon from '../../../public/icons/burger.svg';
import CloseIcon from '../../../public/icons/close.svg';
import Settings from '../../../public/icons/settings.svg';
import LoginIcon from '../../../public/icons/login.svg';
import InventoryIcon from '../../../public/icons/inventory.svg';
import { SecondaryButton } from '../uikit/Buttons/SecondaryButton/SecondaryButton';
import { ClipLoader } from 'react-spinners';
import { BlazeLogo } from '../Header/HeaderLogo/BlazeLogo';
import { UI_MESSAGES } from '@/config/uiMessages';

type BurgerMenuProps = {
  logoutAction: () => void;
  isLoggingOut: boolean;
};

export const BurgerMenu: React.FC<BurgerMenuProps> = ({
  logoutAction,
  isLoggingOut,
}) => {
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
        {isOpen ? (
          <CloseIcon className={styles['closeIcon']} />
        ) : (
          <BurgerIcon />
        )}
      </button>

      {isOpen && (
        <div className={styles['overlay']} onClick={toggleMenu}>
          <div className={styles['menu']} onClick={e => e.stopPropagation()}>
            <div className={styles['menuHeader']}>
              <h2 className={styles['menuLogo']}>
                <span>Blaze</span>
                <BlazeLogo
                  width={40}
                  height={40}
                  gradientId="burgerMenuGradient"
                />
                <span>Casino</span>
              </h2>
            </div>

            <div className={styles['menuContent']}>
              <div className={styles['menuItem']}>
                <Settings />
                <span>Settings</span>
              </div>

              <div className={styles['menuItem']}>
                <InventoryIcon width={20} height={20} />
                <span>Inventory</span>
              </div>
              <div className={styles['menuLogoutContainer']}>
                <SecondaryButton
                  content={UI_MESSAGES.BUTTONS.LOGOUT}
                  widthSize="100%"
                  handler={handleLogout}
                  icon={isLoggingOut ? <ClipLoader /> : <LoginIcon />}
                  disp="flex"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
