import { useState } from 'react';

interface UseSwipeToCloseProps {
  onClose: () => void;
  threshold?: number;
}

export const useSwipeToClose = ({
  onClose,
  threshold = 50,
}: UseSwipeToCloseProps) => {
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;

    if (diff > threshold) {
      onClose();
    }
  };

  return { handleTouchStart, handleTouchMove };
};
