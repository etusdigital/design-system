import { useState, useEffect, useRef, useCallback, Children, isValidElement } from 'react';
import clsx from 'clsx';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import styles from './ActionCard.module.css';

export interface ActionCardProps {
  icon?: string;
  color?: string;
  hideDrag?: boolean;
  children?: React.ReactNode;
  className?: string;
  onDragstart?: (event: MouseEvent | Touch) => void;
  onDragging?: (event: MouseEvent | Touch) => void;
  onDragend?: (event: MouseEvent | Touch) => void;
  onDelete?: () => void;
}

function getEvent(event: MouseEvent | TouchEvent): MouseEvent | Touch {
  if (event instanceof TouchEvent) return event.touches[0];
  return event;
}

function ActionCardCard({ children }: { children?: React.ReactNode }) {
  return <div className="py-sm">{children}</div>;
}

export function ActionCard({
  icon = '',
  color = '',
  hideDrag = false,
  children,
  className,
  onDragstart,
  onDragging,
  onDragend,
  onDelete,
}: ActionCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);

  // Keep ref in sync with state for use in event handlers
  isDraggingRef.current = isDragging;

  const move = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      onDragging?.(getEvent(event));
    },
    [onDragging]
  );

  const end = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      setIsDragging(false);
      isDraggingRef.current = false;
      onDragend?.(getEvent(event));
    },
    [onDragend]
  );

  // Register global listeners on mount; clean up on unmount.
  // Vue source registered 'touhend' (typo) — React version uses correct 'touchend'.
  useEffect(() => {
    window.addEventListener('mousemove', move as EventListener);
    window.addEventListener('mouseup', end as EventListener);
    window.addEventListener('touchmove', move as EventListener);
    window.addEventListener('touchend', end as EventListener);

    return () => {
      window.removeEventListener('mousemove', move as EventListener);
      window.removeEventListener('mouseup', end as EventListener);
      window.removeEventListener('touchmove', move as EventListener);
      window.removeEventListener('touchend', end as EventListener);
    };
  }, [move, end]);

  function start(event: React.MouseEvent | React.TouchEvent) {
    const rawEvent = event.nativeEvent;
    setIsDragging(true);
    isDraggingRef.current = true;
    onDragstart?.(getEvent(rawEvent as MouseEvent | TouchEvent));
  }

  // Separate ActionCard.Card children from header children
  const cardChildren: React.ReactNode[] = [];
  const headerChildren: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === ActionCardCard) {
      cardChildren.push(child);
    } else {
      headerChildren.push(child);
    }
  });

  const hasCardSlot = cardChildren.length > 0;

  return (
    <div className={clsx(styles.actionCard, className)}>
      {!hideDrag && (
        <span
          className={clsx(styles.sideIcon, isDragging ? 'cursor-grabbing' : 'cursor-grab')}
          onMouseDown={start as React.MouseEventHandler}
          onTouchStart={start as React.TouchEventHandler}
        >
          <Icon name="drag_indicator" />
        </span>
      )}
      <Card className="rounded-base [&>*]:px-xl">
        <header
          className={clsx(
            'flex items-center gap-xs bg-primary-interaction-default text-neutral-foreground-negative rounded-base py-sm',
            hasCardSlot && 'rounded-b-none'
          )}
          style={{ background: color || undefined }}
        >
          {icon && <Icon name={icon} />}
          {headerChildren}
        </header>
        {hasCardSlot && cardChildren}
      </Card>
      <span className={clsx(styles.sideIcon, 'cursor-pointer')} onClick={onDelete}>
        <Icon name="delete" />
      </span>
    </div>
  );
}

ActionCard.Card = ActionCardCard;
