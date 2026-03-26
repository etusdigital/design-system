import clsx from 'clsx';
import { Children, isValidElement } from 'react';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import styles from './IconCard.module.css';

export interface IconCardProps {
  title?: string;
  icon?: string;
  color?: string;
  isIconRound?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function IconCardTitleActions({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function IconCard({
  title = '',
  icon = '',
  color = '',
  isIconRound = false,
  children,
  className,
}: IconCardProps) {
  // Separate TitleActions children from body children
  const titleActionsChildren: React.ReactNode[] = [];
  const bodyChildren: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === IconCardTitleActions) {
      titleActionsChildren.push(child);
    } else {
      bodyChildren.push(child);
    }
  });

  return (
    <div className={clsx(styles.iconCard, 'icon-card', className)}>
      <div
        className={clsx(
          styles.iconContainer,
          isIconRound && styles.roundIcon,
          color && styles.coloredBackground,
          color && isIconRound && styles.coloredText
        )}
        style={color ? { background: isIconRound ? undefined : color, color: isIconRound ? color : undefined } : undefined}
      >
        <Icon name={icon} filled={isIconRound} />
      </div>
      <Card className="p-lg">
        <header className="flex justify-between">
          <h4
            className={clsx(styles.cardTitle, color && styles.coloredText)}
            style={color ? { color } : undefined}
          >
            {title}
          </h4>
          {titleActionsChildren}
        </header>
        {bodyChildren}
      </Card>
    </div>
  );
}

IconCard.TitleActions = IconCardTitleActions;
