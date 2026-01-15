import { useCallback, useRef } from 'react';

interface UseSwipeToCloseProps {
  onClose: () => void;
  threshold?: number;
}

export const useSwipeToClose = ({
  onClose,
  threshold = 100,
}: UseSwipeToCloseProps) => {
  const touchStartY = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchEndY - touchStartY.current;

      if (deltaY > threshold) {
        onClose();
      }
    },
    [onClose, threshold]
  );

  return {
    handleTouchStart,
    handleTouchMove,
  };
};
