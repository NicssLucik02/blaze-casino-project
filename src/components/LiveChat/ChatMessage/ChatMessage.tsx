import Image from 'next/image';
import styles from './chatMessage.module.scss';
import Avatar from '../../../assets/images/avatarMessage.jpg';

type Props = {
  username: string;
  text: string;
  time: string;
};

export const ChatMessage: React.FC<Props> = ({ username, text, time }) => {
  return (
    <div className={styles['chatMessage']}>
      <Image
        className={styles['chatMessageAvatar']}
        src={Avatar}
        alt="avatar"
      />

      <div className={styles['chatMessageHeader']}>
        <div className={styles['chatMessageHeaderInfo']}>
          <div className={styles['chatMessageHeaderLabel']}>V1</div>
          <span className={styles['chatMessageHeaderName']}>{username}</span>
        </div>
        <span className={styles['chatMessageHeaderTime']}>{time}</span>
      </div>
      <p className={styles['chatMessageBody']}>{text}</p>
    </div>
  );
};
