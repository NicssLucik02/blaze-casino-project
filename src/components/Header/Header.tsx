import styles from './header.module.scss';

import { HeaderLogo } from './HeaderLogo/HeaderLogo';
import { HeaderMain } from './HeaderMain/HeaderMain';

export const Header = () => {
  return (
    <header className={styles['header']}>
      <HeaderLogo />
      <HeaderMain />
    </header>
  );
};
