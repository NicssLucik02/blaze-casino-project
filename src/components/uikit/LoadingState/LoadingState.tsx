import { Loader2 } from 'lucide-react';
import styles from './loadingState.module.scss';

type Props = {
  text: string;
};

export const LoadingState: React.FC<Props> = ({ text }) => {
  return (
    <div className={styles['loadingState']}>
      <Loader2 className={styles['spinner']} size={40} />
      <p>Connecting to {text}...</p>
    </div>
  );
};
