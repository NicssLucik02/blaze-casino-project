import React, { useCallback } from 'react';
import styles from './messageInput.module.scss';

type MessageInputProps = {
  inputMessage: string;
  isSending: boolean;
  isConnected: boolean;
  handleChangeMessage: (message: string) => void;
  handleSendMessage: () => void;
};

export const MessageInput = React.memo<MessageInputProps>(
  ({
    inputMessage,
    isSending,
    isConnected,
    handleChangeMessage,
    handleSendMessage,
  }) => {
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey && inputMessage.trim()) {
          event.preventDefault();
          handleSendMessage();
        }
      },
      [inputMessage, handleSendMessage]
    );

    return (
      <input
        type="text"
        className={styles['messageInput']}
        placeholder="Write a message..."
        value={inputMessage}
        onChange={event => handleChangeMessage(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={!isConnected || isSending}
      />
    );
  }
);

MessageInput.displayName = 'MessageInput';
