import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import { Button } from '../Button/Button';
import { focusByArrowKey, getFocusableItems } from '../../utils';
import styles from './RoundMenu.module.css';

export interface RoundMenuProps {
  options: Array<{ icon?: string; label?: string; onClick?: () => void; [key: string]: any }>;
  iconKey?: string;
  labelKey?: string;
  radius?: number;
  className?: string;
}

export function RoundMenu({
  options,
  iconKey = 'icon',
  labelKey = 'label',
  radius = 80,
  className,
}: RoundMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function calculatePosition(index: number, total: number): React.CSSProperties {
    const angle = (2 * Math.PI * index) / total - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    focusByArrowKey(
      event,
      getFocusableItems(event.currentTarget, 'button'),
      'both',
      { loop: true }
    );
  };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.roundMenu, 'round-menu', className)}
      onKeyDown={handleKeyDown}
    >
      <Button
        round
        className={clsx(styles.trigger, isExpanded && styles.expanded)}
        aria-label={isExpanded ? 'Close menu' : 'Open menu'}
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((prev) => !prev)}
        color={isExpanded ? 'neutral': 'success'}
        icon={isExpanded ? 'close' : 'add'}
        size="small"
      />
      {options.map((option, index) => {
        const positionStyle = isExpanded
          ? calculatePosition(index, options.length)
          : undefined;

        return (
          <div
            key={index}
            className={clsx(styles.menuItem, !isExpanded && styles.collapsed)}
            style={positionStyle}
            aria-label={option[labelKey] ?? option.label}
            title={option[labelKey] ?? option.label}
          >
            <Button
              size="small"
              round
              background={option.background}
              icon={option[iconKey] ?? option.icon}
              tabIndex={isExpanded ? 0 : -1}
              onClick={option.onClick}
            >
              {option[labelKey] ?? option.label}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
