import styles from './inputBet.module.scss';
import React, { JSX, ComponentType, SVGProps } from 'react';

type InputBetProps = {
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  placeh: string;
  disabled?: boolean;
  addContent?: JSX.Element;
  type: string;
  inputDesc: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  max?: number;
};

export const InputBet: React.FC<InputBetProps> = React.memo(
  ({
    Icon,
    placeh,
    disabled,
    addContent,
    type,
    inputDesc,
    value,
    onChange,
    onBlur,
  }) => {
    return (
      <div className={styles['inputBetWrapper']}>
        <p className={styles['inputBetDesc']}>{inputDesc}</p>
        <div className={styles['inputBetContainer']}>
          {Icon && (
            <Icon width={24} height={24} className={styles['inputBetIcon']} />
          )}
          <input
            type={type}
            className={styles['inputBet']}
            placeholder={placeh}
            disabled={disabled}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          {addContent}
        </div>
      </div>
    );
  }
);

InputBet.displayName = 'InputBet';
