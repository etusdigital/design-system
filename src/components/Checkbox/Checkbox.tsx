import { useId } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { onEnterOrSpace } from '../../utils';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  id?: string;
  value?: boolean | null;
  onChange?: (value: boolean | null) => void;
  rhs?: boolean;
  allowIndeterminate?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  ariaLabel?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  children?: React.ReactNode;
  className?: string;
}

export function Checkbox({
  id,
  value,
  onChange,
  rhs = false,
  allowIndeterminate = false,
  disabled = false,
  tabIndex = 0,
  ariaLabel: ariaLabelProp,
  'aria-label': ariaLabelAttr,
  'aria-hidden': ariaHidden,
  children,
  className,
}: CheckboxProps) {
  const ariaLabel = ariaLabelAttr ?? ariaLabelProp;
  const labelId = useId();
  const [currentValue, setValue] = useControllable<boolean | null>({
    value: value as boolean | undefined,
    defaultValue: false,
    onChange: onChange as ((value: boolean | null) => void) | undefined,
  });

  function handleClick() {
    if (disabled) return;
    if (allowIndeterminate) {
      if (currentValue === true) setValue(null as unknown as boolean);
      else if (currentValue === null) setValue(false);
      else setValue(true);
    } else {
      setValue(!currentValue as boolean);
    }
  }

  const renderLabel = () => {
    if (!children) return null;
    return (
      <div
        id={labelId}
        className={`text-sm cursor-[inherit]`}
      >
        {children}
      </div>
    );
  };

  return (
    <div
      id={id}
      className={clsx(styles.checkbox, 'checkbox', rhs && styles.rhs, disabled && styles.disabled, className)}
      aria-hidden={ariaHidden}
      onClick={handleClick}
      onKeyUp={onEnterOrSpace(handleClick)}
    >
      <div
        role="checkbox"
        aria-checked={currentValue === null ? 'mixed' : !!currentValue}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={children && !ariaLabel ? labelId : undefined}
        tabIndex={ariaHidden ? undefined : disabled ? -1 : tabIndex}
        className={clsx(
          styles.box,
          currentValue === true && styles.active,
          currentValue === null && styles.indeterminate
        )}
        onKeyDown={(e) => e.code === 'Space' && e.preventDefault()}
      >
        {currentValue === true && (
          <svg viewBox="0 0 16 16" className="w-full h-full" fill="none">
            <path
              d="M3.5 8L6.5 11L12.5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {currentValue === null && (
          <svg viewBox="0 0 16 16" className="w-full h-full" fill="none">
            <line
              x1="4"
              y1="8"
              x2="12"
              y2="8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
      {renderLabel()}
    </div>
  );
}
