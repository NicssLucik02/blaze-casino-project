import { GameList } from '../GameList/GameList';
import { Leaderboard } from '../Leaderboard/Leaderboard';
import { LiveChat } from '../LiveChat/LiveChat';
import { ChatButtonWrapper } from '../uikit/Buttons/ChatButton/ChatButtonWrapper';
import styles from './dashboard.module.scss';

export const Dashboard = () => {
  return (
    <section className={styles['dashboard']}>
      <div className={styles['dashboardContainer']}>
        <Leaderboard />
        <GameList />
        <LiveChat />
      </div>

      <ChatButtonWrapper />
    </section>
  );
};
