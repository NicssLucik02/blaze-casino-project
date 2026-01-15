import styles from './chatButton.module.scss';
import ChatIcon from '../../../../../public/icons/chat.svg';

type ChatButtonProps = {
  handleClick: () => void;
};

export const ChatButton: React.FC<ChatButtonProps> = ({ handleClick }) => {
  return (
    <>
      <button className={styles['chatButton']} onClick={handleClick}>
        <ChatIcon />
      </button>
    </>
  );
};
