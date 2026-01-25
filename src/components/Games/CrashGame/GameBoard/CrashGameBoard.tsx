'use client';

import { useCrashGameCanvas } from './useCrashGameCanvas';
import styles from './crashGameboard.module.scss';

export const CrashGameboard = () => {
  const canvasRef = useCrashGameCanvas();

  return (
    <div className={styles.crashGameboard}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};
