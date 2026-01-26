import styles from './input.module.scss';

import classNames from 'classnames';

type PrimaryInputProps = {
  placeholderValue: string;
  type: string;
  bgColor?: string;
  widthSize: string;
  inputValue?: string | number;
  name?: string;
  handler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
};

export const PrimaryInput: React.FC<PrimaryInputProps> = ({
  placeholderValue,
  type,
  widthSize,
  inputValue,
  handler,
  name,
  isDisabled,
}) => {
  return (
    <input
      type={type}
      name={name}
      className={classNames(styles['primary-input'], {
        [styles['disabled']]: isDisabled,
      })}
      placeholder={placeholderValue}
      value={inputValue}
      onChange={handler}
      disabled={isDisabled}
      style={{
        width: `${widthSize}%`,
      }}
    />
  );
};
