<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useAriaAttributes, useScreenReader } from "#composables";

/**
 * Avatar semantic roles for accessibility
 */
type AvatarSemanticRole = 'img' | 'button' | 'presentation';

/**
 * Avatar status indicators for user presence
 */
type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none';

/**
 * Avatar size variants with accessibility considerations
 */
type AvatarSize = 'small' | 'medium' | 'large' | 'xl';

/**
 * Accessibility properties for avatars
 */
interface AvatarAccessibilityProps {
	/** Alternative text for the avatar image */
	alt?: string;
	/** ARIA label override */
	ariaLabel?: string;
	/** Whether avatar is interactive (clickable) */
	interactive?: boolean;
	/** Semantic role of the avatar */
	role?: AvatarSemanticRole;
	/** ARIA described-by reference */
	ariaDescribedBy?: string;
	/** Whether to announce status changes */
	announceStatusChanges?: boolean;
}

/**
 * Enhanced avatar properties with comprehensive accessibility
 */
interface BAvatarProps extends AvatarAccessibilityProps {
	/** User's full name for initials generation */
	name?: string;
	/** Avatar image source URL */
	src?: string;
	/** Avatar size variant */
	size?: AvatarSize;
	/** User's status indicator */
	status?: AvatarStatus;
	/** Loading state for async image loading */
	loading?: boolean;
	/** Custom initials override */
	initials?: string;
	/** Avatar shape variant */
	shape?: 'circle' | 'square' | 'rounded';
	/** Border styling */
	border?: boolean;
	/** High contrast mode enhancement */
	highContrast?: boolean;
}

const props = withDefaults(defineProps<BAvatarProps>(), {
	size: 'medium',
	status: 'none',
	shape: 'circle',
	role: 'img',
	interactive: false,
	loading: false,
	border: false,
	highContrast: false,
	announceStatusChanges: false
});

const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void;
	(e: 'keydown', event: KeyboardEvent): void;
	(e: 'image-load'): void;
	(e: 'image-error'): void;
	(e: 'status-change', status: AvatarStatus): void;
}>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Component state
const avatarRef = ref<HTMLElement>();
const imageRef = ref<HTMLImageElement>();
const imageLoaded = ref(false);
const imageError = ref(false);
const isFocused = ref(false);

// Generate unique IDs for ARIA relationships
const avatarId = useAriaId('avatar');
const statusId = useAriaId('avatar-status');

// Computed properties for accessibility
const computedRole = computed(() => {
	if (props.interactive) return 'button';
	if (props.src && !imageError.value) return 'img';
	return props.role;
});

const computedAriaLabel = computed(() => {
	if (props.ariaLabel) return props.ariaLabel;
	
	const parts = [];
	if (props.name) {
		parts.push(props.interactive ? `${props.name} profile` : props.name);
	} else if (props.initials) {
		parts.push(props.interactive ? `${props.initials} profile` : `User ${props.initials}`);
	} else {
		parts.push(props.interactive ? 'User profile' : 'Avatar');
	}
	
	if (props.status !== 'none') {
		parts.push(`status: ${props.status}`);
	}
	
	return parts.join(', ');
});

const computedAlt = computed(() => {
	if (props.alt) return props.alt;
	if (props.name) return `Avatar of ${props.name}`;
	if (props.initials) return `Avatar with initials ${props.initials}`;
	return 'User avatar';
});

const computedTabIndex = computed(() => {
	return props.interactive ? 0 : -1;
});

// Initialize fallback text
const parsedName = computed(() => {
	if (props.initials) return props.initials.toUpperCase();
	if (!props.name) return 'U';

	const parts = props.name.trim().split(' ');
	if (parts.length > 1) {
		return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
	}
	return props.name.slice(0, 2).toUpperCase();
});

// Avatar styling classes
const avatarClasses = computed(() => {
	const classes = [
		'b-avatar',
		`b-avatar--${props.size}`,
		`b-avatar--${props.shape}`
	];
	
	if (props.interactive) classes.push('b-avatar--interactive');
	if (props.border) classes.push('b-avatar--bordered');
	if (props.highContrast) classes.push('b-avatar--high-contrast');
	if (props.loading) classes.push('b-avatar--loading');
	if (isFocused.value) classes.push('b-avatar--focused');
	if (props.status !== 'none') classes.push('b-avatar--with-status');
	
	return classes.join(' ');
});

// Status indicator classes
const statusClasses = computed(() => {
	if (props.status === 'none') return '';
	return `b-avatar__status b-avatar__status--${props.status}`;
});

// Lifecycle hooks
onMounted(() => {
	if (props.src && imageRef.value) {
		setupImageHandlers();
	}
});

onUnmounted(() => {
	cleanupImageHandlers();
});

// Image loading handlers
function setupImageHandlers() {
	if (!imageRef.value) return;
	
	imageRef.value.addEventListener('load', handleImageLoad);
	imageRef.value.addEventListener('error', handleImageError);
}

function cleanupImageHandlers() {
	if (!imageRef.value) return;
	
	imageRef.value.removeEventListener('load', handleImageLoad);
	imageRef.value.removeEventListener('error', handleImageError);
}

function handleImageLoad() {
	imageLoaded.value = true;
	imageError.value = false;
	emit('image-load');
	
	// Announce successful image load for screen readers
	if (props.announceStatusChanges) {
		screenReader.announcePolitely(`Avatar image loaded for ${props.name || 'user'}`);
	}
}

function handleImageError() {
	imageLoaded.value = false;
	imageError.value = true;
	emit('image-error');
	
	// Announce fallback to initials for screen readers
	if (props.announceStatusChanges) {
		screenReader.announcePolitely(`Avatar image failed to load, showing initials ${parsedName.value}`);
	}
}

// Event handlers
function handleClick(event: MouseEvent) {
	if (!props.interactive) return;
	
	emit('click', event);
	
	// Announce interaction for screen readers
	if (props.announceStatusChanges) {
		screenReader.announcePolitely(`${props.name || 'User'} avatar activated`);
	}
}

function handleKeydown(event: KeyboardEvent) {
	if (!props.interactive) return;
	
	// Handle Enter and Space for interactive avatars
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		handleClick(event as unknown as MouseEvent);
	}
	
	emit('keydown', event);
}

function handleFocus() {
	isFocused.value = true;
}

function handleBlur() {
	isFocused.value = false;
}

// Status change announcements
function announceStatusChange(newStatus: AvatarStatus, oldStatus: AvatarStatus) {
	if (!props.announceStatusChanges || newStatus === oldStatus) return;
	
	const statusMessages = {
		online: 'is now online',
		offline: 'is now offline',
		away: 'is now away',
		busy: 'is now busy',
		none: 'status cleared'
	};
	
	const message = `${props.name || 'User'} ${statusMessages[newStatus]}`;
	screenReader.announcePolitely(message);
}
</script>

<template>
	<div
		:id="avatarId"
		ref="avatarRef"
		:class="avatarClasses"
		:role="computedRole"
		:aria-label="computedAriaLabel"
		:aria-describedby="ariaDescribedBy"
		:tabindex="computedTabIndex"
		@click="handleClick"
		@keydown="handleKeydown"
		@focus="handleFocus"
		@blur="handleBlur">
		
		<!-- Avatar image with proper accessibility -->
		<img
			v-if="src"
			ref="imageRef"
			:src="src"
			:alt="computedAlt"
			class="b-avatar__image"
			:class="{ 'b-avatar__image--loaded': imageLoaded, 'b-avatar__image--error': imageError }"
			aria-hidden="false"
			@load="handleImageLoad"
			@error="handleImageError" />
		
		<!-- Loading spinner overlay -->
		<div 
			v-if="loading"
			class="b-avatar__loading"
			aria-hidden="true">
			<div class="b-avatar__spinner"></div>
		</div>
		
		<!-- Fallback initials -->
		<span 
			class="b-avatar__initials"
			:class="{ 'b-avatar__initials--hidden': src && imageLoaded && !imageError }"
			:aria-hidden="(src && imageLoaded && !imageError) ? 'true' : 'false'">
			{{ parsedName }}
		</span>
		
		<!-- Status indicator with accessibility -->
		<div 
			v-if="status !== 'none'"
			:id="statusId"
			:class="statusClasses"
			role="status"
			:aria-label="`Status: ${status}`">
			<span class="sr-only">{{ status }}</span>
		</div>
		
		<!-- Interactive feedback for screen readers -->
		<div 
			v-if="interactive"
			class="sr-only"
			aria-live="polite">
			Press Enter or Space to interact
		</div>
		
		<!-- High contrast border for accessibility -->
		<div 
			v-if="highContrast"
			class="b-avatar__high-contrast-border"
			aria-hidden="true">
		</div>
	</div>
</template>

<style scoped>
/* Base avatar styles */
.b-avatar {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background-color: var(--color-primary-surface-default);
	color: var(--color-primary-interaction-default);
	font-weight: 600;
	overflow: hidden;
	transition: all 0.2s ease;
	user-select: none;
}

/* Shape variants */
.b-avatar--circle {
	border-radius: 50%;
}

.b-avatar--square {
	border-radius: 0;
}

.b-avatar--rounded {
	border-radius: var(--border-radius-base, 0.375rem);
}

/* Size variants */
.b-avatar--small {
	width: 2rem;
	height: 2rem;
	font-size: var(--font-size-xxs, 0.625rem);
}

.b-avatar--medium {
	width: 2.5rem;
	height: 2.5rem;
	font-size: var(--font-size-xs, 0.75rem);
}

.b-avatar--large {
	width: 3rem;
	height: 3rem;
	font-size: var(--font-size-sm, 0.875rem);
}

.b-avatar--xl {
	width: 4rem;
	height: 4rem;
	font-size: var(--font-size-base, 1rem);
}

/* Interactive states */
.b-avatar--interactive {
	cursor: pointer;
	transition: all 0.15s ease;
}

.b-avatar--interactive:hover {
	transform: scale(1.05);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.b-avatar--interactive:focus {
	outline: none;
	box-shadow: 0 0 0 2px var(--color-primary-interaction-default), 0 0 0 4px rgba(50, 151, 113, 0.1);
}

.b-avatar--interactive:active {
	transform: scale(0.95);
}

.b-avatar--focused {
	box-shadow: 0 0 0 2px var(--color-primary-interaction-default), 0 0 0 4px rgba(50, 151, 113, 0.1);
}

/* Border styling */
.b-avatar--bordered {
	border: 2px solid var(--color-primary-border-default);
}

/* High contrast mode */
.b-avatar--high-contrast {
	border: 2px solid currentColor;
}

.b-avatar--high-contrast .b-avatar__high-contrast-border {
	position: absolute;
	inset: -2px;
	border: 2px solid white;
	border-radius: inherit;
	pointer-events: none;
}

/* Loading state */
.b-avatar--loading {
	opacity: 0.7;
}

.b-avatar__loading {
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(255, 255, 255, 0.8);
	z-index: 10;
}

.b-avatar__spinner {
	width: 1rem;
	height: 1rem;
	border: 2px solid var(--color-primary-surface-default);
	border-top: 2px solid var(--color-primary-interaction-default);
	border-radius: 50%;
	animation: avatar-spin 1s linear infinite;
}

/* Avatar image */
.b-avatar__image {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: 1;
	opacity: 0;
	transition: opacity 0.2s ease;
}

.b-avatar__image--loaded {
	opacity: 1;
}

.b-avatar__image--error {
	display: none;
}

/* Initials fallback */
.b-avatar__initials {
	position: relative;
	z-index: 2;
	font-weight: 600;
	text-transform: uppercase;
	transition: opacity 0.2s ease;
}

.b-avatar__initials--hidden {
	opacity: 0;
}

/* Status indicators */
.b-avatar--with-status {
	position: relative;
}

.b-avatar__status {
	position: absolute;
	bottom: -2px;
	right: -2px;
	width: 0.75rem;
	height: 0.75rem;
	border: 2px solid white;
	border-radius: 50%;
	z-index: 5;
}

.b-avatar--small .b-avatar__status {
	width: 0.5rem;
	height: 0.5rem;
	bottom: -1px;
	right: -1px;
	border-width: 1px;
}

.b-avatar--large .b-avatar__status,
.b-avatar--xl .b-avatar__status {
	width: 1rem;
	height: 1rem;
	bottom: -3px;
	right: -3px;
	border-width: 3px;
}

/* Status color variants */
.b-avatar__status--online {
	background-color: var(--color-success, #059669);
}

.b-avatar__status--offline {
	background-color: var(--color-gray-400, #9ca3af);
}

.b-avatar__status--away {
	background-color: var(--color-warning, #d97706);
}

.b-avatar__status--busy {
	background-color: var(--color-danger, #dc2626);
}

/* Accessibility enhancements */
.b-avatar:focus-visible {
	outline: none;
	box-shadow: 0 0 0 2px var(--color-primary-interaction-default), 0 0 0 4px rgba(50, 151, 113, 0.1);
}

/* Screen reader only content */
.sr-only {
	position: absolute !important;
	width: 1px !important;
	height: 1px !important;
	padding: 0 !important;
	margin: -1px !important;
	overflow: hidden !important;
	clip: rect(0, 0, 0, 0) !important;
	white-space: nowrap !important;
	border: 0 !important;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.b-avatar {
		border: 2px solid currentColor;
	}
	
	.b-avatar--interactive:hover {
		background-color: var(--color-primary-interaction-hover);
		color: white;
	}
	
	.b-avatar__status {
		border-width: 3px;
		border-color: black;
	}
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.b-avatar,
	.b-avatar--interactive,
	.b-avatar__image,
	.b-avatar__initials {
		transition: none !important;
		animation: none !important;
	}
	
	.b-avatar--interactive:hover {
		transform: none;
	}
	
	.b-avatar--interactive:active {
		transform: none;
	}
	
	.b-avatar__spinner {
		animation: none;
		border: 2px solid var(--color-primary-interaction-default);
		border-radius: 50%;
	}
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
	.b-avatar {
		background-color: var(--color-primary-surface-dark, #1f2937);
		color: var(--color-primary-interaction-light, #86cfae);
	}
	
	.b-avatar__loading {
		background-color: rgba(0, 0, 0, 0.8);
	}
	
	.b-avatar__status {
		border-color: var(--color-background-dark, #111827);
	}
}

/* Print styles */
@media print {
	.b-avatar--interactive {
		cursor: default;
	}
	
	.b-avatar__status {
		display: none;
	}
}

/* Keyframe animations */
@keyframes avatar-spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

/* Responsive design */
@media screen and (max-width: 48rem) {
	.b-avatar--interactive {
		/* Larger touch targets on mobile */
		min-width: 44px;
		min-height: 44px;
	}
}
</style>
