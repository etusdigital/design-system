<template>
  <div 
    :class="fileUploadClasses"
    :style="fileUploadStyles"
  >
    <!-- Label -->
    <label
      v-if="labelValue"
      :for="computedId"
      :class="labelClasses"
    >
      {{ labelValue }}
      <span v-if="required" class="text-red-500 ml-1" aria-hidden="true">*</span>
    </label>

    <!-- Help Text -->
    <div
      v-if="helpText"
      :id="`${computedId}-help`"
      class="text-sm text-gray-600 mb-2"
    >
      {{ helpText }}
    </div>

    <!-- File Upload Zone -->
    <div
      ref="dropZoneRef"
      :class="dropZoneClasses"
      @click="handleZoneClick"
      @keydown="handleKeyDown"
      @focus="handleFocus"
      @blur="handleBlur"
      @dragenter.prevent="handleDragEnter"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      v-bind="ariaAttributes"
    >
      <!-- Hidden File Input -->
      <input
        :id="computedId"
        ref="fileInputRef"
        type="file"
        class="sr-only"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        :required="required"
        v-bind="inputAttrs"
        @change="handleFileChange"
      />

      <!-- Upload Icon and Text -->
      <div v-if="!fileState.files.length" class="text-center py-6">
        <BIcon
          :name="uploadIcon"
          :class="iconClasses"
          aria-hidden="true"
        />
        <div class="mt-4">
          <span class="font-medium">{{ computedButtonText }}</span>
          <p class="text-sm text-gray-500 mt-1">
            {{ computedDropZoneText }}
          </p>
        </div>
      </div>

      <!-- File List -->
      <div 
        v-if="fileState.files.length"
        class="space-y-2"
        :aria-label="`${fileState.files.length} file(s) selected`"
      >
        <div
          v-for="(file, index) in fileState.files"
          :key="file.id"
          :class="fileItemClasses(file)"
          @keydown="handleFileKeyDown($event, index)"
          :tabindex="0"
          :aria-label="getFileDescription(file)"
          :aria-describedby="`${computedId}-file-${index}-details`"
        >
          <!-- File Preview -->
          <div class="flex items-center space-x-3">
            <div v-if="previewConfig?.enabled" class="flex-shrink-0">
              <img
                v-if="file.previewUrl && isImageFile(file.file)"
                :src="file.previewUrl"
                :alt="`Preview of ${file.name}`"
                class="w-12 h-12 object-cover rounded-lg"
                @click="$emit('preview-click', file)"
              />
              <BIcon
                v-else
                :name="getFileIcon(file.file)"
                class="w-12 h-12 text-gray-400"
                aria-hidden="true"
              />
            </div>

            <!-- File Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-medium text-gray-900 truncate">
                  {{ file.name }}
                </h4>
                <button
                  type="button"
                  class="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                  :aria-label="`Remove ${file.name}`"
                  @click="removeFile(index)"
                >
                  <BIcon :name="removeIcon" class="w-5 h-5" />
                </button>
              </div>
              
              <div 
                :id="`${computedId}-file-${index}-details`"
                class="text-sm text-gray-500"
              >
                {{ humanReadableSize ? formatFileSize(file.size) : `${file.size} bytes` }}
                <span v-if="file.type"> • {{ getFileTypeDescription(file.file) }}</span>
              </div>

              <!-- Validation Errors -->
              <div v-if="file.errors.length" class="mt-1">
                <ul class="text-sm text-red-600">
                  <li v-for="error in file.errors" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </div>

              <!-- Upload Progress -->
              <div
                v-if="file.progress && showProgress && file.status === 'uploading'"
                class="mt-2"
              >
                <div class="flex items-center justify-between text-xs">
                  <span>Uploading...</span>
                  <span>{{ Math.round(file.progress.percentage) }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${file.progress.percentage}%` }"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                  {{ formatSpeed(file.progress.speed) }} • {{ formatTime(file.progress.estimatedTime) }} remaining
                </div>
              </div>

              <!-- Upload Status -->
              <div v-if="file.status !== 'idle'" class="mt-1">
                <span 
                  :class="getStatusClasses(file.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  <BIcon
                    v-if="file.status === 'success'"
                    name="check-circle"
                    class="w-3 h-3 mr-1"
                  />
                  <BIcon
                    v-if="file.status === 'error'"
                    name="x-circle"
                    class="w-3 h-3 mr-1"
                  />
                  {{ getStatusText(file.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Overall Progress -->
      <div
        v-if="fileState.overallProgress.percentage > 0 && fileState.overallProgress.percentage < 100"
        class="mt-4"
      >
        <div class="flex items-center justify-between text-sm">
          <span>Overall Progress</span>
          <span>{{ Math.round(fileState.overallProgress.percentage) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div
            class="bg-green-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${fileState.overallProgress.percentage}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div v-if="fileState.files.length" class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-600">
        {{ fileState.files.length }} file(s) selected
        <span v-if="humanReadableSize">
          • Total: {{ formatFileSize(fileState.totalSize) }}
        </span>
      </div>
      <div class="space-x-2">
        <button
          v-if="!uploadConfig.autoUpload && uploadConfig?.uploadUrl"
          type="button"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          :disabled="loading || !hasValidFiles"
          @click="uploadFiles"
        >
          <BIcon
            v-if="loading"
            name="loading"
            class="w-4 h-4 mr-2 animate-spin"
          />
          Upload Files
        </button>
        <button
          type="button"
          class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          @click="clearFiles"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="errorMessage" class="mt-2 text-sm text-red-600">
      {{ errorMessage }}
    </div>

    <!-- Info Messages -->
    <div v-if="infoMessage" class="mt-2 text-sm text-blue-600">
      {{ infoMessage }}
    </div>

    <!-- Success Messages -->
    <div v-if="successMessage" class="mt-2 text-sm text-green-600">
      {{ successMessage }}
    </div>

    <!-- Screen Reader Live Region -->
    <div
      :id="`${computedId}-live`"
      class="sr-only"
      :aria-live="liveRegionPoliteness"
      :aria-atomic="true"
    >
      {{ screenReaderAnnouncement }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, onMounted, onUnmounted, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import BIcon from '../BIcon/BIcon.vue';

import type {
  BFileUploadProps,
  BFileUploadEmits,
  BFileUploadState,
  BFileUploadFile,
  BFileUploadProgress,
  BFileUploadValidationResult,
  BFileUploadDragState,
  BFileUploadAriaAttributes,
} from './BFileUpload.types';

import {
  DEFAULT_FILE_UPLOAD_KEYBOARD_CONFIG,
  DEFAULT_FILE_UPLOAD_ACCESSIBILITY_CONFIG,
  DEFAULT_FILE_UPLOAD_VALIDATION_CONFIG,
  DEFAULT_FILE_UPLOAD_PREVIEW_CONFIG,
  DEFAULT_FILE_UPLOAD_CONFIG,
  DEFAULT_FILE_UPLOAD_DRAG_DROP_CONFIG,
  FILE_TYPE_CONFIG,
  FILE_SIZE_LIMITS,
} from './BFileUpload.types';

// Props
const props = withDefaults(defineProps<BFileUploadProps>(), {
  type: 'single',
  variant: 'dropzone',
  size: 'base',
  multiple: false,
  directory: false,
  disabled: false,
  readonly: false,
  required: false,
  loading: false,
  validationState: 'none',
  humanReadableSize: true,
  showProgress: true,
  autoRemove: false,
  uploadIcon: 'cloud-upload',
  removeIcon: 'x',
  buttonText: 'Choose files',
  dropZoneText: 'or drag and drop files here',
  liveRegionPoliteness: 'polite',
});

// Emits
const emit = defineEmits<BFileUploadEmits>();

// Refs
const dropZoneRef = ref<HTMLDivElement>();
const fileInputRef = ref<HTMLInputElement>();

// Reactive state
const fileState = reactive<BFileUploadState>({
  files: [],
  hasFocus: false,
  hasError: false,
  isValidating: false,
  isUploading: false,
  validationState: props.validationState || 'none',
  dragState: 'none',
  fileCount: 0,
  totalSize: 0,
  isDisabled: props.disabled,
  isRequired: props.required,
  keyboardMode: false,
  overallProgress: {
    loaded: 0,
    total: 0,
    percentage: 0,
    speed: 0,
    estimatedTime: 0,
    complete: false,
  },
  previewExpanded: false,
  focusedFileIndex: -1,
});

const screenReaderAnnouncement = ref<string>('');

// Computed properties
const computedId = computed(() => props.id || `file-upload-${uuidv4().slice(0, 8)}`);

const keyboardConfig = computed(() => ({
  ...DEFAULT_FILE_UPLOAD_KEYBOARD_CONFIG,
  ...props.keyboardConfig,
}));

const accessibilityConfig = computed(() => ({
  ...DEFAULT_FILE_UPLOAD_ACCESSIBILITY_CONFIG,
  ...props,
}));

const validationConfig = computed(() => ({
  ...DEFAULT_FILE_UPLOAD_VALIDATION_CONFIG,
  ...props.validationConfig,
}));

const previewConfig = computed(() => ({
  ...DEFAULT_FILE_UPLOAD_PREVIEW_CONFIG,
  ...props.previewConfig,
}));

const uploadConfig = computed(() => ({
  ...DEFAULT_FILE_UPLOAD_CONFIG,
  ...props.uploadConfig,
}));

const dragDropConfig = computed(() => ({
  ...DEFAULT_FILE_UPLOAD_DRAG_DROP_CONFIG,
  ...props.dragDropConfig,
}));

const computedButtonText = computed(() => {
  if (props.buttonText) return props.buttonText;
  return props.multiple ? 'Choose files' : 'Choose file';
});

const computedDropZoneText = computed(() => {
  if (props.dropZoneText) return props.dropZoneText;
  return dragDropConfig.value.enabled ? 'or drag and drop files here' : '';
});

const hasValidFiles = computed(() => 
  fileState.files.some(file => file.isValid && file.errors.length === 0)
);

const fileUploadClasses = computed(() => [
  'b-file-upload',
  `b-file-upload--${props.variant}`,
  `b-file-upload--${props.size}`,
  {
    'b-file-upload--disabled': props.disabled,
    'b-file-upload--readonly': props.readonly,
    'b-file-upload--required': props.required,
    'b-file-upload--error': props.errorMessage || fileState.hasError,
    'b-file-upload--loading': props.loading,
    'b-file-upload--focused': fileState.hasFocus,
    'b-file-upload--dragging': fileState.dragState !== 'none',
  },
  props.class,
]);

const fileUploadStyles = computed(() => props.style);

const labelClasses = computed(() => [
  'block text-sm font-medium text-gray-700 mb-2',
  {
    'text-gray-400': props.disabled,
  },
]);

const dropZoneClasses = computed(() => [
  'relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors duration-200',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    // Default state
    'border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-blue-500': 
      !props.disabled && fileState.dragState === 'none' && !fileState.hasError,
    
    // Drag states
    'border-blue-400 bg-blue-50': 
      fileState.dragState === 'hover' && !fileState.hasError,
    'border-blue-500 bg-blue-100': 
      fileState.dragState === 'active' && !fileState.hasError,
    'border-red-400 bg-red-50': 
      fileState.dragState === 'invalid' || fileState.hasError,
    
    // Disabled state
    'border-gray-200 bg-gray-50 cursor-not-allowed': props.disabled,
    
    // Error state
    'border-red-300 focus:border-red-500 focus:ring-red-500': 
      fileState.hasError && !props.disabled,
  },
]);

const iconClasses = computed(() => [
  'mx-auto',
  {
    'w-12 h-12 text-gray-400': props.size === 'base',
    'w-10 h-10 text-gray-400': props.size === 'sm',
    'w-16 h-16 text-gray-400': props.size === 'lg',
    'text-gray-300': props.disabled,
  },
]);

const ariaAttributes = computed<BFileUploadAriaAttributes>(() => ({
  id: `${computedId.value}-zone`,
  role: 'button',
  'aria-label': props.ariaLabel || `File upload area. ${computedButtonText.value}`,
  'aria-labelledby': props.ariaLabelledBy,
  'aria-describedby': getAriaDescribedBy(),
  'aria-invalid': fileState.hasError,
  'aria-required': props.required,
  'aria-busy': props.loading || fileState.isUploading,
  'aria-live': props.liveRegionPoliteness,
  'tabindex': props.disabled ? -1 : 0,
  'aria-dropeffect': dragDropConfig.value.enabled ? 'copy' : 'none',
}));

// Methods
function getAriaDescribedBy(): string {
  const ids: string[] = [];
  
  if (props.helpText) ids.push(`${computedId.value}-help`);
  if (props.ariaDescribedBy) ids.push(props.ariaDescribedBy);
  if (fileState.files.length) ids.push(`${computedId.value}-live`);
  
  return ids.join(' ') || undefined;
}

function fileItemClasses(file: BFileUploadFile) {
  return [
    'bg-white border rounded-lg p-4 transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    {
      'border-gray-200': file.isValid,
      'border-red-300 bg-red-50': !file.isValid || file.errors.length > 0,
      'border-green-300 bg-green-50': file.status === 'success',
      'border-yellow-300 bg-yellow-50': file.status === 'uploading',
    },
  ];
}

function handleZoneClick() {
  if (props.disabled || props.readonly) return;
  fileInputRef.value?.click();
}

function handleKeyDown(event: KeyboardEvent) {
  if (props.disabled || props.readonly) return;

  const key = event.key;
  
  if (keyboardConfig.value.openDialogKeys.includes(key)) {
    event.preventDefault();
    fileInputRef.value?.click();
    return;
  }

  if (keyboardConfig.value.clearAllKeys.includes(key) && fileState.files.length) {
    event.preventDefault();
    clearFiles();
    return;
  }

  emit('keydown', event);
}

function handleFileKeyDown(event: KeyboardEvent, index: number) {
  const key = event.key;
  
  if (keyboardConfig.value.removeFileKeys.includes(key)) {
    event.preventDefault();
    removeFile(index);
    return;
  }

  if (keyboardConfig.value.navigationKeys.includes(key)) {
    event.preventDefault();
    navigateFiles(key, index);
    return;
  }
}

function navigateFiles(key: string, currentIndex: number) {
  let newIndex = currentIndex;
  
  if (key === 'ArrowDown' || key === 'ArrowRight') {
    newIndex = Math.min(currentIndex + 1, fileState.files.length - 1);
  } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
    newIndex = Math.max(currentIndex - 1, 0);
  }
  
  if (newIndex !== currentIndex) {
    fileState.focusedFileIndex = newIndex;
    const fileItems = dropZoneRef.value?.querySelectorAll('[tabindex="0"]');
    (fileItems?.[newIndex + 1] as HTMLElement)?.focus(); // +1 to account for the dropzone itself
  }
}

function handleFocus(event: FocusEvent) {
  fileState.hasFocus = true;
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  fileState.hasFocus = false;
  emit('blur', event);
}

function handleDragEnter(event: DragEvent) {
  if (!dragDropConfig.value.enabled || props.disabled || props.readonly) return;

  fileState.dragState = 'hover';
  announceToScreenReader(accessibilityConfig.value.dragDropInstructions);
  emit('drag-enter', event);
}

function handleDragOver(event: DragEvent) {
  if (!dragDropConfig.value.enabled || props.disabled || props.readonly) return;

  fileState.dragState = 'active';
  
  // Allow drop
  event.dataTransfer!.dropEffect = 'copy';
}

function handleDragLeave(event: DragEvent) {
  if (!dragDropConfig.value.enabled || props.disabled || props.readonly) return;

  // Only update state if leaving the dropzone completely
  if (!dropZoneRef.value?.contains(event.relatedTarget as Node)) {
    fileState.dragState = 'none';
    emit('drag-leave', event);
  }
}

function handleDrop(event: DragEvent) {
  if (!dragDropConfig.value.enabled || props.disabled || props.readonly) return;

  fileState.dragState = 'none';
  
  const files = event.dataTransfer?.files;
  if (files) {
    processFiles(files);
    announceToScreenReader(`${files.length} file(s) dropped`);
    emit('drop', event, files);
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  
  if (files) {
    processFiles(files);
  }
}

function processFiles(fileList: FileList) {
  const files = Array.from(fileList);
  
  // Check file count limits
  if (props.type === 'single' && files.length > 1) {
    announceToScreenReader('Only one file is allowed');
    return;
  }
  
  if (!props.multiple && fileState.files.length + files.length > 1) {
    announceToScreenReader('Multiple files are not allowed');
    return;
  }

  if (validationConfig.value.maxFiles && 
      fileState.files.length + files.length > validationConfig.value.maxFiles) {
    announceToScreenReader(`Maximum ${validationConfig.value.maxFiles} files allowed`);
    return;
  }

  // Process each file
  const newFiles: BFileUploadFile[] = [];
  
  for (const file of files) {
    // Check for duplicates
    if (fileState.files.some(existingFile => 
        existingFile.name === file.name && existingFile.size === file.size)) {
      announceToScreenReader(`File ${file.name} already selected`);
      continue;
    }

    const fileData: BFileUploadFile = {
      file,
      id: uuidv4(),
      name: file.name,
      size: file.size,
      type: file.type,
      extension: getFileExtension(file.name),
      lastModified: new Date(file.lastModified),
      isValid: true,
      errors: [],
      status: 'idle',
    };

    // Generate preview for images
    if (previewConfig.value.enabled && isImageFile(file)) {
      generatePreview(fileData);
    }

    // Validate file
    validateFile(fileData);
    newFiles.push(fileData);
  }

  // Add files to state
  fileState.files.push(...newFiles);
  updateFileState();

  // Emit events
  emit('files-selected', newFiles);
  for (const file of newFiles) {
    emit('file-add', file);
  }

  // Auto-upload if enabled
  if (uploadConfig.value.autoUpload && uploadConfig.value.uploadUrl) {
    uploadFiles();
  }

  // Update model value
  updateModelValue();

  // Announce to screen reader
  announceToScreenReader(`${newFiles.length} file(s) selected`);
}

function validateFile(file: BFileUploadFile) {
  const errors: string[] = [];
  const config = validationConfig.value;

  // Size validation
  if (config.maxFileSize && file.size > config.maxFileSize) {
    errors.push(config.messages.maxFileSize || 'File size exceeds maximum allowed size');
  }
  
  if (config.minFileSize && file.size < config.minFileSize) {
    errors.push(config.messages.minFileSize || 'File size is below minimum required size');
  }

  // Type validation
  if (config.acceptedTypes.length && !isFileTypeAccepted(file.file, config.acceptedTypes)) {
    errors.push(config.messages.invalidType || 'File type not allowed');
  }

  // Custom validation
  if (config.customValidator) {
    const result = config.customValidator(file.file);
    if (result !== true) {
      errors.push(typeof result === 'string' ? result : 'File validation failed');
    }
  }

  file.errors = errors;
  file.isValid = errors.length === 0;
}

function isFileTypeAccepted(file: File, acceptedTypes: string[]): boolean {
  return acceptedTypes.some(type => {
    if (type.startsWith('.')) {
      // Extension check
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    } else {
      // MIME type check
      return file.type === type || file.type.startsWith(type.replace('*', ''));
    }
  });
}

function removeFile(index: number) {
  const file = fileState.files[index];
  if (!file) return;

  fileState.files.splice(index, 1);
  updateFileState();
  updateModelValue();

  emit('file-remove', file, index);
  announceToScreenReader(`File ${file.name} removed`);
}

function clearFiles() {
  fileState.files = [];
  updateFileState();
  updateModelValue();

  emit('files-clear');
  announceToScreenReader('All files cleared');

  // Clear file input
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
}

function updateFileState() {
  fileState.fileCount = fileState.files.length;
  fileState.totalSize = fileState.files.reduce((sum, file) => sum + file.size, 0);
  fileState.hasError = fileState.files.some(file => !file.isValid);
  
  // Update validation state
  if (props.required && fileState.files.length === 0) {
    fileState.validationState = 'invalid';
  } else if (fileState.hasError) {
    fileState.validationState = 'invalid';
  } else if (fileState.files.length > 0) {
    fileState.validationState = 'valid';
  } else {
    fileState.validationState = 'none';
  }
}

function updateModelValue() {
  if (props.multiple) {
    emit('update:modelValue', fileState.files.map(f => f.file));
  } else {
    emit('update:modelValue', fileState.files[0]?.file || null);
  }
}

async function uploadFiles() {
  if (!uploadConfig.value.uploadUrl || !hasValidFiles.value) return;

  fileState.isUploading = true;
  const validFiles = fileState.files.filter(file => file.isValid);

  try {
    if (uploadConfig.value.parallel) {
      await Promise.all(validFiles.map(file => uploadFile(file)));
    } else {
      for (const file of validFiles) {
        await uploadFile(file);
      }
    }

    emit('upload-all-complete', validFiles);
    announceToScreenReader('All files uploaded successfully');
  } catch (error) {
    announceToScreenReader('Some files failed to upload');
  } finally {
    fileState.isUploading = false;
  }
}

async function uploadFile(file: BFileUploadFile): Promise<void> {
  file.status = 'uploading';
  emit('upload-start', file);

  try {
    if (uploadConfig.value.customUploader) {
      const result = await uploadConfig.value.customUploader(file.file, uploadConfig.value);
      file.status = 'success';
      emit('upload-complete', file, result);
    } else {
      // Default upload implementation
      await defaultUpload(file);
    }
  } catch (error) {
    file.status = 'error';
    emit('upload-error', file, error as Error);
  }
}

async function defaultUpload(file: BFileUploadFile): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    
    formData.append(uploadConfig.value.fieldName, file.file);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress: BFileUploadProgress = {
          loaded: event.loaded,
          total: event.total,
          percentage: (event.loaded / event.total) * 100,
          speed: 0, // Would need to calculate based on time
          estimatedTime: 0, // Would need to calculate
          complete: event.loaded === event.total,
        };
        
        file.progress = progress;
        emit('upload-progress', file, progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        file.status = 'success';
        emit('upload-complete', file, xhr.response);
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.open(uploadConfig.value.method, uploadConfig.value.uploadUrl);
    
    // Set headers
    Object.entries(uploadConfig.value.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.send(formData);
  });
}

function generatePreview(file: BFileUploadFile) {
  const reader = new FileReader();
  reader.onload = (e) => {
    file.previewUrl = e.target?.result as string;
  };
  reader.readAsDataURL(file.file);
}

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

function getFileIcon(file: File): string {
  const config = FILE_TYPE_CONFIG[file.type];
  return config?.icon || 'file';
}

function getFileTypeDescription(file: File): string {
  const config = FILE_TYPE_CONFIG[file.type];
  return config?.description || file.type || 'Unknown file type';
}

function getFileDescription(file: BFileUploadFile): string {
  return `${file.name}, ${formatFileSize(file.size)}, ${getFileTypeDescription(file.file)}`;
}

function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

function formatSpeed(bytesPerSecond: number): string {
  return `${formatFileSize(bytesPerSecond)}/s`;
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${Math.round(remainingSeconds)}s`;
}

function getStatusClasses(status: string) {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'uploading':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case 'success':
      return 'Uploaded';
    case 'error':
      return 'Failed';
    case 'uploading':
      return 'Uploading';
    case 'processing':
      return 'Processing';
    default:
      return 'Idle';
  }
}

function announceToScreenReader(message: string) {
  if (!accessibilityConfig.value.announceFileChanges) return;
  
  screenReaderAnnouncement.value = message;
  
  // Clear the announcement after a delay to allow for re-announcements
  setTimeout(() => {
    screenReaderAnnouncement.value = '';
  }, 1000);
}

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  // Sync with external model value changes if needed
}, { deep: true });

watch(() => props.disabled, (newValue) => {
  fileState.isDisabled = newValue;
});

watch(() => props.required, (newValue) => {
  fileState.isRequired = newValue;
  updateFileState();
});

// Lifecycle
onMounted(() => {
  if (props.autoFocus && !props.disabled) {
    nextTick(() => {
      dropZoneRef.value?.focus();
    });
  }
});

// Prevent default drag behaviors on the document
onMounted(() => {
  if (dragDropConfig.value.preventDefaults) {
    const preventDefaults = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('dragenter', preventDefaults);
    document.addEventListener('dragover', preventDefaults);
    document.addEventListener('dragleave', preventDefaults);
    document.addEventListener('drop', preventDefaults);

    onUnmounted(() => {
      document.removeEventListener('dragenter', preventDefaults);
      document.removeEventListener('dragover', preventDefaults);
      document.removeEventListener('dragleave', preventDefaults);
      document.removeEventListener('drop', preventDefaults);
    });
  }
});
</script>

<style scoped>
.b-file-upload {
  @apply w-full;
}

.b-file-upload--xs {
  @apply text-xs;
}

.b-file-upload--sm {
  @apply text-sm;
}

.b-file-upload--base {
  @apply text-base;
}

.b-file-upload--lg {
  @apply text-lg;
}

.b-file-upload--xl {
  @apply text-xl;
}

.b-file-upload--disabled {
  @apply opacity-50 pointer-events-none;
}

.b-file-upload--readonly {
  @apply pointer-events-none;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .b-file-upload {
    @apply border-2 border-solid;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .b-file-upload * {
    @apply transition-none;
  }
}

/* Focus management */
.b-file-upload--focused {
  @apply ring-2 ring-blue-500 ring-offset-2;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>