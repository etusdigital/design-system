import { useRef } from "react";
import clsx from "clsx";
import { useControllable } from "../../hooks/useControllable";
import { Icon } from "../Icon/Icon";
import styles from "./Tab.module.css";
import { isObject, focusByArrowKey, getFocusableItems } from "#utils/index";

export interface TabProps {
  value?: any;
  onChange?: (value: any) => void;
  options?: Array<
    string | any
  >;
  labelKey?: string;
  valueKey?: string;
  isIcon?: boolean;
  notCard?: boolean;
  getObject?: boolean;
  className?: string;
}

export function Tab({
  value,
  onChange,
  options = [],
  labelKey = "label",
  valueKey = "value",
  isIcon = false,
  notCard = false,
  getObject = false,
  className,
}: TabProps) {
  const [model, setModel] = useControllable<any>({
    value,
    defaultValue: options.length ? options[0] : undefined,
    onChange,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  function getValue(option: any) {
    return isObject(option) ? option[valueKey] : option;
  }

  function getLabel(option: any) {
    return isObject(option) ? option[labelKey] : option;
  }

  function handleClick(option: any) {
    setModel(getObject ? option : getValue(option))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    focusByArrowKey(
      event,
      getFocusableItems(event.currentTarget, 'button'),
      'horizontal'
    );
  };

  return (
    <div
      ref={containerRef}
      className={clsx(
        styles.container,
        "tab",
        notCard && styles.notCard,
        className,
      )}
      onKeyDown={handleKeyDown}
    >
        {options.map((option, index) => {
          const hasLabel = getLabel(option);
          const ariaLabel =
            typeof option === "object" && option.icon
              ? (hasLabel ? undefined : option.icon)
              : isIcon && typeof option === "string"
                ? option
                : undefined;

          return (
            <button
              key={index}
              className={clsx(
                styles.tabButton,
                getValue(model) === getValue(option) && styles.active,
              )}
              onClick={() => handleClick(option)}
              aria-label={ariaLabel}
            >
              {typeof option === "object" && option.icon ? (
                <>
                  <Icon name={option.icon} className={styles.icon} />
                  <span>{getLabel(option)}</span>
                </>
              ) : isIcon && typeof option === "string" ? (
                <Icon name={option} className={styles.icon} />
              ) : (
                <span>{getLabel(option)}</span>
              )}
            </button>
          );
        })}
    </div>
  );
}
