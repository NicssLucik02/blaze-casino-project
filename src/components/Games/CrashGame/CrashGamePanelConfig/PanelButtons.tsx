import React, { useCallback } from 'react';
import { useCrashStore } from '@/store/useCrashStore';
import { PrimaryButton } from '@/components/uikit/Buttons/PrimaryButton/PrimaryButton';
import { SecondaryButton } from '@/components/uikit/Buttons/SecondaryButton/SecondaryButton';
import CoinWhiteIcon from '../../../../../public/icons/coin-white.svg';
import WalletIcon from '../../../../../public/icons/wallet.svg';
import styles from './panelConfig.module.scss';
import { useCrashActions } from '@/hooks/CrashGame/useCrashGameActions';

export const PanelButtons = React.memo(() => {
  const hasBet = useCrashStore(state => !!state.gameState?.myBet?.betId);

  const { handlePlaceBet, handleCashout } = useCrashActions();

  const onPlaceBet = useCallback(() => {
    const { betAmount, autoCashoutEnabled, autoCashoutValue } =
      useCrashStore.getState();
    const autoCashout = autoCashoutEnabled ? autoCashoutValue : undefined;
    handlePlaceBet(betAmount, autoCashout);
  }, [handlePlaceBet]);

  return (
    <div className={styles.panelConfigButtons}>
      <PrimaryButton
        content={'Place Bet'}
        icon={<CoinWhiteIcon />}
        handler={onPlaceBet}
        disabled={hasBet}
      />
      <SecondaryButton
        content={'Cashout'}
        icon={<WalletIcon />}
        handler={handleCashout}
        disp="position"
      />
    </div>
  );
});

PanelButtons.displayName = 'PanelButtons';
