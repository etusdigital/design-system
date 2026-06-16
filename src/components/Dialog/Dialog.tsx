import { useRef } from 'react';
import clsx from 'clsx';
import { Overlay } from '../../utils/components/Overlay';
import { useControllable } from '../../hooks/useControllable';
import { useTransition } from '../../hooks/useTransition';
import './Dialog.css';

export interface DialogProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  width?: string;
  height?: string;
  noOutsideClose?: boolean;
  children?: React.ReactNode;
  className?: string;
  zIndex?: number
}

export function Dialog({
  value,
  onChange,
  width = 'fit-content',
  height = 'fit-content',
  noOutsideClose = false,
  children,
  className,
  zIndex = 1002
}: DialogProps) {
  const [isOpen, setOpen] = useControllable<boolean>({ value, defaultValue: false, onChange });
  const { isMounted, isActive } = useTransition(isOpen ?? false, { duration: 500 });
  const dialogRef = useRef<HTMLDivElement>(null);

  function handleOverlayClick() {
    if (noOutsideClose) {
      dialogRef.current?.classList.add('no-outside-close-warning');
      setTimeout(() => {
        dialogRef.current?.classList.remove('no-outside-close-warning');
      }, 100);
    } else {
      setOpen(false);
    }
  }

  return (
    <Overlay value={isOpen} zIndex={zIndex} onClick={handleOverlayClick}>
      {isMounted && (
        <div
          ref={dialogRef}
          className={clsx('dialog', isActive && 'active', className)}
          style={{ width, height, zIndex: zIndex + 1 }}
        >
          {children}
        </div>
      )}
    </Overlay>
  );
}
