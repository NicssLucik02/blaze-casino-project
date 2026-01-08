'use client';
import { InputTypes } from '@/types/enums';
import styles from './authInput.module.scss';
import { Eye, EyeOff } from 'lucide-react';
import { useState, forwardRef } from 'react';

type Props = {
  type: InputTypes;
  pholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  error?: string;
};

export const AuthInput = forwardRef<HTMLInputElement, Props>(
  ({ type, pholder, onChange, onBlur, name, value, error }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [hideError, setHideError] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHideError(true);
      if (onChange) {
        onChange(event);
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setHideError(false);
      if (onBlur) {
        onBlur(event);
      }
    };

    const inputType =
      type === InputTypes.PASSWORD && showPassword ? InputTypes.TEXT : type;

    return (
      <>
        <div className={styles['authInputContainer']}>
          <input
            ref={ref}
            name={name}
            className={styles['authInput']}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={pholder}
            type={inputType}
            value={value}
          />

          {type === InputTypes.PASSWORD && (
            <div
              className={styles['authInputIcon']}
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <EyeOff color="black" /> : <Eye color="black" />}
            </div>
          )}
        </div>
        {!hideError && error && <span className="error">{error}</span>}
      </>
    );
  }
);

AuthInput.displayName = 'AuthInput';
