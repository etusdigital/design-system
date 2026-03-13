import { useState, useRef, useEffect } from 'react';

export interface UseControllableOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function useControllable<T>(
  options: UseControllableOptions<T>
): [T | undefined, (value: T) => void] {
  const { value: controlledValue, defaultValue, onChange } = options;
  const isControlled = controlledValue !== undefined;
  const isControlledRef = useRef(isControlled);

  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);

  // Dev mode warning for switching between controlled/uncontrolled.
  // Always call useEffect (rules of hooks) — make the warning logic conditional inside.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (isControlledRef.current !== isControlled) {
        const from = isControlledRef.current ? 'controlled' : 'uncontrolled';
        const to = isControlled ? 'controlled' : 'uncontrolled';
        console.warn(
          `[useControllable] Component switched from ${from} to ${to}. ` +
          `This is not recommended and may cause unexpected behavior.`
        );
      }
      isControlledRef.current = isControlled;
    }
  });

  const currentValue = isControlled ? controlledValue : internalValue;

  const setValue = (newValue: T) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return [currentValue, setValue];
}
