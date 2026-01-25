import { InputBet } from '@/components/uikit/Inputs/InputBet/InputBet';
import styles from './panelConfig.module.scss';
import { InputBetButtons } from '@/components/uikit/Inputs/InputBet/InputBetButtons/InputBetButtons';
import { InputTypes } from '@/types/enums';
import { Switcher } from '@/components/uikit/Switcher/Switcher';
import CoinIcon from '../../../../../public/icons/coin.svg';
import { useCrashStore } from '@/store/useCrashStore';
import { CrashGameStatus } from '@/types/crashTypes';
import React, { useMemo, useCallback } from 'react';

export const PanelInputs = React.memo(() => {
  const disabled = useCrashStore(
    state => state.gameState?.state === CrashGameStatus.RUNNING
  );
  const displayValue = useCrashStore(state => state.displayValue);
  const setDisplayValue = useCrashStore(state => state.setDisplayValue);
  const setBetAmount = useCrashStore(state => state.setBetAmount);

  const autoCashoutDisplay = useCrashStore(state => state.autoCashoutDisplay);
  const setAutoCashoutDisplay = useCrashStore(
    state => state.setAutoCashoutDisplay
  );
  const setAutoCashoutValue = useCrashStore(state => state.setAutoCashoutValue);
  const autoCashoutEnabled = useCrashStore(state => state.autoCashoutEnabled);
  const toggleAutoCashout = useCrashStore(state => state.toggleAutoCashout);

  const handleHalf = useCrashStore(state => state.handleHalf);
  const handleDouble = useCrashStore(state => state.handleDouble);
  const handleMax = useCrashStore(state => state.handleMax);

  const handleChangeBet = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setDisplayValue(value);
        const num = parseFloat(value);
        if (!isNaN(num)) {
          setBetAmount(num);
        }
      }
    },
    [setDisplayValue, setBetAmount]
  );

  const handleBlurBet = useCallback(() => {
    const num = parseFloat(displayValue);
    if (!isNaN(num) && num > 0) {
      setDisplayValue(num.toFixed(2));
    } else {
      setDisplayValue('10.00');
      setBetAmount(10);
    }
  }, [displayValue, setDisplayValue, setBetAmount]);

  const handleChangeCashout = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '') {
        setAutoCashoutDisplay('');
        setAutoCashoutValue(0);
        return;
      }
      if (/^\d*\.?\d*$/.test(value)) {
        setAutoCashoutDisplay(value);
        const num = parseFloat(value);
        setAutoCashoutValue(isNaN(num) ? 0 : num);
      }
    },
    [setAutoCashoutDisplay, setAutoCashoutValue]
  );

  const handleBlurCashout = useCallback(() => {
    const num = parseFloat(autoCashoutDisplay);
    if (!isNaN(num) && num > 0) {
      setAutoCashoutDisplay(num.toFixed(2));
    }
  }, [autoCashoutDisplay, setAutoCashoutDisplay]);

  const betButtons = useMemo(
    () => (
      <InputBetButtons
        onHalf={handleHalf}
        onDouble={handleDouble}
        onMax={handleMax}
        disabled={disabled}
      />
    ),
    [handleHalf, handleDouble, handleMax, disabled]
  );

  const switcher = useMemo(
    () => <Switcher active={autoCashoutEnabled} handler={toggleAutoCashout} />,
    [autoCashoutEnabled, toggleAutoCashout]
  );

  return (
    <div className={styles['panelConfigInputs']}>
      <InputBet
        Icon={CoinIcon}
        placeh="0.10"
        addContent={betButtons}
        type={InputTypes.TEXT}
        inputDesc="Bet Amount"
        value={displayValue}
        onChange={handleChangeBet}
        onBlur={handleBlurBet}
        disabled={disabled}
      />

      <InputBet
        placeh="e.g 2.00"
        type={InputTypes.TEXT}
        addContent={switcher}
        inputDesc="Auto Cashout (optional)"
        value={autoCashoutDisplay}
        onChange={handleChangeCashout}
        onBlur={handleBlurCashout}
        disabled={disabled}
      />
    </div>
  );
});

PanelInputs.displayName = 'PanelInputs';
