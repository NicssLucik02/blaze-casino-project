'use client';

import { useMemo } from 'react';
import { useChatStore } from '@/store/useChatStore';
import styles from './chatMessages.module.scss';
import { ChatEmptyState } from './ChatEmptyState/ChatEmptyState';
import { VirtualizedMessageList } from './VirtualizedMessageList';
import { LoadingState } from '@/components/uikit/LoadingState/LoadingState';

export const ChatMessages = () => {
  const { messages, currentRoom, isConnected } = useChatStore();
  const currentMessages = useMemo(
    () => messages[currentRoom] || [],
    [messages, currentRoom]
  );

  if (!isConnected) {
    return (
      <div className={styles['liveChatMessages']}>
        <LoadingState text={`${currentRoom} Chat`} />
      </div>
    );
  }

  if (currentMessages.length === 0) {
    return (
      <div className={styles['liveChatMessages']}>
        <ChatEmptyState />
      </div>
    );
  }

  return (
    <div className={styles['liveChatMessages']}>
      <VirtualizedMessageList
        messages={currentMessages}
        estimateSize={166}
        overscan={30}
      />
    </div>
  );
};
