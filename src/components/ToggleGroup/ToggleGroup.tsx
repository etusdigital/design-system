import { createContext } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isObject } from '../../utils';
import { Toggle } from '../Toggle/Toggle';
import styles from './ToggleGroup.module.css';

export interface ToggleGroupContextValue {
  selected: any;
  disabled: boolean;
  type: 'default' | 'secondary';
  select: (value: any) => void;
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

export interface ToggleGroupProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  vertical?: boolean;
  disabled?: boolean;
  type?: 'default' | 'secondary';
  options?: Array<any>;
  labelKey?: string;
  valueKey?: string;
  getObject?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function ToggleGroup({
  value,
  defaultValue,
  onChange,
  vertical = false,
  disabled = false,
  type = 'default',
  options,
  labelKey = 'label',
  valueKey = 'value',
  getObject = false,
  children,
  className,
}: ToggleGroupProps) {
  const [currentValue, setCurrentValue] = useControllable<any>({ value, defaultValue, onChange });

  function getLabel(option: any): string {
    return isObject(option) ? option[labelKey] : option;
  }

  function getValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  function getOptionDisabled(option: any): boolean {
    return isObject(option) ? option.disabled : false;
  }

  function select(selectedValue: any) {
    let valueToEmit = selectedValue;
    if (getObject && options) {
      const obj = options.find((opt: any) => getValue(opt) === selectedValue);
      if (obj !== undefined) valueToEmit = obj;
    }
    setCurrentValue(valueToEmit);
  }

  const contextValue: ToggleGroupContextValue = {
    selected: currentValue,
    disabled,
    type,
    select,
  };

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <div
        className={clsx(
          styles.toggleGroup,
          vertical && styles.vertical,
          type === 'default' && styles.default,
          type === 'secondary' && !vertical && styles.secondary,
          type === 'secondary' && vertical && styles.secondaryVertical,
          className
        )}
      >
        {options
          ? options.map((opt: any) => (
              <Toggle key={getValue(opt)} groupValue={getValue(opt)} disabled={getOptionDisabled(opt)}>
                {getLabel(opt)}
              </Toggle>
            ))
          : children}
      </div>
    </ToggleGroupContext.Provider>
  );
}
