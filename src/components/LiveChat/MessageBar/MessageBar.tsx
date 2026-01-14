import { ArrowUp } from 'lucide-react';
import styles from './messageBar.module.scss';
import { useMessageInput } from '@/hooks/Chat/useMessageInput';

export const MessageBar = () => {
  const {
    inputMessage,
    isSending,
    isConnected,
    handleSendMessage,
    handleChangeMessage,
  } = useMessageInput();
  return (
    <div className={styles['messageBar']}>
      <input
        type="text"
        className={styles['messageBarInput']}
        placeholder="Write a message..."
        value={inputMessage}
        onChange={event => handleChangeMessage(event.target.value)}
        disabled={!isConnected || isSending}
      />
      <button
        className={styles['messageBarButton']}
        onClick={handleSendMessage}
        disabled={!isConnected || !inputMessage.trim() || isSending}
      >
        <ArrowUp color="white" />
      </button>
    </div>
  );
};
