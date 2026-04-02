import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useControllable } from "../../hooks/useControllable";
import { isObject } from "../../utils";
import styles from "./Stepper.module.css";
import { Icon } from "../Icon/Icon";

export interface StepperProps {
  value?: any;
  onChange?: (value: any) => void;
  onChangeStep?: (option: any, index: number) => void;
  options: Array<{ [key: string]: any }>;
  labelKey?: string;
  valueKey?: string;
  iconKey?: string;
  size?: "small" | "medium" | "large";
  getObject?: boolean;
  disabled?: boolean;
  allowSkip?: boolean;
  className?: string;
}

export function Stepper({
  value,
  onChange,
  onChangeStep,
  options,
  labelKey = "label",
  valueKey = "label",
  iconKey = "icon",
  size = "medium",
  getObject = false,
  disabled = false,
  allowSkip = false,
  className,
}: StepperProps) {
  const [model, setModel] = useControllable<any>({
    value,
    defaultValue: options.length ? options[0] : undefined,
    onChange,
  });

  // biggerStepSelected tracks the maximum step index the user has reached
  const currentIndex = getIndex(model)
  const pastIndexsRef = useRef(new Set([currentIndex]))
  const [biggerStepSelected, setBiggerStepSelected] = useState<number>(() =>
    Math.max(0, (currentIndex != -1 ? currentIndex : 0)),
  );

  useEffect(() => {
    const currentIndex = getIndex(value)
    if (currentIndex != -1) {
      if (currentIndex > biggerStepSelected) setBiggerStepSelected(currentIndex)
      pastIndexsRef.current.add(currentIndex)
    }
  }, [model])

  function getIndex(option: any) {
    return options.findIndex((o) => getValue(o) == getValue(option))
  }

  function getLabel(option: { [key: string]: any }): any {
    return isObject(option) ? option[labelKey] : option;
  }

  function getValue(option: { [key: string]: any }): any {
    return isObject(option) ? option[valueKey] : option;
  }

  function getIcon(option: { [key: string]: any }): string {
    return isObject(option) ? option[iconKey] : "image";
  }

  function getStepState(index: number): "active" | "past" | "future" {
    const current = model ?? 0;
    if (index === current) return "active";
    if (index < current || index <= biggerStepSelected) return "past";
    return "future";
  }

  // Connector between step[index] and step[index+1] is green when index < biggerStepSelected
  function getConnectorState(index: number): "past" | "future" {
    if (index < biggerStepSelected) return "past";
    return "future";
  }

  function handleStepClick(option: any, index: number) {
    const value = getObject ? option : getValue(option);

    if (!disabled) {
      const current = getIndex(model);
      if (!allowSkip && index - current > 1) return;
      pastIndexsRef.current.add(index)
      setBiggerStepSelected((prev) => Math.max(prev, index));
      setModel(getObject ? option : getValue(option));
    }

    if (onChangeStep) onChangeStep(value, index)
  }

  return (
    <div
      className={clsx(styles.stepper, 'stepper', className)}
    >
      {options.map((option, index) => {
        const stepState = getStepState(index);

        return (
          <div
            key={index}
            className={clsx(
              "flex items-center",
              options[index + 1] ? "w-full" : "w-fit",
              size,
              styles[size],
            )}
          >
            <div
              className={clsx(styles.stepContainer)}
              onClick={() => handleStepClick(option, index)}
            >
                <div
                  className={clsx(
                    styles[size],
                    styles[stepState],
                    styles.step,
                    getValue(model) == getValue(option) && styles.active,
                    {
                      [styles.past]: index < biggerStepSelected,
                      [styles.future]: index > biggerStepSelected,
                      [styles.skip]: index < biggerStepSelected && !pastIndexsRef.current.has(index)
                    }
                  )}
                >
                  <Icon className={clsx(styles.stepperIcon, styles[size])} name={getIcon(option)} />
              </div>
              <span className={styles.label}>{getLabel(option)}</span>
            </div>
            {options[index + 1] && (
              <div
                className={clsx(
                  styles.connector,
                  styles[getConnectorState(index)],
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
