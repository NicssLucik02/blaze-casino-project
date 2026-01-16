'use client';

import { useRef } from 'react';
import styles from './liveChat.module.scss';
import { ChatMessages } from './ChatMessages/ChatMessages';
import { MessageBar } from './MessageBar/MessageBar';
import { ChatHeader } from './ChatHeader/ChatHeader';
import classNames from 'classnames';
import { useUIStore } from '@/store/useUiStore';
import { useSwipeToClose } from '@/hooks/Chat/useSwipeToClose';
import { useChatConnection } from '@/hooks/Chat/useChatConnection';

export const LiveChat = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  const { isChatOpen, toggleChat } = useUIStore();

  useChatConnection();
  const { handleTouchStart, handleTouchMove } = useSwipeToClose({
    onClose: toggleChat,
  });

  return (
    <>
      {isChatOpen && <div className={styles['overlay']} onClick={toggleChat} />}
      <div
        ref={chatRef}
        className={classNames(styles['liveChat'], {
          [styles['liveChat--open']]: isChatOpen,
        })}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className={styles['swipeIndicator']} />
        <ChatHeader />
        <ChatMessages />
        <MessageBar />
      </div>
    </>
  );
};
