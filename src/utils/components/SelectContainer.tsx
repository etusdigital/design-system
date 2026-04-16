import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { ExpandableContainer } from './ExpandableContainer';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';
import '../styles/SelectContainer.css';

export interface SelectContainerProps {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;
  labelValue?: string;
  role?: string;
  absolute?: boolean;
  disabled?: boolean;
  isError?: boolean; 
  errorMessage?: string;
  infoMessage?: string;
  required?: boolean;
  closeOnBlur?: boolean;
  dontHaveMaxHeight?: boolean;
  maxHeight?: string;
  minWidth?: string;
  secondary?: boolean;
  hideArrow?: boolean;
  disableLabelAutoWidth?: boolean;
  icon?: string;
  children?: React.ReactNode;
  complement?: React.ReactNode;
  leadingComplement?: React.ReactNode;
  label?: React.ReactNode;
  content?: React.ReactNode;
  options?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function SelectContainer({
  value,
  defaultValue,
  onChange,
  labelValue = '',
  absolute = false,
  disabled = false,
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  closeOnBlur = true,
  dontHaveMaxHeight = false,
  maxHeight = '40px',
  minWidth = '15em',
  secondary = false,
  hideArrow = false,
  disableLabelAutoWidth = false,
  icon,
  children,
  complement,
  leadingComplement,
  label,
  content,
  options,
  actions,
  className,
}: SelectContainerProps) {
  const [model, setModel] = useControllable<boolean>({
    value,
    defaultValue,
  });

  const isExpanded = disabled ? false : (model ?? false);

  const isExpandedRef = useRef(isExpanded);
  isExpandedRef.current = isExpanded;

  const fatherRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function resize() {
    if (!contentRef.current) return;
    contentRef.current.style.maxHeight = isExpandedRef.current
      ? `${contentRef.current.scrollHeight + 1}px`
      : '0px';
  }

  useEffect(() => {
    const fatherEl = fatherRef.current;
    if (!fatherEl) return;
    const containerEl = fatherEl.querySelector('.label-container') as HTMLDivElement | null;
    const contentEl = contentRef.current;

    const resizeObs = new ResizeObserver(() => resize());
    const mutationObs = new MutationObserver(() => resize());

    if (containerEl) {
      mutationObs.observe(containerEl, { characterData: true, subtree: true, childList: true });
      resizeObs.observe(containerEl, { box: 'border-box' });
    }
    if (contentEl) resizeObs.observe(contentEl, { box: 'border-box' });

    const timer = setTimeout(() => resize(), 200);

    return () => {
      resizeObs.disconnect();
      mutationObs.disconnect();
      clearTimeout(timer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    resize();
  });

  return (
    <div ref={fatherRef}>
      <ExpandableContainer
        className={clsx('select-container', className)}
        value={model}
        onChange={(val, extra) => {
          setModel(val);
          onChange?.(val, extra);
        }}
        absolute={absolute}
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
        disableLabelAutoWidth={disableLabelAutoWidth}
        label={label}
        complement={complement}
        leadingComplement={leadingComplement}
        icon={icon}
        content={
          <div
            ref={contentRef}
            className="content-wrapper"
          >
            <div
              className={clsx('sc-content', 'transition-translate', {
                secondary,
                expanded: isExpanded,
                'has-max-height': !dontHaveMaxHeight,
              })}
            >
              {content || (
                <ul
                  role="list"
                  className={clsx('options-list', {
                    'p-xxs [&>*]:p-xs': !dontHaveMaxHeight,
                  })}
                >
                  {options}
                </ul>
              )}

              {actions && (
                <div className="sc-actions" tabIndex={0}>
                  {actions}
                </div>
              )}
            </div>
          </div>
        }
      >
        {children}
      </ExpandableContainer>
    </div>
  );
}
