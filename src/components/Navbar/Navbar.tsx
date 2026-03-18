import clsx from 'clsx';
import { Dropdown } from '../Dropdown/Dropdown';
import { Avatar } from '../Avatar/Avatar';
import { FloatCard } from '../FloatCard/FloatCard';
import { Icon } from '../Icon/Icon';
import styles from './Navbar.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NavbarProps {
  options?: Array<{ label: string; value?: string; children?: any[] }>;
  value?: string;
  onChange?: (value: string) => void;
  logo?: React.ReactNode;
  avatar?: React.ReactNode;
  notifications?: React.ReactNode;
  showNotifications?: boolean;
  className?: string;
}

// ─── Default SVG Logo ─────────────────────────────────────────────────────────

function DefaultLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
      <path
        d="M40.5 20C40.5 8.95431 31.5457 0 20.5 0C9.4543 0 0.5 8.95431 0.5 20C0.5 31.0457 9.4543 40 20.5 40C31.5457 40 40.5 31.0457 40.5 20Z"
        fill="url(#paint0_linear_navbar)" />
      <path
        d="M38.1604 20.0001C38.1604 10.2455 30.2528 2.33789 20.4982 2.33789C10.7436 2.33789 2.83594 10.2455 2.83594 20.0001C2.83594 29.7547 10.7436 37.6624 20.4982 37.6624C30.2528 37.6624 38.1604 29.7547 38.1604 20.0001Z"
        stroke="#FAFAFA" strokeWidth="2.40312" strokeMiterlimit="10" />
      <defs>
        <linearGradient id="paint0_linear_navbar" x1="34.6407" y1="5.85756" x2="6.35756" y2="34.1424"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#97D991" />
          <stop offset="0.11" stopColor="#92D691" />
          <stop offset="0.22" stopColor="#86D091" />
          <stop offset="0.33" stopColor="#74C691" />
          <stop offset="0.42" stopColor="#6DC192" />
          <stop offset="0.55" stopColor="#5CB597" />
          <stop offset="0.66" stopColor="#47A79E" />
          <stop offset="0.74" stopColor="#3B9C98" />
          <stop offset="0.89" stopColor="#1E7F88" />
          <stop offset="1" stopColor="#02657A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export function Navbar({
  options = [],
  value,
  onChange,
  logo,
  avatar,
  notifications,
  showNotifications = true,
  className,
}: NavbarProps) {
  return (
    <nav className={clsx(styles.navbar, className)} role="navigation">
      {/* Left side: logo + divider + single Dropdown */}
      <div className={styles.left}>
        <div className={styles.logo}>
          {logo || <DefaultLogo />}
        </div>
        <div className={styles.divider} />
        <Dropdown
          options={options as any}
          value={value}
          onChange={onChange as any}
        />
      </div>

      {/* Right side: notification bell + avatar */}
      <div className={styles.right}>
        {showNotifications && (
          <FloatCard card={notifications}>
            <button className={styles.notificationButton} type="button" aria-label="Notifications">
              <Icon name="notifications" />
            </button>
          </FloatCard>
        )}
        <div className={styles.avatarWrapper}>
          {avatar || <Avatar size="small" />}
        </div>
      </div>
    </nav>
  );
}
