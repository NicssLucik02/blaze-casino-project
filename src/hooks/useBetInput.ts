import { useState } from 'react';

const MAX_BET = 1000;
const MIN_BET = 0.1;

export const useBetInput = (initialValue: number = MIN_BET) => {
  const [displayValue, setDisplayValue] = useState<string>(
    String(initialValue)
  );
  const [betAmount, setBetAmount] = useState<number>(initialValue);

  const handleChangeBet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setDisplayValue('');
      setBetAmount(0);
      return;
    }

    if (!/^\d*\.?\d*$/.test(inputValue)) {
      return;
    }

    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue > MAX_BET) {
      setDisplayValue(String(MAX_BET));
      setBetAmount(MAX_BET);
      return;
    }

    setDisplayValue(inputValue);
    setBetAmount(isNaN(numValue) ? 0 : numValue);
  };

  const handleBlur = () => {
    const value = Math.max(betAmount, MIN_BET);
    setBetAmount(value);
    setDisplayValue(String(value));
  };

  const handleHalf = () => {
    const newValue = Math.max(betAmount / 2, MIN_BET);
    setBetAmount(newValue);
    setDisplayValue(String(newValue));
  };

  const handleDouble = () => {
    const newValue = Math.min(betAmount * 2, MAX_BET);
    setBetAmount(newValue);
    setDisplayValue(String(newValue));
  };

  const handleMax = () => {
    setBetAmount(MAX_BET);
    setDisplayValue(String(MAX_BET));
  };

  return {
    betAmount,
    displayValue,
    handleChangeBet,
    handleBlur,
    handleHalf,
    handleDouble,
    handleMax,
    maxBet: MAX_BET,
    minBet: MIN_BET,
  };
};
