import React, { useState } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Label } from '../../utils/components/Label';
import styles from './Textarea.module.css';

interface TextareaProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  labelValue?: string;
  max?: number;
  errorMessage?: string;
  infoMessage?: string;
  disabled?: boolean;
  isError?: boolean;
  required?: boolean;
  placeholder?: string;
  textAlign?: 'left' | 'center' | 'right';
  tooltipMinWidth?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      value,
      defaultValue,
      onChange,
      labelValue,
      max,
      errorMessage,
      infoMessage,
      disabled = false,
      isError = false,
      required = false,
      placeholder,
      textAlign,
      tooltipMinWidth,
      onFocus,
      onBlur,
      className,
    },
    ref
  ) {
    const [currentValue, setValue] = useControllable<string>({
      value,
      defaultValue: defaultValue ?? '',
      onChange,
    });

    const [isFocused, setIsFocused] = useState(false);

    function handleFocus() {
      setIsFocused(true);
      onFocus?.();
    }

    function handleBlur() {
      setIsFocused(false);
      onBlur?.();
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      const val = max ? e.target.value.slice(0, max) : e.target.value;
      setValue(val);
    }

    const length = currentValue?.length ?? 0;
    const showLabelRow = labelValue || max !== undefined;

    return (
      <div className={clsx(styles.textarea, className)}>
        {showLabelRow && (
          <div className={styles.labelRow}>
            <Label
              labelValue={labelValue}
              infoMessage={infoMessage}
              tooltipMinWidth={tooltipMinWidth}
              required={required}
            />
            {max !== undefined && (
              <span className={styles.counter}>
                {length}/{max}
              </span>
            )}
          </div>
        )}
        <div
          className={clsx(
            styles.textareaContainer,
            isFocused && styles.focused,
            isError && styles.error,
            disabled && styles.disabled
          )}
        >
          <textarea
            ref={ref}
            className={styles.textareaContent}
            value={currentValue ?? ''}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            style={textAlign ? { textAlign } : undefined}
          />
        </div>
        {(isError || errorMessage) && errorMessage && (
          <small className={styles.errorMessage}>{errorMessage}</small>
        )}
      </div>
    );
  }
);
