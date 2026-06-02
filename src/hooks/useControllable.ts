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
  if (isControlled) isControlledRef.current = true;
  const effectiveIsControlled = isControlledRef.current;

  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);

  const wasControlledRef = useRef(isControlled);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (wasControlledRef.current !== isControlled) {
        const from = wasControlledRef.current ? 'controlled' : 'uncontrolled';
        const to = isControlled ? 'controlled' : 'uncontrolled';
        console.warn(
          `[useControllable] Component switched from ${from} to ${to}. ` +
          `This is not recommended and may cause unexpected behavior.`
        );
      }
      wasControlledRef.current = isControlled;
    }
  });

  const currentValue = effectiveIsControlled ? controlledValue : internalValue;

  const setValue = (newValue: T) => {
    if (!effectiveIsControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return [currentValue, setValue];
}
