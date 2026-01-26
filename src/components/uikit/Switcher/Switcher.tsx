import classNames from 'classnames';
import styles from './switcher.module.scss';
import React from 'react';

type SwitcherProps = {
  active: boolean;
  handler: () => void;
};

export const Switcher: React.FC<SwitcherProps> = React.memo(
  ({ active, handler }) => {
    return (
      <div
        className={classNames(styles['switcher'], {
          [styles['active']]: active,
        })}
        onClick={handler}
      >
        <div
          className={classNames(styles['switcherRound'], {
            [styles['activeRound']]: active,
          })}
        />
      </div>
    );
  }
);

Switcher.displayName = 'Switcher';
