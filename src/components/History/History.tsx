import React from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Icon } from '../Icon';
import styles from './History.module.css';

interface HistoryOption {
  [key: string]: any;
}

interface HistoryProps {
  value?: any;
  onChange?: (value: any) => void;
  options: HistoryOption[];
  position?: 'top' | 'bottom' | 'left' | 'right';
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  disabled?: boolean;
  renderOption?: (option: any, index: number, active: boolean) => React.ReactNode;
  className?: string;
}

export function History({
  value,
  onChange,
  options,
  position = 'right',
  type = 'primary',
  disabled = false,
  renderOption,
  className,
}: HistoryProps) {
  const [model, setModel] = useControllable<any>({ value, defaultValue: null, onChange });

  const isActive = (option: any, index: number) =>
    (index === 0 && !model && !disabled) || option === model;

  const isHorizontal = position === 'top' || position === 'bottom';

  return (
    <div className={clsx(styles.history, 'history', isHorizontal && styles.flex, className)}>
      {options.map((option, index) => {
        const active = isActive(option, index);
        const optionType = option.type ?? type;
        const isFirst = index === 0;
        const isLast = !options[index + 1];
        const hasIcon = !!option.icon;
        const isCircleIcon = hasIcon && !option.isIconRound;
        const isRoundIcon = hasIcon && option.isIconRound;

        return (
          <div
            key={index}
            className={clsx(
              styles.option,
              styles[position],
              styles[optionType],
              isFirst && styles.firstOption,
              isLast && styles.lastOption,
              active && styles.active,
              disabled && styles.disabled,
            )}
            onClick={() => !disabled && setModel(option)}
          >
            <div
              className={clsx(
                styles.circle,
                isCircleIcon && styles.circleIcon,
                isRoundIcon && styles.roundIcon,
              )}
            >
              {hasIcon && (
                <Icon name={option.icon} filled={!option.unfilled} className={styles.icon} />
              )}
            </div>
            <div
              className={clsx(
                styles.customBorder,
                isCircleIcon && styles.haveIcon,
              )}
            />
            <div className={styles.dataList}>
              {renderOption?.(option, index, active)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
