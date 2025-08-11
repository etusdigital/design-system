export type Item = {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  bottom?: boolean;
  expanded?: boolean;
  items?: Item[];
  // Accessibility properties
  ariaDescription?: string;
  shortcut?: string;
  focusable?: boolean;
  loading?: boolean;
};