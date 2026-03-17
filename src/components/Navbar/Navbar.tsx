import clsx from 'clsx';
import { Dropdown } from '../Dropdown/Dropdown';
import { Icon } from '../Icon/Icon';
import styles from './Navbar.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavbarNavOption {
  label: string;
  icon?: string;
  onClick?: () => void;
  options?: any[];
  [key: string]: any;
}

export interface NavbarProps {
  options?: NavbarNavOption[];
  labelKey?: string;
  iconKey?: string;
  logo?: React.ReactNode;
  profile?: React.ReactNode;
  title?: string;
  className?: string;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar({
  options = [],
  labelKey = 'label',
  iconKey = 'icon',
  logo,
  profile,
  title,
  className,
}: NavbarProps) {
  return (
    <nav className={clsx(styles.navbar, className)} role="navigation">
      {/* Left side: logo + title */}
      <div className={styles.logo}>
        {logo ? (
          logo
        ) : title ? (
          <span className={styles.title}>{title}</span>
        ) : null}
      </div>

      {/* Navigation items */}
      {options.length > 0 && (
        <div className={styles.navItems}>
          {options.map((option, index) => {
            const label = option[labelKey] ?? option.label ?? '';
            const icon = option[iconKey] ?? option.icon;

            if (option.options && option.options.length > 0) {
              // Render as Dropdown for sub-navigation
              return (
                <Dropdown
                  key={index}
                  options={option.options}
                  labelKey={labelKey}
                  labelValue={label}
                  className={styles.navItem}
                />
              );
            }

            // Render as plain nav item
            return (
              <div
                key={index}
                className={styles.navItem}
                onClick={option.onClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    option.onClick?.();
                  }
                }}
              >
                {icon && <Icon name={icon} />}
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Right side: profile */}
      {profile && (
        <div className={styles.profile}>{profile}</div>
      )}
    </nav>
  );
}
