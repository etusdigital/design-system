import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { Label } from './Label';
import { Icon } from '../../components/Icon';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';
import '../styles/Container.css';
import { FloatCard } from '../../components/FloatCard';

export interface ContainerProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;
  labelValue?: string;
  role?: string;
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
  disableLabelAutoWidth?: boolean;
  children?: React.ReactNode;
  label?: React.ReactNode;
  complement?: React.ReactNode;
  leadingComplement?: React.ReactNode;
  renderContent?: (minWidth: string) => React.ReactNode;
  className?: string;
}

export function Container({
  value,
  defaultValue,
  onChange,
  labelValue = '',
  role = 'listbox',
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
  disableLabelAutoWidth = false,
  children,
  label,
  complement,
  leadingComplement,
  renderContent,
  className,
}: ContainerProps) {
  const [model, setModel] = useControllable<boolean>({
    value,
    defaultValue,
  });

  const isExpanded = disabled ? false : (model ?? false);

  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [contentMinWidth, setContentMinWidth] = useState(minWidth);

  function resize() {
    const newVal = (containerRef.current?.scrollWidth ?? 0) + 'px';
    if (newVal !== contentMinWidth) {
      setContentMinWidth(newVal);
    }
    if (!disableLabelAutoWidth && labelRef.current && containerRef.current) {
      labelRef.current.style.width = containerRef.current.scrollWidth + 'px';
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
  }

  return (
    <FloatCard value={isExpanded} card={renderContent?.(contentMinWidth)} onChange={blur}>
      <div className={clsx('container', className)}>
        {labelValue && (
          <div className="flex justify-between items-center">
            <Label labelValue={labelValue} infoMessage={infoMessage} required={required} />
          </div>
        )}
        <div
          ref={containerRef}
          role={role}
          aria-disabled={disabled || undefined}
          aria-required={required || undefined}
          className="label-container"
          tabIndex={0}
        >
          {label || (
            <div
              ref={labelRef}
              className={clsx('label-content', {
                disabled,
                secondary,
                expanded: isExpanded,
                'hide-bottom': hideBottom,
                error: isError,
              })}
              style={{ maxHeight, minWidth }}
              onClick={toggle}
              onKeyUp={(e) => { if (e.key === ' ') toggle(); }}
            >
              {leadingComplement}
              {children}

              <div className="flex items-center gap-xs ml-auto">
                {complement}
                {!hideArrow && (
                  <Icon
                    name={icon}
                    className={clsx('arrow-icon leading-xs', {
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
        {isError && (
          <small className="text-danger-foreground-low text-start p3">{errorMessage}</small>
        )}
      </div>
    </FloatCard>
  );
}
