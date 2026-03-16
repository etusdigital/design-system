import clsx from 'clsx';
import '../styles/Option.css';

export interface OptionProps {
  selected?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  noHover?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Option({
  selected = false,
  disabled = false,
  secondary = false,
  noHover = false,
  children,
  className,
  onClick,
}: OptionProps) {
  return (
    <div
      role="option"
      tabIndex={0}
      className={clsx('option-container', { selected, disabled, secondary, noHover }, className)}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
}
