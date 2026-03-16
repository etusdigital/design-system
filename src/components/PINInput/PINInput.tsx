import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import clsx from 'clsx';
import styles from './PINInput.module.css';

export interface PINInputHandle {
  focus: () => void;
  clear: () => void;
}

interface PINInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
  disabled?: boolean;
  placeholder?: string;
  separator?: number;
  type?: 'text' | 'number' | 'password';
  otp?: boolean;
  className?: string;
}

export const PINInput = React.forwardRef<PINInputHandle, PINInputProps>(
  function PINInput(
    {
      value,
      defaultValue,
      onChange,
      onComplete,
      length = 6,
      disabled = false,
      placeholder,
      separator,
      type = 'text',
      otp = false,
      className,
    },
    ref
  ) {
    const isControlled = value !== undefined;

    const [values, setValues] = useState<string[]>(() => {
      const initial = isControlled ? value : (defaultValue ?? '');
      return Array.from({ length }, (_, i) => initial?.[i] ?? '');
    });

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Sync controlled value into internal array
    useEffect(() => {
      if (isControlled && value !== undefined) {
        setValues(Array.from({ length }, (_, i) => value[i] ?? ''));
      }
    }, [value, isControlled, length]);

    // Fire onChange and onComplete when values change
    const prevJoinedRef = useRef<string>('');
    useEffect(() => {
      const joined = values.join('');
      if (joined !== prevJoinedRef.current) {
        prevJoinedRef.current = joined;
        onChange?.(joined);
        if (joined.length === length && values.every((v) => v !== '')) {
          onComplete?.(joined);
        }
      }
    }, [values, length, onChange, onComplete]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        const firstEmpty = values.findIndex((v) => !v);
        inputRefs.current[firstEmpty !== -1 ? firstEmpty : 0]?.focus();
      },
      clear: () => {
        setValues(Array(length).fill(''));
        inputRefs.current[0]?.focus();
      },
    }));

    function updateValues(index: number, char: string) {
      const newValues = [...values];
      newValues[index] = char;
      setValues(newValues);
      return newValues;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
      const rawValue = e.target.value;
      // Take last character if somehow multiple chars entered
      const char = rawValue.slice(-1);
      updateValues(index, char);
      if (char && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
      if (e.key === 'Backspace') {
        if (!values[index] && index > 0) {
          const prev = inputRefs.current[index - 1];
          if (prev) {
            prev.focus();
            prev.select();
          }
        } else {
          updateValues(index, '');
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        inputRefs.current[index + 1]?.focus();
      }
    }

    async function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, index: number) {
      e.preventDefault();
      let text: string;
      try {
        text = await navigator.clipboard.readText();
      } catch {
        text = e.clipboardData.getData('text');
      }
      const newValues = [...values];
      text.split('').slice(0, length - index).forEach((char, idx) => {
        newValues[index + idx] = char;
      });
      setValues(newValues);
      // Focus last filled position
      const lastFilled = newValues.reduce((last, v, i) => (v ? i : last), index);
      const nextFocus = Math.min(lastFilled + 1, length - 1);
      inputRefs.current[nextFocus]?.focus();
    }

    function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
      e.target.select();
    }

    return (
      <div className={clsx(styles.pinInput, className)}>
        {Array.from({ length }, (_, index) => (
          <React.Fragment key={index}>
            {separator !== undefined && index > 0 && index % separator === 0 && (
              <span className={styles.separator}>-</span>
            )}
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={clsx(styles.field, values[index] && styles.filled, disabled && styles.disabled)}
              value={values[index] || ''}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e, index)}
              onFocus={handleFocus}
              type={type}
              inputMode="numeric"
              maxLength={1}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={otp ? 'one-time-code' : undefined}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
);
