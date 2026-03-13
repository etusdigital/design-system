import clsx from 'clsx';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
import { blendColors } from '../../utils';
import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  value?: number;
  size?: 'small' | 'medium' | 'large';
  type?: 'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  color?: string;
  icon?: string;
  infoMessage?: string;
  steps?: number;
  animationType?: 'indeterminate' | 'query' | undefined;
  displayPercentage?: 'center' | 'bar' | undefined;
  neutralBackground?: boolean;
  iconSlot?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function ProgressBar({
  value = 0,
  size = 'medium',
  type = 'primary',
  color = '',
  icon = '',
  infoMessage = '',
  steps = 0,
  animationType,
  displayPercentage,
  neutralBackground = false,
  iconSlot,
  className,
}: ProgressBarProps) {
  // Compute progress width
  const computeProgressWidth = (): string => {
    let val = value * 100;
    if (steps) val = (value / steps) * 100;
    else if (animationType) val = 50;
    return Math.max(0, Math.min(100, val)) + '%';
  };

  const progressWidth = computeProgressWidth();

  const background = (): string => {
    if (neutralBackground || !color) return '';
    return blendColors(color);
  };

  const showIcon = !animationType && (icon || iconSlot);

  const iconContent = (
    <>{iconSlot ?? <Icon name={icon} />}</>
  );

  // Step bar mode
  if (steps) {
    return (
      <div
        className={clsx(
          styles.stepBar,
          'flex flex-row gap-xs',
          styles[size],
          styles[type],
          neutralBackground && styles.neutralBg,
          className
        )}
      >
        {Array.from({ length: steps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={clsx(
              styles.step,
              step <= value && styles.filled,
              neutralBackground && styles.neutralBg
            )}
            style={{
              background: step <= value ? color : background(),
              width: `${100 / steps}%`,
            }}
          />
        ))}
      </div>
    );
  }

  // Bar mode
  return (
    <div
      className={clsx(
        styles.progressBar,
        styles[size],
        styles[type],
        neutralBackground && styles.neutralBg,
        className
      )}
      style={{ background: background() }}
    >
      <div className={styles.progressHolder}>
        <div
          className={clsx(styles.progressFill, styles[size], animationType && styles[animationType])}
          style={{ background: color, width: progressWidth }}
        >
          {displayPercentage === 'bar' && !animationType && (
            <label className={styles.progressLabel}>{progressWidth}</label>
          )}
        </div>
        {displayPercentage === 'center' && !animationType && (
          <label className={clsx(styles.progressLabel, 'absolute')}>{progressWidth}</label>
        )}
      </div>
      {showIcon && (
        infoMessage ? (
          <Tooltip
            className={styles.progressIcon}
            labelValue={infoMessage}
            position="bottom"
          >
            {iconContent}
          </Tooltip>
        ) : (
          <div
            className={styles.progressIcon}
            style={{ left: progressWidth, color }}
          >
            {iconContent}
          </div>
        )
      )}
    </div>
  );
}
