<script setup lang="ts">
import { computed } from 'vue';
import { useAriaAttributes, useScreenReader } from '../../composables';

/**
 * Icon semantic types for accessibility
 */
type IconSemanticType = 'decorative' | 'informative' | 'interactive' | 'status';

/**
 * Color variants for theming
 */
type IconColorVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

/**
 * Animation types for enhanced UX
 */
type IconAnimationType = 'none' | 'spin' | 'pulse' | 'bounce' | 'fade';

/**
 * Accessibility properties for icons
 */
interface IconAccessibilityProps {
    /** Alternative text for screen readers */
    alt?: string;
    /** ARIA label override */
    ariaLabel?: string;
    /** Icon semantic purpose */
    semantic?: IconSemanticType;
    /** Whether icon is purely decorative */
    decorative?: boolean;
    /** ARIA role override */
    role?: string;
    /** ARIA describedby reference */
    ariaDescribedBy?: string;
    /** Whether to announce status changes */
    announceChanges?: boolean;
}

/**
 * Enhanced icon properties with comprehensive accessibility
 */
interface BIconProps extends IconAccessibilityProps {
    /** Material icon name */
    name?: string;
    /** Icon size (CSS units) */
    size?: string;
    /** Whether to use filled variant */
    filled?: boolean;
    /** Color theme variant */
    color?: IconColorVariant;
    /** Animation type */
    animation?: IconAnimationType;
    /** Whether icon is clickable/interactive */
    clickable?: boolean;
    /** Loading state for status icons */
    loading?: boolean;
    /** Custom CSS class */
    customClass?: string;
    /** Icon rotation in degrees */
    rotation?: number;
}

const props = withDefaults(defineProps<BIconProps>(), {
    filled: false,
    size: '24px',
    semantic: 'decorative',
    decorative: false,
    color: 'default',
    animation: 'none',
    clickable: false,
    loading: false,
    rotation: 0,
    announceChanges: false
});

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
    (e: 'keydown', event: KeyboardEvent): void;
}>();

// Accessibility composables
const { useAriaId } = useAriaAttributes();
const screenReader = useScreenReader();

// Generate unique ID for ARIA relationships
const iconId = useAriaId('icon');

// Computed accessibility properties
const computedRole = computed(() => {
    if (props.role) return props.role;
    
    switch (props.semantic) {
        case 'interactive':
            return props.clickable ? 'button' : 'img';
        case 'status':
            return 'status';
        case 'informative':
            return 'img';
        case 'decorative':
        default:
            return undefined;
    }
});

const computedAriaLabel = computed(() => {
    if (props.decorative) return undefined;
    if (props.ariaLabel) return props.ariaLabel;
    if (props.alt) return props.alt;
    if (props.semantic === 'informative' || props.semantic === 'interactive') {
        return props.name ? `${props.name} icon` : 'Icon';
    }
    return undefined;
});

const computedAriaHidden = computed(() => {
    return props.decorative || props.semantic === 'decorative' ? 'true' : undefined;
});

const computedTabIndex = computed(() => {
    if (props.clickable && props.semantic === 'interactive') {
        return 0;
    }
    return -1;
});

const iconClasses = computed(() => {
    const classes = [
        'material-symbols-rounded',
        'b-icon',
        `b-icon--${props.color}`,
        `b-icon--${props.semantic}`
    ];
    
    if (props.filled) classes.push('filled');
    if (props.clickable) classes.push('b-icon--clickable');
    if (props.loading) classes.push('b-icon--loading');
    if (props.animation !== 'none') classes.push(`b-icon--${props.animation}`);
    if (props.customClass) classes.push(props.customClass);
    
    return classes.join(' ');
});

const iconStyles = computed(() => {
    const styles: Record<string, string> = {
        fontSize: props.size
    };
    
    if (props.rotation !== 0) {
        styles.transform = `rotate(${props.rotation}deg)`;
    }
    
    return styles;
});

// Event handlers
function handleClick(event: MouseEvent) {
    if (!props.clickable) return;
    
    emit('click', event);
    
    // Announce interaction for screen readers
    if (props.announceChanges && computedAriaLabel.value) {
        screenReader.announcePolitely(`${computedAriaLabel.value} activated`);
    }
}

function handleKeydown(event: KeyboardEvent) {
    if (!props.clickable) return;
    
    // Handle Enter and Space for interactive icons
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick(event as unknown as MouseEvent);
    }
    
    emit('keydown', event);
}

// Status change announcements
function announceStatusChange(message: string) {
    if (props.announceChanges && props.semantic === 'status') {
        screenReader.announcePolitely(message);
    }
}
</script>

<template>
    <span
        :id="iconId"
        :class="iconClasses"
        :style="iconStyles"
        :role="computedRole"
        :aria-label="computedAriaLabel"
        :aria-hidden="computedAriaHidden"
        :aria-describedby="props.ariaDescribedBy"
        :tabindex="computedTabIndex"
        :data-semantic="props.semantic"
        @click="handleClick"
        @keydown="handleKeydown">
        
        <!-- Loading spinner overlay for status icons -->
        <span 
            v-if="props.loading && props.semantic === 'status'"
            class="b-icon__spinner"
            aria-hidden="true">
            <!-- Loading indicator -->
        </span>
        
        <!-- Main icon content -->
        <span 
            class="b-icon__content"
            :aria-hidden="props.loading ? 'true' : undefined">
            {{ props.name }}
        </span>
        
        <!-- Screen reader only status text -->
        <span 
            v-if="props.loading && props.semantic === 'status'"
            class="sr-only"
            aria-live="polite">
            Loading
        </span>
    </span>
</template>

<style scoped>
/* Base icon styles */
.b-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
    transition: all 0.2s ease;
}

.b-icon.filled {
    font-variation-settings:
        'FILL' 1,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24;
}

/* Interactive states */
.b-icon--clickable {
    cursor: pointer;
    border-radius: var(--border-radius-xs);
    transition: all 0.15s ease;
}

.b-icon--clickable:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transform: scale(1.05);
}

.b-icon--clickable:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-interaction-default), 0 0 0 4px rgba(50, 151, 113, 0.1);
}

.b-icon--clickable:active {
    transform: scale(0.95);
}

/* Color variants */
.b-icon--default {
    color: var(--color-gray-text, #6b7280);
}

.b-icon--primary {
    color: var(--color-primary-interaction-default);
}

.b-icon--secondary {
    color: var(--color-gray-secondary, #9ca3af);
}

.b-icon--success {
    color: var(--color-success, #059669);
}

.b-icon--warning {
    color: var(--color-warning, #d97706);
}

.b-icon--danger {
    color: var(--color-danger, #dc2626);
}

.b-icon--info {
    color: var(--color-info, #2563eb);
}

/* Semantic type styles */
.b-icon--decorative {
    /* Purely visual, no additional styling */
}

.b-icon--informative {
    /* Meaningful icons that convey information */
    cursor: help;
}

.b-icon--interactive {
    /* Interactive icons */
    padding: var(--space-xs, 0.25rem);
}

.b-icon--status {
    /* Status indication icons */
    position: relative;
}

/* Animation types */
.b-icon--spin {
    animation: icon-spin 1s linear infinite;
}

.b-icon--pulse {
    animation: icon-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.b-icon--bounce {
    animation: icon-bounce 1s infinite;
}

.b-icon--fade {
    animation: icon-fade 2s ease-in-out infinite;
}

/* Loading state */
.b-icon--loading {
    opacity: 0.6;
}

.b-icon__spinner {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: icon-spin 1s linear infinite;
}

.b-icon__spinner::before {
    content: "⟳";
    font-size: 0.875em;
}

.b-icon__content {
    transition: opacity 0.2s ease;
}

/* Accessibility enhancements */
.b-icon:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-interaction-default), 0 0 0 4px rgba(50, 151, 113, 0.1);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .b-icon {
        font-weight: 600;
    }
    
    .b-icon--clickable:hover {
        background-color: black;
        color: white;
    }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .b-icon,
    .b-icon--clickable,
    .b-icon__content,
    .b-icon__spinner {
        transition: none !important;
        animation: none !important;
    }
    
    .b-icon--clickable:hover {
        transform: none;
    }
    
    .b-icon--clickable:active {
        transform: none;
    }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
    .b-icon--default {
        color: var(--color-gray-text-dark, #9ca3af);
    }
    
    .b-icon--clickable:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
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

/* Keyframe animations */
@keyframes icon-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

@keyframes icon-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

@keyframes icon-bounce {
    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
    40%, 43% { transform: translateY(-8px); }
    70% { transform: translateY(-4px); }
    90% { transform: translateY(-2px); }
}

@keyframes icon-fade {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

/* Responsive sizing */
@media screen and (max-width: 48rem) {
    .b-icon--clickable {
        /* Larger touch targets on mobile */
        min-width: 44px;
        min-height: 44px;
    }
}
</style>
