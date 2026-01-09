import { Leaderboard } from '../Leaderboard/Leaderboard';
import styles from './dashboard.module.scss';

export const Dashboard = () => {
  return (
    <section className={styles['dashboard']}>
      <div className={styles['dashboardContainer']}>
        <Leaderboard />
      </div>
    </section>
  );
};
