import styles from './chatButton.module.scss';
import ChatIcon from '../../../../../public/icons/chat.svg';

type Props = {
  handleClick: () => void;
};

export const ChatButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <>
      <button className={styles['chatButton']} onClick={handleClick}>
        <ChatIcon />
      </button>
    </>
  );
};
