import { crashApiService } from '@/services/crash-api.service';
import { socketService } from '@/services/socket.service';
import { tokenStorage } from '@/services/token.service';
import { useCrashStore } from '@/store/useCrashStore';
import { useCrash } from './useCrashGame';
import { useCallback } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useToastStore } from '@/store/useToastStore';

export function useCrashActions() {
  const crash = useCrash();
  const gameState = useCrashStore(state => state.gameState);
  const setGameState = useCrashStore(state => state.setGameState);
  const setLastCashout = useCrashStore(state => state.setLastCashout);
  const { data: user } = useCurrentUser();
  const showToast = useToastStore(state => state.showToast);

  const handlePlaceBet = useCallback(
    async (betAmount: number, autoCashoutValue?: number) => {
      if (user && user.balance < betAmount) {
        showToast('Insufficient balance');
        return;
      }

      const betData = {
        amount: betAmount,
        ...(autoCashoutValue && { autoCashout: autoCashoutValue }),
      };

      crash.placeBet(betData, {
        onSuccess: async () => {
          try {
            const token = tokenStorage.getAccessToken();
            await new Promise(resolve => setTimeout(resolve, 1000));

            const updatedState = await crashApiService.getCurrentGame(token);

            const currentGameId = useCrashStore.getState().gameState?.gameId;

            if (currentGameId !== updatedState.gameId) {
              socketService.subscribeToGame(updatedState.gameId);
            }

            setGameState(updatedState);
          } catch (error) {
            console.error('❌ Failed to update state:', error);
          }
        },
        onError: error => {
          console.error('❌ Bet error:', error);
          showToast(error.message);
        },
      });
    },
    [crash, setGameState, user, showToast]
  );

  const handleCashout = useCallback(() => {
    if (!gameState?.myBet?.betId || crash.isCashingOut) {
      return;
    }

    const cashoutAmount = gameState.myBet.amount;

    crash.cashout(
      { betId: gameState.myBet.betId },
      {
        onSuccess: data => {
          setLastCashout({
            multiplier: data.multiplier,
            amount: cashoutAmount,
            winAmount: data.winAmount,
          });

          setGameState(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              myBet: undefined,
            };
          });
        },
        onError: error => {
          console.error('❌ Cashout error:', error);
        },
      }
    );
  }, [gameState, crash, setGameState, setLastCashout]);

  const canPlaceBet =
    !crash.isPlacingBet &&
    gameState?.state === 'waiting' &&
    !gameState?.myBet?.betId;

  const canCashout =
    !crash.isCashingOut &&
    gameState?.state === 'running' &&
    !!gameState?.myBet?.betId;

  return {
    handlePlaceBet,
    handleCashout,
    canPlaceBet,
    canCashout,
    isPlacingBet: crash.isPlacingBet,
    isCashingOut: crash.isCashingOut,
  };
}
