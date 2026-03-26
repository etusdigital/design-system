import { useContext } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { RadioGroupContext } from '../RadioGroup/RadioGroup';
import styles from './Radio.module.css';

export interface RadioProps {
  id?: string;
  name?: string;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  groupValue?: any;
  disabled?: boolean;
  variant?: 'default' | 'onboarding';
  children?: React.ReactNode;
  className?: string;
}

export function Radio({
  id,
  name,
  value,
  defaultValue,
  onChange,
  groupValue,
  disabled,
  variant = 'default',
  children,
  className,
}: RadioProps) {
  const groupCtx = useContext(RadioGroupContext);

  // Standalone mode — use useControllable for own boolean state.
  // We always call it (rules of hooks) but only use it when not in group mode.
  const [standaloneValue, setStandaloneValue] = useControllable<boolean>({
    value: groupCtx && groupValue !== undefined ? undefined : value,
    defaultValue: groupCtx && groupValue !== undefined ? undefined : (defaultValue ?? false),
    onChange: groupCtx && groupValue !== undefined ? undefined : onChange,
  });

  const isInGroup = groupCtx !== null && groupValue !== undefined;
  const isSelected = isInGroup ? groupCtx!.selected === groupValue : (standaloneValue ?? false);
  const isDisabled = (groupCtx?.disabled ?? false) || (disabled ?? false);

  function handleClick() {
    if (isDisabled) return;
    if (isInGroup) {
      groupCtx!.select(groupValue);
    } else {
      // Standalone Radio can only be selected (set to true), never deselected.
      setStandaloneValue(true);
    }
  }

  const labelContent = children ? (
    id || name ? (
      <label htmlFor={id || name} className={clsx(styles.radioLabel, 'cursor-[inherit]')}>
        {children}
      </label>
    ) : (
      <div className={styles.radioText}>{children}</div>
    )
  ) : null;

  return (
    <div
      id={id}
      role="radio"
      aria-checked={isSelected}
      aria-disabled={isDisabled}
      className={clsx(
        styles.radio,
        'radio',
        styles[variant],
        isSelected && styles.selected,
        isDisabled && styles.disabled,
        className,
      )}
      onClick={handleClick}
    >
      <span
        tabIndex={0}
        className={styles.outerCircle}
        onKeyUp={(e) => {
          if (e.key === ' ') handleClick();
        }}
      >
        <span
          className={clsx(
            styles.innerCircle,
            isSelected && styles.innerCircleActive,
          )}
        />
      </span>
      {labelContent}
    </div>
  );
}
