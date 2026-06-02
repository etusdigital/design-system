import clsx from "clsx";
import { useControllable } from "../../hooks";
import { Container } from "./Container";
import type { ContainerModelExtra } from "../types/ContainerModelExtra";

export interface ExpandableContainerProps {
  value?: boolean;
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;
  labelValue?: string;
  absolute?: boolean;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  closeOnBlur?: boolean;
  alignRight?: boolean;
  maxHeight?: string;
  minWidth?: string;
  minWidthCard?: string;
  icon?: string;
  secondary?: boolean;
  hideArrow?: boolean;
  children?: React.ReactNode;
  complement?: React.ReactNode;
  leadingComplement?: React.ReactNode;
  label?: React.ReactNode;
  card?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

export function ExpandableContainer({
  value,
  onChange,
  labelValue = "",
  disabled = false,
  isError = false,
  errorMessage = "",
  infoMessage = "",
  required = false,
  closeOnBlur = true,
  maxHeight = "40px",
  minWidth = "unset",
  secondary = false,
  hideArrow = false,
  icon,
  children,
  complement,
  leadingComplement,
  label,
  card,
  content,
  className,
}: ExpandableContainerProps) {
  const [model, setModel] = useControllable<boolean>({
    value,
  });

  function changeModel(val: boolean, extra: ContainerModelExtra) {
    setModel(val);
    onChange?.(val, extra);
  }

  return (
    <Container
      className={clsx("expandable-container w-fit", className)}
      value={model}
      onChange={changeModel}
      labelValue={labelValue}
      closeOnBlur={closeOnBlur}
      disabled={disabled}
      isError={isError}
      errorMessage={errorMessage}
      infoMessage={infoMessage}
      required={required}
      maxHeight={maxHeight}
      minWidth={minWidth}
      secondary={secondary}
      hideArrow={hideArrow}
      label={label}
      complement={complement}
      leadingComplement={leadingComplement}
      icon={icon}
      renderContent={(contentMinWidth) => (
        <div style={{ minWidth: contentMinWidth }}>{card || content}</div>
      )}
    >
      {children}
    </Container>
  );
}
