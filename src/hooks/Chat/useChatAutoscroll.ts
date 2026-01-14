import { useEffect, useRef } from 'react';

interface UseChatScrollProps {
  messagesCount: number;
  enabled?: boolean;
}

export const useChatScroll = ({
  messagesCount,
  enabled = true,
}: UseChatScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (enabled && messagesCount > 0 && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messagesCount, enabled]);

  return { scrollContainerRef };
};
