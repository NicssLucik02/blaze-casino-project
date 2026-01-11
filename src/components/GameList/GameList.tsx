import { gameCardsInfo } from '@/constants/games';
import styles from './gamelist.module.scss';
import { GameListItem } from './GameListItem/GameListItem';

export const GameList = () => {
  return (
    <div className={styles['gameList']}>
      <ul className={styles['gameListItems']}>
        {gameCardsInfo.map(item => (
          <GameListItem key={item.slug} {...item} />
        ))}
      </ul>
    </div>
  );
};
