import { ButtonTypes } from '@/types/enums';
import styles from './primaryButton.module.scss';

type Props = {
  content: string;
  widthSize: string;
  handler?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: ButtonTypes;
};

export const PrimaryButton: React.FC<Props> = ({
  content,
  widthSize,
  handler,
  disabled,
  icon,
  type = ButtonTypes.BUTTON,
}) => {
  return (
    <button
      onClick={handler}
      disabled={disabled}
      className={styles['primaryButton']}
      type={type}
      style={{
        width: `${widthSize}%`,
      }}
    >
      {content}
      {icon && <span className={styles['primaryButtonIcon']}>{icon}</span>}
    </button>
  );
};
