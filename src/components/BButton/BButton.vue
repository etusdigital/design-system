<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch, onUnmounted } from "vue";
import { useAriaAttributes, useScreenReader, useKeyboardNavigation } from "#composables";
import BSpinner from "../BSpinner/BSpinner.vue";
import type { BButtonProps, BButtonEmits } from "./BButton.types";

const props = withDefaults(
	defineProps<BButtonProps>(),
	{
		type: "button",
		color: "primary",
		size: "medium",
		variant: "default",
		disabled: false,
		loading: false,
		progress: 0,
		loadingLabel: "Loading",
		completeLabel: "Complete",
		ariaLabel: "",
		ariaDescribedBy: "",
		ariaLabelledBy: "",
		pressed: false,
		toggle: false,
		expanded: undefined,
		controls: "",
		hasPopup: "false",
		showFocusRing: true,
		autoFocus: false,
		stopPropagation: false,
		icon: "",
		iconPosition: "left",
		announceChanges: true,
		role: "button",
		tabIndex: 0,
		destructive: false,
		confirmationMessage: "Are you sure you want to proceed?",
		respectReducedMotion: true,
		enforceMinimumTouchTarget: true,
		supportHighContrast: true,
		keyboardShortcut: "",
		current: "false",
		owns: "",
		details: "",
		iconOnly: false,
		iconAlt: "",
		iconDecorative: false,
		debounceTime: 300,
		doubleClick: false,
		longPressDuration: 1000,
		preventEnterSubmit: false,
		groupRole: undefined,
		groupLabel: "",
		positionInGroup: undefined,
		groupSize: undefined,
		exclusive: false,
		loadingAnnouncementInterval: 3,
		showProgressPercentage: false
	}
);


const emit = defineEmits<BButtonEmits>();

// Accessibility composables
const { useAriaId, useBusyAria } = useAriaAttributes();
const screenReader = useScreenReader();

// Component state
const buttonRef = ref<HTMLButtonElement>();
const keyboardMode = ref(false);
const previousProgress = ref(0);
const isCompleted = ref(false);
const isConfirmingDestructive = ref(false);
const lastClickTime = ref(0);
const touchStartTime = ref(0);
const longPressTimer = ref<number | null>(null);
const debounceTimer = ref<number | null>(null);
const loadingAnnouncementTimer = ref<number | null>(null);
const reducedMotion = ref(false);
const highContrast = ref(false);
const touchPosition = ref({ x: 0, y: 0 });

// Generate unique IDs
const buttonId = props.id || useAriaId('button');
const loadingAnnouncementId = useAriaId('button-loading');
const progressAnnouncementId = useAriaId('button-progress');
const confirmationId = useAriaId('button-confirmation');
const shortcutId = useAriaId('button-shortcut');

// Computed properties
const isLoading = computed((): boolean => !!(props.progress > 0 || props.loading));
const isInteractive = computed((): boolean => !props.disabled && !isLoading.value && !isConfirmingDestructive.value);

// Touch target size enforcement
const minimumTouchTarget = computed(() => {
	if (!props.enforceMinimumTouchTarget) return {};
	return {
		minWidth: '44px',
		minHeight: '44px'
	};
});

// Animation preferences
const animationStyle = computed(() => {
	if (props.respectReducedMotion && reducedMotion.value) {
		return { transition: 'none', animation: 'none' };
	}
	return {};
});

const computedAriaLabel = computed(() => {
	if (props.ariaLabel) return props.ariaLabel;
	
	// For icon-only buttons, use iconAlt or require ariaLabel
	if (props.iconOnly) {
		return props.iconAlt || 'Button';
	}
	
	let label = '';
	
	// State descriptions
	if (isLoading.value) {
		label = `${props.loadingLabel}. `;
		if (props.showProgressPercentage && props.progress > 0) {
			label += `${Math.round(props.progress * 100)}% complete. `;
		}
	} else if (isCompleted.value) {
		label = `${props.completeLabel}. `;
	}
	
	// Toggle state
	if (props.toggle && props.pressed !== undefined) {
		label += props.pressed ? 'Pressed. ' : 'Not pressed. ';
	}
	
	// Expansion state
	if (props.expanded !== undefined) {
		label += props.expanded ? 'Expanded. ' : 'Collapsed. ';
	}
	
	// Destructive action warning
	if (props.destructive) {
		label += 'Warning: This action cannot be undone. ';
	}
	
	// Keyboard shortcut
	if (props.keyboardShortcut) {
		label += `Keyboard shortcut: ${props.keyboardShortcut}. `;
	}
	
	// Group position
	if (props.positionInGroup && props.groupSize) {
		label += `${props.positionInGroup} of ${props.groupSize}. `;
	}
	
	return label.trim() || undefined;
});

const ariaAttributes = computed(() => {
	const attrs: Record<string, any> = {
		role: props.role
	};
	
	// Basic ARIA attributes
	if (computedAriaLabel.value) attrs['aria-label'] = computedAriaLabel.value;
	if (props.ariaLabelledBy) attrs['aria-labelledby'] = props.ariaLabelledBy;
	
	// Build describedby chain
	const describedByIds = [props.ariaDescribedBy];
	if (isLoading.value) describedByIds.push(loadingAnnouncementId);
	if (props.keyboardShortcut) describedByIds.push(shortcutId);
	if (props.destructive && isConfirmingDestructive.value) describedByIds.push(confirmationId);
	if (props.details) describedByIds.push(props.details);
	
	const describedBy = describedByIds.filter(Boolean).join(' ');
	if (describedBy) attrs['aria-describedby'] = describedBy;
	
	// State attributes
	if (props.pressed !== undefined) attrs['aria-pressed'] = props.pressed;
	if (props.expanded !== undefined) attrs['aria-expanded'] = props.expanded;
	if (props.current !== "false") attrs['aria-current'] = props.current;
	
	// Relationship attributes
	if (props.controls) attrs['aria-controls'] = props.controls;
	if (props.owns) attrs['aria-owns'] = props.owns;
	if (props.hasPopup !== "false") attrs['aria-haspopup'] = props.hasPopup;
	
	// Loading state
	if (isLoading.value) {
		attrs['aria-busy'] = true;
	}
	
	// Group attributes
	if (props.positionInGroup && props.groupSize) {
		attrs['aria-posinset'] = props.positionInGroup;
		attrs['aria-setsize'] = props.groupSize;
	}
	
	// Disabled state (prefer aria-disabled over disabled attribute for better screen reader support)
	if (props.disabled) {
		attrs['aria-disabled'] = true;
	}
	
	return attrs;
});

const buttonClasses = computed(() => [
	"b-button",
	{
		disabled: props.disabled,
		loading: isLoading.value,
		'pointer-events-none': isLoading.value || isConfirmingDestructive.value,
		'keyboard-focus': keyboardMode.value && props.showFocusRing,
		'has-icon': props.icon,
		'icon-only': props.iconOnly || (props.icon && !hasDefaultSlot()),
		'toggle-pressed': props.toggle && props.pressed,
		completed: isCompleted.value,
		destructive: props.destructive,
		'confirming-destructive': isConfirmingDestructive.value,
		'reduced-motion': props.respectReducedMotion && reducedMotion.value,
		'high-contrast': props.supportHighContrast && highContrast.value,
		'minimum-touch-target': props.enforceMinimumTouchTarget,
		'double-click-enabled': props.doubleClick,
		'long-press-enabled': props.longPressDuration > 0
	},
	props.variant,
	props.size,
	props.color,
	`icon-${props.iconPosition}`
]);

const buttonStyle = computed(() => ({
	...minimumTouchTarget.value,
	...animationStyle.value
}));

// Helper function to check if default slot has content
function hasDefaultSlot(): boolean {
	return !!(buttonRef.value?.querySelector('.button-label')?.textContent?.trim());
}

/**
 * Handle destructive action confirmation
 */
function handleDestructiveConfirmation(): Promise<boolean> {
	return new Promise((resolve) => {
		if (!props.destructive) {
			resolve(true);
			return;
		}
		
		isConfirmingDestructive.value = true;
		emit('confirmation-required', props.confirmationMessage);
		
		if (props.announceChanges) {
			screenReader.announceAssertively(`Confirmation required: ${props.confirmationMessage}`);
		}
		
		// Auto-resolve after 5 seconds or wait for explicit confirmation
		const timeout = setTimeout(() => {
			isConfirmingDestructive.value = false;
			emit('confirmation-cancelled');
			resolve(false);
		}, 5000);
		
		// Listen for confirmation
		const handleConfirm = (confirm: boolean) => {
			clearTimeout(timeout);
			isConfirmingDestructive.value = false;
			
			if (confirm) {
				emit('confirmation-accepted');
			} else {
				emit('confirmation-cancelled');
			}
			
			resolve(confirm);
		};
		
		// For demo purposes, auto-confirm after 2 seconds
		// In real implementation, this would be handled by external confirmation dialog
		setTimeout(() => handleConfirm(true), 2000);
	});
}

/**
 * Handle debounced clicks
 */
function debounceClick(callback: () => void): void {
	if (debounceTimer.value) {
		clearTimeout(debounceTimer.value);
	}
	
	debounceTimer.value = window.setTimeout(callback, props.debounceTime);
}

/**
 * Handle click events
 */
async function handleClick(event: MouseEvent): Promise<void> {
	if (!isInteractive.value) {
		event.preventDefault();
		return;
	}
	
	if (props.stopPropagation) {
		event.stopPropagation();
	}
	
	// Handle double-click detection
	if (props.doubleClick) {
		const currentTime = Date.now();
		if (currentTime - lastClickTime.value < 500) {
			emit('double-click', event);
			return;
		}
		lastClickTime.value = currentTime;
	}
	
	// Handle destructive action confirmation
	if (props.destructive) {
		const confirmed = await handleDestructiveConfirmation();
		if (!confirmed) return;
	}
	
	// Debounce if enabled
	if (props.debounceTime > 0) {
		debounceClick(() => executeClick(event));
	} else {
		executeClick(event);
	}
}

/**
 * Execute the actual click logic
 */
function executeClick(event: MouseEvent): void {
	// Handle toggle functionality
	if (props.toggle) {
		const newPressed = !props.pressed;
		emit('toggle', newPressed);
		
		// Announce toggle state change
		if (props.announceChanges) {
			const stateText = newPressed ? 'pressed' : 'not pressed';
			screenReader.announcePolitely(`Button ${stateText}`);
		}
	}
	
	emit('click', event);
}

/**
 * Handle keyboard events
 */
function handleKeyDown(event: KeyboardEvent): void {
	keyboardMode.value = true;
	emit('keydown', event);
	
	if (!isInteractive.value) return;
	
	// Handle keyboard shortcuts
	if (props.keyboardShortcut && event.key === props.keyboardShortcut) {
		event.preventDefault();
		handleClick(event as any);
		return;
	}
	
	switch (event.key) {
		case ' ':
			// Prevent default to avoid double-click on Space
			event.preventDefault();
			if (props.preventEnterSubmit && event.target === buttonRef.value) {
				// Handle space activation manually
				handleClick(event as any);
			}
			break;
			
		case 'Enter':
			// Handle Enter key
			if (props.preventEnterSubmit) {
				event.preventDefault();
				handleClick(event as any);
			}
			break;
			
		case 'Escape':
			if (isConfirmingDestructive.value) {
				// Cancel destructive action confirmation
				event.preventDefault();
				isConfirmingDestructive.value = false;
				emit('confirmation-cancelled');
			} else if (props.expanded !== undefined && props.expanded) {
				// Collapse expanded content
				event.preventDefault();
				buttonRef.value?.blur();
			}
			break;
			
		// Group navigation (if part of a group)
		case 'ArrowRight':
		case 'ArrowLeft':
		case 'ArrowUp':
		case 'ArrowDown':
			if (props.groupRole) {
				// Let parent handle group navigation
				// This is typically handled by a parent component
				break;
			}
			break;
			
		case 'Home':
		case 'End':
			if (props.groupRole) {
				// Navigate to first/last in group
				break;
			}
			break;
	}
}

function handleKeyUp(event: KeyboardEvent): void {
	emit('keyup', event);
}

/**
 * Handle focus events
 */
function handleFocus(event: FocusEvent): void {
	// Keyboard mode is already tracked through handleKeyDown
	emit('focus', event);
}

function handleBlur(event: FocusEvent): void {
	keyboardMode.value = false;
	emit('blur', event);
}

/**
 * Handle touch events for long press and touch targets
 */
function handleTouchStart(event: TouchEvent): void {
	keyboardMode.value = false;
	touchStartTime.value = Date.now();
	
	if (event.touches.length > 0) {
		touchPosition.value = {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY
		};
	}
	
	// Start long press timer if enabled
	if (props.longPressDuration > 0 && isInteractive.value) {
		longPressTimer.value = window.setTimeout(() => {
			emit('long-press', event);
			if (props.announceChanges) {
				screenReader.announcePolitely('Long press detected');
			}
		}, props.longPressDuration);
	}
}

function handleTouchEnd(event: TouchEvent): void {
	// Clear long press timer
	if (longPressTimer.value) {
		clearTimeout(longPressTimer.value);
		longPressTimer.value = null;
	}
	
	// Validate touch hasn't moved too much (for long press)
	if (event.changedTouches.length > 0) {
		const touch = event.changedTouches[0];
		const distance = Math.sqrt(
			Math.pow(touch.clientX - touchPosition.value.x, 2) +
			Math.pow(touch.clientY - touchPosition.value.y, 2)
		);
		
		// If touch moved more than 10px, cancel any actions
		if (distance > 10) {
			event.preventDefault();
		}
	}
}

function handleTouchCancel(): void {
	if (longPressTimer.value) {
		clearTimeout(longPressTimer.value);
		longPressTimer.value = null;
	}
}

/**
 * Handle mouse interactions
 */
function handleMouseDown(): void {
	keyboardMode.value = false;
}

function handleMouseEnter(): void {
	// Announce hover state for screen readers if enabled
	if (props.announceChanges && keyboardMode.value) {
		screenReader.announcePolitely('Button focused');
	}
}

function handleMouseLeave(): void {
	// Clear any pending long press
	if (longPressTimer.value) {
		clearTimeout(longPressTimer.value);
		longPressTimer.value = null;
	}
}

// Watch for progress changes to announce completion
function watchProgress(newProgress: number, oldProgress: number): void {
	if (newProgress === 1 && oldProgress < 1 && !isCompleted.value) {
		isCompleted.value = true;
		
		// Announce completion
		if (props.announceChanges) {
			nextTick(() => {
				screenReader.announcePolitely(props.completeLabel);
				emit('progress-complete');
			});
		}
		
		// Reset completion state after a delay
		setTimeout(() => {
			isCompleted.value = false;
		}, 2000);
	}
	previousProgress.value = newProgress;
}

/**
 * Setup loading announcements
 */
function setupLoadingAnnouncements(): void {
	if (!props.announceChanges || props.loadingAnnouncementInterval <= 0) return;
	
	loadingAnnouncementTimer.value = window.setInterval(() => {
		if (isLoading.value && props.progress > 0 && props.progress < 1) {
			const percentage = Math.round(props.progress * 100);
			screenReader.announcePolitely(`Loading ${percentage}% complete`);
		}
	}, props.loadingAnnouncementInterval * 1000);
}

function clearLoadingAnnouncements(): void {
	if (loadingAnnouncementTimer.value) {
		clearInterval(loadingAnnouncementTimer.value);
		loadingAnnouncementTimer.value = null;
	}
}

/**
 * Detect user preferences
 */
function detectUserPreferences(): void {
	// Detect reduced motion preference
	if (typeof window !== 'undefined' && window.matchMedia) {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion.value = mediaQuery.matches;
		
		// Listen for changes
		mediaQuery.addEventListener('change', (e) => {
			reducedMotion.value = e.matches;
		});
	}
	
	// Detect high contrast mode
	if (typeof window !== 'undefined' && window.matchMedia) {
		const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
		highContrast.value = highContrastQuery.matches;
		
		highContrastQuery.addEventListener('change', (e) => {
			highContrast.value = e.matches;
		});
	}
}

// Lifecycle hooks
onMounted(() => {
	// Auto-focus if enabled
	if (props.autoFocus && buttonRef.value) {
		nextTick(() => {
			buttonRef.value?.focus();
			if (props.announceChanges) {
				screenReader.announcePolitely('Button focused automatically');
			}
		});
	}
	
	// Setup user preference detection
	detectUserPreferences();
	
	// Setup loading announcements
	if (isLoading.value) {
		setupLoadingAnnouncements();
		emit('loading-start');
	}
	
	// Watch progress changes
	if (typeof props.progress === 'number') {
		watchProgress(props.progress, previousProgress.value);
	}
});

// Cleanup on unmount
onUnmounted(() => {
	clearLoadingAnnouncements();
	
	if (debounceTimer.value) {
		clearTimeout(debounceTimer.value);
	}
	
	if (longPressTimer.value) {
		clearTimeout(longPressTimer.value);
	}
});

// Watch for loading state changes
watch(() => isLoading.value, (newLoading, oldLoading) => {
	if (newLoading && !oldLoading) {
		setupLoadingAnnouncements();
		emit('loading-start');
	} else if (!newLoading && oldLoading) {
		clearLoadingAnnouncements();
		emit('loading-end');
	}
});

// Watch progress changes
watch(() => props.progress, (newProgress) => {
	if (typeof newProgress === 'number') {
		watchProgress(newProgress, previousProgress.value);
	}
});

// Watch for destructive state changes
watch(() => props.destructive, (newDestructive) => {
	if (newDestructive && props.announceChanges) {
		screenReader.announcePolitely('Warning: This button performs a destructive action');
	}
});
</script>

<template>
	<button
		:id="buttonId"
		ref="buttonRef"
		:name="name || buttonId"
		:type="type"
		:disabled="props.disabled"
		:tabindex="props.disabled ? -1 : (props.tabIndex || 0)"
		:class="buttonClasses"
		v-bind="ariaAttributes"
		@click="handleClick"
		@keydown="handleKeyDown"
		@keyup="handleKeyUp"
		@focus="handleFocus"
		@blur="handleBlur"
		@mousedown="handleMouseDown"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@touchstart.passive="handleTouchStart"
		@touchend.passive="handleTouchEnd"
		@touchcancel.passive="handleTouchCancel"
		:style="buttonStyle">
		
		<!-- Progress indicator -->
		<div
			v-if="progress > 0"
			class="b-button-progress"
			:style="{ 
				width: progress * 100 + '%',
				borderRadius: progress >= 1 ? 'var(--border-radius-sm)' : 'var(--border-radius-sm) 0 0 var(--border-radius-sm)'
			}"
			role="progressbar"
			:aria-valuenow="Math.round(progress * 100)"
			aria-valuemin="0"
			aria-valuemax="100"
			:aria-label="`Progress: ${Math.round(progress * 100)}%`" />
		
		<!-- Button content container -->
		<div class="b-button-content">
			<!-- Loading spinner -->
			<BSpinner 
				v-if="isLoading" 
				size="small"
				:aria-label="loadingLabel"
				class="b-button-spinner" />
			
			<!-- Icon -->
			<span 
				v-if="icon && iconPosition === 'left'"
				class="b-button-icon icon-left"
				:class="{ invisible: isLoading }"
				:aria-hidden="iconDecorative ? 'true' : undefined"
				:aria-label="!iconDecorative && iconAlt ? iconAlt : undefined">
				{{ icon }}
			</span>
			
			<span 
				v-if="icon && iconPosition === 'top'"
				class="b-button-icon icon-top"
				:class="{ invisible: isLoading }"
				:aria-hidden="iconDecorative ? 'true' : undefined"
				:aria-label="!iconDecorative && iconAlt ? iconAlt : undefined">
				{{ icon }}
			</span>
			
			<!-- Button text content -->
			<span 
				v-if="$slots.default"
				class="b-button-text"
				:class="{ invisible: isLoading }">
				<slot />
			</span>
			
			<!-- Icon (right/bottom position) -->
			<span 
				v-if="icon && iconPosition === 'right'"
				class="b-button-icon icon-right"
				:class="{ invisible: isLoading }"
				:aria-hidden="iconDecorative ? 'true' : undefined"
				:aria-label="!iconDecorative && iconAlt ? iconAlt : undefined">
				{{ icon }}
			</span>
			
			<span 
				v-if="icon && iconPosition === 'bottom'"
				class="b-button-icon icon-bottom"
				:class="{ invisible: isLoading }"
				:aria-hidden="iconDecorative ? 'true' : undefined"
				:aria-label="!iconDecorative && iconAlt ? iconAlt : undefined">
				{{ icon }}
			</span>
		</div>
		
		<!-- Screen reader announcements -->
		<div 
			:id="loadingAnnouncementId"
			aria-live="polite"
			aria-atomic="true"
			class="sr-only">
			<span v-if="isLoading">{{ loadingLabel }}</span>
			<span v-else-if="isCompleted">{{ completeLabel }}</span>
		</div>
		
		<div 
			:id="progressAnnouncementId"
			aria-live="polite"
			class="sr-only">
			<span v-if="progress > 0 && progress < 1">
				Progress: {{ Math.round(progress * 100) }}%
			</span>
		</div>
		
		<!-- Keyboard shortcut announcement -->
		<div 
			v-if="keyboardShortcut"
			:id="shortcutId"
			class="sr-only">
			Keyboard shortcut: {{ keyboardShortcut }}
		</div>
		
		<!-- Destructive action confirmation -->
		<div 
			v-if="destructive"
			:id="confirmationId"
			aria-live="assertive"
			aria-atomic="true"
			class="sr-only">
			<span v-if="isConfirmingDestructive">{{ confirmationMessage }}</span>
		</div>
		
		<!-- Group information -->
		<div 
			v-if="positionInGroup && groupSize"
			class="sr-only">
			Item {{ positionInGroup }} of {{ groupSize }}
			<span v-if="groupLabel">in {{ groupLabel }}</span>
		</div>
	</button>
	
	<!-- Focus management for complex interactions -->
	<div v-if="false" class="sr-only" aria-live="polite">
		<!-- This div can be used for complex focus announcements -->
	</div>
</template>

