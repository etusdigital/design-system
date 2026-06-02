import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import styles from './Switch.module.css';

export interface SwitchProps {
  id?: string;
  name?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  rhs?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Switch({
  id,
  name,
  value,
  onChange,
  rhs = false,
  disabled = false,
  children,
  className,
}: SwitchProps) {
  const [currentValue, setValue] = useControllable<boolean>({
    value,
    defaultValue: false,
    onChange,
  });

  function handleClick() {
    if (disabled) return;
    setValue(!currentValue as boolean);
  }

  const renderLabel = () => {
    if (!children) return null;
    if (id || name) {
      return (
        <label htmlFor={id || name} className="text-xs cursor-[inherit]">
          {children}
        </label>
      );
    }
    return <span className="text-xs">{children}</span>;
  };

  return (
    <div
      role="switch"
      aria-checked={!!currentValue}
      aria-disabled={disabled}
      className={clsx(styles.switch, 'switch', rhs && styles.rhs, disabled && styles.disabled, className)}
      onClick={handleClick}
    >
      <div className={clsx(styles.track, currentValue && styles.active)}>
        <div className={clsx(styles.thumb, currentValue && styles.thumbActive)} />
      </div>
      {renderLabel()}
    </div>
  );
}
