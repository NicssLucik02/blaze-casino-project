import { CrashBetHistoryItem } from '@/types/crashTypes';
import styles from './gameHistory.module.scss';
import { TableConfig } from '@/types/tableTypes';
import { LoaderCircle } from 'lucide-react';

type GameHistoryProps = {
  historyData?: CrashBetHistoryItem[];
  config: TableConfig<CrashBetHistoryItem>;
  isLoading?: boolean;
};

export const GameHistory: React.FC<GameHistoryProps> = ({
  historyData,
  config,
  isLoading,
}) => {
  return (
    <div className={styles['gameHistory']}>
      <h1 className={styles['gameHistoryTitle']}>Game History</h1>

      {isLoading ? (
        <div className={styles['loaderWrapper']}>
          <LoaderCircle />
        </div>
      ) : historyData && historyData.length > 0 ? (
        <div className={styles['gameHistoryTableWrapper']}>
          <table className={styles['gameHistoryTable']}>
            <thead className={styles['gameHistoryTableHead']}>
              <tr className={styles['gameHistoryTableHeadRow']}>
                {config.columns.map(column => (
                  <th
                    key={column.key}
                    className={`${styles['gameHistoryTableHeadDesc']} ${column.headerClassName || ''}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles['gameHistoryTableBody']}>
              {historyData.map(item => (
                <tr
                  key={config.keyExtractor(item)}
                  className={styles['gameHistoryTableBodyRow']}
                >
                  {config.columns.map(column => (
                    <td
                      key={column.key}
                      className={`${styles['gameHistoryTableBodyDesc']} ${column.className || ''}`}
                    >
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles['emptyState']}>
          <p>No betting history yet</p>
        </div>
      )}
    </div>
  );
};
