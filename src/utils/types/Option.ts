export type Option = {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
  bottom?: boolean;
  expanded?: boolean;
  options?: Option[];
};