import React from 'react';
import styles from './panelConfig.module.scss';
import { useCrashStore } from '@/store/useCrashStore';
import { CrashGameStatus } from '@/types/crashTypes';

const PanelResultContent = React.memo(() => {
  const multiplier = useCrashStore(state => state.gameState?.multiplier ?? 0);
  const betAmount = useCrashStore(state => state.betAmount);
  const lastCashout = useCrashStore(state => state.lastCashout);

  const displayMultiplier = lastCashout ? lastCashout.multiplier : multiplier;
  const displayWinAmount = lastCashout
    ? lastCashout.winAmount
    : betAmount * multiplier;

  return (
    <div className={styles['panelConfigResult']}>
      <div className={styles['panelConfigResultItem']}>
        <span className={styles['panelConfigResultDesc']}>
          Current Multiplier:
        </span>
        <span className={styles['panelConfigResultAmount']}>
          {displayMultiplier}X
        </span>
      </div>
      <div className={styles['panelConfigResultItem']}>
        <span className={styles['panelConfigResultDesc']}>Potential win:</span>
        <span className={styles['panelConfigResultAmount']}>
          ${Number(displayWinAmount).toFixed(2)}
        </span>
      </div>
    </div>
  );
});
PanelResultContent.displayName = 'PanelResultContent';

export const PanelResult = React.memo(() => {
  const showResult = useCrashStore(
    state =>
      state.gameState?.state === CrashGameStatus.RUNNING ||
      state.gameState?.state === CrashGameStatus.CRASHED
  );

  if (!showResult) {
    return null;
  }

  return <PanelResultContent />;
});

PanelResultContent.displayName = 'PanelResultContent';
PanelResult.displayName = 'PanelResult';
