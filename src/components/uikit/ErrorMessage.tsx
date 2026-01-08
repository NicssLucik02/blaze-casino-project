import { UI_MESSAGES } from '@/config/constants';

type Props = {
  error: string;
};

export const ErrorMessage: React.FC<Props> = ({ error }) => {
  return (
    <div className="error">
      {error.includes('Too many requests') || error.includes('429')
        ? UI_MESSAGES.ERRORS.TOO_MANY_ATTEMPTS
        : error}
    </div>
  );
};
