import { createContext, useContext } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';

export interface GroupContextValue {
  value: any;
  disabled: boolean;
  select: (value: any) => void;
}

export const GroupContext = createContext<GroupContextValue | null>(null);

export function useGroupContext(): GroupContextValue | null {
  return useContext(GroupContext);
}

export interface GroupProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  vertical?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Group({
  value,
  defaultValue,
  onChange,
  vertical = false,
  disabled = false,
  children,
  className,
}: GroupProps) {
  const [currentValue, setValue] = useControllable<any>({ value, defaultValue, onChange });

  return (
    <GroupContext.Provider value={{ value: currentValue ?? null, disabled, select: setValue }}>
      <div
        className={clsx('inline-flex', vertical ? 'flex-col' : 'items-end', className)}
      >
        {children}
      </div>
    </GroupContext.Provider>
  );
}
