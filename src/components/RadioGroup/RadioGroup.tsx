import { createContext } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isObject } from '../../utils';
import { Radio } from '../Radio/Radio';
import styles from './RadioGroup.module.css';

export interface RadioGroupContextValue {
  selected: any;
  disabled: boolean;
  select: (value: any) => void;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  vertical?: boolean;
  disabled?: boolean;
  options?: Array<any>;
  labelKey?: string;
  valueKey?: string;
  getObject?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  value,
  defaultValue,
  onChange,
  vertical = false,
  disabled = false,
  options,
  labelKey = 'label',
  valueKey = 'value',
  getObject = false,
  children,
  className,
}: RadioGroupProps) {
  const [currentValue, setValueInternal] = useControllable<any>({
    value,
    defaultValue,
    onChange,
  });

  function setValue(newValue: any) {
    if (getObject && options) {
      const object = options.find((opt) => getOptValue(opt) === newValue);
      if (object !== undefined) {
        setValueInternal(object);
        return;
      }
    }
    setValueInternal(newValue);
  }

  function getLabel(opt: any): string {
    return isObject(opt) ? (opt as Record<string, any>)[labelKey] : String(opt);
  }

  function getOptValue(opt: any): any {
    return isObject(opt) ? (opt as Record<string, any>)[valueKey] : opt;
  }

  function getDisabled(opt: any): boolean {
    return isObject(opt) ? ((opt as Record<string, any>).disabled ?? false) : false;
  }

  const contextSelected =
    getObject && isObject(currentValue)
      ? (currentValue as Record<string, any>)[valueKey]
      : currentValue;

  return (
    <RadioGroupContext.Provider
      value={{ selected: contextSelected, disabled, select: setValue }}
    >
      <div
        className={clsx(
          styles.radioGroup,
          'radio-group',
          vertical ? styles.vertical : styles.horizontal,
          className,
        )}
      >
        {options
          ? options.map((opt) => {
              const optValue = getOptValue(opt);
              return (
                <Radio
                  key={optValue}
                  groupValue={optValue}
                  disabled={getDisabled(opt)}
                >
                  {getLabel(opt)}
                </Radio>
              );
            })
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
}
