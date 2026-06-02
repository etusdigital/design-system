import clsx from 'clsx';
import styles from './Avatar.module.css';

export interface AvatarProps {
  name?: string;
  src?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

function parseInitials(name?: string): string {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function Avatar({ name, src, alt, size = 'medium', className }: AvatarProps = {}) {
  const initials = parseInitials(name);

  const sizeClass = size === 'small' ? styles.small : size === 'large' ? styles.large : styles.medium;
  const initialsSize = size === 'small' ? styles.smallInitials : size === 'large' ? styles.largeInitials : styles.mediumInitials;

  return (
    <div className={clsx(styles.avatar, 'avatar', sizeClass, className)}>
      {src && <img className={styles.avatarImg} src={src} alt={alt || name} />}
      <span className={clsx(styles.avatarInitials, initialsSize, src && 'opacity-0')}>
        {initials}
      </span>
    </div>
  );
}
