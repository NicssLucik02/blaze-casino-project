'use client';
import classNames from 'classnames';
import styles from './secondaryButton.module.scss';
import { useCallback } from 'react';

type SecondaryButtonProps = {
  amount?: number;
  content: string;
  icon?: React.ReactNode;
  widthSize?: string;
  handler: (
    event: React.MouseEvent<HTMLButtonElement>,
    amount?: number
  ) => void;
  disabled?: boolean;
  disp: 'flex' | 'position';
};

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  amount,
  content,
  icon,
  widthSize = '100%',
  handler,
  disabled,
  disp,
}) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => handler(event, amount),
    [handler, amount]
  );
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={styles['secondaryButton']}
      style={{
        width: `${widthSize}`,
      }}
    >
      {content || amount}
      {icon && (
        <span
          className={classNames(
            styles['secondaryButtonIcon'],

            { [styles['dispFlex']]: disp === 'flex' },
            { [styles['dispPosition']]: disp === 'position' }
          )}
        >
          {icon}
        </span>
      )}
    </button>
  );
};
