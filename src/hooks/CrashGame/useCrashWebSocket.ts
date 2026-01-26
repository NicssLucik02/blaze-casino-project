import { useEffect, useRef } from 'react';
import { socketService } from '@/services/socket.service';
import { tokenStorage } from '@/services/token.service';
import { crashApiService } from '@/services/crash-api.service';
import { useCrashStore } from '@/store/useCrashStore';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/config/constants';
import {
  CrashGameStatus,
  type CrashCurrentGameResponse,
} from '@/types/crashTypes';

export function useCrashWebSocket() {
  const setGameState = useCrashStore(state => state.setGameState);
  const currentGameIdRef = useRef<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (!token) {
      console.warn('⚠️ No access token');
      return;
    }

    let crashSocket: ReturnType<typeof socketService.getCrashSocket>;

    const init = async () => {
      try {
        const initialState = await crashApiService.getCurrentGame(token);
        setGameState(initialState);
        currentGameIdRef.current = initialState.gameId;
        crashSocket = socketService.connectCrash();

        await new Promise<void>(resolve => {
          if (crashSocket?.connected) {
            resolve();
          } else {
            crashSocket?.once('connect', resolve);
          }
        });

        socketService.subscribeToGame(initialState.gameId);

        socketService.onGameTick(data => {
          currentGameIdRef.current = data.gameId;

          setGameState({
            gameId: data.gameId,
            multiplier: data.multiplier,
            state: CrashGameStatus.RUNNING,
            serverSeedHash: '',
            myBet: useCrashStore.getState().gameState?.myBet,
          } as CrashCurrentGameResponse);
        });

        socketService.onGameCrash(data => {
          currentGameIdRef.current = data.gameId;

          setGameState({
            gameId: data.gameId,
            state: CrashGameStatus.CRASHED,
            multiplier: data.crashPoint,
            serverSeedHash: data.serverSeed,
            myBet: undefined,
          } as CrashCurrentGameResponse);

          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER });
          queryClient.invalidateQueries({
            queryKey: ['crash', 'game-history'],
          });
          queryClient.invalidateQueries({ queryKey: ['crash', 'bet-history'] });

          setTimeout(async () => {
            const nextGame = await crashApiService.getCurrentGame(token);

            setGameState(nextGame);
            useCrashStore.getState().setLastCashout(null);
            currentGameIdRef.current = nextGame.gameId;
            socketService.subscribeToGame(nextGame.gameId);
          }, 3000);
        });
      } catch (error) {
        console.error('❌ Failed to initialize:', error);
      }
    };

    init();

    return () => {
      crashSocket?.offAny();
      socketService.offCrashEvents();
      socketService.disconnectCrash();
    };
  }, [setGameState, queryClient]);

  const isConnected = socketService.isCrashConnected();
  const gameState = useCrashStore(state => state.gameState);

  return { gameState, isConnected };
}
