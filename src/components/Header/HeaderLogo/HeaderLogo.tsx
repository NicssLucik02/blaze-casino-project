import styles from './headerLogo.module.scss';
import { BlazeLogo } from './BlazeLogo';

export const HeaderLogo = () => {
  return (
    <h2 className={styles['headerLogo']}>
      <span>Blaze</span>
      <BlazeLogo className={styles['headerLogoIcon']} />
      <span>Casino</span>
    </h2>
  );
};
