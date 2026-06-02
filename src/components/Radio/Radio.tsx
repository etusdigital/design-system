import { useContext } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { RadioGroupContext } from '../RadioGroup/RadioGroup';
import styles from './Radio.module.css';

export interface RadioProps {
  id?: string;
  name?: string;
  value?: boolean;
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
  onChange,
  groupValue,
  disabled,
  variant = 'default',
  children,
  className,
}: RadioProps) {
  const groupCtx = useContext(RadioGroupContext);

  const [standaloneValue, setStandaloneValue] = useControllable<boolean>({
    value: groupCtx && groupValue !== undefined ? undefined : value,
    defaultValue: groupCtx && groupValue !== undefined ? undefined : false,
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
