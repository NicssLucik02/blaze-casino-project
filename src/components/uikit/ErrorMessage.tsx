import { UI_MESSAGES } from '@/config/uiMessages';

type ErrorMessageProps = {
  error: string;
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="error">
      {error.includes('Too many requests') || error.includes('429')
        ? UI_MESSAGES.ERRORS.TOO_MANY_ATTEMPTS
        : error}
    </div>
  );
};
