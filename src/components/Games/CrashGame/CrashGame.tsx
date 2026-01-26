'use client';
import { useCrashWebSocket } from '@/hooks/CrashGame/useCrashWebSocket';
import styles from './crashGame.module.scss';
import { PanelConfig } from './CrashGamePanelConfig/PanelConfig';
import { CrashGameboard } from './GameBoard/CrashGameBoard';
import { GameHistoryWrapper } from './GameHistoryWrapper';
import { Toast } from '@/components/uikit/Toast/Toast';

export const CrashGame = () => {
  const { isConnected } = useCrashWebSocket();

  return (
    <section className={styles['crashGame']}>
      <div className={styles['crashGameContainer']}>
        <div className={styles['crashGameboardContainer']}>
          <Toast />
          {!isConnected ? (
            <div className={styles['crashGameboardEmpty']}>
              <p className={styles['crashGameboardEmptyValue']}>1.00X</p>
              <p className={styles['crashGameboardEmptyText']}>
                Waiting for bets...
              </p>
            </div>
          ) : (
            <CrashGameboard />
          )}
        </div>
        <PanelConfig />
      </div>
      <GameHistoryWrapper />
    </section>
  );
};
