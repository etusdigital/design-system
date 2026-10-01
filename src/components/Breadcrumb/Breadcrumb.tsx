import { useState, useRef } from "react";
import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import { FloatCard } from "../FloatCard/FloatCard";
import { useControllable } from "../../hooks/useControllable";
import { isObject, focusByArrowKey, getFocusableItems, focusWhenReady } from "../../utils";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps {
  value?: any;
  onChange?: (value: any) => void;
  options?: any[];
  labelKey?: string;
  valueKey?: string;
  getObject?: boolean;
  className?: string;
}

export function Breadcrumb({
  value,
  onChange,
  options = [],
  labelKey = "label",
  valueKey = "value",
  getObject = false,
  className,
}: BreadcrumbProps) {
  const [model, setModel] = useControllable({
    value,
    onChange,
  });

  const [expanded, setExpanded] = useState<boolean[]>([]);
  const moreOptionsRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    focusByArrowKey(
      event,
      getFocusableItems(event.currentTarget, '.breadcrumb-item'),
      'horizontal'
    );
  };

  const handleMoreKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    event.preventDefault();
    const next = [...expanded];
    next[index] = true;
    setExpanded(next);

    focusWhenReady(() => {
      if (!moreOptionsRefs.current[index]) return undefined;
      const items = getFocusableItems(moreOptionsRefs.current[index]);
      return event.key === 'ArrowDown' ? items[0] : items[items.length - 1];
    });
  };

  const handleMoreToggle = (open: boolean, index: number) => {
    if (open) {
      focusWhenReady(() => moreOptionsRefs.current[index]);
    }
  };

  const handleMoreOptionsKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key))
      event.stopPropagation();
    focusByArrowKey(
      event,
      getFocusableItems(event.currentTarget),
      'vertical'
    );
  };

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
          icon: "more_horiz",
          options: opts.slice(1, selectedIndex - 1),
        });
      } else if (i === opts.length - 2 && selectedIndex < opts.length - 2) {
        result.push({
          icon: "more_horiz",
          options: opts.slice(selectedIndex + 2, opts.length - 1),
        });
      }
    }

    return result;
  })();

  return (
    <div className={clsx(styles.breadcrumb, "breadcrumb", className)} onKeyDown={handleKeyDown}>
      {parsedOptions.map((option, index) => (
        <span key={index} className={styles.itemWrapper}>
          {isObject(option) && option.icon === "more_horiz" ? (
            <FloatCard
              value={expanded[index]}
              onChange={(open: boolean) => {
                const next = [...expanded];
                next[index] = open;
                setExpanded(next);
                handleMoreToggle(open, index);
              }}
              className="leading-none"
              manualFocus
              card={
                <div
                  ref={(el) => {
                    moreOptionsRefs.current[index] = el;
                  }}
                  className={styles.moreOptions}
                  tabIndex={-1}
                  onKeyDown={handleMoreOptionsKeyDown}
                >
                  {option.options.map((subOption: any, subIndex: number) => (
                    <div
                      key={subIndex}
                      className={styles.subOption}
                      tabIndex={0}
                      onClick={() => handleSelect(subOption)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelect(subOption);
                        }
                      }}
                    >
                      {getLabel(subOption)}
                    </div>
                  ))}
                </div>
              }
            >
              <Icon
                name="more_horiz"
                className={clsx(styles.moreIcon, 'breadcrumb-item')}
                tabIndex={0}
                aria-label="Show more"
                onKeyDown={(e: any) => handleMoreKeyDown(e, index)}
              />
            </FloatCard>
          ) : (
            <h5
              className={clsx(styles.option, 'breadcrumb-item', isActive(option) && styles.active)}
              tabIndex={0}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSelect(option);
                }
              }}
            >
              {getLabel(option)}
            </h5>
          )}
          {index < parsedOptions.length - 1 && (
            <Icon name="chevron_right" className="leading-xxs" />
          )}
        </span>
      ))}
    </div>
  );
}
