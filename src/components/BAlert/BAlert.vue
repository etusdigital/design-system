<script setup lang="ts">
import { 
	computed, 
	onBeforeUnmount, 
	onMounted, 
	onUpdated, 
	ref, 
	nextTick, 
	watch,
	provide 
} from "vue";
import BIcon from "../BIcon/BIcon.vue";
import { useAriaAttributes, useScreenReader } from "#composables";
import type {
	BAlertProps,
	BAlertEvents,
	AlertContext,
	AlertAccessibility,
	AlertAutoDismiss,
	AlertIconConfig,
	AlertHtmlConfig,
	AlertPosition
} from "./BAlert.types";
import {
	ALERT_TYPE_CONFIGS,
	isAlertIconConfig,
	isAlertAutoDismissConfig,
	isAlertHtmlConfig,
	DEFAULT_HTML_SANITIZE_OPTIONS
} from "./BAlert.types";

const props = withDefaults(
	defineProps<BAlertProps>(),
	{
		message: "",
		type: "info",
		size: "medium",
		icon: "",
		expandable: false,
		closable: false,
		showIcon: true,
		hideIcon: false,
		html: false,
		position: "top",
		iconPosition: "start",
	}
);

const emit = defineEmits<BAlertEvents>();

// Component state
const isExpanded = ref(false);
const card = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const closeButton = ref<HTMLButtonElement>();
const expandButton = ref<HTMLButtonElement>();
const isVisible = ref(true);
const isPaused = ref(false);
const autoDismissTimer = ref<NodeJS.Timeout | null>(null);
const remainingTime = ref(0);
const timerInterval = ref<NodeJS.Timeout | null>(null);

const resizeObserver = new ResizeObserver(resize);

// Accessibility and screen reader setup
const { useAriaId, useAlertAria, useExpandableAria, useButtonAria } = useAriaAttributes();
const { announce, announcePolitely, announceAssertively } = useScreenReader();

// Generate unique IDs for ARIA relationships
const alertId = useAriaId('alert');
const titleId = computed(() => props.title ? useAriaId('alert-title') : undefined);
const messageId = useAriaId('alert-message');
const expandButtonId = useAriaId('alert-expand');
const closeButtonId = useAriaId('alert-close');
const liveRegionId = useAriaId('alert-live');

// Compute alert configuration based on type
const alertConfig = computed(() => ALERT_TYPE_CONFIGS[props.type]);
const accessibilityConfig = computed((): AlertAccessibility => ({
	role: alertConfig.value.defaultRole,
	politeness: alertConfig.value.defaultPoliteness,
	atomic: true,
	autoAnnounce: true,
	autoFocus: alertConfig.value.defaultAutoFocus,
	escapeToClose: props.closable,
	...props.accessibility
}));

// Auto-dismiss configuration
const autoDismissConfig = computed((): AlertAutoDismiss | null => {
	if (!props.autoDismiss) return null;
	if (typeof props.autoDismiss === 'number') {
		return {
			duration: props.autoDismiss,
			pauseOnHover: true,
			pauseOnFocus: true,
			announceTimer: false
		};
	}
	return isAlertAutoDismissConfig(props.autoDismiss) ? props.autoDismiss : null;
});

// Icon configuration
const iconConfig = computed((): AlertIconConfig => {
	if (typeof props.icon === 'string') {
		return {
			name: props.icon || alertConfig.value.defaultIcon,
			decorative: true
		};
	}
	if (isAlertIconConfig(props.icon)) {
		return {
			name: (typeof props.icon.name === 'string' ? props.icon.name : alertConfig.value.defaultIcon) || alertConfig.value.defaultIcon,
			decorative: props.icon.decorative ?? true,
			...props.icon
		};
	}
	return {
		name: alertConfig.value.defaultIcon,
		decorative: true
	};
});

// Icon visibility - handle backward compatibility
const shouldShowIcon = computed(() => {
	// Deprecation warning for hideIcon prop
	if (props.hideIcon !== undefined && process.env.NODE_ENV === 'development') {
		console.warn('[BAlert] The "hideIcon" prop is deprecated. Use "showIcon" instead. hideIcon will be removed in a future version.');
	}
	
	// If both props are provided, showIcon takes precedence
	if (props.showIcon !== undefined) {
		return props.showIcon;
	}
	
	// Fall back to hideIcon (inverted)
	if (props.hideIcon !== undefined) {
		return !props.hideIcon;
	}
	
	// Default to true
	return true;
});

// HTML configuration
const htmlConfig = computed((): AlertHtmlConfig | null => {
	if (!props.html) return null;
	
	if (typeof props.html === 'boolean') {
		return {
			enabled: props.html,
			sanitizeOptions: DEFAULT_HTML_SANITIZE_OPTIONS
		};
	}
	
	if (isAlertHtmlConfig(props.html)) {
		return {
			enabled: props.html.enabled,
			sanitizeOptions: {
				...DEFAULT_HTML_SANITIZE_OPTIONS,
				...props.html.sanitizeOptions
			}
		};
	}
	
	return null;
});

// Position classes for CSS styling
const positionClasses = computed(() => {
	const position = props.position || 'top';
	return {
		'alert-position-top': position === 'top',
		'alert-position-bottom': position === 'bottom',
		'alert-position-top-right': position === 'top-right',
		'alert-position-top-left': position === 'top-left',
		'alert-position-bottom-right': position === 'bottom-right',
		'alert-position-bottom-left': position === 'bottom-left',
		'alert-position-center': position === 'center'
	};
});

// ARIA attributes
const typeRef = computed(() => props.type);
const alertAriaAttrs = computed(() => {
	const baseAttrs: Record<string, string | boolean | undefined> = {
		role: accessibilityConfig.value.role,
		'aria-live': accessibilityConfig.value.politeness,
		'aria-atomic': accessibilityConfig.value.atomic,
	};
	
	if (accessibilityConfig.value.labelledBy) {
		baseAttrs['aria-labelledby'] = accessibilityConfig.value.labelledBy;
	} else if (titleId.value) {
		baseAttrs['aria-labelledby'] = titleId.value;
	}
	
	if (accessibilityConfig.value.describedBy) {
		baseAttrs['aria-describedby'] = `${messageId} ${accessibilityConfig.value.describedBy}`.trim();
	} else {
		baseAttrs['aria-describedby'] = messageId;
	}
	
	return baseAttrs;
});

const expandableAriaAttrs = useExpandableAria(isExpanded, messageId);
const expandButtonAriaAttrs = useButtonAria(
	undefined,
	isExpanded,
	messageId,
	titleId.value
);
const closeButtonAriaAttrs = useButtonAria();

// Auto-focus management
const shouldAutoFocus = computed(() => 
	accessibilityConfig.value.autoFocus && 
	(props.type === 'danger' || props.type === 'warning')
);

// Generate announcement text
const announcementText = computed(() => {
	if (accessibilityConfig.value.customAnnouncement) {
		return accessibilityConfig.value.customAnnouncement;
	}
	
	const parts = [];
	const severityText = {
		info: 'Information',
		success: 'Success',
		warning: 'Warning',
		danger: 'Error',
		neutral: 'Notice'
	}[props.type];
	
	parts.push(severityText);
	if (props.title) parts.push(props.title);
	if (props.message) parts.push(props.message);
	
	return parts.join(': ');
});

// Provide context for child components
const alertContext: AlertContext = {
	alertId: alertId,
	type: props.type,
	expandable: props.expandable,
	isExpanded: isExpanded.value,
	close: handleClose,
	toggleExpanded: () => { isExpanded.value = !isExpanded.value; }
};
provide('alertContext', alertContext);

// Auto-dismiss timer management
function startAutoDismissTimer() {
	const config = autoDismissConfig.value;
	if (!config) return;
	
	remainingTime.value = config.duration;
	emit('timerStart', config.duration);
	
	// Timer for countdown announcements
	if (config.announceTimer) {
		timerInterval.value = setInterval(() => {
			remainingTime.value -= 1000;
			if (remainingTime.value <= 5000 && remainingTime.value > 0) {
				const seconds = Math.ceil(remainingTime.value / 1000);
				announcePolitely(`Alert will close in ${seconds} seconds`);
			}
		}, 1000);
	}
	
	// Main auto-dismiss timer
	autoDismissTimer.value = setTimeout(() => {
		if (!isPaused.value) {
			handleClose();
			announcePolitely('Alert automatically dismissed');
		}
	}, config.duration);
}

function pauseTimer() {
	if (autoDismissTimer.value && autoDismissConfig.value) {
		isPaused.value = true;
		clearTimeout(autoDismissTimer.value);
		if (timerInterval.value) {
			clearInterval(timerInterval.value);
		}
		emit('timerPause');
	}
}

function resumeTimer() {
	if (isPaused.value && autoDismissConfig.value) {
		isPaused.value = false;
		startAutoDismissTimer();
		emit('timerResume');
	}
}

function cleanupTimers() {
	if (autoDismissTimer.value) {
		clearTimeout(autoDismissTimer.value);
		autoDismissTimer.value = null;
	}
	if (timerInterval.value) {
		clearInterval(timerInterval.value);
		timerInterval.value = null;
	}
}

// Event handlers
function handleClose() {
	isVisible.value = false;
	cleanupTimers();
	announcePolitely('Alert dismissed');
	emit('close');
}

function handleExpand() {
	isExpanded.value = !isExpanded.value;
}

// Mouse event handlers for auto-dismiss
function handleMouseEnter() {
	if (autoDismissConfig.value?.pauseOnHover) {
		pauseTimer();
	}
}

function handleMouseLeave() {
	if (autoDismissConfig.value?.pauseOnHover) {
		resumeTimer();
	}
}

function handleFocus() {
	if (autoDismissConfig.value?.pauseOnFocus) {
		pauseTimer();
	}
}

function handleBlur() {
	if (autoDismissConfig.value?.pauseOnFocus) {
		resumeTimer();
	}
}

// Keyboard event handlers
function handleKeydown(event: KeyboardEvent) {
	// Handle Escape key for closable alerts
	if (event.key === 'Escape' && props.closable && accessibilityConfig.value.escapeToClose) {
		event.preventDefault();
		handleClose();
	}
}

function handleExpandKeydown(event: KeyboardEvent) {
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		handleExpand();
	}
}

function handleCloseKeydown(event: KeyboardEvent) {
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		handleClose();
	}
}

// Action handler
function handleAction(action: any, index: number) {
	action.onClick?.();
	if (action.dismisses) {
		handleClose();
	}
	emit('action', action, index);
}

// Lifecycle hooks
onMounted(async () => {
	if (card.value) resizeObserver.observe(card.value, { box: "border-box" });
	if (content.value) resizeObserver.observe(content.value, { box: "border-box" });
	
	// Auto-focus for urgent alerts
	if (shouldAutoFocus.value) {
		await nextTick();
		card.value?.focus();
	}
	
	// Screen reader announcement
	if (accessibilityConfig.value.autoAnnounce) {
		const announcer = accessibilityConfig.value.politeness === 'assertive' 
			? announceAssertively 
			: announcePolitely;
			
		setTimeout(() => {
			announcer(announcementText.value);
		}, 200); // Delay to ensure DOM is ready
	}
	
	// Start auto-dismiss timer
	if (autoDismissConfig.value) {
		startAutoDismissTimer();
	}
});

onUpdated(resize);

onBeforeUnmount(() => {
	if (resizeObserver) resizeObserver.disconnect();
	cleanupTimers();
});

// Watch for changes that require re-announcement
watch(() => props.message, (newMessage, oldMessage) => {
	if (newMessage && newMessage !== oldMessage && accessibilityConfig.value.autoAnnounce) {
		announcePolitely(`Alert message updated: ${newMessage}`);
	}
});

watch(isExpanded, (expanded) => {
	const message = expanded ? 'Alert expanded' : 'Alert collapsed';
	announcePolitely(message);
	emit('expand', expanded);
});

function resize() {
	if (!content.value || !card.value) return;

	const cardStyles = getComputedStyle(card.value);
	const paddingTop = parseInt(cardStyles.paddingTop);
	const paddingBottom = parseInt(cardStyles.paddingBottom);
	card.value.style.height = `${
		content.value.scrollHeight + paddingTop + paddingBottom
	}px`;
	content.value.style.width = "fit-content";
	const maxWidth = Math.max(content.value.offsetWidth);

	if (
		card.value &&
		(card.value.style.width || card.value.offsetWidth != maxWidth)
	) {
		content.value.style.width = "100%";
	} else {
		content.value.style.width = `${maxWidth}px`;
	}
}
</script>

<template>
	<div
		v-if="isVisible"
		ref="card"
		:class="[
			type,
			size,
			positionClasses,
			{
				'items-start': expandable,
				'items-center': !expandable || !isExpanded,
			},
		]"
		class="alert transition-[height] duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
		v-bind="alertAriaAttrs"
		:id="alertId"
		:tabindex="shouldAutoFocus ? 0 : -1"
		:data-testid="testId"
		@keydown="handleKeydown"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
		@focusin="handleFocus"
		@focusout="handleBlur"
	>
		<!-- Screen reader live region for dynamic updates -->
		<div
			:id="liveRegionId"
			class="sr-only"
			aria-live="polite"
			aria-atomic="true"
		></div>

		<Transition name="content">
			<div
				ref="content"
				class="flex gap-sm items-center transition-[max-height] duration-300"
			>
				<!-- Alert Icon -->
				<div
					v-if="shouldShowIcon"
					class="type-icon flex-shrink-0"
					:class="[`self-${iconPosition}`]"
				>
					<BIcon 
						:name="typeof iconConfig.name === 'string' ? iconConfig.name : alertConfig.defaultIcon" 
						:aria-hidden="iconConfig.decorative ? 'true' : 'false'"
						:aria-label="iconConfig.ariaLabel || (iconConfig.decorative ? undefined : `${type} alert`)"
						:title="iconConfig.alt"
					/>
				</div>

				<!-- Alert Content -->
				<slot>
					<div class="flex flex-col gap-xxs flex-grow min-w-0">
						<h6
							v-if="title"
							:id="titleId"
							class="title font-semibold"
						>
							{{ title }}
						</h6>
						<div
							:id="messageId"
							class="message"
							v-if="!expandable || isExpanded"
						>
							<!-- HTML content with sanitization -->
							<div v-if="message && htmlConfig?.enabled" v-html="message"></div>
							<!-- Regular text content -->
							<p v-else-if="message">{{ message }}</p>
							<!-- Slot for custom message content -->
							<slot name="message"></slot>
						</div>
					</div>
				</slot>

				<!-- Custom Actions Slot -->
				<div v-if="actions && actions.length > 0" class="flex gap-2">
					<button
						v-for="(action, index) in actions"
						:key="index"
						:class="[
							'px-3 py-1 text-sm rounded transition-colors',
							action.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' :
							action.variant === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' :
							'text-blue-600 hover:bg-blue-50'
						]"
						:aria-label="action.ariaLabel || action.label"
						@click="handleAction(action, index)"
					>
						{{ action.label }}
					</button>
				</div>
			</div>
		</Transition>

		<!-- Actions (Expand/Close) -->
		<slot name="actions">
			<div class="type-icon cursor-pointer rotate-transition group flex items-center gap-2">
				<!-- Expand Button -->
				<button
					v-if="expandable"
					ref="expandButton"
					:id="expandButtonId"
					v-bind="expandButtonAriaAttrs"
					class="flex items-center transition-transform ease-in-out duration-300 p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-1"
					:class="{ 'rotate-180': isExpanded }"
					:aria-label="`${isExpanded ? 'Collapse' : 'Expand'} alert details`"
					:aria-expanded="isExpanded"
					@click="handleExpand"
					@keydown="handleExpandKeydown"
				>
					<BIcon name="expand_more" aria-hidden="true" />
				</button>

				<!-- Close Button -->
				<button
					v-if="closable"
					ref="closeButton"
					:id="closeButtonId"
					v-bind="closeButtonAriaAttrs"
					class="p-1 rounded transition-colors hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-1"
					aria-label="Close alert"
					@click="handleClose"
					@keydown="handleCloseKeydown"
				>
					<BIcon name="close" aria-hidden="true" />
				</button>
			</div>
		</slot>
	</div>
</template>