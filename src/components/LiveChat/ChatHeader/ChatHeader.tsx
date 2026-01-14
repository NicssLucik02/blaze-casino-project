import styles from './chatHeader.module.scss';
import classNames from 'classnames';

export const ChatHeader = () => {
  return (
    <div className={styles['liveChatHeader']}>
      <h2 className={styles['liveChatHeaderTitle']}>
        L<span className={styles['customDot']}>i</span>ve Chat
      </h2>
      <div className={styles['divider']} />
      <div className={styles['liveChatHeaderStats']}>
        <span className={styles['liveChatHeaderStat']}>250 online</span>
        <span
          className={classNames(styles['liveChatHeaderStat'], styles['active'])}
        >
          48 friends
        </span>
        <span className={styles['liveChatHeaderStat']}>54 playing</span>
      </div>
    </div>
  );
};
