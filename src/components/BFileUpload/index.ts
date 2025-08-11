import { App } from 'vue';
import BFileUpload from './BFileUpload.vue';

// Export component
export default BFileUpload;

// Export types
export type {
  BFileUploadProps,
  BFileUploadEmits,
  BFileUploadState,
  BFileUploadFile,
  BFileUploadProgress,
  BFileUploadValidationResult,
  BFileUploadValidationConfig,
  BFileUploadPreviewConfig,
  BFileUploadConfig,
  BFileUploadDragDropConfig,
  BFileUploadKeyboardConfig,
  BFileUploadAccessibilityProps,
  BFileUploadAriaAttributes,
  BFileUploadAnnouncementTemplates,
  BFileUploadAccessibilityHelpers,
  BFileUploadType,
  BFileUploadVariant,
  BFileUploadSize,
  BFileUploadValidationState,
  BFileUploadLoadingState,
  BFileUploadPreviewType,
  BFileUploadDragState,
  // Convenient aliases
  AccessibilityProps,
  Props,
  State,
  UploadFile,
  Progress,
  AriaAttributes,
  KeyboardConfig,
  ValidationConfig,
  PreviewConfig,
  UploadConfig,
  DragDropConfig,
  Emits,
  ValidationResult,
  AnnouncementTemplates,
  AccessibilityHelpers,
} from './BFileUpload.types';

// Export defaults
export {
  DEFAULT_FILE_UPLOAD_KEYBOARD_CONFIG,
  DEFAULT_FILE_UPLOAD_ACCESSIBILITY_CONFIG,
  DEFAULT_FILE_UPLOAD_VALIDATION_CONFIG,
  DEFAULT_FILE_UPLOAD_PREVIEW_CONFIG,
  DEFAULT_FILE_UPLOAD_CONFIG,
  DEFAULT_FILE_UPLOAD_DRAG_DROP_CONFIG,
  DEFAULT_FILE_UPLOAD_ANNOUNCEMENTS,
  FILE_TYPE_CONFIG,
  FILE_SIZE_LIMITS,
} from './BFileUpload.types';

// Plugin installation
export const BFileUploadPlugin = {
  install(app: App) {
    app.component('BFileUpload', BFileUpload);
  },
};

// Auto-install when used via script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(BFileUploadPlugin);
}