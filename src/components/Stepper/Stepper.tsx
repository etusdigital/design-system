import { useState } from 'react';
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

  // biggerStepSelected tracks the maximum step index the user has reached
  const [biggerStepSelected, setBiggerStepSelected] = useState<number>(
    () => Math.max(0, value ?? defaultValue ?? 0)
  );

  function getLabel(option: { [key: string]: any }): string {
    return isObject(option) ? option[labelKey] : option;
  }

  function getIcon(option: { [key: string]: any }): string {
    return isObject(option) ? option[iconKey] : 'image';
  }

  function getStepState(index: number): 'active' | 'past' | 'future' {
    const current = model ?? 0;
    if (index === current) return 'active';
    if (index < current || index <= biggerStepSelected) return 'past';
    return 'future';
  }

  // Connector between step[index] and step[index+1] is green when index < biggerStepSelected
  function getConnectorState(index: number): 'past' | 'future' {
    if (index < biggerStepSelected) return 'past';
    return 'future';
  }

  function handleStepClick(index: number) {
    if (!noClick) {
      setBiggerStepSelected(prev => Math.max(prev, index));
      setModel(index);
    }
  }

  const current = model ?? 0;

  return (
    <div
      className={clsx(styles.stepper, className)}
      style={background ? ({ '--stepper-bg': background } as React.CSSProperties) : undefined}
    >
      {options.map((option, index) => {
        const stepState = getStepState(index);
        const isActive = index === current;

        return (
          <div
            key={index}
            className={clsx('flex items-center', options[index + 1] ? 'w-full' : 'w-fit')}
          >
            <div
              className={clsx(styles.step, noClick && styles.noClick)}
              onClick={() => handleStepClick(index)}
            >
              {/* Button container with scale on active */}
              <div className={clsx(styles.buttonContainer, isActive && styles.activeItem)}>
                {/* Background ring element for active step */}
                {isActive ? (
                  <div className={styles.ring} />
                ) : (
                  <div
                    className={clsx(
                      styles.background,
                      index <= biggerStepSelected
                        ? styles.backgroundPast
                        : styles.backgroundFuture
                    )}
                  />
                )}
                {/* Step circle */}
                <div
                  className={clsx(
                    styles.circle,
                    styles[size],
                    styles[stepState]
                  )}
                >
                  {stepState === 'past' && !isActive ? (
                    <Icon className="stepper-icon" name="check" />
                  ) : (
                    <Icon className="stepper-icon" name={getIcon(option)} />
                  )}
                </div>
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
        );
      })}
    </div>
  );
}
