// Feedback Module - Components for user feedback
// Alerts, toasts, confirmations, etc.

// Re-export from legacy components until migration is complete
export { default as Alert } from '../../components/BAlert';
export { default as Toast } from '../../components/BToast';
export { default as Confirm } from '../../components/BConfirm';

// Export types
export type { BAlertProps } from '../../components/BAlert/BAlert.types';
export type { BToastProps } from '../../components/BToast/BToast.types';
export type { BConfirmProps } from '../../components/BConfirm/BConfirm.types';