import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import styles from './Tab.module.css';

export interface TabProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  options?: Array<string | { label: string; [key: string]: any }>;
  labelKey?: string;
  notCard?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function Tab({
  value,
  defaultValue,
  onChange,
  options = [],
  labelKey = 'label',
  notCard = false,
  children,
  className,
}: TabProps) {
  const [model, setModel] = useControllable<number>({
    value,
    defaultValue: defaultValue ?? 0,
    onChange,
  });

  function getLabel(option: string | { label: string; [key: string]: any }): string {
    if (typeof option === 'string') return option;
    return option[labelKey] as string;
  }

  return (
    <div className={clsx(styles.container, notCard && styles.notCard, className)}>
      <div className="flex font-bold text-sm gap-xs w-fit">
        {options.map((option, index) => (
          <button
            key={index}
            className={clsx(styles.tabButton, model === index && styles.active)}
            onClick={() => setModel(index)}
          >
            {getLabel(option)}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
