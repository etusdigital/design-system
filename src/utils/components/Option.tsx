import React from 'react';
import clsx from 'clsx';
import '../styles/Option.css';

export interface OptionProps {
  selected?: boolean;
  disabled?: boolean;
  secondary?: boolean;
  noHover?: boolean;
  tabIndex?: number;
  'aria-selected'?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const Option = React.forwardRef<HTMLDivElement, OptionProps>(function Option(
  {
    selected = false,
    disabled = false,
    secondary = false,
    noHover = false,
    tabIndex = 0,
    'aria-selected': ariaSelected,
    children,
    className,
    onClick,
    onFocus,
    onKeyDown: onKeyDownProp,
  },
  ref
) {
  return (
    <div
      ref={ref}
      role="option"
      aria-selected={ariaSelected ?? selected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : tabIndex}
      className={clsx('option-container', { selected, disabled, secondary, noHover }, className)}
      onClick={disabled ? undefined : onClick}
      onFocus={onFocus}
      onKeyDown={(e) => {
        onKeyDownProp?.(e);
        if (e.isPropagationStopped()) return;
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
