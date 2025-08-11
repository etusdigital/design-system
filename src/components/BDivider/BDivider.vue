<script setup lang="ts">
import { computed, ref, useSlots, onMounted } from 'vue';
import { useAriaAttributes } from '../../composables/useAriaAttributes';
import type { BDividerProps, BDividerAriaAttributes, BDividerAccessibilityConfig, BDividerPositioning } from './BDivider.types';

const props = withDefaults(
	defineProps<BDividerProps>(),
	{
		position: 'right',
		orientation: 'horizontal',
		role: 'decorative',
		variant: 'default',
		size: 'medium',
		highContrastMode: true,
		respectReducedMotion: true,
	}
);

const emit = defineEmits<{
	visible: [];
	focusChange: [focused: boolean];
}>();

const slots = useSlots();
const { useAriaId } = useAriaAttributes();

// Generate unique ID for ARIA labeling if needed
const dividerId = useAriaId('bdivider');
const hasSlotContent = computed(() => !!slots.default);

// Accessibility configuration
const accessibilityConfig = computed<BDividerAccessibilityConfig>(() => {
	const isSemantic = props.role === 'semantic';
	const isAnnounced = isSemantic && !props.ariaHidden;
	
	return {
		isSemantic,
		isAnnounced,
		computedRole: isSemantic ? 'separator' : 'presentation',
		hasHighContrastEnhancements: props.highContrastMode,
		hasTextAccessibility: props.hasTextContent ?? hasSlotContent.value,
	};
});

// Positioning configuration
const positioning = computed<BDividerPositioning>(() => ({
	showLeft: props.position !== 'right',
	showRight: props.position !== 'left',
	hasBothSides: props.position === 'both',
}));

// ARIA attributes for the main container
const containerAriaAttributes = computed<BDividerAriaAttributes>(() => {
	const config = accessibilityConfig.value;
	const baseAttributes: BDividerAriaAttributes = {};

	if (config.isSemantic) {
		baseAttributes.role = 'separator';
		baseAttributes['aria-orientation'] = props.orientation;
		
		if (props.ariaLabel) {
			baseAttributes['aria-label'] = props.ariaLabel;
		} else if (hasSlotContent.value) {
			// Use slot content as implicit label for semantic dividers
			baseAttributes['aria-labelledby'] = `${dividerId}-content`;
		}
	} else {
		baseAttributes.role = 'presentation';
		baseAttributes['aria-hidden'] = true;
	}

	// Override with explicit ariaHidden if provided
	if (props.ariaHidden !== undefined) {
		if (props.ariaHidden) {
			baseAttributes['aria-hidden'] = true;
			delete baseAttributes['aria-label'];
			delete baseAttributes['aria-labelledby'];
		} else {
			delete baseAttributes['aria-hidden'];
		}
	}

	// Merge with custom ARIA attributes
	return { ...baseAttributes, ...props.ariaAttributes };
});

// Divider line ARIA attributes (always decorative)
const dividerLineAriaAttributes = computed(() => ({
	'aria-hidden': true,
	role: 'presentation',
}));

// Container CSS classes
const containerClasses = computed(() => [
	'bdivider',
	'flex items-center gap-xs w-full',
	'text-neutral-foreground-high font-bold',
	// Size variants
	{
		'text-xs': props.size === 'small',
		'text-sm': props.size === 'medium',
		'text-base': props.size === 'large',
	},
	// High contrast support
	{
		'contrast-more:text-neutral-foreground-highest': props.highContrastMode,
	},
	// Reduced motion support
	{
		'motion-reduce:transition-none': props.respectReducedMotion,
	},
]);

// Divider line CSS classes
const dividerLineClasses = computed(() => [
	'divider',
	// Variant styles
	{
		'border-neutral-border-default': props.variant === 'default',
		'border-neutral-border-high': props.variant === 'strong',
		'border-neutral-border-low': props.variant === 'subtle',
	},
	// Size variants
	{
		'border-t-xxs': props.size === 'small',
		'border-t-xs': props.size === 'medium',
		'border-t-sm': props.size === 'large',
	},
	// High contrast support
	{
		'contrast-more:border-neutral-border-highest': props.highContrastMode,
	},
]);

// Text content classes for accessibility
const textContentClasses = computed(() => [
	// Ensure proper spacing and readability
	'px-xs',
	// High contrast text support
	{
		'contrast-more:font-extrabold': props.highContrastMode && accessibilityConfig.value.hasTextAccessibility,
	},
]);

// Component reference for focus management
const dividerRef = ref<HTMLElement>();

// Focus management for semantic dividers
const focus = () => {
	if (accessibilityConfig.value.isSemantic && dividerRef.value) {
		dividerRef.value.focus();
	}
};

// Lifecycle hooks
onMounted(() => {
	emit('visible');
});

// Focus event handlers
const handleFocus = () => {
	emit('focusChange', true);
};

const handleBlur = () => {
	emit('focusChange', false);
};

// Expose public methods
const getAccessibilityConfig = () => accessibilityConfig.value;

// Expose for template ref and external access
defineExpose({
	focus,
	getAccessibilityConfig,
});
</script>

<template>
	<div
		ref="dividerRef"
		:class="containerClasses"
		v-bind="containerAriaAttributes"
		:tabindex="accessibilityConfig.isSemantic ? 0 : undefined"
		@focus="handleFocus"
		@blur="handleBlur"
	>
		<!-- Left divider line -->
		<div
			v-if="positioning.showLeft"
			:class="dividerLineClasses"
			v-bind="dividerLineAriaAttributes"
		/>
		
		<!-- Content slot with accessibility enhancements -->
		<div
			v-if="hasSlotContent"
			:class="textContentClasses"
			:id="accessibilityConfig.hasTextAccessibility ? `${dividerId}-content` : undefined"
		>
			<slot />
		</div>
		
		<!-- Right divider line -->
		<div
			v-if="positioning.showRight"
			:class="dividerLineClasses"
			v-bind="dividerLineAriaAttributes"
		/>
	</div>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	.divider {
		@apply border-t-xxs flex-1 border-neutral-border-default;
	}
	
	/* Accessibility enhancements */
	.bdivider {
		/* Ensure proper focus indication for semantic dividers */
		&:focus-visible {
			@apply outline-2 outline-offset-2 outline-primary-interaction-default;
		}
		
		/* High contrast mode enhancements */
		@media (prefers-contrast: more) {
			&:focus-visible {
				@apply outline-4 outline-neutral-foreground-highest;
			}
		}
		
		/* Reduced motion support */
		@media (prefers-reduced-motion: reduce) {
			* {
				@apply transition-none;
			}
		}
	}
	
	/* Divider line accessibility enhancements */
	.divider {
		/* Ensure minimum contrast ratio compliance */
		@media (prefers-contrast: more) {
			@apply border-t-sm border-neutral-foreground-high;
		}
		
		/* Print styles for better visibility */
		@media print {
			@apply border-black border-t-xs;
		}
	}
	
	/* Text content accessibility */
	.bdivider [id$="-content"] {
		/* Ensure text remains readable in all contexts */
		min-height: 1.25rem; /* Maintain minimum touch target */
		
		@media (prefers-contrast: more) {
			@apply font-bold;
		}
	}
</style>
