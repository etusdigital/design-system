/**
 * BFileUpload accessibility props interface
 * Implements WCAG 2.1 AA standards for file upload components
 */
export interface BFileUploadAccessibilityProps {
  /** ARIA label for the file upload area */
  ariaLabel?: string;
  /** ID of element that labels this file upload */
  ariaLabelledBy?: string;
  /** ID of element that describes this file upload */
  ariaDescribedBy?: string;
  /** Additional description for screen readers */
  ariaDescription?: string;
  /** Whether to announce validation changes to screen readers */
  announceValidation?: boolean;
  /** Whether to announce file selection/removal changes */
  announceFileChanges?: boolean;
  /** Whether to announce upload progress */
  announceProgress?: boolean;
  /** Custom error announcement message */
  customErrorAnnouncement?: string;
  /** Custom success announcement message */
  customSuccessAnnouncement?: string;
  /** Help text for file upload instructions */
  helpText?: string;
  /** Whether the file upload is part of a group */
  groupRole?: 'group' | 'region' | undefined;
  /** ARIA expanded state for collapsible file lists */
  ariaExpanded?: boolean;
  /** ARIA controls reference for associated elements */
  ariaControls?: string;
  /** High contrast mode support */
  highContrast?: boolean;
  /** Reduced motion support */
  reduceMotion?: boolean;
  /** Whether to use enhanced focus management */
  enhancedFocus?: boolean;
  /** Minimum touch target size (default 44px) */
  minTouchTarget?: boolean;
  /** Screen reader instructions for interaction */
  screenReaderInstructions?: string;
  /** Live region politeness level for announcements */
  liveRegionPoliteness?: 'polite' | 'assertive';
  /** Whether file upload supports keyboard navigation */
  keyboardNavigation?: boolean;
  /** Whether to show focus indicators */
  showFocusIndicator?: boolean;
  /** Auto-complete attribute for better UX */
  autocomplete?: string;
  /** Drag and drop instruction text */
  dragDropInstructions?: string;
  /** File preview announcement template */
  previewAnnouncement?: string;
}

/**
 * File upload types
 */
export type BFileUploadType = 'single' | 'multiple' | 'directory';

/**
 * File upload variants
 */
export type BFileUploadVariant = 'default' | 'dropzone' | 'button' | 'inline' | 'avatar';

/**
 * Component sizes
 */
export type BFileUploadSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

/**
 * File upload validation states
 */
export type BFileUploadValidationState = 'valid' | 'invalid' | 'pending' | 'none';

/**
 * File upload loading states
 */
export type BFileUploadLoadingState = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

/**
 * File preview types
 */
export type BFileUploadPreviewType = 'thumbnail' | 'icon' | 'list' | 'card' | 'none';

/**
 * Drag and drop states
 */
export type BFileUploadDragState = 'none' | 'hover' | 'active' | 'invalid';

/**
 * Upload progress information
 */
export interface BFileUploadProgress {
  /** Current bytes uploaded */
  loaded: number;
  /** Total bytes to upload */
  total: number;
  /** Progress percentage (0-100) */
  percentage: number;
  /** Upload speed in bytes per second */
  speed: number;
  /** Estimated time remaining in seconds */
  estimatedTime: number;
  /** Whether upload is complete */
  complete: boolean;
}

/**
 * File metadata interface
 */
export interface BFileUploadFile {
  /** Original File object */
  file: File;
  /** Unique identifier for tracking */
  id: string;
  /** File name */
  name: string;
  /** File size in bytes */
  size: number;
  /** File MIME type */
  type: string;
  /** File extension */
  extension: string;
  /** File modification date */
  lastModified: Date;
  /** Whether file is valid */
  isValid: boolean;
  /** Validation errors */
  errors: string[];
  /** Upload progress */
  progress?: BFileUploadProgress;
  /** Preview URL (for images) */
  previewUrl?: string;
  /** Upload status */
  status: BFileUploadLoadingState;
  /** Custom metadata */
  metadata?: Record<string, any>;
}

/**
 * File upload state interface for accessibility
 */
export interface BFileUploadState {
  /** Selected files */
  files: BFileUploadFile[];
  /** Whether upload area has focus */
  hasFocus: boolean;
  /** Whether component has error */
  hasError: boolean;
  /** Whether files are being validated */
  isValidating: boolean;
  /** Whether upload is in progress */
  isUploading: boolean;
  /** Current validation state */
  validationState: BFileUploadValidationState;
  /** Current drag and drop state */
  dragState: BFileUploadDragState;
  /** Total file count */
  fileCount: number;
  /** Total file size */
  totalSize: number;
  /** Whether file upload is disabled */
  isDisabled: boolean;
  /** Whether file upload is required */
  isRequired: boolean;
  /** Whether keyboard navigation mode is active */
  keyboardMode: boolean;
  /** Overall upload progress */
  overallProgress: BFileUploadProgress;
  /** Whether preview is expanded */
  previewExpanded: boolean;
  /** Currently focused file index */
  focusedFileIndex: number;
}

/**
 * File upload ARIA attributes interface
 */
export interface BFileUploadAriaAttributes {
  /** Unique ID for the file upload */
  id: string;
  /** ARIA role */
  role?: string;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelled by relationships */
  'aria-labelledby'?: string;
  /** ARIA described by relationships */
  'aria-describedby'?: string;
  /** ARIA invalid state */
  'aria-invalid'?: boolean;
  /** ARIA required state */
  'aria-required'?: boolean;
  /** ARIA busy state for uploading */
  'aria-busy'?: boolean;
  /** ARIA expanded for file list */
  'aria-expanded'?: boolean;
  /** ARIA controls for associated elements */
  'aria-controls'?: string;
  /** ARIA live region for announcements */
  'aria-live'?: 'off' | 'polite' | 'assertive';
  /** ARIA atomic for live regions */
  'aria-atomic'?: boolean;
  /** Tab index for keyboard navigation */
  tabindex?: number;
  /** Drop zone role attributes */
  'aria-dropeffect'?: 'none' | 'copy' | 'move' | 'link';
  /** Grabbed state for drag operations */
  'aria-grabbed'?: boolean;
}

/**
 * File upload keyboard configuration
 */
export interface BFileUploadKeyboardConfig {
  /** Whether keyboard navigation is enabled */
  enabled?: boolean;
  /** Keys for opening file dialog */
  openDialogKeys?: string[];
  /** Keys for removing selected files */
  removeFileKeys?: string[];
  /** Keys for navigating between files */
  navigationKeys?: string[];
  /** Keys for selecting/deselecting files */
  selectionKeys?: string[];
  /** Keys for uploading files */
  uploadKeys?: string[];
  /** Keys for clearing all files */
  clearAllKeys?: string[];
  /** Whether to prevent default keyboard behavior */
  preventDefault?: boolean;
  /** Whether to stop keyboard event propagation */
  stopPropagation?: boolean;
  /** Custom keyboard shortcuts */
  shortcuts?: Record<string, () => void>;
}

/**
 * File validation configuration
 */
export interface BFileUploadValidationConfig {
  /** Whether validation is enabled */
  enabled?: boolean;
  /** Maximum file size in bytes */
  maxFileSize?: number;
  /** Minimum file size in bytes */
  minFileSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
  /** Minimum number of files */
  minFiles?: number;
  /** Accepted file types (MIME types or extensions) */
  acceptedTypes?: string[];
  /** Rejected file types */
  rejectedTypes?: string[];
  /** Custom file validation function */
  customValidator?: (file: File) => boolean | string | Promise<boolean | string>;
  /** Whether to validate file names */
  validateFileName?: boolean;
  /** File name validation pattern */
  fileNamePattern?: RegExp;
  /** Whether to validate file content */
  validateContent?: boolean;
  /** Whether to show validation feedback */
  showFeedback?: boolean;
  /** Whether to announce validation changes */
  announceChanges?: boolean;
  /** Custom validation messages */
  messages?: {
    required?: string;
    maxFileSize?: string;
    minFileSize?: string;
    maxFiles?: string;
    minFiles?: string;
    invalidType?: string;
    invalidFileName?: string;
    duplicateFile?: string;
    uploadFailed?: string;
  };
}

/**
 * File preview configuration
 */
export interface BFileUploadPreviewConfig {
  /** Whether previews are enabled */
  enabled?: boolean;
  /** Preview type */
  type?: BFileUploadPreviewType;
  /** Maximum preview size */
  maxPreviewSize?: { width: number; height: number };
  /** Whether to show file metadata */
  showMetadata?: boolean;
  /** Whether previews are expandable */
  expandable?: boolean;
  /** Whether to generate thumbnails for images */
  generateThumbnails?: boolean;
  /** Thumbnail size */
  thumbnailSize?: { width: number; height: number };
  /** Whether to show progress on previews */
  showProgress?: boolean;
  /** Custom preview renderer */
  customRenderer?: (file: BFileUploadFile) => string | HTMLElement;
}

/**
 * File upload configuration
 */
export interface BFileUploadConfig {
  /** Upload endpoint URL */
  uploadUrl?: string;
  /** HTTP method for uploads */
  method?: 'POST' | 'PUT' | 'PATCH';
  /** Additional headers for upload requests */
  headers?: Record<string, string>;
  /** Form field name for file uploads */
  fieldName?: string;
  /** Whether to upload files immediately */
  autoUpload?: boolean;
  /** Whether to upload files in parallel */
  parallel?: boolean;
  /** Maximum concurrent uploads */
  maxConcurrent?: number;
  /** Chunk size for large file uploads */
  chunkSize?: number;
  /** Whether to retry failed uploads */
  retryOnError?: boolean;
  /** Number of retry attempts */
  maxRetries?: number;
  /** Timeout for upload requests */
  timeout?: number;
  /** Custom upload function */
  customUploader?: (file: File, config: BFileUploadConfig) => Promise<any>;
}

/**
 * Drag and drop configuration
 */
export interface BFileUploadDragDropConfig {
  /** Whether drag and drop is enabled */
  enabled?: boolean;
  /** Whether to highlight drop zone on drag over */
  highlightDropZone?: boolean;
  /** Whether to accept folder drops */
  acceptFolders?: boolean;
  /** Whether to prevent default drag behaviors */
  preventDefaults?: boolean;
  /** Custom drag over handler */
  onDragOver?: (event: DragEvent) => boolean;
  /** Custom drag enter handler */
  onDragEnter?: (event: DragEvent) => boolean;
  /** Custom drag leave handler */
  onDragLeave?: (event: DragEvent) => boolean;
  /** Custom drop handler */
  onDrop?: (event: DragEvent, files: FileList) => boolean;
}

/**
 * Complete BFileUpload props interface
 */
export interface BFileUploadProps extends BFileUploadAccessibilityProps {
  /** File upload value */
  modelValue?: File | File[] | null;
  /** Label text for the file upload */
  labelValue?: string;
  /** File upload type */
  type?: BFileUploadType;
  /** Visual variant */
  variant?: BFileUploadVariant;
  /** Component size */
  size?: BFileUploadSize;
  /** Whether multiple files are allowed */
  multiple?: boolean;
  /** Whether directory selection is allowed */
  directory?: boolean;
  /** Accepted file types */
  accept?: string;
  /** Whether the file upload is disabled */
  disabled?: boolean;
  /** Whether the file upload is readonly */
  readonly?: boolean;
  /** Whether the file upload is required */
  required?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Info message to display */
  infoMessage?: string;
  /** Success message to display */
  successMessage?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Loading state */
  loading?: boolean;
  /** Validation state for screen reader feedback */
  validationState?: BFileUploadValidationState;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Inline styles */
  style?: string | Record<string, any>;
  /** Keyboard navigation configuration */
  keyboardConfig?: BFileUploadKeyboardConfig;
  /** Validation configuration */
  validationConfig?: BFileUploadValidationConfig;
  /** Preview configuration */
  previewConfig?: BFileUploadPreviewConfig;
  /** Upload configuration */
  uploadConfig?: BFileUploadConfig;
  /** Drag and drop configuration */
  dragDropConfig?: BFileUploadDragDropConfig;
  /** Custom input attributes */
  inputAttrs?: Record<string, any>;
  /** Whether to auto-focus on mount */
  autoFocus?: boolean;
  /** Custom button text */
  buttonText?: string;
  /** Custom drop zone text */
  dropZoneText?: string;
  /** Whether to show file size in human readable format */
  humanReadableSize?: boolean;
  /** Whether to show upload progress */
  showProgress?: boolean;
  /** Whether to auto-remove uploaded files */
  autoRemove?: boolean;
  /** Custom icon for file upload button */
  uploadIcon?: string;
  /** Custom icon for file removal */
  removeIcon?: string;
}

/**
 * BFileUpload emits interface
 */
export interface BFileUploadEmits {
  /** Model value updated */
  'update:modelValue': [value: File | File[] | null];
  /** Files selected */
  'files-selected': [files: BFileUploadFile[]];
  /** File added */
  'file-add': [file: BFileUploadFile];
  /** File removed */
  'file-remove': [file: BFileUploadFile, index: number];
  /** Files cleared */
  'files-clear': [];
  /** File upload started */
  'upload-start': [file: BFileUploadFile];
  /** File upload progress */
  'upload-progress': [file: BFileUploadFile, progress: BFileUploadProgress];
  /** File upload completed */
  'upload-complete': [file: BFileUploadFile, response: any];
  /** File upload failed */
  'upload-error': [file: BFileUploadFile, error: Error];
  /** All uploads completed */
  'upload-all-complete': [files: BFileUploadFile[]];
  /** Validation state changed */
  'validation-change': [state: BFileUploadValidationState, files: BFileUploadFile[]];
  /** File focused */
  'file-focus': [file: BFileUploadFile, index: number];
  /** File blurred */
  'file-blur': [file: BFileUploadFile, index: number];
  /** Component focused */
  'focus': [event: FocusEvent];
  /** Component blurred */
  'blur': [event: FocusEvent];
  /** Keyboard event */
  'keydown': [event: KeyboardEvent];
  /** Drag and drop events */
  'drag-enter': [event: DragEvent];
  'drag-over': [event: DragEvent];
  'drag-leave': [event: DragEvent];
  'drop': [event: DragEvent, files: FileList];
  /** Preview events */
  'preview-click': [file: BFileUploadFile];
  'preview-expand': [file: BFileUploadFile];
  'preview-collapse': [file: BFileUploadFile];
  /** Accessibility events */
  'accessibility': [type: string, data: any];
  /** Error event */
  'error': [error: Error | string];
  /** Success event */
  'success': [message: string];
}

/**
 * File upload validation result
 */
export interface BFileUploadValidationResult {
  /** Whether validation passes */
  isValid: boolean;
  /** Validation state */
  state: BFileUploadValidationState;
  /** Error messages */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Valid files */
  validFiles: BFileUploadFile[];
  /** Invalid files */
  invalidFiles: BFileUploadFile[];
  /** Total file size */
  totalSize: number;
  /** File count */
  fileCount: number;
}

/**
 * File upload announcement templates
 */
export interface BFileUploadAnnouncementTemplates {
  /** Template for file selection announcement */
  fileSelected: string;
  /** Template for file removal announcement */
  fileRemoved: string;
  /** Template for files cleared announcement */
  filesCleared: string;
  /** Template for upload start announcement */
  uploadStart: string;
  /** Template for upload progress announcement */
  uploadProgress: string;
  /** Template for upload complete announcement */
  uploadComplete: string;
  /** Template for upload error announcement */
  uploadError: string;
  /** Template for validation error announcement */
  validationError: string;
  /** Template for validation success announcement */
  validationSuccess: string;
  /** Template for drag enter announcement */
  dragEnter: string;
  /** Template for drag leave announcement */
  dragLeave: string;
  /** Template for drop announcement */
  dropFiles: string;
  /** Template for file count announcement */
  fileCount: string;
  /** Template for total size announcement */
  totalSize: string;
  /** Template for keyboard navigation instructions */
  keyboardInstructions: string;
}

/**
 * File upload accessibility helpers
 */
export interface BFileUploadAccessibilityHelpers {
  /** Get ARIA describedby relationships */
  getAriaDescribedBy: (props: BFileUploadProps, state: BFileUploadState) => string | undefined;
  /** Announce file operation */
  announceFileOperation: (operation: string, file?: BFileUploadFile, details?: any) => void;
  /** Announce validation state change */
  announceValidation: (result: BFileUploadValidationResult) => void;
  /** Announce upload progress */
  announceProgress: (file: BFileUploadFile, progress: BFileUploadProgress) => void;
  /** Get file size in human readable format */
  getHumanReadableSize: (bytes: number) => string;
  /** Get file type description */
  getFileTypeDescription: (file: File) => string;
  /** Format keyboard instructions */
  getKeyboardInstructions: (config: BFileUploadKeyboardConfig) => string;
}

/**
 * Default configurations
 */
export const DEFAULT_FILE_UPLOAD_KEYBOARD_CONFIG: Required<BFileUploadKeyboardConfig> = {
  enabled: true,
  openDialogKeys: ['Enter', ' '],
  removeFileKeys: ['Delete', 'Backspace'],
  navigationKeys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'],
  selectionKeys: ['Enter', ' '],
  uploadKeys: ['Enter'],
  clearAllKeys: ['Escape'],
  preventDefault: true,
  stopPropagation: false,
  shortcuts: {},
};

export const DEFAULT_FILE_UPLOAD_ACCESSIBILITY_CONFIG: Required<BFileUploadAccessibilityProps> = {
  ariaLabel: '',
  ariaLabelledBy: '',
  ariaDescribedBy: '',
  ariaDescription: '',
  announceValidation: true,
  announceFileChanges: true,
  announceProgress: false,
  customErrorAnnouncement: '',
  customSuccessAnnouncement: '',
  helpText: '',
  groupRole: undefined,
  ariaExpanded: undefined,
  ariaControls: '',
  highContrast: false,
  reduceMotion: false,
  enhancedFocus: true,
  minTouchTarget: true,
  screenReaderInstructions: 'Click to select files or drag and drop files here. Use arrow keys to navigate between files and Delete key to remove files.',
  liveRegionPoliteness: 'polite',
  keyboardNavigation: true,
  showFocusIndicator: true,
  autocomplete: '',
  dragDropInstructions: 'Drop files here to upload',
  previewAnnouncement: 'File preview available',
};

export const DEFAULT_FILE_UPLOAD_VALIDATION_CONFIG: Required<BFileUploadValidationConfig> = {
  enabled: true,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  minFileSize: 0,
  maxFiles: 10,
  minFiles: 0,
  acceptedTypes: [],
  rejectedTypes: [],
  customValidator: undefined,
  validateFileName: false,
  fileNamePattern: /.*/,
  validateContent: false,
  showFeedback: true,
  announceChanges: true,
  messages: {
    required: 'Please select at least one file',
    maxFileSize: 'File size exceeds maximum allowed size',
    minFileSize: 'File size is below minimum required size',
    maxFiles: 'Maximum number of files exceeded',
    minFiles: 'Minimum number of files not met',
    invalidType: 'File type not allowed',
    invalidFileName: 'File name is not valid',
    duplicateFile: 'File already selected',
    uploadFailed: 'File upload failed',
  },
};

export const DEFAULT_FILE_UPLOAD_PREVIEW_CONFIG: Required<BFileUploadPreviewConfig> = {
  enabled: true,
  type: 'thumbnail',
  maxPreviewSize: { width: 200, height: 200 },
  showMetadata: true,
  expandable: false,
  generateThumbnails: true,
  thumbnailSize: { width: 80, height: 80 },
  showProgress: true,
  customRenderer: undefined,
};

export const DEFAULT_FILE_UPLOAD_CONFIG: Required<BFileUploadConfig> = {
  uploadUrl: '',
  method: 'POST',
  headers: {},
  fieldName: 'file',
  autoUpload: false,
  parallel: true,
  maxConcurrent: 3,
  chunkSize: 1024 * 1024, // 1MB
  retryOnError: true,
  maxRetries: 3,
  timeout: 30000, // 30 seconds
  customUploader: undefined,
};

export const DEFAULT_FILE_UPLOAD_DRAG_DROP_CONFIG: Required<BFileUploadDragDropConfig> = {
  enabled: true,
  highlightDropZone: true,
  acceptFolders: false,
  preventDefaults: true,
  onDragOver: undefined,
  onDragEnter: undefined,
  onDragLeave: undefined,
  onDrop: undefined,
};

export const DEFAULT_FILE_UPLOAD_ANNOUNCEMENTS: Required<BFileUploadAnnouncementTemplates> = {
  fileSelected: '{count} file(s) selected: {fileName}',
  fileRemoved: 'File removed: {fileName}',
  filesCleared: 'All files cleared',
  uploadStart: 'Upload started for {fileName}',
  uploadProgress: 'Upload progress for {fileName}: {percentage}%',
  uploadComplete: 'Upload completed for {fileName}',
  uploadError: 'Upload failed for {fileName}: {error}',
  validationError: 'Validation error: {message}',
  validationSuccess: 'All files are valid',
  dragEnter: 'Drop files to upload',
  dragLeave: 'Drag cancelled',
  dropFiles: '{count} file(s) dropped',
  fileCount: '{count} file(s) selected',
  totalSize: 'Total size: {size}',
  keyboardInstructions: 'Use Enter or Space to select files, arrow keys to navigate, Delete to remove files',
};

/**
 * File type configurations with accessibility considerations
 */
export const FILE_TYPE_CONFIG: Record<string, {
  description: string;
  icon: string;
  previewable: boolean;
  category: string;
}> = {
  // Images
  'image/jpeg': { description: 'JPEG Image', icon: 'image', previewable: true, category: 'image' },
  'image/jpg': { description: 'JPG Image', icon: 'image', previewable: true, category: 'image' },
  'image/png': { description: 'PNG Image', icon: 'image', previewable: true, category: 'image' },
  'image/gif': { description: 'GIF Image', icon: 'image', previewable: true, category: 'image' },
  'image/webp': { description: 'WebP Image', icon: 'image', previewable: true, category: 'image' },
  'image/svg+xml': { description: 'SVG Image', icon: 'image', previewable: true, category: 'image' },
  
  // Documents
  'application/pdf': { description: 'PDF Document', icon: 'file-pdf', previewable: false, category: 'document' },
  'application/msword': { description: 'Word Document', icon: 'file-word', previewable: false, category: 'document' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { description: 'Word Document', icon: 'file-word', previewable: false, category: 'document' },
  'application/vnd.ms-excel': { description: 'Excel Spreadsheet', icon: 'file-excel', previewable: false, category: 'document' },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { description: 'Excel Spreadsheet', icon: 'file-excel', previewable: false, category: 'document' },
  
  // Text
  'text/plain': { description: 'Text File', icon: 'file-text', previewable: false, category: 'text' },
  'text/csv': { description: 'CSV File', icon: 'file-csv', previewable: false, category: 'text' },
  'text/html': { description: 'HTML File', icon: 'file-code', previewable: false, category: 'text' },
  'text/css': { description: 'CSS File', icon: 'file-code', previewable: false, category: 'text' },
  'text/javascript': { description: 'JavaScript File', icon: 'file-code', previewable: false, category: 'text' },
  
  // Audio
  'audio/mpeg': { description: 'MP3 Audio', icon: 'file-audio', previewable: false, category: 'audio' },
  'audio/wav': { description: 'WAV Audio', icon: 'file-audio', previewable: false, category: 'audio' },
  'audio/ogg': { description: 'OGG Audio', icon: 'file-audio', previewable: false, category: 'audio' },
  
  // Video
  'video/mp4': { description: 'MP4 Video', icon: 'file-video', previewable: false, category: 'video' },
  'video/avi': { description: 'AVI Video', icon: 'file-video', previewable: false, category: 'video' },
  'video/mov': { description: 'MOV Video', icon: 'file-video', previewable: false, category: 'video' },
  
  // Archives
  'application/zip': { description: 'ZIP Archive', icon: 'file-archive', previewable: false, category: 'archive' },
  'application/x-rar-compressed': { description: 'RAR Archive', icon: 'file-archive', previewable: false, category: 'archive' },
  'application/x-7z-compressed': { description: '7Z Archive', icon: 'file-archive', previewable: false, category: 'archive' },
};

/**
 * File size limits by category
 */
export const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  text: 1 * 1024 * 1024, // 1MB
  audio: 20 * 1024 * 1024, // 20MB
  video: 100 * 1024 * 1024, // 100MB
  archive: 50 * 1024 * 1024, // 50MB
  default: 10 * 1024 * 1024, // 10MB
};

/**
 * Export all types for easy importing
 */
export type {
  BFileUploadAccessibilityProps as AccessibilityProps,
  BFileUploadProps as Props,
  BFileUploadState as State,
  BFileUploadFile as UploadFile,
  BFileUploadProgress as Progress,
  BFileUploadAriaAttributes as AriaAttributes,
  BFileUploadKeyboardConfig as KeyboardConfig,
  BFileUploadValidationConfig as ValidationConfig,
  BFileUploadPreviewConfig as PreviewConfig,
  BFileUploadConfig as UploadConfig,
  BFileUploadDragDropConfig as DragDropConfig,
  BFileUploadEmits as Emits,
  BFileUploadValidationResult as ValidationResult,
  BFileUploadAnnouncementTemplates as AnnouncementTemplates,
  BFileUploadAccessibilityHelpers as AccessibilityHelpers,
};