<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { useFocusTrap, useAriaAttributes, useScreenReader, useBodyScrollLock, useDialogStack } from "#composables";
import EnhancedBackdrop from "./EnhancedBackdrop.vue";
import LoadingOverlay from "./LoadingOverlay.vue";
import BIcon from "../BIcon/BIcon.vue";
import BButton from "../BButton/BButton.vue";
import type {
	BDialogProps,
	BDialogEmits,
	DialogCloseReason,
	DialogAccessibilityConfig,
	DialogLoadingConfig,
	DialogPosition,
} from "./BDialog.types";
import {
	DIALOG_SIZE_MAP,
	DIALOG_POSITION_MAP,
	DEFAULT_ACCESSIBILITY_CONFIG
} from "./BDialog.types";

interface Props extends BDialogProps {}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	size: "md",
	position: "center",
	showCloseButton: true,
	persistent: false,
	backdropEffect: "darken",
	backdropBlur: "8px",
	lockBodyScroll: true,
	nested: true,
	zIndex: 1000,
	animated: true,
	transition: "modal-bounce",
	scrollable: false,
	responsive: true,
	accessibility: () => ({}),
	// Legacy props
	width: "auto",
	height: "auto",
	noOutsideClose: false,
});

const emit = defineEmits<BDialogEmits>();

// Refs and state
const model = ref(props.modelValue);
const dialog = ref<HTMLElement | null>(null);
const triggerElement = ref<HTMLElement | null>(null);
const isClosing = ref(false);
const dialogId = ref<string>("");

// Composables
const { useAriaId } = useAriaAttributes();
const { announce, announcePolitely } = useScreenReader();
const { focusFirstElement, focusLastElement } = useFocusTrap(dialog, model);
const bodyScrollLock = useBodyScrollLock();
const dialogStack = useDialogStack();

// Generate unique dialog ID on mount
onMounted(() => {
	dialogId.value = useAriaId('dialog')();
});

// Compute accessibility configuration
const accessibilityConfig = computed<DialogAccessibilityConfig>(() => {
	const variant = props.accessibility?.variant || 'dialog';
	const defaultConfig = DEFAULT_ACCESSIBILITY_CONFIG[variant];
	
	// Handle legacy props
	const legacyConfig: Partial<DialogAccessibilityConfig> = {};
	if (props.titleId) legacyConfig.labelledBy = props.titleId;
	if (props.descriptionId) legacyConfig.describedBy = props.descriptionId;
	if (props.noOutsideClose !== undefined || props.persistent) {
		legacyConfig.dismissible = !props.noOutsideClose && !props.persistent;
	}
	
	return {
		...defaultConfig,
		...legacyConfig,
		...props.accessibility,
		variant
	} as DialogAccessibilityConfig;
});

// Compute dialog size styles
const dialogStyles = computed(() => {
	let width = props.width;
	let height = props.height;
	let maxWidth = props.maxWidth;
	let maxHeight = props.maxHeight;

	// Handle size presets
	if (props.size && Object.keys(DIALOG_SIZE_MAP).includes(props.size)) {
		const sizeConfig = DIALOG_SIZE_MAP[props.size as keyof typeof DIALOG_SIZE_MAP];
		width = sizeConfig.width;
		height = sizeConfig.height;
		maxWidth = maxWidth || sizeConfig.maxWidth;
		maxHeight = maxHeight || sizeConfig.maxHeight;
	} else if (Object.keys(DIALOG_SIZE_MAP).includes(width as any)) {
		const sizeConfig = DIALOG_SIZE_MAP[width as keyof typeof DIALOG_SIZE_MAP];
		width = sizeConfig.width;
		height = sizeConfig.height;
		maxWidth = maxWidth || sizeConfig.maxWidth;
		maxHeight = maxHeight || sizeConfig.maxHeight;
	}

	return {
		width,
		height,
		...(maxWidth && { maxWidth }),
		...(maxHeight && { maxHeight }),
	};
});

// Compute position styles
const positionStyles = computed(() => {
	if (props.position && DIALOG_POSITION_MAP[props.position]) {
		return DIALOG_POSITION_MAP[props.position];
	}
	return DIALOG_POSITION_MAP.center;
});

// Compute ARIA attributes
const dialogAriaAttrs = computed(() => ({
	role: accessibilityConfig.value.variant === 'alertdialog' ? 'alertdialog' : 'dialog',
	'aria-modal': true,
	'aria-labelledby': accessibilityConfig.value.labelledBy || (props.title ? `${dialogId.value}-title` : undefined),
	'aria-describedby': accessibilityConfig.value.describedBy,
	'aria-label': accessibilityConfig.value.label,
	tabindex: -1
}));

// Compute loading configuration
const loadingConfig = computed<DialogLoadingConfig | null>(() => {
	if (!props.loading) return null;
	
	if (typeof props.loading === 'boolean') {
		return {
			loading: true,
			message: 'Loading...',
			size: 'md',
			blocking: true,
		};
	}
	
	return {
		loading: true,
		message: 'Loading...',
		size: 'md',
		blocking: true,
		...props.loading,
	};
});

// Compute effective z-index (from stack or prop)
const effectiveZIndex = computed(() => {
	if (props.nested && dialogStack.isTop(dialogId.value)) {
		const stackItem = dialogStack.get(dialogId.value);
		return stackItem?.zIndex || props.zIndex;
	}
	return props.zIndex;
});

// Focus management
function setInitialFocus() {
	if (!dialog.value || !accessibilityConfig.value.trapFocus) return;

	const { initialFocus } = accessibilityConfig.value;
	const delay = accessibilityConfig.value.focusDelay || 100;

	setTimeout(() => {
		if (!dialog.value) return;

		let targetElement: HTMLElement | null = null;

		if (typeof initialFocus === 'function') {
			targetElement = initialFocus();
		} else if (initialFocus instanceof HTMLElement) {
			targetElement = initialFocus;
		} else {
			switch (initialFocus) {
				case 'last':
					focusLastElement();
					return;
				case 'dialog':
					targetElement = dialog.value;
					break;
				case 'close-button':
					targetElement = dialog.value.querySelector('[data-dialog-close]') as HTMLElement;
					break;
				case 'first':
				default:
					focusFirstElement();
					return;
			}
		}

		if (targetElement && targetElement.focus) {
			targetElement.focus({ preventScroll: false });
		} else {
			focusFirstElement();
		}
	}, delay);
}

function restoreFocus() {
	const { returnFocus } = accessibilityConfig.value;
	let targetElement: HTMLElement | null = null;

	if (typeof returnFocus === 'function') {
		targetElement = returnFocus();
	} else if (returnFocus instanceof HTMLElement) {
		targetElement = returnFocus;
	} else {
		switch (returnFocus) {
			case 'trigger':
				targetElement = triggerElement.value;
				break;
			default:
				targetElement = triggerElement.value;
		}
	}

	if (targetElement && targetElement.focus) {
		targetElement.focus({ preventScroll: false });
	}
}

// Screen reader announcements
function announceOpen() {
	const { openAnnouncement, variant } = accessibilityConfig.value;
	
	let message: string;
	if (typeof openAnnouncement === 'function') {
		message = openAnnouncement(variant!);
	} else if (openAnnouncement) {
		message = openAnnouncement;
	} else {
		message = variant === 'alertdialog' ? 'Alert dialog opened' : 'Dialog opened';
	}
	
	if (variant === 'alertdialog') {
		announce(message, 'assertive');
	} else {
		announcePolitely(message);
	}
}

function announceClose(reason: DialogCloseReason) {
	const { closeAnnouncement } = accessibilityConfig.value;
	
	let message: string;
	if (typeof closeAnnouncement === 'function') {
		message = closeAnnouncement(reason);
	} else if (closeAnnouncement) {
		message = closeAnnouncement;
	} else {
		message = 'Dialog closed';
	}
	
	announcePolitely(message);
}

// Dialog lifecycle methods
async function openDialog() {
	if (isClosing.value) return;
	
	// Store trigger element
	triggerElement.value = document.activeElement as HTMLElement;
	
	// Emit before-open event (cancellable)
	let preventDefault = false;
	const beforeOpenEvent = {
		preventDefault: () => { preventDefault = true; }
	};
	
	emit('before-open', beforeOpenEvent);
	
	if (preventDefault) return;
	
	// Add to dialog stack if nested support enabled
	if (props.nested) {
		dialogStack.push({
			id: dialogId.value,
			element: dialog.value,
			variant: accessibilityConfig.value.variant || 'dialog',
			dismissible: accessibilityConfig.value.dismissible !== false,
			returnFocusTo: triggerElement.value,
		});
	}
	
	// Lock body scroll
	if (props.lockBodyScroll) {
		bodyScrollLock.lock();
	}
	
	// Update model
	model.value = true;
	emit('update:modelValue', true);
	
	// Wait for next tick to ensure DOM is updated
	await nextTick();
	
	// Setup accessibility
	setInitialFocus();
	announceOpen();
	
	// Emit opened event
	emit('opened');
}

async function closeDialog(reason: DialogCloseReason = 'programmatic') {
	if (isClosing.value || !model.value) return;
	
	isClosing.value = true;
	
	// Emit before-close event (cancellable)
	let preventDefault = false;
	const beforeCloseEvent = {
		reason,
		preventDefault: () => { preventDefault = true; }
	};
	
	emit('before-close', beforeCloseEvent);
	
	if (preventDefault) {
		isClosing.value = false;
		return;
	}
	
	// Remove from dialog stack
	if (props.nested) {
		dialogStack.pop(dialogId.value);
	}
	
	// Unlock body scroll if this was the last dialog
	if (props.lockBodyScroll && (!props.nested || !dialogStack.hasDialogs.value)) {
		bodyScrollLock.unlock();
	}
	
	// Update model
	model.value = false;
	emit('update:modelValue', false);
	
	// Restore focus and announce
	restoreFocus();
	announceClose(reason);
	
	// Emit closed event
	emit('closed', reason);
	
	isClosing.value = false;
}

// Event handlers
function handleBackdropClick() {
	emit('backdrop-click');
	
	if (accessibilityConfig.value.dismissible !== false && !props.persistent) {
		closeDialog('backdrop');
	}
}

function handleKeydown(event: KeyboardEvent) {
	if (!model.value) return;
	
	if (event.key === 'Escape') {
		emit('escape');
		
		if (accessibilityConfig.value.escapeToClose !== false && !props.persistent) {
			event.preventDefault();
			event.stopPropagation();
			closeDialog('escape');
		}
	}
}

function handleCloseClick() {
	closeDialog('close-button');
}

// Watchers
watch(
	() => props.modelValue,
	(newValue, oldValue) => {
		if (newValue !== oldValue) {
			if (newValue) {
				openDialog();
			} else {
				closeDialog('programmatic');
			}
		}
	}
);

// Cleanup on unmount
onUnmounted(() => {
	if (model.value) {
		if (props.nested) {
			dialogStack.pop(dialogId.value);
		}
		if (props.lockBodyScroll) {
			bodyScrollLock.unlock();
		}
	}
});

// Expose methods for template refs and external usage
defineExpose({
	open: () => openDialog(),
	close: (reason?: DialogCloseReason) => closeDialog(reason),
	focusFirstElement,
	focusLastElement,
});
</script>

<template>
	<Teleport to="body">
		<Transition
			:name="animated ? transition : undefined"
			appear>
			<EnhancedBackdrop
				v-if="model"
				:effect="backdropEffect"
				:blur="backdropBlur"
				:z-index="effectiveZIndex"
				:clickable="!persistent && accessibilityConfig.dismissible !== false"
				@click="handleBackdropClick">
				
				<div
					ref="dialog"
					:id="dialogId"
					class="b-dialog-enhanced"
					:class="[
						`b-dialog--${position}`,
						{ 
							'b-dialog--scrollable': scrollable,
							'b-dialog--responsive': responsive,
							'b-dialog--loading': loadingConfig?.loading,
						},
						props.class
					]"
					:style="{ ...dialogStyles, ...positionStyles }"
					v-bind="dialogAriaAttrs"
					@keydown="handleKeydown"
					@click.stop>
					
					<!-- Loading overlay -->
					<LoadingOverlay
						v-if="loadingConfig?.loading"
						:message="loadingConfig.message"
						:size="loadingConfig.size"
						:blocking="loadingConfig.blocking"
						:component="loadingConfig.component" />
					
					<!-- Header -->
					<header 
						v-if="title || showCloseButton || $slots.header"
						class="b-dialog__header">
						
						<slot name="header" :close="closeDialog">
							<h2 
								v-if="title"
								:id="`${dialogId}-title`"
								class="b-dialog__title">
								{{ title }}
							</h2>
						</slot>
						
						<BButton
							v-if="showCloseButton"
							variant="ghost"
							size="sm"
							class="b-dialog__close-button"
							data-dialog-close
							aria-label="Close dialog"
							@click="handleCloseClick">
							<BIcon name="x" />
						</BButton>
					</header>
					
					<!-- Content -->
					<main 
						class="b-dialog__content"
						:class="{ 'b-dialog__content--scrollable': scrollable }">
						<slot 
							:close="closeDialog"
							:dialog-id="dialogId" />
					</main>
					
					<!-- Footer -->
					<footer 
						v-if="$slots.footer"
						class="b-dialog__footer">
						<slot 
							name="footer" 
							:close="closeDialog" />
					</footer>
				</div>
			</EnhancedBackdrop>
		</Transition>
	</Teleport>
</template>

<style scoped>
/* Base dialog styles */
.b-dialog-enhanced {
	@apply relative bg-white rounded-lg shadow-xl;
	@apply border border-gray-200;
	@apply flex flex-col;
	@apply min-w-[280px] max-w-full;
	@apply max-h-[90vh];
	transform-origin: center;
}

/* Position variations */
.b-dialog--center {
	@apply mx-auto my-auto;
}

.b-dialog--top {
	@apply mx-auto mt-[5vh] mb-auto;
}

.b-dialog--bottom {
	@apply mx-auto mt-auto mb-[5vh];
}

.b-dialog--top-left {
	@apply ml-[5vw] mr-auto mt-[5vh] mb-auto;
}

.b-dialog--top-right {
	@apply ml-auto mr-[5vw] mt-[5vh] mb-auto;
}

.b-dialog--bottom-left {
	@apply ml-[5vw] mr-auto mt-auto mb-[5vh];
}

.b-dialog--bottom-right {
	@apply ml-auto mr-[5vw] mt-auto mb-[5vh];
}

/* Header */
.b-dialog__header {
	@apply flex items-center justify-between p-lg border-b border-gray-200;
	@apply flex-shrink-0;
}

.b-dialog__title {
	@apply text-xl font-semibold text-gray-900 m-0;
	@apply flex-1 pr-md;
}

.b-dialog__close-button {
	@apply flex-shrink-0 ml-auto;
}

/* Content */
.b-dialog__content {
	@apply p-lg flex-1 min-h-0;
}

.b-dialog__content--scrollable {
	@apply overflow-y-auto;
}

/* Footer */
.b-dialog__footer {
	@apply flex items-center justify-end gap-sm p-lg border-t border-gray-200;
	@apply flex-shrink-0;
}

/* States */
.b-dialog--loading {
	@apply overflow-hidden;
}

/* Responsive behavior */
.b-dialog--responsive {
	@apply mx-sm;
}

@media (max-width: 640px) {
	.b-dialog--responsive {
		@apply mx-sm max-w-none;
		width: calc(100vw - 2rem);
	}
	
	.b-dialog__header,
	.b-dialog__content,
	.b-dialog__footer {
		@apply p-md;
	}
	
	.b-dialog__title {
		@apply text-lg;
	}
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
	.b-dialog-enhanced {
		@apply bg-gray-800 border-gray-600;
	}
	
	.b-dialog__header,
	.b-dialog__footer {
		@apply border-gray-600;
	}
	
	.b-dialog__title {
		@apply text-gray-100;
	}
}

/* Animation transitions */
.modal-bounce-enter-active,
.modal-bounce-leave-active {
	@apply transition-all duration-300 ease-out;
}

.modal-bounce-enter-from,
.modal-bounce-leave-to {
	@apply opacity-0 scale-95;
	transform: scale(0.95) translateY(-10px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
	@apply transition-all duration-200 ease-out;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	@apply opacity-0;
}

.modal-slide-up-enter-active,
.modal-slide-up-leave-active {
	@apply transition-all duration-300 ease-out;
}

.modal-slide-up-enter-from,
.modal-slide-up-leave-to {
	@apply opacity-0;
	transform: translateY(100px);
}

.modal-zoom-enter-active,
.modal-zoom-leave-active {
	@apply transition-all duration-300 ease-out;
}

.modal-zoom-enter-from,
.modal-zoom-leave-to {
	@apply opacity-0;
	transform: scale(0.5);
}

/* High contrast mode */
@media (prefers-contrast: high) {
	.b-dialog-enhanced {
		@apply border-2 border-black bg-white;
	}
	
	.b-dialog__header,
	.b-dialog__footer {
		@apply border-black border-2;
	}
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
	.modal-bounce-enter-active,
	.modal-bounce-leave-active,
	.modal-fade-enter-active,
	.modal-fade-leave-active,
	.modal-slide-up-enter-active,
	.modal-slide-up-leave-active,
	.modal-zoom-enter-active,
	.modal-zoom-leave-active {
		@apply transition-opacity duration-200;
	}
	
	.modal-bounce-enter-from,
	.modal-bounce-leave-to,
	.modal-slide-up-enter-from,
	.modal-slide-up-leave-to,
	.modal-zoom-enter-from,
	.modal-zoom-leave-to {
		@apply opacity-0;
		transform: none;
	}
}
</style>