import { useEffect } from 'react';
import { useChatStore } from '@/store/useChatStore';

export const useChatConnection = () => {
  const connect = useChatStore(state => state.connect);
  const disconnect = useChatStore(state => state.disconnect);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);
};
