import React from 'react';
import Image from 'next/image';
import styles from './chatMessage.module.scss';
import Avatar from '../../../assets/images/avatarMessage.jpg';

type ChatMessageProps = {
  username: string;
  text: string;
  time: string;
  avatarURL?: string;
};

const ChatMessageComponent: React.FC<ChatMessageProps> = ({
  username,
  text,
  time,
  avatarURL,
}) => {
  return (
    <div className={styles['chatMessage']}>
      <Image
        className={styles['chatMessageAvatar']}
        src={avatarURL || Avatar}
        alt="avatar"
        width={44}
        height={44}
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

export const ChatMessage = React.memo(ChatMessageComponent);
