<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from "vue";
import { useAriaAttributes, useScreenReader } from "#composables";
import { useToast, useSwipeGesture } from "#composables";
import type { Toast, ToastPosition, SwipeDirection } from "#composables";
import BAlert from "../BAlert/BAlert.vue";
import BIcon from "../BIcon/BIcon.vue";
import BButton from "../BButton/BButton.vue";

/**
 * Re-export types for external use
 */
export type { Toast, ToastPosition };

// Composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();
const toast = useToast();

// Component refs
const toastRefs = ref<Record<string, HTMLElement>>({});
const activeToastId = ref<string | null>(null);

// Accessibility state
const keyboardMode = ref(false);

// Generate unique IDs for ARIA relationships
const toastRegionId = useAriaId('toast-region');
const announcementId = useAriaId('toast-announcements');

// Enhanced state management
const componentState = computed(() => ({
	activeCount: toast.visibleToasts.value.length,
	hasFocus: keyboardMode.value,
	focusedToastId: activeToastId.value,
	keyboardMode: keyboardMode.value,
	isPaused: toast.visibleToasts.value.some(t => t.paused),
	isDismissible: toast.visibleToasts.value.some(t => t.closable),
	hasAction: toast.visibleToasts.value.some(t => t.action),
}));

// Convert modern position to container structure
const containers = computed(() => {
	const containerMap = new Map();
	
	// Process all visible toasts and group by position
	toast.visibleToasts.value.forEach(toastItem => {
		const pos = toastItem.position;
		
		// Convert modern position to container structure
		let vertical: 'top' | 'bottom' = 'top';
		let horizontal: 'left' | 'right' = 'right';
		
		if (pos.includes('bottom')) vertical = 'bottom';
		if (pos.includes('left')) horizontal = 'left';
		
		const key = `${vertical}-${horizontal}`;
		
		if (!containerMap.has(key)) {
			containerMap.set(key, {
				vertical,
				horizontal,
				ariaLabel: `${vertical} ${horizontal} notifications`,
				toasts: []
			});
		}
		
		containerMap.get(key).toasts.push(toastItem);
	});
	
	return Array.from(containerMap.values());
});

// Computed properties for accessibility
const hasActiveToasts = computed(() => toast.visibleToasts.value.length > 0);

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
			toast.clear();
			return;
		}
	}
	
	// Handle active toast interactions
	if (activeToastId.value) {
		const activeToast = toast.getToast(activeToastId.value);
		if (activeToast) {
			handleKeydown(event, activeToast);
		}
	}
}

/**
 * Handles keyboard navigation for toasts with enhanced accessibility
 */
function handleKeydown(event: KeyboardEvent, toastItem: Toast) {
	if (!toastItem) return;
	
	switch (event.key) {
		case 'Escape':
			if (toastItem.closable) {
				event.preventDefault();
				toast.dismiss(toastItem.id, 'user');
				// Emit keyboard event for external listeners
				window.dispatchEvent?.(new CustomEvent('toast-keyboard', {
					detail: { event, action: 'dismiss', toastId: toastItem.id }
				}));
			}
			break;
			
		case 'Enter':
		case ' ':
			if (toastItem.action) {
				event.preventDefault();
				executeToastAction(toastItem);
				// Emit action event for external listeners
				window.dispatchEvent?.(new CustomEvent('toast-action', {
					detail: { toastId: toastItem.id, action: toastItem.action }
				}));
			}
			break;
			
		case 'ArrowUp':
		case 'ArrowDown':
			event.preventDefault();
			navigateToasts(event.key === 'ArrowUp' ? -1 : 1);
			// Emit navigation event for external listeners
			window.dispatchEvent?.(new CustomEvent('toast-navigation', {
				detail: { direction: event.key === 'ArrowUp' ? -1 : 1, activeId: activeToastId.value }
			}));
			break;
			
		case 'u':
			// Undo action with 'u' key
			if (event.ctrlKey && toastItem.undoAction && toastItem.undoAvailable) {
				event.preventDefault();
				toast.undo(toastItem.id);
			}
			break;
	}
}

/**
 * Execute toast action
 */
async function executeToastAction(toastItem: Toast) {
	if (!toastItem.action) return;
	
	try {
		await toastItem.action.handler();
		
		// Auto-close if configured
		if (toastItem.action.autoClose !== false) {
			toast.dismiss(toastItem.id, 'user');
		}
	} catch (error) {
		console.error('Toast action failed:', error);
	}
}

/**
 * Navigates between multiple toasts using keyboard
 */
function navigateToasts(direction: number) {
	const visibleToasts = toast.visibleToasts.value;
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
function handleToastHover(toastItem: Toast, isHovered: boolean) {
	if (!toastItem.pauseOnHover) return;
	
	// Use composable pause/resume functionality
	toast.pause(toastItem.id, isHovered);
	
	// Announce pause state for screen readers
	if (toastItem.accessibility.announceContent) {
		const pauseMessage = isHovered 
			? `${toastItem.title || 'Notification'} paused` 
			: `${toastItem.title || 'Notification'} resumed`;
		screenReader.announcePolitely(pauseMessage);
	}
	
	// Emit hover events for external listeners
	if (window.dispatchEvent) {
		const eventType = isHovered ? 'toast-paused' : 'toast-resumed';
		window.dispatchEvent(new CustomEvent(eventType, { 
			detail: { toastId: toastItem.id, isHovered } 
		}));
	}
}

/**
 * Handle swipe to dismiss
 */
function handleSwipeDismiss(toastItem: Toast, direction: SwipeDirection) {
	if (!toastItem.closable) return;
	
	// Announce swipe dismissal
	if (toastItem.accessibility.announceContent) {
		screenReader.announcePolitely(`${toastItem.title || 'Notification'} swiped to dismiss`);
	}
	
	toast.dismiss(toastItem.id, 'user');
}

/**
 * Get animation class based on position
 */
function getAnimationClass(position: ToastPosition): string {
	if (position.includes('right')) return 'slide-right';
	return 'slide-left';
}

/**
 * Check if toast matches container position
 */
function toastMatchesContainer(toastItem: Toast, container: any): boolean {
	const pos = toastItem.position;
	
	// Check vertical match
	const verticalMatch = (container.vertical === 'top' && pos.includes('top')) ||
	                     (container.vertical === 'bottom' && pos.includes('bottom'));
	
	// Check horizontal match
	const horizontalMatch = (container.horizontal === 'left' && pos.includes('left')) ||
	                       (container.horizontal === 'right' && (pos.includes('right') || pos.includes('center')));
	
	return verticalMatch && horizontalMatch;
}

/**
 * Setup swipe gesture for a toast element
 */
function setupSwipeGesture(element: HTMLElement, toastItem: Toast) {
	if (!element || !toastItem.closable) return;
	
	const { enable, disable } = useSwipeGesture(
		ref(element),
		{
			onSwipe: (direction) => {
				// Only dismiss on horizontal swipes
				if (direction === 'left' || direction === 'right') {
					handleSwipeDismiss(toastItem, direction);
				}
			}
		},
		{
			threshold: 100, // 100px swipe threshold
			timeout: 500, // 500ms max swipe time
		}
	);
	
	enable();
	
	return disable;
}

// Watch for toast ref changes and setup swipe gestures
watch(toastRefs, (newRefs) => {
	Object.entries(newRefs).forEach(([id, element]) => {
		const toastItem = toast.getToast(id);
		if (element && toastItem) {
			setupSwipeGesture(element, toastItem);
		}
	});
}, { deep: true });

// Lifecycle hooks
onMounted(() => {
	// Global keyboard handler for toast navigation
	document.addEventListener('keydown', handleGlobalKeydown);
	
	// Set initial active toast
	if (toast.visibleToasts.value.length > 0 && !activeToastId.value) {
		activeToastId.value = toast.visibleToasts.value[0].id;
	}
});

onBeforeUnmount(() => {
	// Clean up global keyboard handler
	document.removeEventListener('keydown', handleGlobalKeydown);
});

// Watch for toast changes to manage active toast
watch(() => toast.visibleToasts.value, (newToasts) => {
	if (newToasts.length === 0) {
		activeToastId.value = null;
	} else if (!activeToastId.value || !newToasts.find(t => t.id === activeToastId.value)) {
		activeToastId.value = newToasts[0].id;
	}
});
</script>

<template>
	<!-- Toast notification regions with proper ARIA structure -->
	<div
		v-for="container in containers"
		:key="container.vertical + container.horizontal"
		class="toast-container"
		:class="[container.vertical, container.horizontal]"
		:aria-label="container.ariaLabel"
		role="region">
		
		<!-- Individual toast notifications -->
		<Transition
			v-for="toastItem in container.toasts"
			:key="toastItem.id"
			:name="getAnimationClass(toastItem.position)"
			appear>
			
			<div
				v-if="toastItem.visible"
				:ref="(el) => { if (el) toastRefs[toastItem.id] = el as HTMLElement }"
				:id="`toast-${toastItem.id}`"
				class="b-toast-wrapper"
				:class="{
					'toast-active': activeToastId === toastItem.id,
					'toast-paused': toastItem.paused,
					'toast-dismissible': toastItem.closable,
					'toast-has-action': toastItem.action,
					'toast-has-undo': toastItem.undoAction && toastItem.undoAvailable,
					...toastItem.class
				}"
				:style="toastItem.style"
				:role="toastItem.accessibility.role"
				:aria-live="toastItem.accessibility.ariaLive"
				:aria-label="toastItem.accessibility.ariaLabel || `${toastItem.type} notification`"
				:aria-describedby="`toast-content-${toastItem.id}`"
				:tabindex="toastItem.closable || toastItem.action ? 0 : -1"
				@keydown="handleKeydown($event, toastItem)"
				@mouseenter="handleToastHover(toastItem, true)"
				@mouseleave="handleToastHover(toastItem, false)"
				@focusin="handleToastHover(toastItem, true)"
				@focusout="handleToastHover(toastItem, false)">
				
				<!-- Progress indicator for timed toasts -->
				<div 
					v-if="toastItem.showProgress && toastItem.progress !== undefined"
					class="toast-progress-bar"
					role="progressbar"
					:aria-valuenow="Math.round(toastItem.progress)"
					aria-valuemin="0"
					aria-valuemax="100"
					:aria-label="`Time remaining: ${Math.round(toastItem.progress)}%`">
					<div 
						class="toast-progress-fill"
						:style="{ width: toastItem.progress + '%' }" />
				</div>
				
				<!-- Enhanced BAlert with accessibility features -->
				<BAlert
					:id="`toast-content-${toastItem.id}`"
					class="b-toast"
					:title="toastItem.title"
					:message="toastItem.message"
					:type="toastItem.type"
					:icon="toastItem.icon"
					icon-position="center"
					:closable="toastItem.closable"
					:aria-label="toastItem.title ? `${toastItem.type} notification: ${toastItem.title}` : `${toastItem.type} notification`"
					@close="toast.dismiss(toastItem.id, 'user')">
					
					<!-- Action buttons with enhanced accessibility -->
					<template 
						#actions
						v-if="toastItem.action || (toastItem.undoAction && toastItem.undoAvailable)">
						
						<!-- Primary action button -->
						<BButton
							v-if="toastItem.action"
							class="whitespace-nowrap toast-action-button"
							size="small"
							:variant="toastItem.action.variant || 'secondary'"
							:color="toastItem.action.color || toastItem.type"
							:aria-label="`${toastItem.action.label} - ${toastItem.title || 'notification'}`"
							@click="executeToastAction(toastItem)"
							@keydown.enter.stop="executeToastAction(toastItem)"
							@keydown.space.stop="executeToastAction(toastItem)">
							{{ toastItem.action.label }}
						</BButton>
						
						<!-- Undo action button -->
						<BButton
							v-if="toastItem.undoAction && toastItem.undoAvailable"
							class="whitespace-nowrap toast-undo-button"
							size="small"
							variant="tertiary"
							:aria-label="`${toastItem.undoAction.label} - ${toastItem.title || 'notification'}`"
							@click="toast.undo(toastItem.id)"
							@keydown.enter.stop="toast.undo(toastItem.id)"
							@keydown.space.stop="toast.undo(toastItem.id)">
							{{ toastItem.undoAction.label }}
						</BButton>
					</template>
				</BAlert>
				
				<!-- Keyboard navigation hint -->
				<div 
					v-if="toastItem.closable && activeToastId === toastItem.id && keyboardMode"
					class="sr-only toast-hint"
					aria-live="polite">
					Press Escape to dismiss, use arrow keys to navigate between notifications
					<span v-if="toastItem.undoAction && toastItem.undoAvailable">, Ctrl+U to undo</span>
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
		{{ toast.visibleToasts.value.length }} notification{{ toast.visibleToasts.value.length !== 1 ? 's' : '' }} available. 
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
	
	.b-toast-wrapper {
		@apply relative;
	}
	
	.toast-progress-bar {
		@apply absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-md overflow-hidden;
	}
	
	.toast-progress-fill {
		@apply h-full transition-all duration-100 ease-linear;
		background-color: currentColor;
		opacity: 0.6;
	}
	
	.toast-active {
		@apply ring-2 ring-blue-500 ring-opacity-50;
	}
	
	.toast-paused .toast-progress-fill {
		@apply transition-none;
	}
	
	.toast-has-undo {
		@apply border-l-4 border-yellow-400;
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
	
	/* Swipe gesture visual feedback */
	.toast-swipe-feedback {
		@apply transition-transform transition-opacity duration-200 ease-out;
	}
	
	/* Enhanced focus styles for accessibility */
	.toast-dismissible:focus-within {
		@apply outline-none ring-2 ring-blue-500 ring-offset-2;
	}
	
	/* Undo button styling */
	.toast-undo-button {
		@apply text-yellow-600 hover:text-yellow-700 border-yellow-300 hover:border-yellow-400;
	}
	
	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.toast-progress-fill {
			@apply opacity-100;
		}
		
		.toast-active {
			@apply ring-4 ring-blue-600;
		}
	}
	
	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.slide-right-enter-active,
		.slide-right-leave-active,
		.slide-left-enter-active,
		.slide-left-leave-active {
			transition: opacity 0.3s ease;
		}
		
		.slide-right-enter-from,
		.slide-right-leave-to,
		.slide-left-enter-from,
		.slide-left-leave-to {
			transform: none;
		}
		
		.toast-progress-fill {
			transition: width 0.1s linear;
		}
	}
</style>