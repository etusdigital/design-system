import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  id?: string;
  name?: string;
  value?: boolean | null;
  defaultValue?: boolean | null;
  onChange?: (value: boolean | null) => void;
  rhs?: boolean;
  allowIndeterminate?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Checkbox({
  id,
  name,
  value,
  defaultValue,
  onChange,
  rhs = false,
  allowIndeterminate = false,
  disabled = false,
  children,
  className,
}: CheckboxProps) {
  const [currentValue, setValue] = useControllable<boolean | null>({
    value: value as boolean | undefined,
    defaultValue: defaultValue ?? false,
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
    if (id || name) {
      return (
        <label htmlFor={id || name} className={`text-sm cursor-[inherit]`}>
          {children}
        </label>
      );
    }
    return <span className="text-sm">{children}</span>;
  };

  return (
    <div
      role="checkbox"
      aria-checked={currentValue === null ? 'mixed' : !!currentValue}
      aria-disabled={disabled}
      className={clsx(styles.checkbox, rhs && styles.rhs, disabled && styles.disabled, className)}
      onClick={handleClick}
    >
      <div
        className={clsx(
          styles.box,
          currentValue === true && styles.active,
          currentValue === null && styles.indeterminate
        )}
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
