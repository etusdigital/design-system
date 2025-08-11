import { ref, computed, nextTick, type Ref } from 'vue';
import { useScreenReader } from '#composables';

/**
 * File upload options
 */
export interface FileUploadOptions {
	/** Whether to announce file operations to screen readers */
	announceChanges?: boolean;
	/** Accept attribute for file input */
	accept?: string;
	/** Whether multiple files can be selected */
	multiple?: boolean;
	/** Custom file selection announcement */
	customSelectionAnnouncement?: string;
	/** Custom file removal announcement */
	customRemovalAnnouncement?: string;
}

/**
 * File upload state
 */
export interface FileUploadState {
	/** Whether a file is currently selected */
	hasFile: Ref<boolean>;
	/** Currently selected file */
	currentFile: Ref<File | null>;
	/** File name for display */
	fileName: Ref<string>;
	/** Whether user is dragging files over the drop area */
	isDragging: Ref<boolean>;
}

/**
 * File upload result interface
 */
export interface FileUploadResult extends FileUploadState {
	/** Handle file selection from input or drop */
	handleFileSelection: (event: Event | DragEvent) => void;
	/** Remove current file */
	removeFile: () => void;
	/** Handle drag enter */
	handleDragEnter: () => void;
	/** Handle drag leave */
	handleDragLeave: () => void;
	/** Handle drag over */
	handleDragOver: (event: DragEvent) => void;
	/** Handle file drop */
	handleDrop: (event: DragEvent) => void;
	/** Reset file upload state */
	reset: () => void;
	/** Format file size for display */
	formatFileSize: (bytes: number) => string;
}

/**
 * Composable for file upload functionality
 * 
 * @param emit - Component emit function to update model value
 * @param options - File upload configuration options
 * @returns File upload utilities and reactive state
 */
export function useFileUpload(
	emit: (event: 'update:modelValue', value: File | undefined) => void,
	options: FileUploadOptions = {}
): FileUploadResult {
	const hasFile = ref(false);
	const currentFile = ref<File | null>(null);
	const fileName = ref('');
	const isDragging = ref(false);
	const screenReader = useScreenReader();

	/**
	 * Format file size in human readable format
	 */
	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		
		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
	};

	/**
	 * Announce file operation to screen readers
	 */
	const announceFileOperation = (message: string): void => {
		if (options.announceChanges) {
			nextTick(() => {
				screenReader.announcePolitely(message);
			});
		}
	};

	/**
	 * Handle file selection from input or drag & drop
	 */
	const handleFileSelection = (event: Event | DragEvent): void => {
		const files = (event.target as HTMLInputElement)?.files || 
			(event as DragEvent).dataTransfer?.files;
		
		// Reset dragging state
		isDragging.value = false;
		
		if (files && files.length > 0) {
			const file = files[0];
			setFile(file);
		} else {
			clearFile();
		}
	};

	/**
	 * Set selected file and update state
	 */
	const setFile = (file: File): void => {
		currentFile.value = file;
		hasFile.value = true;
		fileName.value = file.name || '';
		
		// Announce file selection with size information
		const sizeInfo = formatFileSize(file.size);
		const announcement = options.customSelectionAnnouncement || 
			`File selected: ${file.name}, size: ${sizeInfo}`;
		announceFileOperation(announcement);
		
		// Emit the file to parent component
		emit('update:modelValue', file);
	};

	/**
	 * Clear file selection
	 */
	const clearFile = (): void => {
		currentFile.value = null;
		hasFile.value = false;
		fileName.value = '';
		emit('update:modelValue', undefined);
	};

	/**
	 * Remove current file with announcement
	 */
	const removeFile = (): void => {
		const removedFileName = fileName.value;
		clearFile();
		
		// Announce file removal
		if (removedFileName) {
			const announcement = options.customRemovalAnnouncement || 
				`File removed: ${removedFileName}`;
			announceFileOperation(announcement);
		}
	};

	/**
	 * Handle drag enter event
	 */
	const handleDragEnter = (): void => {
		isDragging.value = true;
	};

	/**
	 * Handle drag leave event
	 */
	const handleDragLeave = (): void => {
		isDragging.value = false;
	};

	/**
	 * Handle drag over event
	 */
	const handleDragOver = (event: DragEvent): void => {
		event.preventDefault();
		isDragging.value = true;
	};

	/**
	 * Handle file drop event
	 */
	const handleDrop = (event: DragEvent): void => {
		event.preventDefault();
		handleFileSelection(event);
	};

	/**
	 * Reset file upload state
	 */
	const reset = (): void => {
		clearFile();
		isDragging.value = false;
	};

	return {
		hasFile,
		currentFile,
		fileName,
		isDragging,
		handleFileSelection,
		removeFile,
		handleDragEnter,
		handleDragLeave,
		handleDragOver,
		handleDrop,
		reset,
		formatFileSize
	};
}