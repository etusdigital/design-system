// Core Module - Basic UI components
// Core components that other modules depend on

// Re-export from legacy components until migration is complete
export { default as Button } from '../../components/BButton';
export { default as Icon } from '../../components/BIcon';
export { default as Spinner } from '../../components/BSpinner';
export { default as Divider } from '../../components/BDivider';

// Export types
export type { BButtonProps } from '../../components/BButton/BButton.types';
export type { BIconProps } from '../../components/BIcon/BIcon.types';
export type { BSpinnerProps } from '../../components/BSpinner/BSpinner.types';
export type { BDividerProps } from '../../components/BDivider/BDivider.types';