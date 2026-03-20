import React, { useState } from 'react';
import clsx from 'clsx';
import { Button } from '../Button/Button';
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

  function calculatePosition(index: number, total: number): React.CSSProperties {
    // Start from top (-PI/2), distribute evenly around circle
    const angle = (2 * Math.PI * index) / total - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return {
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };
  }

  return (
    <div className={clsx(styles.roundMenu, className)}>
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
              round
              background={option.background}
              icon={option[iconKey] ?? option.icon}
              onClick={option.onClick}
            >
              {option[labelKey] ?? option.label}
            </Button>
          </div>
        );
      })}

      <Button
        round
        className={clsx(styles.trigger, isExpanded && styles.expanded)}
        onClick={() => setIsExpanded((prev) => !prev)}
        color={isExpanded ? 'neutral': 'success'}
        icon={isExpanded ? 'close' : 'add'}
      />
    </div>
  );
}
