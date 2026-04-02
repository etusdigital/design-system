import clsx from "clsx";
import { useControllable } from "../../hooks/useControllable";
import { Icon } from "../Icon/Icon";
import styles from "./Tab.module.css";
import { isObject } from "#utils/index";

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
  children?: React.ReactNode;
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
  children,
  className,
}: TabProps) {
  const [model, setModel] = useControllable<any>({
    value,
    defaultValue: options.length ? options[0] : undefined,
    onChange,
  });

  function getValue(option: any) {
    return isObject(option) ? option[valueKey] : option;
  }

  function getLabel(option: any) {
    return isObject(option) ? option[labelKey] : option;
  }

  function handleClick(option: any) {
    setModel(getObject ? option : getValue(option))
  }

  return (
    <div
      className={clsx(
        styles.container,
        "tab",
        notCard && styles.notCard,
        className,
      )}
    >
      <div className="flex font-bold text-sm gap-xs w-fit">
        {options.map((option, index) => (
          <button
            key={index}
            className={clsx(
              styles.tabButton,
              getValue(model) === getValue(option) && styles.active,
            )}
            onClick={() => handleClick(option)}
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
        ))}
      </div>
      {children}
    </div>
  );
}
