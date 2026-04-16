import clsx from 'clsx';
import { Children, isValidElement } from 'react';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { Tooltip } from '../Tooltip/Tooltip';
import { Skeleton } from '../Skeleton/Skeleton';
import styles from './MetricCard.module.css';

type Color = 'primary' | 'informative' | 'info' | 'success' | 'warning' | 'danger' | 'neutral';

export interface MetricCardProps {
  title?: string;
  description?: string | number;
  value?: string | number;
  icon?: string;
  color?: Color;
  type?: 'default' | 'secondary' | 'dashed';
  size?: 'small' | 'medium' | 'large';
  infoMessage?: string;
  infoType?: Color;
  tooltipMinWidth?: string;
  loading?: boolean;
  noTooltip?: boolean;
  boldTitle?: boolean;
  titleSlot?: React.ReactNode;
  valueSlot?: React.ReactNode;
  descriptionSlot?: React.ReactNode;
  content?: React.ReactNode;
  info?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function MetricCardDescriptionSlot({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function MetricCard({
  title = '',
  description = '',
  value = '',
  icon = '',
  color = 'neutral',
  type = 'default',
  size = 'medium',
  infoMessage = '',
  infoType = 'neutral',
  tooltipMinWidth: _tooltipMinWidth = 'none',
  loading = false,
  noTooltip = false,
  boldTitle = false,
  titleSlot,
  valueSlot,
  descriptionSlot,
  content: contentSlot,
  info: infoSlot,
  children,
  className,
}: MetricCardProps) {
  const extractedDescriptionSlot: React.ReactNode[] = [];
  const remainingChildren: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === MetricCardDescriptionSlot) {
      extractedDescriptionSlot.push(child);
    } else {
      remainingChildren.push(child);
    }
  });

  const resolvedDescriptionSlot = descriptionSlot || (extractedDescriptionSlot.length > 0 ? extractedDescriptionSlot : null);

  const showHeader = (title || icon || titleSlot) && !loading;

  return (
    <Card className={clsx(styles.metricCard, 'metric-card', size, styles[type], styles[color], styles[size], className)}>
      {showHeader ? (
        <div className={styles.headerRow}>
          {icon && <Icon name={icon} className={clsx(styles.metricCardIcon, styles[size])} />}
          {titleSlot || (
            <p className={clsx(styles.cardTitle, boldTitle && styles.bold)}>{title}</p>
          )}
          {infoSlot || (
            infoMessage && (
              !noTooltip ? (
                <Tooltip labelValue={infoMessage}>
                  <Icon name="info" className={clsx(styles.infoIcon, styles[size], styles.infoLabel, styles[`info-${infoType}`])} />
                </Tooltip>
              ) : (
                <p className={clsx(styles.infoText, styles.infoLabel, styles[`info-${infoType}`])}>{infoMessage}</p>
              )
            )
          )}
        </div>
      ) : loading ? (
        <Skeleton className={clsx(styles.skeleton, styles.header)} />
      ) : null}

      {!loading ? (
        contentSlot || (
          <div className={styles.contentRow}>
            {valueSlot || <p className={styles.cardValue}>{value}</p>}
            {resolvedDescriptionSlot || <p className={styles.cardDescription}>{description}</p>}
          </div>
        )
      ) : (
        <Skeleton className={clsx(styles.skeleton, styles.contentSkeleton)} />
      )}

      {!loading && remainingChildren}
    </Card>
  );
}

MetricCard.TitleSlot = function MetricCardTitleSlot({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
};

MetricCard.Content = function MetricCardContent({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
};

MetricCard.DescriptionSlot = MetricCardDescriptionSlot;