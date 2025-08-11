<script setup lang="ts">
import { computed } from 'vue';
import { useOptionalModel, useAriaAttributes } from "#composables";
import { useFileUpload } from './composables';
import BIcon from '../BIcon/BIcon.vue';

/**
 * File input component sizes
 */
type Size = "xs" | "sm" | "base" | "lg" | "xl" | "100";

/**
 * File input accessibility properties
 */
interface FileInputAccessibilityProps {
	/** ARIA label override */
	ariaLabel?: string;
	/** ARIA description for complex inputs */
	ariaDescription?: string;
	/** Whether to announce file operations */
	announceFileOperations?: boolean;
	/** Custom file selection announcement */
	customSelectionAnnouncement?: string;
	/** Custom file removal announcement */
	customRemovalAnnouncement?: string;
}

/**
 * File input properties
 */
interface BFileInputProps extends FileInputAccessibilityProps {
	modelValue?: File;
	labelValue?: string;
	placeholder?: string;
	disabled?: boolean;
	size?: Size;
	accept?: string;
	multiple?: boolean;
	required?: boolean;
}

const props = withDefaults(defineProps<BFileInputProps>(), {
	modelValue: undefined,
	labelValue: "",
	placeholder: "or drag and drop it here",
	disabled: false,
	size: "100",
	accept: undefined,
	multiple: false,
	required: false,
	announceFileOperations: true,
});

const emit = defineEmits<{
	"update:modelValue": [value: File | undefined];
	change: [value: File | undefined];
}>();

// Optional model for file value
const [model, setModel] = useOptionalModel<File | undefined>(
	props,
	"modelValue",
	emit,
	undefined
);

// File upload composable
const fileUpload = useFileUpload(
	(event, value) => {
		setModel(value);
		emit('change', value);
	},
	{
		announceChanges: props.announceFileOperations,
		accept: props.accept,
		multiple: props.multiple,
		customSelectionAnnouncement: props.customSelectionAnnouncement,
		customRemovalAnnouncement: props.customRemovalAnnouncement,
	}
);

// Accessibility setup
const { useAriaId } = useAriaAttributes();
const inputId = useAriaId('file-input');
const labelId = useAriaId('file-label');

// Compute SVG size based on component size
const svgSize = computed(() => {
	switch (props.size) {
		case "xs": return 56;
		case "sm": return 66;
		case "base": return 76;
		case "lg": return 86;
		case "xl": return 96;
		case "100": return 76;
		default: return 76;
	}
});

// File input ARIA attributes
const fileInputAriaAttrs = computed(() => ({
	id: inputId,
	'aria-label': props.ariaLabel || `${props.labelValue || 'File upload'} - drag and drop or click to select`,
	'aria-describedby': props.ariaDescription ? `${inputId}-description` : undefined,
	'aria-required': props.required || undefined,
	accept: props.accept,
	multiple: props.multiple || undefined,
}));

// Handle file selection
const handleFileChange = (event: Event) => {
	fileUpload.handleFileSelection(event);
};

// Handle file removal
const handleFileRemove = () => {
	fileUpload.removeFile();
};
</script>

<template>
	<div
		class="b-file-input"
		:class="[
			'file-' + size,
			{ 
				'file-disabled': disabled,
				'file-dragging': fileUpload.isDragging.value 
			}
		]"
		:style="{ opacity: disabled ? 0.5 : 1 }"
	>
		<div
			class="file-drop-area"
			:class="{ 'blur-[2px]': fileUpload.isDragging.value }"
			@dragenter.prevent="fileUpload.handleDragEnter"
			@dragover.prevent="fileUpload.handleDragOver"
			@dragleave.prevent="fileUpload.handleDragLeave"
			@drop.prevent="fileUpload.handleDrop"
		>
			<!-- File upload SVG icon -->
			<svg
				v-if="!fileUpload.hasFile.value"
				:width="svgSize"
				:height="svgSize"
				viewBox="0 0 76 76"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M63.5312 33.25H42.75C40.8603 33.25 39.0481 32.4993 37.7119 31.1631C36.3757 29.8269 35.625 28.0147 35.625 26.125V5.34375C35.625 5.18628 35.5624 5.03526 35.4511 4.92391C35.3397 4.81256 35.1887 4.75 35.0312 4.75H21.375C18.8554 4.75 16.4391 5.75089 14.6575 7.53249C12.8759 9.31408 11.875 11.7304 11.875 14.25V61.75C11.875 64.2696 12.8759 66.6859 14.6575 68.4675C16.4391 70.2491 18.8554 71.25 21.375 71.25H54.625C57.1446 71.25 59.5609 70.2491 61.3425 68.4675C63.1241 66.6859 64.125 64.2696 64.125 61.75V33.8438C64.125 33.6863 64.0624 33.5353 63.9511 33.4239C63.8397 33.3126 63.6887 33.25 63.5312 33.25Z"
					fill="var(--neutral-border-default)"
				/>
				<path
					d="M62.228 27.9938L40.8812 6.647C40.8397 6.60573 40.7869 6.57766 40.7295 6.56631C40.672 6.55495 40.6125 6.56083 40.5584 6.5832C40.5043 6.60556 40.4581 6.64342 40.4254 6.69202C40.3928 6.74061 40.3752 6.79776 40.375 6.8563V26.125C40.375 26.7549 40.6252 27.3589 41.0706 27.8043C41.516 28.2497 42.1201 28.5 42.75 28.5H62.0187C62.0772 28.4997 62.1344 28.4822 62.183 28.4495C62.2315 28.4169 62.2694 28.3706 62.2918 28.3165C62.3141 28.2624 62.32 28.2029 62.3087 28.1455C62.2973 28.0881 62.2692 28.0353 62.228 27.9938Z"
					fill="var(--neutral-border-default)"
				/>
				<g clip-path="url(#clip0_2300_5309_BInput)">
					<circle cx="63" cy="63" r="7" fill="white" />
					<path
						d="M63 50C55.8319 50 50 55.8319 50 63C50 70.1681 55.8319 76 63 76C70.1681 76 76 70.1681 76 63C76 55.8319 70.1681 50 63 50ZM68 64H64V68C64 68.2652 63.8946 68.5196 63.7071 68.7071C63.5196 68.8946 63.2652 69 63 69C62.7348 69 62.4804 68.8946 62.2929 68.7071C62.1054 68.5196 62 68.2652 62 68V64H58C57.7348 64 57.4804 63.8946 57.2929 63.7071C57.1054 63.5196 57 63.2652 57 63C57 62.7348 57.1054 62.4804 57.2929 62.2929C57.4804 62.1054 57.7348 62 58 62H62V58C62 57.7348 62.1054 57.4804 62.2929 57.2929C62.4804 57.1054 62.7348 57 63 57C63.2652 57 63.5196 57.1054 63.7071 57.2929C63.8946 57.4804 64 57.7348 64 58V62H68C68.2652 62 68.5196 62.1054 68.7071 62.2929C68.8946 62.4804 69 62.7348 69 63C69 63.2652 68.8946 63.5196 68.7071 63.7071C68.5196 63.8946 68.2652 64 68 64Z"
						fill="var(--primary-interaction-default)"
					/>
				</g>
				<defs>
					<clipPath id="clip0_2300_5309_BInput">
						<rect width="26" height="26" fill="white" transform="translate(50 50)" />
					</clipPath>
				</defs>
			</svg>

			<!-- Uploaded file display -->
			<div v-else class="file-uploaded-content">
				<slot name="uploaded-file" :file="fileUpload.currentFile.value" :fileName="fileUpload.fileName.value">
					<div class="file-info">
						<BIcon name="draft" class="file-icon" />
						<div class="file-details">
							<p class="file-name">{{ fileUpload.fileName.value }}</p>
							<BIcon
								class="file-remove-icon"
								name="delete"
								@click.stop="handleFileRemove"
								role="button"
								:aria-label="`Remove file ${fileUpload.fileName.value}`"
								tabindex="0"
								@keydown.enter.space.prevent="handleFileRemove"
							/>
						</div>
					</div>
				</slot>
			</div>

			<!-- File upload prompt -->
			<div v-if="!fileUpload.hasFile.value" class="file-prompt">
				<p class="file-action-text">
					{{ labelValue || "Select a file" }}
				</p>
				<p class="file-hint-text">
					{{ placeholder }}
				</p>
			</div>

			<!-- Hidden file input -->
			<input
				v-if="!fileUpload.hasFile.value"
				type="file"
				class="file-input-hidden"
				v-bind="fileInputAriaAttrs"
				:disabled="disabled"
				@change="handleFileChange"
			/>
		</div>

		<!-- ARIA description if provided -->
		<div
			v-if="props.ariaDescription"
			:id="`${inputId}-description`"
			class="sr-only"
		>
			{{ props.ariaDescription }}
		</div>
	</div>
</template>

<style scoped>
@import "../../../assets/main.css";

/* Screen reader only class */
.sr-only {
	@apply absolute w-px h-px p-0 -m-px overflow-hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

.b-file-input {
	@apply w-full h-full;
}

.file-drop-area {
	@apply relative flex flex-col items-center justify-center w-full h-full;
	@apply border-neutral-border-default border-dashed border-xxs cursor-pointer;
	@apply py-2 px-3 rounded-xs transition-colors duration-200;
}

.file-drop-area:hover:not(.file-disabled) {
	@apply border-primary-interaction-default bg-primary-surface-subtle;
}

.file-dragging .file-drop-area {
	@apply border-primary-interaction-default bg-primary-surface-default;
}

.file-disabled .file-drop-area {
	@apply cursor-not-allowed;
}

.file-input-hidden {
	@apply absolute inset-0 w-full h-full opacity-0 cursor-pointer;
}

.file-disabled .file-input-hidden {
	@apply cursor-not-allowed;
}

/* File content styles */
.file-uploaded-content {
	@apply flex items-center justify-center gap-2;
}

.file-info {
	@apply flex flex-col items-center gap-xs;
}

.file-details {
	@apply flex items-center gap-xs;
}

.file-name {
	@apply text-neutral-foreground-low truncate max-w-7xl;
}

.file-icon {
	@apply text-neutral-foreground-low;
}

.file-remove-icon {
	@apply cursor-pointer text-neutral-interaction-default;
	@apply hover:text-danger-interaction-default transition-colors duration-200;
}

.file-remove-icon:focus {
	@apply outline-none ring-2 ring-danger-interaction-default ring-offset-2;
}

/* File prompt styles */
.file-prompt {
	@apply flex flex-col items-center gap-xs text-center;
}

.file-action-text {
	@apply text-primary-interaction-default cursor-pointer font-medium;
}

.file-hint-text {
	@apply text-neutral-foreground-low text-sm;
}

/* Size-specific styles */
.file-xs .file-icon {
	@apply text-4xl;
}
.file-xs .file-remove-icon {
	@apply text-base;
}
.file-xs .file-action-text,
.file-xs .file-hint-text,
.file-xs .file-name {
	@apply text-xs;
}

.file-sm .file-icon {
	@apply text-6xl;
}
.file-sm .file-remove-icon {
	@apply text-lg;
}
.file-sm .file-action-text,
.file-sm .file-hint-text,
.file-sm .file-name {
	@apply text-sm;
}

.file-base .file-icon {
	@apply text-7xl;
}
.file-base .file-remove-icon {
	@apply text-xl;
}
.file-base .file-action-text,
.file-base .file-hint-text,
.file-base .file-name {
	@apply text-base;
}

.file-lg .file-icon {
	@apply text-8xl;
}
.file-lg .file-remove-icon {
	@apply text-2xl;
}
.file-lg .file-action-text,
.file-lg .file-hint-text,
.file-lg .file-name {
	@apply text-lg;
}

.file-xl .file-icon {
	@apply text-9xl;
}
.file-xl .file-remove-icon {
	@apply text-3xl;
}
.file-xl .file-action-text,
.file-xl .file-hint-text,
.file-xl .file-name {
	@apply text-xl;
}

.file-100 .file-icon {
	@apply text-7xl;
}
.file-100 .file-remove-icon {
	@apply text-lg;
}
.file-100 .file-action-text,
.file-100 .file-hint-text,
.file-100 .file-name {
	@apply text-base;
}

/* Size classes for the wrapper */
.file-xs {
	width: 176px;
}
.file-sm {
	width: 272px;
}
.file-base {
	width: 367px;
}
.file-lg {
	width: 559px;
}
.file-xl {
	width: 1134px;
}
.file-100 {
	width: 100%;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.file-drop-area {
		@apply border-2;
	}
	
	.file-remove-icon:focus {
		@apply ring-4 ring-black;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.file-drop-area,
	.file-remove-icon {
		transition: none !important;
	}
}
</style>