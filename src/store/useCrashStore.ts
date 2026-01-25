import { create } from 'zustand';
import type { CrashCurrentGameResponse } from '@/types/crashTypes';

export interface LastCashout {
  multiplier: number;
  amount: number;
  winAmount: number;
}

interface CrashStore {
  gameState: CrashCurrentGameResponse | null;
  setGameState: (
    state:
      | CrashCurrentGameResponse
      | null
      | ((
          prev: CrashCurrentGameResponse | null
        ) => CrashCurrentGameResponse | null)
  ) => void;

  lastCashout: LastCashout | null;
  setLastCashout: (data: LastCashout | null) => void;

  betAmount: number;
  displayValue: string;
  setBetAmount: (amount: number) => void;
  setDisplayValue: (value: string) => void;

  autoCashoutEnabled: boolean;
  autoCashoutValue: number;
  autoCashoutDisplay: string;
  setAutoCashoutEnabled: (enabled: boolean) => void;
  setAutoCashoutValue: (value: number) => void;
  setAutoCashoutDisplay: (display: string) => void;
  toggleAutoCashout: () => void;

  handleHalf: () => void;
  handleDouble: () => void;
  handleMax: () => void;
  reset: () => void;
}

export const useCrashStore = create<CrashStore>((set, get) => ({
  gameState: null,
  lastCashout: null,
  betAmount: 10,
  displayValue: '10.00',
  autoCashoutEnabled: false,
  autoCashoutValue: 0,
  autoCashoutDisplay: '',

  setGameState: state => {
    set(prev => ({
      gameState: typeof state === 'function' ? state(prev.gameState) : state,
    }));
  },

  setLastCashout: data => set({ lastCashout: data }),

  setBetAmount: amount => set({ betAmount: amount }),
  setDisplayValue: value => set({ displayValue: value }),
  setAutoCashoutEnabled: enabled => set({ autoCashoutEnabled: enabled }),
  setAutoCashoutValue: value => set({ autoCashoutValue: value }),
  setAutoCashoutDisplay: display => set({ autoCashoutDisplay: display }),

  toggleAutoCashout: () =>
    set(state => ({
      autoCashoutEnabled: !state.autoCashoutEnabled,
    })),

  handleHalf: () => {
    const { betAmount } = get();
    const newAmount = Math.max(0.1, betAmount / 2);
    set({
      betAmount: newAmount,
      displayValue: newAmount.toFixed(2),
    });
  },

  handleDouble: () => {
    const { betAmount } = get();
    const newAmount = Math.min(10000, betAmount * 2);
    set({
      betAmount: newAmount,
      displayValue: newAmount.toFixed(2),
    });
  },

  handleMax: () => {
    set({
      betAmount: 10000,
      displayValue: '10000.00',
    });
  },

  reset: () =>
    set({
      betAmount: 10,
      displayValue: '10.00',
      autoCashoutEnabled: false,
      autoCashoutValue: 0,
      autoCashoutDisplay: '',
      lastCashout: null,
    }),
}));
