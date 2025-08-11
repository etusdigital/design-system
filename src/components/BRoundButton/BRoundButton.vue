<script setup lang="ts">
	import { ref, computed, watch, onMounted } from "vue";
	import { blendColors } from "../../utils";
	import { useAriaAttributes } from "../../composables/useAriaAttributes";
	import { useScreenReader } from "../../composables/useScreenReader";
	import BSpinner from "../BSpinner/BSpinner.vue";

	const props = withDefaults(
		defineProps<{
			id?: string;
			name?: string;
			text?: string;
			icon?: string;
			background?: string;
			type?: "button" | "reset" | "submit";
			color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
			size?: "small" | "medium" | "large";
			variant?: "default" | "secondary" | "plain" | "reverse";
			disabled?: boolean;
			alwaysOpen?: boolean;
			// Accessibility props
			ariaLabel?: string;
			ariaDescribedby?: string;
			ariaPressed?: boolean;
			loading?: boolean;
			loadingText?: string;
			toggleButton?: boolean;
		}>(),
		{
			type: "button",
			color: "primary",
			size: "small",
			variant: "default",
			disabled: false,
			alwaysOpen: false,
			loading: false,
			loadingText: "Loading",
			toggleButton: false,
		}
	);

	let isHovering = ref(false);
	let isPressed = ref(false);

	// Accessibility composables
	const { useButtonAria, useBusyAria, useAriaId } = useAriaAttributes();
	const { announcePolitely } = useScreenReader();

	// Generate unique ID if not provided
	const buttonId = computed(() => props.id || useAriaId('round-button'));

	// Manage pressed state for toggle buttons
	const pressedState = computed({
		get: () => props.toggleButton ? (props.ariaPressed ?? isPressed.value) : undefined,
		set: (value: boolean | undefined) => {
			if (props.toggleButton && value !== undefined) {
				isPressed.value = value;
			}
		}
	});
	const style = computed((): Record<string, string> => {
		const style: Record<string, string> = {};

		if (props.disabled) return style;

		if (props.background && props.variant != "plain")
			style["border-color"] = props.background;

		if (props.background && props.variant != "default")
			style.color = props.background;
		else if (props.background) 
			style.background = props.background;

		if (isHovering.value) {
			if (props.background && props.variant == "default") {
				const background = blendColors(props.background, 0.5, [0, 0, 0]);
				style.background = background;
				style["border-color"] = background;
			} else if (props.background && props.variant == "reverse") {
				style.background = props.background;
				style.color = "white";
			} else if (props.background) {
				const background = blendColors(props.background, 0.4);
				style.background = background;
			}

			if (!props.alwaysOpen) style["z-index"] = "50";
		}
		return style;
	});

	const computedIcon = computed((): string => {
		if (props.loading) return "";
		if (props.icon) return props.icon;
		else if (
			props.color == "danger" ||
			props.color == "warning" ||
			props.color == "neutral"
		)
			return "close";
		return "add";
	});

	// Accessibility attributes
	const buttonAria = useButtonAria(
		props.toggleButton ? computed(() => !!pressedState.value) : undefined,
		undefined, // isExpanded
		undefined, // controls
		props.ariaDescribedby
	);

	const busyAria = useBusyAria(computed(() => props.loading), props.loadingText);

	// Computed aria attributes
	const ariaAttributes = computed(() => ({
		...buttonAria.value,
		...busyAria.value,
		'aria-disabled': props.disabled || props.loading,
		'aria-label': computedAriaLabel.value,
		...(props.ariaDescribedby && { 'aria-describedby': props.ariaDescribedby }),
	}));

	// Compute accessible label
	const computedAriaLabel = computed(() => {
		if (props.ariaLabel) return props.ariaLabel;
		if (props.text && props.alwaysOpen) return props.text;
		if (props.text) return props.text;
		
		// Provide meaningful labels based on icon/color
		const iconLabels: Record<string, string> = {
			add: 'Add item',
			close: 'Close',
			delete: 'Delete',
			edit: 'Edit',
			save: 'Save',
			cancel: 'Cancel',
			more: 'More options',
			settings: 'Settings',
			help: 'Help',
			search: 'Search',
		};
		
		if (props.icon && iconLabels[props.icon]) {
			return iconLabels[props.icon];
		}
		
		// Fallback based on color
		const colorLabels: Record<string, string> = {
			primary: 'Primary action',
			info: 'Information',
			success: 'Success action',
			warning: 'Warning action',
			danger: 'Delete or remove',
			neutral: 'Close or cancel',
		};
		
		return colorLabels[props.color] || 'Button';
	});

	// Touch target size validation
	const hasSufficientTouchTarget = computed(() => {
		// Minimum 44px touch target as per WCAG guidelines
		const minSize = 44;
		const sizeMap = {
			small: 36, // Will need padding adjustment
			medium: 48,
			large: 64
		};
		return sizeMap[props.size] >= minSize;
	});

	// Event handlers
	const emits = defineEmits<{
		(e: 'click', event: MouseEvent): void;
		(e: 'change', pressed: boolean): void;
	}>();

	const handleClick = (event: MouseEvent) => {
		if (props.disabled || props.loading) {
			event.preventDefault();
			return;
		}

		// Handle toggle functionality
		if (props.toggleButton) {
			const newPressed = !pressedState.value;
			pressedState.value = newPressed;
			emits('change', newPressed);
			
			// Announce state change
			const action = newPressed ? 'activated' : 'deactivated';
			announcePolitely(`${computedAriaLabel.value} ${action}`);
		}

		emits('click', event);
		
		// Announce button action for non-toggle buttons
		if (!props.toggleButton) {
			announcePolitely(`${computedAriaLabel.value} activated`);
		}
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (props.disabled || props.loading) return;

		// Handle Enter and Space keys
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			// Create a synthetic MouseEvent for consistency
			const syntheticEvent = new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
				view: window
			});
			handleClick(syntheticEvent);
		}
	};

	// Loading state management
	let loadingAnnounced = false;
	onMounted(() => {
		if (props.loading && !loadingAnnounced) {
			announcePolitely(props.loadingText);
			loadingAnnounced = true;
		}
	});

	// Watch for loading changes to announce
	watch(() => props.loading, (newLoading, oldLoading) => {
		if (newLoading && !oldLoading) {
			announcePolitely(props.loadingText);
			loadingAnnounced = true;
		} else if (!newLoading && oldLoading) {
			announcePolitely('Loading complete');
			loadingAnnounced = false;
		}
	});
</script>

<template>
	<button
		:id="buttonId"
		:name="name || buttonId"
		:type="type"
		:disabled="disabled || loading"
		v-bind="ariaAttributes"
		class="b-round-button"
		:class="[
			size,
			color,
			variant,
			{
				disabled: disabled || loading,
				loading: loading,
				'always-open': alwaysOpen,
				hovered: isHovering,
				'toggle-pressed': toggleButton && pressedState,
				'insufficient-touch-target': !hasSufficientTouchTarget,
			},
		]"
		:style="style"
		@click="handleClick"
		@keydown="handleKeydown"
		@mouseover="isHovering = true"
		@mouseout="isHovering = false"
		@focus="isHovering = true"
		@blur="isHovering = false">
		<div class="content">
			<!-- Loading spinner -->
			<BSpinner
				v-if="loading"
				class="loading-spinner"
				size="medium"
				aria-hidden="true" />
			
			<!-- Icon -->
			<BIcon
				v-else-if="computedIcon"
				:name="computedIcon"
				class="icon"
				aria-hidden="true" />
			
			<!-- Text label -->
			<span
				v-if="text && !loading"
				class="text"
				:aria-hidden="!alwaysOpen"
				>{{ text }}</span>
			
			<!-- Loading text for screen readers -->
			<span
				v-if="loading"
				class="sr-only"
				>{{ loadingText }}</span>
		</div>
	</button>
</template>

