import Image from 'next/image';
import styles from './leaderboard.module.scss';
import Cup from '../../assets/images/cup.png';
import { LeaderboardList } from './LeaderboardList/LeaderboardList';

export const Leaderboard = () => {
  return (
    <div className={styles['leaderboard']}>
      <div className={styles['leaderboardContainer']}>
        <Image src={Cup} alt="cup" className={styles['leaderboardCupIcon']} />
        <div className={styles['leaderboardTop']}>
          <h1 className={styles['leaderboardTitle']}>Leaderboard</h1>
          <p className={styles['leaderboardSubtitle']}>Top players</p>
        </div>
        <LeaderboardList />
      </div>
    </div>
  );
};
