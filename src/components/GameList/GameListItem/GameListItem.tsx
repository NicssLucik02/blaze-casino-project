import { PrimaryButton } from '@/components/uikit/Buttons/PrimaryButton/PrimaryButton';
import styles from './gamelistItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { AppRoutes } from '@/types/enums';
import { GameCardInfo } from '@/types/games';

export const GameListItem: React.FC<GameCardInfo> = ({
  title,
  label,
  description,
  backgroundImage,
  slug,
}) => {
  return (
    <li className={styles['gameListItemWrapper']}>
      <div className={styles['gameListItem']}>
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className={styles['gameListItemBackground']}
        />
        <span className={styles['gameListItemLabel']}>{label}</span>
        <div className={styles['gameListItemDescription']}>
          <h1 className={styles['gameListItemTitle']}>{title}</h1>
          <p className={styles['gameListItemText']}>{description}</p>
        </div>
        <Link
          href={`${AppRoutes.GAMES}/${slug}`}
          className={styles['gameListItemButton']}
        >
          <PrimaryButton content="Free Play" widthSize="100%" />
        </Link>
      </div>
    </li>
  );
};
