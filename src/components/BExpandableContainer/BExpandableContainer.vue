<script setup lang="ts">
	import { ref, computed } from "vue";
	import type { BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";
	import type { 
		BExpandableContainerProps, 
		BExpandableContainerEmits 
	} from "./BExpandableContainer.types";
	import BContainer from "../../utils/components/Container.vue";
	import BSpinner from "../BSpinner/BSpinner.vue";
	import { useOptionalModel, useExpandableContainer } from "#composables";

	const props = withDefaults(
		defineProps<BExpandableContainerProps>(),
		{
			modelValue: undefined,
			labelValue: "",
			absolute: false,
			disabled: false,
			errorMessage: "",
			infoMessage: "",
			isError: false,
			required: false,
			alignRight: false,
			closeOnBlur: true,
			maxHeight: "40px",
			minWidth: "unset",
			minWidthCard: "unset",
			secondary: false,
			hideArrow: false,
			ariaLabel: "Expandable content",
			loading: false,
			loadingText: "Loading content",
			accessibility: () => ({
				disclosure: {
					ariaLabel: "Toggle expandable content",
					respectReducedMotion: true
				},
				keyboard: {
					activationKeys: ['Enter', ' '],
					preventDefault: true
				},
				focus: {
					focusTriggerOnCollapse: true
				},
				animation: {
					duration: 250,
					timingFunction: 'ease-in-out',
					respectReducedMotion: true
				}
			})
		}
	);

	const emit = defineEmits<BExpandableContainerEmits>();

	// Use the optional model for backward compatibility
	const [model, setModel] = useOptionalModel<boolean>(
		props,
		"modelValue",
		emit,
		false
	);

	// Use the expandable container composable for full accessibility
	const {
		state,
		triggerAttrs,
		contentAttrs,
		handlers,
		screenReader: screenReaderUtils,
		animation
	} = useExpandableContainer(props, emit);

	// Legacy DOM reference
	const content = ref<HTMLDivElement>();

	const isExpanded = computed((): boolean =>
		props.disabled ? false : model.value
	);

	const isAbsolute = computed((): boolean =>
		isExpanded.value ? props.absolute : true
	);

	// Enhanced model change handler with accessibility
	function changeModel(value: boolean, extra: BContainerModelExtra) {
		setModel(value, extra);
		
		// Update the expandable container state
		state.isExpanded.value = value;
		
		// Enhanced screen reader announcements
		if (value) {
			screenReaderUtils.announceExpanded();
		} else {
			screenReaderUtils.announceCollapsed();
		}
	}

	// Get transition styles with reduced motion support
	const transitionStyles = computed(() => animation.getTransitionStyle());

	// Enhanced keyboard handler for the container
	function handleContainerKeydown(event: KeyboardEvent) {
		// Only handle if the event target is the container trigger
		if (event.target === state.refs.trigger.value || 
			(event.target as Element)?.closest('.label-container')) {
			handlers.handleKeydown(event);
		}
	}

	// Enhanced click handler with loading support
	function handleToggleClick() {
		if (props.disabled || state.isLoading.value) return;
		handlers.toggle();
	}
</script>

<template>
	<div 
		class="b-expandable-container"
		:class="{
			'is-expanded': isExpanded,
			'is-disabled': disabled,
			'is-loading': state.isLoading.value,
			'is-error': isError,
			'has-reduced-motion': !animation.shouldAnimate()
		}"
		:data-testid="`expandable-container-${state.ids.trigger}`">
		
		<!-- Accessibility description (hidden) -->
		<div
			v-if="accessibility?.disclosure?.ariaDescription"
			:id="`${state.ids.trigger}-description`"
			class="sr-only">
			{{ accessibility.disclosure.ariaDescription }}
		</div>

		<!-- Enhanced BContainer with ARIA disclosure pattern -->
		<BContainer
			v-model="model"
			:label-value="labelValue"
			:close-on-blur="closeOnBlur"
			:disabled="disabled || state.isLoading.value"
			:is-error="isError"
			:error-message="errorMessage"
			:info-message="infoMessage"
			:required="required"
			:max-height="maxHeight"
			:min-width="minWidth"
			:secondary="secondary"
			:hide-arrow="hideArrow"
			:id="state.ids.trigger"
			:role="'button'"
			v-bind="triggerAttrs"
			@update:model-value="changeModel"
			@keydown="handleContainerKeydown"
			@focus="handlers.handleFocus"
			@blur="handlers.handleBlur">
			
			<!-- Trigger content with loading state -->
			<template #default>
				<div 
					class="expandable-trigger-content flex items-center gap-xs"
					:class="{
						'opacity-50': state.isLoading.value
					}">
					<!-- Loading spinner (if loading) -->
					<BSpinner
						v-if="state.isLoading.value"
						size="small"
						class="shrink-0"
						:aria-label="loadingText" />
					
					<!-- Main trigger content -->
					<slot />
				</div>
			</template>

			<template
				#complement
				v-if="$slots.complement">
				<slot name="complement" />
			</template>

			<template
				#label
				v-if="$slots.label">
				<slot name="label" />
			</template>

			<!-- Enhanced content region with progressive disclosure -->
			<template #content="{ minWidth }">
				<div
					v-show="isExpanded"
					:ref="state.refs.content"
					v-bind="contentAttrs"
					class="expandable-content-wrapper text-xs top-full w-fit"
					:class="[
						{
							'absolute z-80': isAbsolute,
							'max-h-fit': isExpanded,
							'left-0': !alignRight,
							'right-0': alignRight,
							'animate-expand': isExpanded && animation.shouldAnimate(),
							'animate-collapse': !isExpanded && animation.shouldAnimate(),
						},
					]"
					:style="{ 
						'min-width': minWidthCard || minWidth,
						...transitionStyles
					}">
					
					<!-- Content container with enhanced accessibility -->
					<div
						class="expandable-content mt-xs"
						:class="[{
							'transform-none': !animation.shouldAnimate(),
							'-translate-y-full': animation.shouldAnimate() && !isExpanded,
							'translate-y-0': animation.shouldAnimate() && isExpanded,
							'transition-transform': animation.shouldAnimate()
						}]"
						:style="animation.shouldAnimate() ? transitionStyles : {}">
						
						<!-- Custom card slot with accessibility -->
						<slot name="card">
							<div
								:ref="state.refs.container"
								class="expandable-card bg-neutral-surface-default shadow-neutral-selected border-xxs border-neutral-default rounded-xs"
								:style="maxHeight !== 'unset' ? `max-height: ${maxHeight}px` : ''"
								:tabindex="accessibility?.focus?.focusContentOnExpand ? 0 : -1">
								
								<div class="expandable-card-content p-sm">
									<!-- Loading state for content -->
									<div
										v-if="state.isLoading.value"
										class="flex items-center justify-center py-lg"
										role="status"
										:aria-label="loadingText">
										<BSpinner size="medium" />
										<span class="ml-sm text-sm text-neutral-foreground-default">
											{{ loadingText }}
										</span>
									</div>
									
									<!-- Actual content (hidden when loading) -->
									<div
										v-else
										class="expandable-card-inner">
										<slot name="content" />
									</div>
								</div>
							</div>
						</slot>
					</div>
				</div>
			</template>
		</BContainer>

		<!-- Progressive disclosure: Nested expandable containers support -->
		<div
			v-if="accessibility?.progressiveDisclosure?.isNested"
			class="expandable-nested-indicators"
			:style="`margin-left: ${(accessibility.progressiveDisclosure.nestingLevel || 0) * 1.5}rem`">
			<!-- Nesting level indicators would go here -->
		</div>
	</div>
</template>

<style scoped>
@import "../../assets/main.css";

/* Base expandable container styles */
.b-expandable-container {
	@apply relative w-fit;
}

/* Screen reader only content */
.sr-only {
	@apply absolute -inset-px overflow-hidden w-px h-px;
	clip: rect(0, 0, 0, 0);
}

/* Trigger content styles */
.expandable-trigger-content {
	@apply flex items-center w-full;
}

/* Content wrapper with accessibility enhancements */
.expandable-content-wrapper {
	@apply relative;
}

/* Enhanced content animations with reduced motion support */
.expandable-content {
	@apply transform-gpu;
	transition-property: transform, opacity, max-height;
}

/* Reduced motion: disable animations */
.has-reduced-motion .expandable-content,
.has-reduced-motion .expandable-content-wrapper {
	@apply transition-none transform-none;
}

/* Loading state styles */
.is-loading {
	@apply pointer-events-none;
}

.is-loading .expandable-trigger-content {
	@apply opacity-50;
}

/* Error state enhancements */
.is-error .expandable-card {
	@apply border-danger-border-default;
}

/* Disabled state enhancements */
.is-disabled {
	@apply opacity-50 pointer-events-none;
}

/* Focus management for content */
.expandable-card:focus-visible {
	@apply outline-2 outline-primary-border-default outline-offset-2;
}

/* High contrast mode support */
@media (forced-colors: active) {
	.expandable-card {
		border: 2px solid ButtonBorder;
	}
	
	.is-expanded .expandable-card {
		border: 2px solid Highlight;
	}
	
	.is-error .expandable-card {
		border: 2px solid Mark;
	}
}

/* Animation classes for smooth expand/collapse */
@keyframes expand {
	from {
		opacity: 0;
		transform: translateY(-0.5rem) scale(0.95);
		max-height: 0;
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
		max-height: var(--max-height, 40rem);
	}
}

@keyframes collapse {
	from {
		opacity: 1;
		transform: translateY(0) scale(1);
		max-height: var(--max-height, 40rem);
	}
	to {
		opacity: 0;
		transform: translateY(-0.5rem) scale(0.95);
		max-height: 0;
	}
}

.animate-expand {
	animation: expand var(--animation-duration, 250ms) var(--animation-timing, ease-in-out);
}

.animate-collapse {
	animation: collapse var(--animation-duration, 250ms) var(--animation-timing, ease-in-out);
}

/* Nested expandable containers */
.expandable-nested-indicators {
	@apply relative;
}

.expandable-nested-indicators::before {
	content: '';
	@apply absolute left-0 top-0 bottom-0 w-px bg-neutral-border-default;
}

/* Progressive disclosure visual indicators */
.b-expandable-container[data-nesting-level="1"] {
	@apply ml-base;
}

.b-expandable-container[data-nesting-level="2"] {
	@apply ml-lg;
}

.b-expandable-container[data-nesting-level="3"] {
	@apply ml-xl;
}

/* Ensure proper stacking context */
.expandable-content-wrapper {
	@apply z-50;
}

.is-expanded .expandable-content-wrapper {
	@apply z-60;
}
</style>
