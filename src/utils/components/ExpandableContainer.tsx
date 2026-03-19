import clsx from 'clsx';
import { useControllable } from '../../hooks';
import { Container } from './Container';
import type { ContainerModelExtra } from '../types/ContainerModelExtra';

export interface ExpandableContainerProps {
  value?: boolean;              // was modelValue
  defaultValue?: boolean;
  onChange?: (value: boolean, extra: ContainerModelExtra) => void;
  labelValue?: string;          // default: ''
  absolute?: boolean;           // default: true
  disabled?: boolean;           // default: false
  isError?: boolean;            // default: false
  errorMessage?: string;        // default: ''
  infoMessage?: string;         // default: ''
  required?: boolean;           // default: false
  closeOnBlur?: boolean;        // default: true
  alignRight?: boolean;         // default: false
  maxHeight?: string;           // default: '40px'
  minWidth?: string;            // default: 'unset'
  minWidthCard?: string;
  icon?: string;
  secondary?: boolean;          // default: false
  hideArrow?: boolean;          // default: false
  disableLabelAutoWidth?: boolean; // default: false
  children?: React.ReactNode;       // default slot
  complement?: React.ReactNode;     // complement slot (right side)
  leadingComplement?: React.ReactNode; // leading slot (left side)
  label?: React.ReactNode;          // label slot
  card?: React.ReactNode;           // card slot (replaces <slot name="card">)
  content?: React.ReactNode;        // content slot inside card (replaces <slot name="content">)
  className?: string;
}

export function ExpandableContainer({
  value,
  defaultValue,
  onChange,
  labelValue = '',
  disabled = false,
  isError = false,
  errorMessage = '',
  infoMessage = '',
  required = false,
  closeOnBlur = true,
  maxHeight = '40px',
  minWidth = 'unset',
  secondary = false,
  hideArrow = false,
  disableLabelAutoWidth = false,
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
    defaultValue,
  });

  function changeModel(val: boolean, extra: ContainerModelExtra) {
    setModel(val);
    onChange?.(val, extra);
  }

  return (
    <Container
      className={clsx('expandable-container', className)}
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
      disableLabelAutoWidth={disableLabelAutoWidth}
      label={label}
      complement={complement}
      leadingComplement={leadingComplement}
      icon={icon}
      renderContent={(contentMinWidth) => (
          card || (
            <div style={{ minWidth: contentMinWidth }}>
              {content}
            </div>
          )
      )}
    >
      {children}
    </Container>
  );
}
