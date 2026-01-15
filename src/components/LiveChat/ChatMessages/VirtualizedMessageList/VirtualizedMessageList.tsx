'use no memo';

import { ChatMessage as ChatMessageType } from '@/types/chat';
import { ChatMessage } from '../../ChatMessage/ChatMessage';
import { useChatVirtualizer } from '@/hooks/Chat/useChatVirtualizer';
import { useChatScroll } from '@/hooks/Chat/useChatAutoscroll';
import { CHAT_CONFIG } from '@/config/constants';
import styles from './virtualizedMessageList.module.scss';

interface VirtualizedMessageListProps {
  messages: ChatMessageType[];
}

export const VirtualizedMessageList = ({
  messages,
}: VirtualizedMessageListProps) => {
  const { scrollContainerRef } = useChatScroll({
    messagesCount: messages.length,
    enabled: true,
  });

  const { virtualItems, totalSize, rowVirtualizer } = useChatVirtualizer({
    messages,
    estimateSize: CHAT_CONFIG.VIRTUALIZER.ESTIMATE_SIZE,
    overscan: CHAT_CONFIG.VIRTUALIZER.OVERSCAN,
    scrollRef: scrollContainerRef,
  });

  return (
    <div
      ref={scrollContainerRef}
      style={{
        paddingLeft: `${CHAT_CONFIG.PADDING.LEFT}px`,
        paddingRight: `${CHAT_CONFIG.PADDING.RIGHT}px`,
      }}
      className={styles['scrollContainer']}
    >
      <div
        className={styles['listContainer']}
        style={{
          height: `${totalSize}px`,
        }}
      >
        {virtualItems.map(virtualItem => {
          const message = messages[virtualItem.index];
          return (
            <div
              key={message._id}
              data-index={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              className={styles['virtualItem']}
              style={{
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ChatMessage
                username={message.username}
                text={message.text}
                time={message.time}
                avatarURL={message.avatarURL}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
