import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isObject } from '../../utils';
import styles from './Stepper.module.css';
import './Stepper.css';
import { Icon } from '../Icon/Icon';

export interface StepperProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  options: Array<{ [key: string]: any }>;
  labelKey?: string;
  iconKey?: string;
  background?: string;
  size?: 'medium' | 'large';
  noClick?: boolean;
  className?: string;
}

export function Stepper({
  value,
  defaultValue,
  onChange,
  options,
  labelKey = 'label',
  iconKey = 'icon',
  background,
  size = 'medium',
  noClick = false,
  className,
}: StepperProps) {
  const [model, setModel] = useControllable<number>({
    value,
    defaultValue: defaultValue ?? 0,
    onChange,
  });

  const [passedIn, setPassedIn] = useState<Set<number>>(() => new Set([0]));
  const [biggerStepSelected, setBiggerStepSelected] = useState(false);
  const prevModelRef = useRef<number>(model ?? 0);

  useEffect(() => {
    const current = model ?? 0;
    const prev = prevModelRef.current;

    if (current !== prev) {
      setPassedIn((prev) => {
        const next = new Set(prev);
        next.add(prev.valueOf());
        return next;
      });
      if (current > prev) {
        setBiggerStepSelected(true);
      }
      prevModelRef.current = current;
    }
  }, [model]);

  function getLabel(option: { [key: string]: any }): string {
    return isObject(option) ? option[labelKey] : option;
  }

  function getIcon(option: { [key: string]: any }): string {
    return isObject(option) ? option[iconKey] : 'image';
  }

  function getStepState(index: number): 'active' | 'past' | 'skipped' | 'default' {
    const current = model ?? 0;
    if (index === current) return 'active';
    if (passedIn.has(index) || index < current) return 'past';
    return 'default';
  }

  function getConnectorState(index: number): 'active' | 'past' | 'default' {
    const current = model ?? 0;
    if (index < current) return 'past';
    if (index === current) return 'active';
    return 'default';
  }

  function handleStepClick(index: number) {
    if (!noClick) {
      setModel(index);
    }
  }

  return (
    <div
      className={clsx(styles.stepper, className)}
      style={background ? ({ '--stepper-bg': background } as React.CSSProperties) : undefined}
    >
      {options.map((option, index) => (
        <div
          key={index}
          className={clsx('flex items-center', options[index + 1] ? 'w-full' : 'w-fit')}
        >
          <div
            className={clsx(styles.step, noClick && styles.noClick)}
            onClick={() => handleStepClick(index)}
          >
            <div
              className={clsx(
                styles.circle,
                styles[size],
                styles[getStepState(index)]
              )}
            >
              
              <Icon className="stepper-icon" name={getIcon(option)} />
            </div>
            <span className={styles.label}>{getLabel(option)}</span>
          </div>
          {options[index + 1] && (
            <div
              className={clsx(
                styles.connector,
                styles[getConnectorState(index)]
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
