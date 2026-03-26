import { useState } from "react";
import clsx from "clsx";
import { useControllable } from "../../hooks/useControllable";
import { SelectContainer } from "../../utils/components/SelectContainer";
import { Option } from "../../utils/components/Option";
import styles from "./AutoComplete.module.css";
import { Input } from "../Input";

export interface AutoCompleteProps {
  value?: string | number;
  defaultValue?: any;
  onChange?: (value: any) => void;
  options: string[] | number[];
  disabled?: boolean;
  labelValue?: string;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function AutoComplete({
  value,
  defaultValue,
  onChange,
  options,
  disabled = false,
  labelValue = "",
  isError = false,
  errorMessage = "",
  infoMessage = "",
  required = false,
  placeholder = "Search...",
  className,
}: AutoCompleteProps) {
  const [model, setModel] = useControllable<any>({
    value,
    defaultValue: defaultValue ?? null,
    onChange,
  });

  // Internal search text — not exposed to consumer
  const [expanded, setExpanded] = useState(false);
  let focus = false

  function handleExpanded(val: boolean, extra?: any) {
    if (extra?.source == "blur") setExpanded(val && focus);
    else if (focus) setExpanded(true)
    else setExpanded(val);
  }

  function handleFocus(val: boolean) {
    focus = val
  }

  const filteredOptions = options.filter((o) =>
    String(o)
      .toLowerCase()
      .includes(model?.toLowerCase() || ""),
  );

  function selectOption(option: string | number) {
    if (disabled) return;

    setModel(option);
    setExpanded(false);
  }

  const optionsNode =
    filteredOptions.length > 0
      ? filteredOptions.map((option, index) => (
          <Option
            key={index}
            selected={model === option}
            onClick={() => selectOption(option)}
          >
            {option}
          </Option>
        ))
      : [
          <div key="no-results" className={styles.noResults}>
            No options match your search
          </div>,
        ];

  return (
    <div className="auto-complete" onClick={() => setTimeout(() => handleExpanded(focus))}>
      <SelectContainer
        value={expanded}
        onChange={handleExpanded}
        labelValue={labelValue}
        absolute={true}
        disabled={disabled}
        isError={isError}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
        required={required}
        options={optionsNode}
        label={
          <Input
            value={model}
            disabled={disabled}
            isError={isError}
            infoMessage={infoMessage}
            placeholder={placeholder}
            appendIcon="unfold_more"
            onChange={setModel}
            onFocus={() => {handleFocus(true)}}
            onBlur={() => handleFocus(false)}
          />
        }
        className={clsx("auto-complete-content", className)}
      />
    </div>
  );
}
