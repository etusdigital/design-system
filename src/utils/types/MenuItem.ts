import { type Item as ItemT } from "./Item";

export type Item = ItemT & {
  path?: string;
  selected?: boolean;
};

export interface BSideMenuAccessibilityConfig {
  /** Whether to announce navigation changes to screen readers */
  announceNavigation?: boolean;
  /** Whether to automatically focus the first item */
  autoFocus?: boolean;
  /** Custom ARIA label for the menu */
  ariaLabel?: string;
  /** Whether to show skip links */
  showSkipLinks?: boolean;
  /** Custom announcement prefix for screen readers */
  announcementPrefix?: string;
  /** Whether to announce level information */
  announceLevels?: boolean;
  /** Whether to announce position in list */
  announcePosition?: boolean;
}