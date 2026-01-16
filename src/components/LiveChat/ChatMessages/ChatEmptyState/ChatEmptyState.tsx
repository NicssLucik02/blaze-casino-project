import styles from './chatEmptyState.module.scss';

export const ChatEmptyState = () => {
  return (
    <div className={styles['emptyState']}>
      <p>No messages yet</p>
      <span>Be the first to say something!</span>
    </div>
  );
};
