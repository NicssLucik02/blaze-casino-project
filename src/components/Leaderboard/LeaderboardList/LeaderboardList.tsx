'use client';
import styles from './leaderboardList.module.scss';
import { LeaderboardItem } from '../LeaderboardItem/LeaderboardItem';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { LeaderboardPeriod } from '@/types/leaderboard';
import { LoaderCircle } from 'lucide-react';

export const LeaderboardList = () => {
  const { data, isLoading, isError, error } = useLeaderboard(
    LeaderboardPeriod.ALL
  );

  return (
    <ul className={styles['leaderboardList']}>
      {isLoading && <LoaderCircle />}

      {isError && <p>{error?.message}</p>}

      {data?.players.map(player => (
        <LeaderboardItem
          key={player.rank}
          rank={player.rank.toString()}
          username={player.username}
          balance={player.totalWagered.toFixed(2)}
          gamesCount={player.gamesPlayed.toString()}
          avgWins={player.winRate.toFixed(2)}
          isCurrentUser={player.username === data.currentUser?.username}
        />
      ))}
      {data?.currentUser &&
        !data.players.some(p => p.username === data.currentUser?.username) && (
          <div className={styles['currentUserSection']}>
            <p className={styles['currentUserLabel']}>Your position:</p>
            <LeaderboardItem
              rank={data.currentUser.rank.toString()}
              username={data.currentUser.username}
              balance={data.currentUser.totalWagered.toFixed(0)}
              gamesCount={data.currentUser.gamesPlayed.toString()}
              avgWins={data.currentUser.winRate.toFixed(0)}
              isCurrentUser={true}
            />
          </div>
        )}
    </ul>
  );
};
