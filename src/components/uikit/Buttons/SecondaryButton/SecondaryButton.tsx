import classNames from 'classnames';
import styles from './secondaryButton.module.scss';
import { useCallback } from 'react';

type Props = {
  amount?: number;
  content: string;
  widthSize: string;
  handler: (
    event: React.MouseEvent<HTMLButtonElement>,
    amount?: number
  ) => void;
  disabled?: boolean;
  isActive?: boolean;
};

export const SecondaryButton: React.FC<Props> = ({
  amount,
  content,
  widthSize,
  handler,
  disabled,
  isActive,
}) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => handler(event, amount),
    [handler, amount]
  );
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={classNames(
        styles['secondary-button'],

        { [styles['active']]: isActive }
      )}
      style={{
        width: `${widthSize}%`,
      }}
    >
      {content || amount}
    </button>
  );
};
