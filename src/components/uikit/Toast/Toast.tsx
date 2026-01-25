import styles from './toast.module.scss';
import { useToastStore } from '@/store/useToastStore';

export const Toast: React.FC = () => {
  const { isVisible, content } = useToastStore();

  if (!isVisible) return null;

  return (
    <div className={styles['toast']}>
      <p className={styles['toastMessage']}>{content}</p>
    </div>
  );
};
