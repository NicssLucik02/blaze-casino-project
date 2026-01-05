import styles from './auth.module.scss';

export const AuthModal = () => {
  return (
    <div className={styles['auth']}>
      <div className={styles['authContainer']}>
        <div className={styles['authTop']}></div>
      </div>
    </div>
  );
};
