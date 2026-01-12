import Image from 'next/image';
import styles from './leaderboard.module.scss';
import Cup from '../../assets/images/cup.png';
import { LeaderboardItem } from './LeaderboardItem/LeaderboardItem';

export const Leaderboard = () => {
  return (
    <div className={styles['leaderboard']}>
      <div className={styles['leaderboardContainer']}>
        <Image src={Cup} alt="cup" className={styles['leaderboardCupIcon']} />
        <div className={styles['leaderboardTop']}>
          <h1 className={styles['leaderboardTitle']}>Leaderboard</h1>
          <p className={styles['leaderboardSubtitle']}>Top players</p>
        </div>

        <ul className={styles['leaderboardList']}>
          <LeaderboardItem
            rank="1"
            username="LuckyStrike"
            balance="1000"
            gamesCount="20"
            avgWins="60"
          />
          <LeaderboardItem
            rank="2"
            username="CasinoKing"
            balance="950"
            gamesCount="18"
            avgWins="58"
          />
          <LeaderboardItem
            rank="3"
            username="JackpotJoe"
            balance="900"
            gamesCount="22"
            avgWins="55"
          />
          <LeaderboardItem
            rank="4"
            username="BetMaster"
            balance="850"
            gamesCount="15"
            avgWins="52"
          />
          <LeaderboardItem
            rank="5"
            username="PokerPro"
            balance="800"
            gamesCount="25"
            avgWins="50"
          />
          <LeaderboardItem
            rank="6"
            username="SlotQueen"
            balance="750"
            gamesCount="19"
            avgWins="48"
          />
          <LeaderboardItem
            rank="7"
            username="RouletteRick"
            balance="700"
            gamesCount="17"
            avgWins="45"
          />
          <LeaderboardItem
            rank="8"
            username="Max Carter"
            balance="650"
            gamesCount="16"
            avgWins="42"
            isCurrentUser={true}
          />
        </ul>
      </div>
    </div>
  );
};
