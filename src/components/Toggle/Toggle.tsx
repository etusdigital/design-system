import { useContext } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { ToggleGroupContext } from '../ToggleGroup/ToggleGroup';
import styles from './Toggle.module.css';

export interface ToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  id?: string;
  name?: string;
  groupValue?: any;
  disabled?: boolean;
  type?: 'default' | 'secondary';
  children?: React.ReactNode;
  className?: string;
}

export function Toggle({
  value,
  onChange,
  id,
  name,
  groupValue,
  disabled,
  type,
  children,
  className,
}: ToggleProps) {
  const groupCtx = useContext(ToggleGroupContext);

  const [currentValue, setValue] = useControllable<boolean>({
    value: groupCtx && groupValue !== undefined ? undefined : value,
    defaultValue: groupCtx && groupValue !== undefined ? undefined : false,
    onChange,
  });

  const isActive =
    groupCtx && groupValue !== undefined
      ? groupCtx.selected === groupValue
      : (currentValue ?? false);

  const resolvedType = groupCtx?.type ?? type ?? 'default';
  const isDisabled = !!(groupCtx?.disabled || disabled);

  function handleClick() {
    if (isDisabled) return;
    if (groupCtx && groupValue !== undefined) {
      groupCtx.select(groupValue);
    } else {
      setValue(true);
    }
  }

  return (
    <button
      id={id}
      name={name || id}
      type="button"
      role="button"
      aria-pressed={isActive}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      tabIndex={0}
      className={clsx(
        styles.toggle,
        'toggle',
        resolvedType === 'secondary' ? styles.secondary : styles.default,
        isActive && styles.active,
        isDisabled && styles.disabled,
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
