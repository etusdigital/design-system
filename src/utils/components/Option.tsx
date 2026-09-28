import React from 'react';
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
  onFocus?: () => void;
}

export const Option = React.forwardRef<HTMLDivElement, OptionProps>(function Option(
  {
    selected = false,
    disabled = false,
    secondary = false,
    noHover = false,
    children,
    className,
    onClick,
    onFocus,
  },
  ref
) {
  return (
    <div
      ref={ref}
      role="option"
      tabIndex={0}
      className={clsx('option-container', { selected, disabled, secondary, noHover }, className)}
      onClick={disabled ? undefined : onClick}
      onFocus={onFocus}
      onKeyDown={(e) => {
        if (disabled || (e.key !== 'Enter' && e.key !== ' ')) return;
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
    >
      {children}
    </div>
  );
});
