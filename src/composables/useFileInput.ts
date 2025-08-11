import { ref, computed, type Ref } from 'vue';
import type { BInputValue, BInputFileConfig } from '#/components/BInput/BInput.types';
import { useScreenReader } from '#composables/useScreenReader';

export interface UseFileInputOptions {
  announceValidation?: boolean;
  fileConfig?: BInputFileConfig;
}

export function useFileInput(
  inputValue: Ref<BInputValue | undefined>,
  emit: (event: string, ...args: any[]) => void,
  options: UseFileInputOptions = {}
) {
  const screenReader = useScreenReader();
  
  // File state
  const haveFile = ref(false);
  const fileName = ref('');
  const isDragging = ref(false);
  const fileError = ref<string>('');

  // Computed file state
  const fileState = computed(() => ({
    hasFile: haveFile.value,
    fileName: fileName.value,
    isDragging: isDragging.value,
    error: fileError.value,
  }));

  /**
   * Validates a file against configuration rules
   */
  function validateFile(file: File): { isValid: boolean; error?: string } {
    const config = options.fileConfig;
    if (!config) return { isValid: true };

    // Check file size
    if (config.maxSize && file.size > config.maxSize) {
      const maxSizeMB = (config.maxSize / (1024 * 1024)).toFixed(1);
      return { 
        isValid: false, 
        error: `File size exceeds ${maxSizeMB}MB limit` 
      };
    }

    // Check file type
    if (config.accept && config.accept !== '*/*') {
      const acceptedTypes = config.accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      const isTypeAccepted = acceptedTypes.some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return fileExtension === acceptedType.toLowerCase();
        }
        if (acceptedType.includes('*')) {
          const baseType = acceptedType.split('/')[0];
          return fileType.startsWith(baseType);
        }
        return fileType === acceptedType;
      });

      if (!isTypeAccepted) {
        return { 
          isValid: false, 
          error: `File type not accepted. Accepted types: ${config.accept}` 
        };
      }
    }

    // Custom validation
    if (config.validator) {
      const customResult = config.validator(file);
      if (typeof customResult === 'string') {
        return { isValid: false, error: customResult };
      }
      if (customResult === false) {
        return { isValid: false, error: 'File validation failed' };
      }
    }

    return { isValid: true };
  }

  /**
   * Handles file selection from input or drag and drop
   */
  function handleFileChange(event: Event | DragEvent): void {
    const files = (event.target as HTMLInputElement)?.files || 
                 (event as DragEvent).dataTransfer?.files;
    
    isDragging.value = false;
    fileError.value = '';

    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file
      const validation = validateFile(file);
      if (!validation.isValid) {
        fileError.value = validation.error || 'File validation failed';
        emit('file-error', validation.error);
        
        if (options.announceValidation) {
          screenReader.announceAssertively(`File error: ${validation.error}`);
        }
        return;
      }

      // Set file state
      haveFile.value = true;
      fileName.value = file.name;
      inputValue.value = file;

      // Announce file selection with size information
      if (options.announceValidation) {
        const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
        screenReader.announcePolitely(
          `File selected: ${file.name}, size: ${sizeInMB} MB`
        );
      }

      emit('update:modelValue', file);
      emit('file-select', file);
    } else {
      clearFile();
    }
  }

  /**
   * Removes the selected file
   */
  function removeFile(): void {
    const removedFileName = fileName.value;
    
    haveFile.value = false;
    fileName.value = '';
    fileError.value = '';
    inputValue.value = undefined;

    // Announce file removal
    if (options.announceValidation && removedFileName) {
      screenReader.announcePolitely(`File removed: ${removedFileName}`);
    }

    emit('update:modelValue', undefined);
    emit('file-remove', removedFileName);
  }

  /**
   * Clears file state
   */
  function clearFile(): void {
    haveFile.value = false;
    fileName.value = '';
    fileError.value = '';
    inputValue.value = undefined;
    emit('update:modelValue', undefined);
  }

  /**
   * Handles drag enter event
   */
  function handleDragEnter(event: DragEvent): void {
    event.preventDefault();
    isDragging.value = true;
    emit('drag-enter', event);
  }

  /**
   * Handles drag over event
   */
  function handleDragOver(event: DragEvent): void {
    event.preventDefault();
    // Keep dragging state
  }

  /**
   * Handles drag leave event
   */
  function handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    isDragging.value = false;
    emit('drag-leave', event);
  }

  /**
   * Handles drop event
   */
  function handleDrop(event: DragEvent): void {
    event.preventDefault();
    handleFileChange(event);
    emit('drop', event);
  }

  /**
   * Gets file size in human readable format
   */
  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  /**
   * Sets file state from external value (for initialization)
   */
  function setFileState(value: BInputValue | undefined): void {
    if (value instanceof File) {
      haveFile.value = true;
      fileName.value = value.name;
      
      // Announce file selection for screen readers
      if (options.announceValidation) {
        screenReader.announcePolitely(`File selected: ${value.name}`);
      }
    } else {
      haveFile.value = false;
      fileName.value = '';
    }
    fileError.value = '';
  }

  /**
   * Gets drag and drop handlers
   */
  function getDragHandlers() {
    return {
      onDragenter: handleDragEnter,
      onDragover: handleDragOver,
      onDragleave: handleDragLeave,
      onDrop: handleDrop,
    };
  }

  /**
   * Gets accessible label for file input
   */
  function getAccessibleFileLabel(labelValue?: string): string {
    if (haveFile.value) {
      return `File selected: ${fileName.value}. Click to change or remove.`;
    }
    return `${labelValue || 'File upload'} - drag and drop or click to select`;
  }

  return {
    // State
    fileState,
    haveFile: computed(() => haveFile.value),
    fileName: computed(() => fileName.value),
    isDragging: computed(() => isDragging.value),
    fileError: computed(() => fileError.value),

    // Methods
    handleFileChange,
    removeFile,
    clearFile,
    setFileState,
    validateFile,
    formatFileSize,
    getDragHandlers,
    getAccessibleFileLabel,
  };
}