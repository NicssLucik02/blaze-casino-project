import ArrowUp from 'lucide-react/dist/esm/icons/arrow-up';
import styles from './messageBar.module.scss';
import { useMessageInput } from '@/hooks/Chat/useMessageInput';
import { MessageInput } from '@/components/uikit/MessageInput/MessageInput';

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
      <MessageInput
        inputMessage={inputMessage}
        isSending={isSending}
        isConnected={isConnected}
        handleChangeMessage={handleChangeMessage}
        handleSendMessage={handleSendMessage}
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
