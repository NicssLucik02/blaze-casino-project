'use client';

import { GameHistory } from '@/components/uikit/GameHistory/GameHistory';
import { crashTableConfig } from '@/config/games/crash-table.config';
import { useBetHistory } from '@/hooks/CrashGame/useCrashGameHistory';
import React from 'react';

export const GameHistoryWrapper = React.memo(() => {
  const { data, isLoading } = useBetHistory({ limit: 10, offset: 0 });

  return (
    <GameHistory
      config={crashTableConfig}
      historyData={data?.bets}
      isLoading={isLoading}
    />
  );
});

GameHistoryWrapper.displayName = 'GameHistoryWrapper';
