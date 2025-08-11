<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue";
	import { useAriaAttributes, useScreenReader } from "#composables";
	import BAlert from "../BAlert/BAlert.vue";
	import BIcon from "../BIcon/BIcon.vue";
	import BButton from "../BButton/BButton.vue";
	import event from "#utils/event";
	import type {
		BToastType,
		BToastPosition,
		BToastAccessibilityProps,
		BToastOptions,
		BToast,
		BToastEmits,
		BToastState,
		BToastAriaAttributes,
		BToastKeyboardConfig,
		BToastAnnouncementTemplates,
		BToastContainer,
		TOAST_TYPE_CONFIG,
		DEFAULT_TOAST_KEYBOARD_CONFIG,
		DEFAULT_TOAST_ACCESSIBILITY_CONFIG,
		DEFAULT_TOAST_ANNOUNCEMENTS,
	} from "./BToast.types";

	/**
	 * Re-export types for external use
	 */
	export type { BToastType, BToastOptions, BToast };

	/**
	 * Toast type variants with accessibility priority mapping (legacy support)
	 */
	type ToastType = BToastType;

	/**
	 * Legacy type aliases for backward compatibility
	 */
	type ToastPosition = BToastPosition;
	type ToastAccessibilityOptions = BToastAccessibilityProps;
	type ToastOptions = BToastOptions;
	type Toast = BToast;

	// Accessibility composables
	const { useAriaId } = useAriaAttributes();
	const screenReader = useScreenReader();

	// Component state
	const toasts = ref<Toast[]>([]);
	const toastRefs = ref<Record<string, HTMLElement>>({});
	const activeToastId = ref<string | null>(null);

	// Accessibility state
	const announceQueue = ref<string[]>([]);
	const isAnnouncementActive = ref(false);
	const keyboardMode = ref(false);

	// Generate unique IDs for ARIA relationships
	const toastRegionId = useAriaId('toast-region');
	const announcementId = useAriaId('toast-announcements');

	// Enhanced state management
	const componentState = computed((): BToastState => ({
		activeCount: activeToasts.value.length,
		hasFocus: keyboardMode.value,
		focusedToastId: activeToastId.value,
		keyboardMode: keyboardMode.value,
		isPaused: activeToasts.value.some(t => t.isPaused),
		isDismissible: activeToasts.value.some(t => t.dismissible),
		hasAction: activeToasts.value.some(t => t.button),
	}));

	// Toast type to ARIA live mapping
	const getAriaLiveForType = (type: ToastType, override?: string): 'polite' | 'assertive' | 'off' => {
		if (override && ['polite', 'assertive', 'off'].includes(override)) {
			return override as 'polite' | 'assertive' | 'off';
		}
		
		switch (type) {
			case 'danger':
			case 'warning':
				return 'assertive';
			case 'success':
			case 'info':
			case 'neutral':
			default:
				return 'polite';
		}
	};

	// Toast type to ARIA role mapping
	const getAriaRoleForType = (type: ToastType, override?: string): 'alert' | 'status' | 'log' => {
		if (override && ['alert', 'status', 'log'].includes(override)) {
			return override as 'alert' | 'status' | 'log';
		}
		
		switch (type) {
			case 'danger':
			case 'warning':
				return 'alert';
			case 'success':
			case 'info':
				return 'status';
			case 'neutral':
			default:
				return 'log';
		}
	};

	// Computed properties for accessibility
	const activeToasts = computed(() => toasts.value.filter(t => t.visible));
	const hasActiveToasts = computed(() => activeToasts.value.length > 0);
	const containers = ref<BToastContainer[]>(
		["top", "bottom"].flatMap((vertical) =>
			["left", "right"].map((horizontal) => ({
				vertical: vertical as 'top' | 'bottom',
				horizontal: horizontal as 'left' | 'right',
				ariaLabel: `${vertical} ${horizontal} notifications`,
			}))
		)
	);

	// Lifecycle hooks
	onMounted(() => {
		event.on("open-toast", addToast);
		event.on("close-toast", removeToast);
		event.on("dismiss-all-toasts", dismissAllToasts);
		
		// Global keyboard handler for toast navigation
		document.addEventListener('keydown', handleGlobalKeydown);
	});

	onBeforeUnmount(() => {
		event.off("open-toast", addToast);
		event.off("close-toast", removeToast);
		event.off("dismiss-all-toasts", dismissAllToasts);
		
		// Clean up global keyboard handler
		document.removeEventListener('keydown', handleGlobalKeydown);
		
		// Clean up any remaining timeouts
		toasts.value.forEach(toast => {
			if (toast.timeoutRef) {
				clearTimeout(toast.timeoutRef);
			}
		});
	});
	
	/**
	 * Global keyboard handler for toast system with enhanced accessibility
	 */
	function handleGlobalKeydown(event: KeyboardEvent) {
		if (!hasActiveToasts.value) return;
		
		keyboardMode.value = true;
		
		// Handle global toast shortcuts
		if (event.ctrlKey || event.metaKey) {
			if (event.shiftKey && event.key === 'D') {
				// Ctrl/Cmd + Shift + D: Dismiss all toasts
				event.preventDefault();
				dismissAllToasts();
				return;
			}
		}
		
		// Handle active toast interactions
		if (activeToastId.value) {
			const activeToast = toasts.value.find(t => t.id === activeToastId.value);
			if (activeToast) {
				handleKeydown(event, activeToast);
			}
		}
	}

	/**
	 * Adds a new toast with comprehensive accessibility features
	 */
	function addToast(options: ToastOptions) {
		const defaultTimeout = options.type === 'danger' || options.type === 'warning' ? 0 : 5000;
		
		const toast: Toast = {
			id: options.id,
			title: options.title || "",
			message: options.message || "",
			type: options.type || "danger",
			top: options.top || false,
			bottom: options.bottom || false,
			right: options.right || false,
			left: options.left || false,
			button: options.button || "",
			action: options.action || (() => {}),
			visible: true,
			// Accessibility properties
			ariaLive: getAriaLiveForType(options.type || 'danger', options.ariaLive),
			role: getAriaRoleForType(options.type || 'danger', options.role),
			ariaLabel: options.ariaLabel || `${options.type || 'notification'} toast`,
			announcement: options.announcement || createAnnouncementText(options),
			announceContent: options.announceContent !== false,
			focusManagement: options.focusManagement || 'none',
			autoDismiss: options.autoDismiss !== false,
			dismissTimeout: options.dismissTimeout || options.timeout || defaultTimeout,
			// Enhanced properties
			persistOnHover: options.persistOnHover !== false,
			dismissible: options.dismissible !== false,
			icon: options.icon || getDefaultIconForType(options.type || 'danger'),
			showProgress: options.showProgress === true && (options.timeout || defaultTimeout) > 0,
			progressPercentage: 100,
			isPaused: false,
		};

		toasts.value.push(toast);
		
		// Announce toast content
		if (toast.announceContent) {
			announceToast(toast);
		}
		
		// Set up auto-dismiss timer
		if (toast.autoDismiss && toast.dismissTimeout > 0) {
			setupAutoDismiss(toast);
		}
		
		// Handle focus management
		handleFocusManagement(toast);
		
		// Set active toast for keyboard navigation
		if (!activeToastId.value) {
			activeToastId.value = toast.id;
		}
		
		// Emit opened event for external listeners
		if (window.dispatchEvent) {
			window.dispatchEvent(new CustomEvent('toast-opened', { detail: toast }));
		}
	}

	/**
	 * Removes a toast with proper cleanup and accessibility announcements
	 */
	function removeToast(id: string, reason: 'user' | 'timeout' | 'programmatic' = 'programmatic') {
		if (!id) return;

		const toast = toasts.value.find((t) => t.id === id);
		if (!toast) return;

		// Clear timeout if exists
		if (toast.timeoutRef) {
			clearTimeout(toast.timeoutRef);
		}
		
		// Announce dismissal for screen readers
		if (reason === 'user' && toast.announceContent) {
			const dismissalMessage = `${toast.title || 'Notification'} dismissed`;
			screenReader.announcePolitely(dismissalMessage);
		}
		
		// Emit closed event for external listeners
		if (window.dispatchEvent) {
			window.dispatchEvent(new CustomEvent('toast-closed', { 
				detail: { id, reason, toast } 
			}));
		}
		
		// Return focus if this toast had focus management
		if (toast.focusedElement && toast.focusManagement !== 'none') {
			try {
				toast.focusedElement.focus();
			} catch (error) {
				// Fallback to document body if element is no longer focusable
				document.body.focus();
			}
		}
		
		// Update active toast
		if (activeToastId.value === id) {
			const remainingToasts = toasts.value.filter(t => t.visible && t.id !== id);
			activeToastId.value = remainingToasts.length > 0 ? remainingToasts[0].id : null;
		}

		toast.visible = false;
		
		// Remove from DOM after animation
		setTimeout(() => {
			toasts.value = toasts.value.filter((t) => t.id !== id);
			delete toastRefs.value[id];
		}, 600);
	}
	
	/**
	 * Creates announcement text for screen readers
	 */
	function createAnnouncementText(options: ToastOptions): string {
		const parts = [];
		
		if (options.type) {
			parts.push(options.type);
		}
		
		if (options.title) {
			parts.push(options.title);
		}
		
		if (options.message) {
			parts.push(options.message);
		}
		
		if (options.button) {
			parts.push(`Action available: ${options.button}`);
		}
		
		if (options.dismissible !== false) {
			parts.push('Press Escape to dismiss');
		}
		
		return parts.join('. ');
	}
	
	/**
	 * Gets default icon for toast type
	 */
	function getDefaultIconForType(type: ToastType): string {
		const iconMap: Record<ToastType, string> = {
			info: 'ℹ️',
			success: '✅',
			warning: '⚠️',
			danger: '❌',
			neutral: '📋'
		};
		return iconMap[type];
	}
	
	/**
	 * Announces toast content to screen readers
	 */
	function announceToast(toast: Toast) {
		if (!toast.announceContent) return;
		
		announceQueue.value.push(toast.announcement);
		processAnnouncements();
	}
	
	/**
	 * Processes announcement queue to avoid overwhelming screen readers
	 */
	async function processAnnouncements() {
		if (isAnnouncementActive.value || announceQueue.value.length === 0) return;
		
		isAnnouncementActive.value = true;
		
		while (announceQueue.value.length > 0) {
			const announcement = announceQueue.value.shift();
			if (announcement) {
				screenReader.announcePolitely(announcement);
				// Wait between announcements
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}
		
		isAnnouncementActive.value = false;
	}
	
	/**
	 * Sets up auto-dismiss functionality with progress indicator
	 */
	function setupAutoDismiss(toast: Toast) {
		if (!toast.dismissTimeout || toast.dismissTimeout <= 0) return;
		
		let startTime = Date.now();
		const duration = toast.dismissTimeout;
		
		const updateProgress = () => {
			if (!toast.visible) return;
			
			const elapsed = Date.now() - startTime;
			const remaining = Math.max(0, duration - elapsed);
			const percentage = Math.max(0, (remaining / duration) * 100);
			
			toast.progressPercentage = percentage;
			
			if (remaining <= 0 && !toast.isPaused) {
				removeToast(toast.id, 'timeout');
				return;
			}
			
			if (toast.isPaused) {
				// Reset start time when paused
				startTime = Date.now() - elapsed;
			}
			
			// Continue animation
			if (toast.visible) {
				toast.timeoutRef = requestAnimationFrame(updateProgress) as unknown as number;
			}
		};
		
		updateProgress();
	}
	
	/**
	 * Handles focus management for toasts
	 */
	function handleFocusManagement(toast: Toast) {
		if (toast.focusManagement === 'none') return;
		
		// Store currently focused element
		toast.focusedElement = document.activeElement as HTMLElement;
		
		nextTick(() => {
			const toastElement = toastRefs.value[toast.id];
			if (!toastElement) return;
			
			if (toast.focusManagement === 'auto') {
				// Focus the first focusable element in the toast
				const focusableElements = toastElement.querySelectorAll(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				if (focusableElements.length > 0) {
					(focusableElements[0] as HTMLElement).focus();
				}
			}
		});
	}
	
	/**
	 * Handles keyboard navigation for toasts with enhanced accessibility
	 */
	function handleKeydown(event: KeyboardEvent, toast: Toast) {
		const config = { ...DEFAULT_TOAST_KEYBOARD_CONFIG, ...toast.keyboardConfig };
		
		if (!config.enabled) return;
		
		switch (event.key) {
			case 'Escape':
				if (config.dismissKeys.includes('Escape') && toast.dismissible) {
					event.preventDefault();
					removeToast(toast.id, 'user');
					// Emit keyboard event for external listeners
					window.dispatchEvent?.(new CustomEvent('toast-keyboard', {
						detail: { event, action: 'dismiss', toastId: toast.id }
					}));
				}
				break;
				
			case 'Enter':
			case ' ':
				if (config.actionKeys.includes(event.key) && toast.button && toast.action) {
					event.preventDefault();
					toast.action();
					removeToast(toast.id, 'user');
					// Emit action event for external listeners
					window.dispatchEvent?.(new CustomEvent('toast-action', {
						detail: { toastId: toast.id, action: toast.action }
					}));
				}
				break;
				
			case 'ArrowUp':
			case 'ArrowDown':
				if (config.navigationKeys.includes(event.key)) {
					event.preventDefault();
					navigateToasts(event.key === 'ArrowUp' ? -1 : 1);
					// Emit navigation event for external listeners
					window.dispatchEvent?.(new CustomEvent('toast-navigation', {
						detail: { direction: event.key === 'ArrowUp' ? -1 : 1, activeId: activeToastId.value }
					}));
				}
				break;
		}
	}
	
	/**
	 * Navigates between multiple toasts using keyboard
	 */
	function navigateToasts(direction: number) {
		const visibleToasts = toasts.value.filter(t => t.visible);
		if (visibleToasts.length <= 1) return;
		
		const currentIndex = visibleToasts.findIndex(t => t.id === activeToastId.value);
		let newIndex = currentIndex + direction;
		
		// Wrap around
		if (newIndex < 0) newIndex = visibleToasts.length - 1;
		if (newIndex >= visibleToasts.length) newIndex = 0;
		
		activeToastId.value = visibleToasts[newIndex].id;
		
		// Focus the new active toast
		nextTick(() => {
			const toastElement = toastRefs.value[activeToastId.value!];
			if (toastElement) {
				toastElement.focus();
			}
		});
	}
	
	/**
	 * Handles mouse enter/leave for pause functionality with enhanced accessibility
	 */
	function handleToastHover(toast: Toast, isHovered: boolean) {
		if (!toast.persistOnHover) return;
		
		toast.isPaused = isHovered;
		
		// Announce pause state for screen readers
		if (toast.announceContent && toast.announceStatusChanges) {
			const pauseMessage = isHovered 
				? `${toast.title || 'Notification'} paused` 
				: `${toast.title || 'Notification'} resumed`;
			screenReader.announcePolitely(pauseMessage);
		}
		
		// Emit hover events for external listeners
		if (window.dispatchEvent) {
			const eventType = isHovered ? 'toast-paused' : 'toast-resumed';
			window.dispatchEvent(new CustomEvent(eventType, { 
				detail: { toastId: toast.id, isHovered } 
			}));
		}
	}
	
	/**
	 * Dismisses all toasts
	 */
	function dismissAllToasts() {
		const visibleToasts = toasts.value.filter(t => t.visible);
		visibleToasts.forEach(toast => {
			if (toast.dismissible) {
				removeToast(toast.id, 'programmatic');
			}
		});
		
		if (visibleToasts.length > 0) {
			screenReader.announcePolitely('All notifications dismissed');
		}
	}
</script>

<template>
	<!-- Toast notification regions with proper ARIA structure -->
	<div
		v-for="container in containers"
		:key="container.vertical + container.horizontal"
		class="toast-container"
		:class="[container.vertical, container.horizontal]"
		:aria-label="`${container.vertical} ${container.horizontal} notifications`"
		role="region">
		
		<!-- Individual toast notifications -->
		<Transition
			v-for="toast in toasts.filter(
				(t) => {
					const verticalKey = container.vertical as keyof ToastPosition;
					const horizontalKey = container.horizontal as keyof ToastPosition;
					return t[verticalKey] && t[horizontalKey];
				}
			)"
			:key="toast.id"
			:name="toast.right ? 'slide-right' : 'slide-left'"
			appear>
			
			<div
				v-if="toast.visible"
				:ref="el => { if (el) toastRefs[toast.id] = el as HTMLElement }"
				:id="`toast-${toast.id}`"
				class="b-toast-wrapper"
				:class="{
					'toast-active': activeToastId === toast.id,
					'toast-paused': toast.isPaused,
					'toast-dismissible': toast.dismissible,
					'toast-has-action': toast.button
				}"
				:role="toast.role"
				:aria-live="toast.ariaLive"
				:aria-label="toast.ariaLabel"
				:aria-describedby="`toast-content-${toast.id}`"
				:tabindex="toast.dismissible || toast.button ? 0 : -1"
				@keydown="handleKeydown($event, toast)"
				@mouseenter="handleToastHover(toast, true)"
				@mouseleave="handleToastHover(toast, false)"
				@focusin="handleToastHover(toast, true)"
				@focusout="handleToastHover(toast, false)">
				
				<!-- Progress indicator for timed toasts -->
				<div 
					v-if="toast.showProgress && toast.progressPercentage !== undefined"
					class="toast-progress-bar"
					role="progressbar"
					:aria-valuenow="Math.round(toast.progressPercentage)"
					aria-valuemin="0"
					aria-valuemax="100"
					:aria-label="`Time remaining: ${Math.round(toast.progressPercentage)}%`">
					<div 
						class="toast-progress-fill"
						:style="{ width: toast.progressPercentage + '%' }" />
				</div>
				
				<!-- Enhanced BAlert with accessibility features -->
				<BAlert
					:id="`toast-content-${toast.id}`"
					class="b-toast"
					:title="toast.title"
					:message="toast.message"
					:type="toast.type"
					:icon="toast.icon"
					icon-position="center"
					:closable="toast.dismissible"
					:aria-label="toast.title ? `${toast.type} notification: ${toast.title}` : `${toast.type} notification`"
					@close="removeToast(toast.id, 'user')">
					
					<!-- Action button with enhanced accessibility -->
					<template 
						#actions
						v-if="toast.button">
						<BButton
							class="whitespace-nowrap toast-action-button"
							size="small"
							variant="secondary"
							:color="toast.type"
							:aria-label="`${toast.button} - ${toast.title || 'notification'}`"
							@click="() => { toast.action(); removeToast(toast.id, 'user'); }"
							@keydown.enter.stop="() => { toast.action(); removeToast(toast.id, 'user'); }"
							@keydown.space.stop="() => { toast.action(); removeToast(toast.id, 'user'); }">
							{{ toast.button }}
						</BButton>
					</template>
				</BAlert>
				
				<!-- Keyboard navigation hint -->
				<div 
					v-if="toast.dismissible && activeToastId === toast.id && keyboardMode"
					class="sr-only toast-hint"
					aria-live="polite">
					{{ toast.screenReaderInstructions || DEFAULT_TOAST_ACCESSIBILITY_CONFIG.screenReaderInstructions }}
				</div>
			</div>
		</Transition>
	</div>
	
	<!-- Global screen reader announcement region -->
	<div
		:id="announcementId"
		class="sr-only"
		aria-live="polite"
		aria-atomic="true"
		role="status">
		<!-- Screen reader announcements will be inserted here -->
	</div>
	
	<!-- Toast system status for screen readers -->
	<div 
		v-if="hasActiveToasts"
		class="sr-only toast-system-status"
		aria-live="polite"
		role="status">
		{{ activeToasts.length }} notification{{ activeToasts.length !== 1 ? 's' : '' }} available. 
		Press Ctrl+Shift+D to dismiss all.
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	.toast-container {
		@apply z-1100 fixed flex flex-col gap-sm p-sm;
	}

	.top {
		@apply top-0;
	}

	.bottom {
		@apply bottom-0;
	}

	.right {
		@apply right-0 items-end;
	}

	.left {
		@apply left-0;
	}

	.b-toast {
		@apply w-fit max-w-[50em] break-all whitespace-normal;
	}

	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
		transition: all 0.6s ease;
	}

	.slide-right-enter-from,
	.slide-right-leave-to {
		transform: translateX(100%);
		opacity: 0;
	}

	.slide-left-enter-from,
	.slide-left-leave-to {
		transform: translateX(-100%);
		opacity: 0;
	}

	@media screen and (max-width: 50em) {
		.b-toast {
			@apply max-w-[95%];
		}
	}
</style>
