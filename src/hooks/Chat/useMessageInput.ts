import { useChatStore } from '@/store/useChatStore';
import { useState, KeyboardEvent, useCallback } from 'react';

interface UseMessageInputReturn {
  inputMessage: string;
  isSending: boolean;
  isConnected: boolean;
  handleSendMessage: () => Promise<void>;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleChangeMessage: (value: string) => void;
  clearInput: () => void;
}

export const useMessageInput = (): UseMessageInputReturn => {
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const { isConnected, sendMessage } = useChatStore();

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !isConnected || isSending) return;

    setIsSending(true);

    try {
      sendMessage(inputMessage);
      setInputMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  }, [inputMessage, isConnected, isSending, sendMessage]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const handleChangeMessage = useCallback((value: string) => {
    setInputMessage(value);
  }, []);

  const clearInput = useCallback(() => {
    setInputMessage('');
  }, []);

  return {
    inputMessage,
    isSending,
    isConnected,
    handleSendMessage,
    handleKeyPress,
    handleChangeMessage,
    clearInput,
  };
};
