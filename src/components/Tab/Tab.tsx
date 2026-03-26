import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { Icon } from '../Icon/Icon';
import styles from './Tab.module.css';

export interface TabProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  options?: Array<string | { label: string; icon?: string; [key: string]: any }>;
  labelKey?: string;
  isIcon?: boolean;
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
  isIcon = false,
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
    <div className={clsx(styles.container, 'tab', notCard && styles.notCard, className)}>
      <div className="flex font-bold text-sm gap-xs w-fit">
        {options.map((option, index) => (
          <button
            key={index}
            className={clsx(styles.tabButton, model === index && styles.active)}
            onClick={() => setModel(index)}
          >
            {typeof option === 'object' && option.icon ? (
              <>
                <Icon name={option.icon} className={styles.icon} />
                <span>{getLabel(option)}</span>
              </>
            ) : isIcon && typeof option === 'string' ? (
              <Icon name={option} className={styles.icon} />
            ) : (
              <span>{getLabel(option)}</span>
            )}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
