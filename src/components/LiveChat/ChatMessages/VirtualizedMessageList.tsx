'use no memo';

import { ChatMessage as ChatMessageType } from '@/types/chat';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { useChatVirtualizer } from '@/hooks/Chat/useChatVirtualizer';
import { useChatScroll } from '@/hooks/Chat/useChatAutoscroll';

interface VirtualizedMessageListProps {
  messages: ChatMessageType[];
  estimateSize?: number;
  overscan?: number;
}

export const VirtualizedMessageList = ({
  messages,
  estimateSize = 166,
  overscan = 30,
}: VirtualizedMessageListProps) => {
  const { scrollContainerRef } = useChatScroll({
    messagesCount: messages.length,
    enabled: true,
  });

  const { virtualItems, totalSize, rowVirtualizer } = useChatVirtualizer({
    messages,
    estimateSize,
    overscan,
    scrollRef: scrollContainerRef,
  });

  return (
    <div
      ref={scrollContainerRef}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        paddingLeft: '25px',
        paddingRight: '5px',
      }}
    >
      <div
        style={{
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualItems.map(virtualItem => {
          const message = messages[virtualItem.index];

          return (
            <div
              key={message._id}
              data-index={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <ChatMessage
                username={message.username}
                text={message.text}
                time={message.time}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
