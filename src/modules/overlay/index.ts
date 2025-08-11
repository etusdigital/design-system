// Overlay Module - Overlay and popup components
// Dialogs, dropdowns, tooltips, etc.

// Re-export from legacy components until migration is complete
export { default as Dialog } from '../../components/BDialog';
export { default as Dropdown } from '../../components/BDropdown';
export { default as Tooltip } from '../../components/BTooltip';

// Export types
export type { BDialogProps } from '../../components/BDialog/BDialog.types';
export type { BDropdownProps } from '../../components/BDropdown/BDropdown.types';
export type { BTooltipProps } from '../../components/BTooltip/BTooltip.types';