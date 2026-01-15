import { getRankDisplay } from '@/utils/getRank';
import styles from './leaderboardItem.module.scss';
import coinIcon from '../../../../public/icons/coin.png';
import Image from 'next/image';
import classNames from 'classnames';

type LeaderboardItemProps = {
  rank: string;
  username: string;
  balance: string;
  gamesCount: string;
  avgWins: string;
  isCurrentUser?: boolean;
};

export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  rank,
  username,
  balance,
  gamesCount,
  avgWins,
  isCurrentUser = false,
}) => {
  return (
    <li>
      <div
        className={classNames(styles['leaderboardItem'], {
          [styles['active']]: isCurrentUser,
        })}
      >
        <div className={styles['leaderboardItemRank']}>
          {getRankDisplay(rank)}
        </div>
        <div className={styles['leaderboardItemInfo']}>
          <div className={styles['leaderboardItemStats']}>
            <div className={styles['leaderboardItemStatUsername']}>
              <span className={styles['leaderboardItemStat']}>{username}</span>
              {isCurrentUser && (
                <p className={styles['leaderboardItemStatYou']}>(you)</p>
              )}
            </div>

            <span className={styles['leaderboardItemStat']}>
              <Image src={coinIcon} alt="coin" width={16} height={16} />
              {balance}
            </span>
          </div>

          <div className={styles['leaderboardItemStats']}>
            <span className={styles['leaderboardItemStatGames']}>
              {gamesCount} games
            </span>
            <span className={styles['leaderboardItemStatWins']}>
              {avgWins}%
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
