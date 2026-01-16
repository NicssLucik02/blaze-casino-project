import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import styles from './loadingState.module.scss';

type LoadingStateProps = {
  text: string;
};

export const LoadingState: React.FC<LoadingStateProps> = ({ text }) => {
  return (
    <div className={styles['loadingState']}>
      <Loader2 className={styles['spinner']} size={40} />
      <p>Connecting to {text}...</p>
    </div>
  );
};
