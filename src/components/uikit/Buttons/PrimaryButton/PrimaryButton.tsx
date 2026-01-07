import styles from './primaryButton.module.scss';

type Props = {
  content: string;
  widthSize: string;
  handler?: () => void;
  disabled?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  content,
  widthSize,
  handler,
  disabled,
}) => {
  return (
    <button
      onClick={handler}
      disabled={disabled}
      className={styles['primary-button']}
      style={{
        width: `${widthSize}%`,
      }}
    >
      {content}
    </button>
  );
};
