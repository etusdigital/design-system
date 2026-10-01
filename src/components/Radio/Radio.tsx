import { useContext, useId } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { onEnterOrSpace, preventSpaceScroll } from '../../utils';
import { RadioGroupContext } from '../RadioGroup/RadioGroup';
import styles from './Radio.module.css';

export interface RadioProps {
  id?: string;
  value?: boolean;
  onChange?: (value: boolean) => void;
  groupValue?: any;
  disabled?: boolean;
  variant?: 'default' | 'onboarding';
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
}

export function Radio({
  id,
  value,
  onChange,
  groupValue,
  disabled,
  variant = 'default',
  ariaLabel,
  children,
  className,
}: RadioProps) {
  const labelId = useId();
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
    <div
      id={labelId}
      className={clsx((id || name) ? styles.radioLabel : styles.radioText, 'cursor-[inherit]')}
    >
      {children}
    </div>
  ) : null;

  return (
    <div
      id={id}
      className={clsx(
        styles.radio,
        'radio',
        styles[variant],
        isSelected && styles.selected,
        isDisabled && styles.disabled,
        className,
      )}
      onClick={handleClick}
      onKeyUp={onEnterOrSpace(handleClick)}
    >
      <span
        role="radio"
        aria-checked={isSelected}
        aria-disabled={isDisabled}
        aria-label={ariaLabel}
        aria-labelledby={children && !ariaLabel ? labelId : undefined}
        className={styles.outerCircle}
        tabIndex={isDisabled ? -1 : 0}
        onKeyDown={preventSpaceScroll}
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
