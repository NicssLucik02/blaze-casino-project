import styles from './inputButton.module.scss';

type InputButtonProps = {
  content: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const InputButton: React.FC<InputButtonProps> = ({
  content,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={styles['inputButton']}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {content}
    </button>
  );
};
