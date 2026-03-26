import { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon/Icon';
import { FloatCard } from '../FloatCard/FloatCard';
import { useControllable } from '../../hooks/useControllable';
import { isObject } from '../../utils';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbProps {
  value?: any;
  defaultValue?: any;
  onChange?: (value: any) => void;
  options?: any[];
  labelKey?: string;
  valueKey?: string;
  getObject?: boolean;
  className?: string;
}

export function Breadcrumb({
  value,
  defaultValue,
  onChange,
  options = [],
  labelKey = 'label',
  valueKey = 'value',
  getObject = false,
  className,
}: BreadcrumbProps) {
  const [model, setModel] = useControllable({
    value,
    defaultValue,
    onChange,
  });

  const [expanded, setExpanded] = useState<boolean[]>([]);

  function getLabel(val: any): string {
    return isObject(val) ? val[labelKey] : String(val);
  }

  function getValue(option: any): any {
    return isObject(option) ? option[valueKey] : option;
  }

  function isActive(option: any): boolean {
    const val = getValue(option);
    const selectedValue = getValue(model);
    return selectedValue == val;
  }

  function handleSelect(option: any) {
    const val = getObject ? option : getValue(option);
    setExpanded(expanded.map(() => false));
    setTimeout(() => {
      setModel(val);
    }, 200);
  }

  const parsedOptions = (() => {
    if (!options?.length) return [];

    const opts = [...options];
    let selectedIndex = opts.findIndex((option) => isActive(option));
    if (selectedIndex === -1) selectedIndex = 0;

    const result: any[] = [];

    for (let i = 0; i < opts.length; i++) {
      if (
        i === 0 ||
        i === opts.length - 1 ||
        (selectedIndex === 0 && i < 2) ||
        (selectedIndex === opts.length - 1 && i >= opts.length - 2) ||
        selectedIndex - 1 === i ||
        selectedIndex + 1 === i ||
        selectedIndex === i
      ) {
        result.push(opts[i]);
      } else if (i === 1 && selectedIndex > 1) {
        result.push({
          icon: 'more_horiz',
          options: opts.slice(1, selectedIndex - 1),
        });
      } else if (i === opts.length - 2 && selectedIndex < opts.length - 2) {
        result.push({
          icon: 'more_horiz',
          options: opts.slice(selectedIndex + 2, opts.length - 1),
        });
      }
    }

    return result;
  })();

  return (
    <div className={clsx(styles.breadcrumb, 'breadcrumb', className)}>
      {parsedOptions.map((option, index) => (
        <span key={index} className={styles.itemWrapper}>
          {isObject(option) && option.icon === 'more_horiz' ? (
            <FloatCard
              value={expanded[index]}
              onChange={(open: boolean) => {
                const next = [...expanded];
                next[index] = open;
                setExpanded(next);
              }}
              card={
                <div className={styles.moreOptions}>
                  {option.options.map((subOption: any, subIndex: number) => (
                    <div
                      key={subIndex}
                      className={styles.subOption}
                      onClick={() => handleSelect(subOption)}
                    >
                      {getLabel(subOption)}
                    </div>
                  ))}
                </div>
              }
            >
              <Icon name="more_horiz" className={styles.moreIcon} />
            </FloatCard>
          ) : (
            <h5
              className={clsx(styles.option, isActive(option) && styles.active)}
              onClick={() => handleSelect(option)}
            >
              {getLabel(option)}
            </h5>
          )}
          {index < parsedOptions.length - 1 && <Icon name="chevron_right" />}
        </span>
      ))}
    </div>
  );
}
