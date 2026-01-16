'use client';

import { useUIStore } from '@/store/useUiStore';
import { ChatButton } from './ChatButton';

export const ChatButtonWrapper = () => {
  const { isChatOpen, toggleChat } = useUIStore();

  return <>{!isChatOpen && <ChatButton handleClick={toggleChat} />}</>;
};
