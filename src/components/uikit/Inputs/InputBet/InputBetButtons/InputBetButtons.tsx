import styles from './inputBetButtons.module.scss';
import { InputButton } from '../../../Buttons/InputButton/InputButton';
import React from 'react';

type InputBetButtonsProps = {
  onHalf: () => void;
  onDouble: () => void;
  onMax: () => void;
  disabled?: boolean;
};

export const InputBetButtons: React.FC<InputBetButtonsProps> = React.memo(
  ({ onHalf, onDouble, onMax, disabled }) => {
    return (
      <div className={styles['inputBetButtons']}>
        <InputButton content="1/2" onClick={onHalf} disabled={disabled} />
        <InputButton content="x2" onClick={onDouble} disabled={disabled} />
        <InputButton content="Max" onClick={onMax} disabled={disabled} />
      </div>
    );
  }
);

InputBetButtons.displayName = 'InputBetButtons';
