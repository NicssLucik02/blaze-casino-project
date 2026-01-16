import { RefObject } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ChatMessage } from '@/types/chat';

interface UseChatVirtualizerProps {
  messages: ChatMessage[];
  estimateSize?: number;
  overscan?: number;
  scrollRef?: RefObject<HTMLDivElement | null>;
}

export const useChatVirtualizer = ({
  messages,
  estimateSize = 60,
  overscan = 5,
  scrollRef,
}: UseChatVirtualizerProps) => {
  const rowVirtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => scrollRef?.current || null,
    estimateSize: () => estimateSize,
    overscan,
    getItemKey: index => messages[index]._id,
  });

  return {
    rowVirtualizer,
    virtualItems: rowVirtualizer.getVirtualItems(),
    totalSize: rowVirtualizer.getTotalSize(),
  };
};
