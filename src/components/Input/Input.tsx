import React, { useState, useRef } from 'react';
import { ColorPicker } from '../ColorPicker';
import { FloatCard } from '../FloatCard/FloatCard';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Label } from '../../utils/components/Label';
import { Icon } from '../Icon/Icon';
import { applyMask, isValidEmail, isValidDomain, isValidUrl } from '../../utils/index';
import './Input.css';
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
  icon?: string;          // Material Symbols icon name for prepend
  appendIcon?: string;    // Material Symbols icon name for append
  onFocus?: () => void;
  onBlur?: () => void;
  children?: React.ReactNode;  // for compound sub-components
  className?: string;
}

// Compound sub-components
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

  // Merge forwarded ref with internal ref
  const mergedRef = (el: HTMLInputElement | null) => {
    internalRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
  };

  // Extract compound sub-component children
  let prependIconChild: React.ReactNode = null;
  let appendIconChild: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const childProps = child.props as Record<string, unknown>;
    if (child.type === PrependIcon) prependIconChild = childProps.children as React.ReactNode;
    if (child.type === AppendIcon) appendIconChild = childProps.children as React.ReactNode;
  });

  // Resolve native input type
  const resolvedType = (() => {
    if (type === 'password') return showPassword ? 'text' : 'password';
    if (type === 'number') return 'text'; // custom arrows, hide native spinners
    if (type === 'search' || type === 'email' || type === 'url' || type === 'domain' || type === 'color') return 'text';
    return type;
  })();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let newValue = e.target.value;

    // Apply mask
    if (mask && type === 'text') {
      newValue = applyMask(newValue, mask as any);
    }

    // Enforce max length for text
    if (max && type === 'text') {
      newValue = newValue.slice(0, max);
    }

    // Clamp number
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

    // Validate on blur
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

  // type="color" — render inline color swatch that opens FloatCard with ColorPicker
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
          {/* Hex text input — on the left */}
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
          {/* Color swatch trigger — on the right, wrapped in FloatCard for popover with outside-click close */}
          <FloatCard
            card={
              <ColorPicker
                value={colorValue}
                onChange={(v) => setValue(v)}
              />
            }
          >
            <button
              type="button"
              style={{
                width: '1.5em',
                height: '1.5em',
                background: colorValue,
                border: '1px solid var(--color-neutral-default, #ccc)',
                borderRadius: '4px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                flexShrink: 0,
              }}
              disabled={disabled}
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
    <div className={clsx(styles.input, className)}>
      {/* Label row */}
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

      {/* Input area */}
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
          {/* Prepend icon area */}
          {type === 'search' ? (
            <Icon name="search" className="text-neutral-foreground-low" />
          ) : icon ? (
            <Icon name={icon} />
          ) : prependIconChild ? (
            prependIconChild
          ) : null}

          {/* Native input */}
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

          {/* Append icon area */}
          {type === 'password' ? (
            <Icon
              name={showPassword ? 'visibility_off' : 'visibility'}
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : appendIcon ? (
            <Icon name={appendIcon} />
          ) : appendIconChild ? (
            appendIconChild
          ) : null}
        </div>

        {/* Number arrows (outside input container — matching Vue source) */}
        {type === 'number' && (
          <div className={clsx(styles.numberArrows, 'ml-xxs')}>
            <Icon
              name="arrow_drop_up"
              className="arrow-icon"
              onClick={increment}
            />
            <Icon
              name="arrow_drop_down"
              className="arrow-icon"
              onClick={decrement}
            />
          </div>
        )}
      </div>

      {/* Error message */}
      {(errorMessage || validationError) && (showError || !!validationError) && (
        <p className={styles.errorMessage}>{errorMessage || validationError}</p>
      )}
    </div>
  );
}) as InputComponent;

Input.PrependIcon = PrependIcon;
Input.AppendIcon = AppendIcon;
