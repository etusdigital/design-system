import { useState, useEffect, useRef, useId } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { Label } from './Label';
import { Icon } from '../../components/Icon';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';
import '../styles/Container.css';
import { FloatCard } from '../../components/FloatCard';

export interface ContainerProps {
  value?: boolean;
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;
  labelValue?: string;
  popupRole?: 'listbox' | 'menu' | 'dialog';
  popupId?: string;
  ariaLabel?: string;
  disabled?: boolean;
  isError?: boolean;
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  closeOnBlur?: boolean;
  hideBottom?: boolean;
  maxHeight?: string;
  minWidth?: string;
  secondary?: boolean;
  hideArrow?: boolean;
  icon?: string;
  children?: React.ReactNode;
  label?: React.ReactNode;
  complement?: React.ReactNode;
  leadingComplement?: React.ReactNode;
  renderContent?: (minWidth: string) => React.ReactNode;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export function Container({
  value,
  onChange,
  labelValue = '',
  popupRole = 'listbox',
  popupId,
  ariaLabel,
  disabled = false,
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  closeOnBlur = true,
  hideBottom = false,
  maxHeight = 'none',
  minWidth = '15em',
  secondary = false,
  hideArrow = false,
  icon = 'keyboard_arrow_down',
  children,
  label,
  complement,
  leadingComplement,
  renderContent,
  className,
  onKeyDown: onKeyDownProp,
}: ContainerProps) {
  const [model, setModel] = useControllable<boolean>({
    value,
  });

  const isExpanded = disabled ? false : (model ?? false);

  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const isCombobox = popupRole === 'listbox';

  const [contentMinWidth, setContentMinWidth] = useState(minWidth);

  function resize() {
    const newVal = (containerRef.current?.scrollWidth ?? 0) + 'px';
    if (newVal !== contentMinWidth) {
      setContentMinWidth(newVal);
    }
  }

  function blur(value: boolean) {
    if (closeOnBlur && model) {
      setModel(value)
      onChange?.(value, { source: 'blur' });
    } else {
      setModel(value)
      onChange?.(value, { source: 'click' });
    }
  }

  useEffect(() => {
    const obs = new MutationObserver(resize);
    if (containerRef.current) {
      obs.observe(containerRef.current, { attributes: true });
    }
    resize();
    return () => obs.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    resize();
  });

  function toggle() {
    if (disabled) return;
    setModel(!model);
    onChange?.(!model, { source: 'click' });
  }

  function onKeyDown(e: React.KeyboardEvent) {
    onKeyDownProp?.(e);
    if (label || e.target !== e.currentTarget) return;
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    toggle();
  }

  function onKeyUp(e: React.KeyboardEvent) {
    if (label || e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
  }

  return (
    <div>
      <FloatCard value={isExpanded} disabled={disabled} manualFocus={true} card={renderContent?.(contentMinWidth)} onChange={blur}>
        <div className={clsx('container', className)}>
          {labelValue && (
            <div className="flex justify-between items-center">
              <Label id={`${id}-label`} labelValue={labelValue} infoMessage={infoMessage} required={required} />
            </div>
          )}
          <div
            ref={containerRef}
            role={isCombobox ? 'combobox' : 'button'}
            aria-haspopup={popupRole}
            aria-expanded={isExpanded}
            aria-controls={isExpanded ? popupId : undefined}
            aria-label={labelValue ? undefined : ariaLabel}
            aria-labelledby={labelValue ? `${id}-label` : undefined}
            aria-describedby={isError ? `${id}-error` : undefined}
            aria-invalid={isCombobox ? isError : undefined}
            aria-required={isCombobox ? required : undefined}
            aria-disabled={disabled || undefined}
            className="label-container"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
          >
            {label || (
              <div
                className={clsx('label-content', {
                  disabled,
                  secondary,
                  expanded: isExpanded,
                  'hide-bottom': hideBottom,
                  error: isError,
                })}
                style={{ maxHeight, minWidth }}
                onClick={toggle}
              >
                {leadingComplement}
                {children}

                <div className="flex items-center gap-xs ml-auto">
                  {complement}
                  {!hideArrow && (
                    <Icon
                      name={icon}
                      className={clsx('arrow-icon', {
                        'text-neutral-interaction-disabled': disabled,
                        'text-danger-interaction-default': isError,
                        expanded: isExpanded,
                      })}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </FloatCard>
      {isError && (
        <small id={`${id}-error`} className="text-danger-foreground-low text-start p3">{errorMessage}</small>
      )}
    </div>
  );
}
