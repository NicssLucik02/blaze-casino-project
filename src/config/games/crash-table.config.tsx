import { CrashBetHistoryItem, CrashBetResult } from '@/types/crashTypes';

import styles from '@/components/uikit/GameHistory/gameHistory.module.scss';
import { formatDate } from '@/utils/formatters';
import { TableConfig } from '@/types/tableTypes';

export const crashTableConfig: TableConfig<CrashBetHistoryItem> = {
  columns: [
    {
      key: 'date',
      label: 'Date',
      render: item => formatDate(item.createdAt),
    },
    {
      key: 'amount',
      label: 'Bet Amount',
      render: item => `$${item.amount.toFixed(2)}`,
      className: styles['highlightAmount'],
    },
    {
      key: 'multiplier',
      label: 'Multiplier',
      render: item => {
        const multiplier = item.cashoutMultiplier || item.crashPoint || 0;

        if (item.status === CrashBetResult.WON) {
          return (
            <span className={styles['win']}>{multiplier.toFixed(2)}x</span>
          );
        }

        if (item.status === CrashBetResult.LOST) {
          return (
            <span className={styles['lost']}>{multiplier.toFixed(2)}x</span>
          );
        }

        return <span>{multiplier.toFixed(2)}x</span>;
      },
      className: styles['highlightMultiplier'],
    },
    {
      key: 'win',
      label: 'Win Amount',
      render: item => {
        if (item.winAmount && item.status === CrashBetResult.WON) {
          return (
            <span className={styles['win']}>${item.winAmount.toFixed(2)}</span>
          );
        }

        if (item.status === CrashBetResult.LOST) {
          return <span className={styles['lost']}>$0.00</span>;
        }
      },
      className: styles['highlightWin'],
    },
    {
      key: 'status',
      label: 'Status',
      render: item => {
        if (item.status === CrashBetResult.WON) {
          return <span className={styles['win']}>Won</span>;
        }

        if (item.status === CrashBetResult.LOST) {
          return <span className={styles['lost']}>Lost</span>;
        }
      },
    },
  ],
  keyExtractor: item => item.betId,
};
