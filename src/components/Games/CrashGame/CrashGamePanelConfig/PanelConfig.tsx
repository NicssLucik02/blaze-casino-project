'use client';

import { PanelButtons } from './PanelButtons';
import { PanelInputs } from './PanelInputs';
import { PanelResult } from './PanelResult';
import styles from './panelConfig.module.scss';
import React from 'react';

export const PanelConfig = React.memo(() => {
  return (
    <div className={styles['panelConfig']}>
      <div className={styles['panelConfigContainer']}>
        <h2 className={styles['panelConfigTitle']}>Crash Configuration</h2>

        <PanelInputs />
        <PanelButtons />
        <PanelResult />
      </div>
    </div>
  );
});

PanelConfig.displayName = 'PanelConfig';
