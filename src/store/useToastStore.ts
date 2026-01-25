import { create } from 'zustand';

interface ToastStore {
  isVisible: boolean;
  content: string;
  showToast: (content: string) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>(set => ({
  isVisible: false,
  content: '',
  showToast: content => {
    set({ isVisible: true, content });
    setTimeout(() => {
      set({ isVisible: false });
    }, 3000);
  },
  hideToast: () => set({ isVisible: false }),
}));
