import Image from 'next/image';
import rank1 from '@/assets/images/rank1.png';
import rank2 from '@/assets/images/rank2.png';
import rank3 from '@/assets/images/rank3.png';
import styles from '../components/Leaderboard/leaderboard.module.scss';

export const getRankDisplay = (rank: string) => {
  const rankNumber = parseInt(rank, 10);

  switch (rankNumber) {
    case 1:
      return <Image src={rank1} alt="1st place" width={32} height={32} />;
    case 2:
      return <Image src={rank2} alt="2nd place" width={32} height={32} />;
    case 3:
      return <Image src={rank3} alt="3rd place" width={32} height={32} />;
    default:
      return <p className={styles['leaderboardItemRank']}>{rank}</p>;
  }
};
