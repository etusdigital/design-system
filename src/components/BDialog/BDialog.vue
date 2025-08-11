<script setup lang="ts">
import { ref, watch, computed, nextTick, onMounted, onUnmounted } from "vue";
import Overlay from "../../utils/components/Overlay.vue";
import { useFocusTrap, useAriaAttributes, useScreenReader } from "../../composables/index";
import type {
	BDialogProps,
	BDialogEmits,
	DialogCloseReason,
	DialogVariant,
	DialogSize,
	DialogAccessibilityConfig,
} from "./BDialog.types";
import {
	DIALOG_SIZE_MAP,
	DEFAULT_ACCESSIBILITY_CONFIG
} from "./BDialog.types";

interface Props extends BDialogProps {}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	width: "auto",
	height: "auto",
	noOutsideClose: false,
	zIndex: 1002,
	animated: true,
	animation: "bounce",
	scrollable: false,
	accessibility: () => ({}),
});

const emit = defineEmits<BDialogEmits>();

// Refs
const model = ref(props.modelValue);
const dialog = ref<HTMLElement | null>(null);
const triggerElement = ref<HTMLElement | null>(null);
const isClosing = ref(false);
const backgroundElements = ref<HTMLElement[]>([]);

// Composables
const { useAriaId, useDialogAria } = useAriaAttributes();
const { announce, announcePolitely, useLiveRegion } = useScreenReader();
const { liveRegion, updateLiveRegion } = useLiveRegion('polite');

// Generate unique IDs
const dialogId = useAriaId('dialog');
const liveRegionId = useAriaId('dialog-live');

// Compute accessibility configuration
const accessibilityConfig = computed<DialogAccessibilityConfig>(() => {
	// Merge default config based on variant with user config
	const variant: DialogVariant = props.accessibility?.variant || 'dialog';
	const defaultConfig = DEFAULT_ACCESSIBILITY_CONFIG[variant];
	
	// Handle legacy props
	const legacyConfig: Partial<DialogAccessibilityConfig> = {};
	if (props.titleId) legacyConfig.labelledBy = props.titleId;
	if (props.descriptionId) legacyConfig.describedBy = props.descriptionId;
	if (props.noOutsideClose !== undefined) {
		legacyConfig.dismissible = !props.noOutsideClose;
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

	// Handle preset sizes
	if (Object.keys(DIALOG_SIZE_MAP).includes(props.width as DialogSize)) {
		const sizeConfig = DIALOG_SIZE_MAP[props.width as DialogSize];
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

// Compute ARIA attributes
const dialogAriaAttrs = computed(() => ({
	role: accessibilityConfig.value.variant === 'alertdialog' ? 'alertdialog' : 'dialog',
	'aria-modal': true,
	'aria-labelledby': accessibilityConfig.value.labelledBy,
	'aria-describedby': accessibilityConfig.value.describedBy,
	'aria-label': accessibilityConfig.value.label,
	tabindex: -1
}));

// Focus trap setup
const { focusFirstElement, focusLastElement } = useFocusTrap(dialog, model);

// Store elements that should be hidden from screen readers
function hideBackgroundFromScreenReaders() {
	if (!accessibilityConfig.value.hideBackground) return;
	
	backgroundElements.value = [];
	
	// Find all elements that are siblings of the dialog container
	const body = document.body;
	const children = Array.from(body.children) as HTMLElement[];
	
	children.forEach(child => {
		// Skip the dialog container itself
		if (child.contains(dialog.value)) return;
		
		// Store original aria-hidden state
		const originalAriaHidden = child.getAttribute('aria-hidden');
		child.setAttribute('data-original-aria-hidden', originalAriaHidden || 'false');
		child.setAttribute('aria-hidden', 'true');
		
		backgroundElements.value.push(child);
	});
}

function restoreBackgroundAccessibility() {
	backgroundElements.value.forEach(element => {
		const originalValue = element.getAttribute('data-original-aria-hidden');
		
		if (originalValue === 'false' || originalValue === null) {
			element.removeAttribute('aria-hidden');
		} else {
			element.setAttribute('aria-hidden', originalValue);
		}
		
		element.removeAttribute('data-original-aria-hidden');
	});
	
	backgroundElements.value = [];
}

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
	
	// Update model
	model.value = true;
	emit('update:modelValue', true);
	
	// Wait for next tick to ensure DOM is updated
	await nextTick();
	
	// Setup accessibility
	hideBackgroundFromScreenReaders();
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
	
	// Update model
	model.value = false;
	emit('update:modelValue', false);
	
	// Restore accessibility
	restoreBackgroundAccessibility();
	restoreFocus();
	announceClose(reason);
	
	// Emit closed event
	emit('closed', reason);
	
	isClosing.value = false;
}

// Event handlers
function handleBackdropClick() {
	emit('backdrop-click');
	
	if (accessibilityConfig.value.dismissible !== false) {
		closeDialog('backdrop');
	} else {
		// Show bounce animation for non-dismissible dialogs
		dialog.value?.classList.add('bounce-active');
		setTimeout(() => {
			dialog.value?.classList.remove('bounce-active');
		}, 100);
	}
}

function handleKeydown(event: KeyboardEvent) {
	if (!model.value) return;
	
	if (event.key === 'Escape') {
		emit('escape');
		
		if (accessibilityConfig.value.escapeToClose !== false) {
			event.preventDefault();
			event.stopPropagation();
			closeDialog('escape');
		}
	}
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

// Expose methods for template refs and external usage
defineExpose({
	open: () => openDialog(),
	close: (reason?: DialogCloseReason) => closeDialog(reason),
	focusFirstElement,
	focusLastElement,
	updateLiveRegion
});
</script>

<template>
	<Teleport to="body">
		<Overlay
			v-model="model"
			:z-index="zIndex"
			@click="handleBackdropClick">
			<Transition :name="animation">
				<div
					v-if="model"
					ref="dialog"
					:id="dialogId"
					class="b-dialog"
					:class="[
						{ 'b-dialog--scrollable': scrollable },
						props.class
					]"
					:style="dialogStyles"
					v-bind="dialogAriaAttrs"
					@keydown="handleKeydown">
					
					<!-- Live region for dynamic announcements -->
					<div
						v-if="accessibilityConfig.liveRegion"
						ref="liveRegion"
						:id="liveRegionId"
						aria-live="polite"
						aria-atomic="true"
						class="sr-only">
					</div>

					<slot
						:close="closeDialog"
						:update-live-region="updateLiveRegion"
						:dialog-id="dialogId"
						:accessibility-config="accessibilityConfig" />
				</div>
			</Transition>
		</Overlay>
	</Teleport>
</template>

<style scoped>
.b-dialog--scrollable {
	overflow-y: auto;
}

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