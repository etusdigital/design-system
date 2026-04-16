import React, { useState, useRef } from 'react';
import { ColorPicker } from '../ColorPicker';
import { FloatCard } from '../FloatCard/FloatCard';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Label } from '../../utils/components/Label';
import { Icon } from '../Icon/Icon';
import { applyMask, isValidEmail, isValidDomain, isValidUrl } from '../../utils/index';
import styles from './Input.module.css';

export interface InputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  labelValue?: string;
  type?: 'text' | 'number' | 'password' | 'search' | 'email' | 'url' | 'domain' | 'color';
  mask?: 'cpf' | 'cnpj' | 'cep';
  max?: number;
  min?: number;
  step?: number;
  errorMessage?: string;
  infoMessage?: string;
  disabled?: boolean;
  isError?: boolean;
  required?: boolean;
  placeholder?: string;
  textAlign?: 'start' | 'center' | 'end';
  tooltipMinWidth?: number;
  icon?: string;
  appendIcon?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  children?: React.ReactNode;
  className?: string;
}

function PrependIcon({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function AppendIcon({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

type InputComponent = React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> & {
  PrependIcon: typeof PrependIcon;
  AppendIcon: typeof AppendIcon;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const {
    value,
    defaultValue,
    onChange,
    labelValue,
    type = 'text',
    mask,
    max,
    min,
    step = 1,
    errorMessage,
    infoMessage,
    disabled = false,
    isError = false,
    required = false,
    placeholder = '',
    textAlign,
    tooltipMinWidth,
    icon,
    appendIcon,
    onFocus,
    onBlur,
    children,
    className,
  } = props;

  const [currentValue, setValue] = useControllable<string>({
    value,
    defaultValue: defaultValue ?? '',
    onChange,
  });

  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<string>('');

  const internalRef = useRef<HTMLInputElement>(null);

  const mergedRef = (el: HTMLInputElement | null) => {
    internalRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
  };

  let prependIconChild: React.ReactNode = null;
  let appendIconChild: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const childProps = child.props as Record<string, unknown>;
    if (child.type === PrependIcon) prependIconChild = childProps.children as React.ReactNode;
    if (child.type === AppendIcon) appendIconChild = childProps.children as React.ReactNode;
  });

  const resolvedType = (() => {
    if (type === 'password') return showPassword ? 'text' : 'password';
    if (type === 'number') return 'text';
    if (type === 'search' || type === 'email' || type === 'url' || type === 'domain' || type === 'color') return 'text';
    return type;
  })();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value;

    if (mask && type === 'text') {
      newValue = applyMask(newValue, mask as any);
    }

    if (max && type === 'text') {
      newValue = newValue.slice(0, max);
    }

    if (type === 'number') {
      const numVal = Number(newValue);
      if (!isNaN(numVal)) {
        if ((min !== undefined && min !== null) && numVal < min) newValue = String(min);
        else if ((max !== undefined && max !== null) && numVal > max) newValue = String(max);
      }
    }

    setValue(newValue);
  }

  function handleFocus() {
    setIsFocused(true);
    onFocus?.();
  }

  function handleBlur() {
    setIsFocused(false);

    const val = currentValue ?? '';
    if (type === 'email') setHasError(!isValidEmail(val));
    else if (type === 'domain') {
      const valid = !val || isValidDomain(val);
      setHasError(!valid);
      setValidationError(val && !valid ? 'Invalid domain' : '');
    } else if (type === 'url') {
      const valid = !val || isValidUrl(val);
      setHasError(!valid);
      setValidationError(val && !valid ? 'Invalid URL' : '');
    }

    onBlur?.();
  }

  function increment() {
    const numVal = isNaN(Number(currentValue)) ? 0 : Number(currentValue);
    const next = (numVal * 1000 + (step || 1) * 1000) / 1000;
    setValue(String(max !== undefined && max !== null ? Math.min(next, max) : next));
  }

  function decrement() {
    const numVal = isNaN(Number(currentValue)) ? 0 : Number(currentValue);
    const next = (numVal * 1000 - (step || 1) * 1000) / 1000;
    setValue(String(min !== undefined && min !== null ? Math.max(next, min) : next));
  }

  const showError = isError || hasError;

  if (type === 'color') {
    const colorValue = currentValue ?? '#000000ff';
    return (
      <div className={clsx(styles.input, className)}>
        {(labelValue || max !== undefined) && (
          <div className={styles.labelRow}>
            <Label
              labelValue={labelValue}
              infoMessage={infoMessage}
              tooltipMinWidth={tooltipMinWidth}
              required={required}
            />
          </div>
        )}
        <div
          className={clsx(
            styles.inputContainer,
            'flex items-center',
            disabled && styles.disabled
          )}
        >
          <input
            ref={mergedRef}
            type="text"
            className={clsx(styles.inputContent)}
            value={colorValue}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={disabled}
            placeholder="#000000ff"
          />
          <FloatCard
            card={
              <ColorPicker
                value={colorValue}
                onChange={(v) => setValue(v)}
              />
            }
          >
            <div
              className={clsx(styles.colorPickerButton, disabled && styles.disabled)}
              style={{
                background: colorValue,
              }}
              aria-label="Open color picker"
            />
          </FloatCard>
        </div>
        {(errorMessage || validationError) && (showError || !!validationError) && (
          <p className={styles.errorMessage}>{errorMessage || validationError}</p>
        )}
      </div>
    );
  }

  return (
    <div className={clsx(styles.input, 'input', className)}>
      {(labelValue || max !== undefined) && (
        <div className={styles.labelRow}>
          <Label
            labelValue={labelValue}
            infoMessage={infoMessage}
            tooltipMinWidth={tooltipMinWidth}
            required={required}
          />
          {type === 'text' && max !== undefined && (
            <span className={styles.counter}>{(currentValue ?? '').length}/{max}</span>
          )}
        </div>
      )}

      <div className="flex items-center h-fit">
        <div
          className={clsx(
            styles.inputContainer,
            'flex-1',
            isFocused && styles.focused,
            showError && styles.error,
            disabled && styles.disabled
          )}
        >
          {type === 'search' ? (
            <Icon name="search" className={clsx(styles.inputIcon, "text-neutral-foreground-low")} />
          ) : icon ? (
            <Icon name={icon} className={styles.inputIcon} />
          ) : prependIconChild ? (
            prependIconChild
          ) : null}

          <input
              ref={mergedRef}
              type={resolvedType}
              className={clsx(styles.inputContent, textAlign && styles[textAlign])}
              value={currentValue ?? ''}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              spellCheck={false}
            />

          {type === 'password' ? (
            <Icon
              name={showPassword ? 'visibility_off' : 'visibility'}
              className={clsx(styles.inputIcon, "cursor-pointer")}
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : appendIcon ? (
            <Icon name={appendIcon} className={styles.inputIcon} />
          ) : appendIconChild ? (
            appendIconChild
          ) : null}
        </div>

        {type === 'number' && (
          <div className={clsx(styles.numberArrows, 'ml-xxs')}>
            <Icon
              name="arrow_drop_up"
              className={styles.arrowIcon}
              onClick={increment}
            />
            <Icon
              name="arrow_drop_down"
              className={styles.arrowIcon}
              onClick={decrement}
            />
          </div>
        )}
      </div>

      {(errorMessage || validationError) && (showError || !!validationError) && (
        <p className={styles.errorMessage}>{errorMessage || validationError}</p>
      )}
    </div>
  );
}) as InputComponent;

Input.PrependIcon = PrependIcon;
Input.AppendIcon = AppendIcon;
