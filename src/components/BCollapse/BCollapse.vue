<script setup lang="ts">
	import {
		ref,
		onMounted,
		onBeforeUnmount,
		onUpdated,
		computed,
		watch,
		nextTick
	} from "vue";
	import { useCollapse } from "#composables/useCollapse";
	import type { CollapseProps, CollapseEmits } from "./BCollapse.types";

	const props = withDefaults(
		defineProps<CollapseProps>(),
		{
			modelValue: false,
			duration: 150,
			noShadow: false,
			ariaLabel: "Toggle content",
			loading: false,
			accessibility: () => ({}),
			keyboard: () => ({}),
			focus: () => ({}),
			animation: () => ({})
		}
	);

	const emit = defineEmits<CollapseEmits>();

	// Use the enhanced collapse composable
	const {
		state,
		triggerAttrs,
		contentAttrs,
		handlers,
		screenReader,
		animation
	} = useCollapse(props, emit as any);

	// DOM references from state
	const { refs, isExpanded, isLoading, isAnimating } = state;
	let card = refs.container;
	let content = refs.content;
	const trigger = refs.trigger;

	// Observer setup
	const resizeObserver = new ResizeObserver(resize);
	const mutationObserver = new MutationObserver(resize);

	// Watch for prop changes and resize when expanded state changes
	watch(isExpanded, () => {
		resize();
	});

	watch(
		() => props.modelValue,
		(newValue) => {
			if (newValue !== isExpanded.value) {
				isExpanded.value = newValue;
			}
		}
	);

	const parsedDuration = computed((): number => {
		return animation.getDuration();
	});

	const transitionStyles = computed(() => {
		return animation.getTransitionStyle();
	});

	onMounted(() => {
		if (card.value) resizeObserver.observe(card.value, { box: "border-box" });
		if (content.value) {
			resizeObserver.observe(content.value, { box: "border-box" });
			mutationObserver.observe(content.value, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ["data-max-height"],
			});
		}
	});

	onUpdated(resize);

	onBeforeUnmount(() => {
		if (resizeObserver) resizeObserver.disconnect();
		if (mutationObserver) mutationObserver.disconnect();
	});

	async function resize() {
		if (!content.value) return;

		// Set animation state
		if (animation.shouldAnimate()) {
			isAnimating.value = true;
		}

		content.value.style.maxHeight = isExpanded.value
			? `${content.value.scrollHeight}px`
			: "0px";

		if (content.value.style.maxHeight != content.value.dataset.maxHeight) {
			content.value.dataset.maxHeight = content.value.style.maxHeight;
		}

		// Clear animation state after transition
		if (animation.shouldAnimate()) {
			setTimeout(() => {
				isAnimating.value = false;
				
				// Emit completion events
				if (isExpanded.value) {
					emit('expand-complete', {} as Event);
				} else {
					emit('collapse-complete', {} as Event);
				}
			}, parsedDuration.value);
		}
	}

	// Use handlers from composable
	const { toggle: changeModel, handleKeydown, handleFocus, handleBlur } = handlers;
</script>

<template>
	<BCard
		class="b-collapse"
		:class="{ 'no-shadow': noShadow }">
		<div
			class="w-full flex flex-col gap-sm"
			ref="card">
			
			<!-- Accessible description for screen readers -->
			<div
				v-if="accessibility?.ariaDescription"
				:id="`${state.ids.trigger}-description`"
				class="sr-only">
				{{ accessibility.ariaDescription }}
			</div>

			<!-- Loading indicator for screen readers -->
			<div
				v-if="isLoading && accessibility?.loading?.showIndicator"
				class="sr-only"
				aria-live="polite"
				aria-atomic="true">
				{{ accessibility?.loading?.loadingText || loadingText || 'Loading content' }}
			</div>

			<button
				ref="trigger"
				class="flex items-center justify-end w-full text-base cursor-pointer bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary-foreground-low rounded-xs transition-colors duration-200 hover:bg-neutral-surface-hover focus-visible:bg-neutral-surface-hover"
				:class="{ 
					'justify-between': $slots.header,
					'opacity-50 cursor-wait': isLoading,
					'animate-pulse': isAnimating && animation.shouldAnimate()
				}"
				v-bind="triggerAttrs"
				:disabled="isLoading"
				@click="changeModel"
				@keydown="handleKeydown"
				@focus="handleFocus"
				@blur="handleBlur">
				
				<slot name="header" />
				
				<!-- Loading indicator -->
				<div
					v-if="isLoading"
					class="flex items-center w-fit h-fit mr-xs"
					aria-hidden="true">
					<BSpinner size="sm" class="text-neutral-interaction-default" />
				</div>
				
				<!-- Expand/collapse icon -->
				<div
					class="flex items-center w-fit h-fit transition-transform ease-in-out duration-300 text-2xl pointer-events-none"
					:class="{ 
						'rotate-180': isExpanded,
						'opacity-50': isLoading
					}"
					:style="transitionStyles"
					aria-hidden="true">
					<BIcon
						name="expand_more"
						size="xl"
						class="text-neutral-interaction-default font-bold" />
				</div>
			</button>

			<!-- Collapsible content -->
			<Transition 
				name="content"
				@enter="() => emit('expand-start', {} as Event)"
				@leave="() => emit('collapse-start', {} as Event)">
				<div
					v-show="isExpanded"
					ref="content"
					class="content-wrapper top-full left-0 transition-[max-height]"
					:class="{ 
						'b-hidden overflow-hidden': !isExpanded,
						'opacity-50': isLoading 
					}"
					:style="{ 
						...transitionStyles,
						'transition-duration': `${parsedDuration}ms` 
					}"
					v-bind="contentAttrs"
					data-max-height="0px">
					
					<!-- Content loading overlay -->
					<div
						v-if="isLoading && accessibility?.loading?.showIndicator"
						class="absolute inset-0 bg-white/50 flex items-center justify-center z-10"
						aria-hidden="true">
						<BSpinner class="text-neutral-interaction-default" />
					</div>
					
					<!-- Main content slot -->
					<div :class="{ 'pointer-events-none': isLoading }">
						<slot />
					</div>
				</div>
			</Transition>
		</div>
	</BCard>
</template>

<style scoped>
	@import "../../assets/main.css";
	
	.b-collapse {
		@apply px-base py-xs w-full shadow-none transition-colors duration-300 hover:bg-neutral-surface-hover;
	}

	.no-shadow {
		@apply border-none;
	}

	.b-hidden {
		max-height: 0 !important;
	}

	/* Screen reader only content */
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

	/* Enhanced focus styles for better visibility */
	.b-collapse button:focus-visible {
		@apply ring-2 ring-offset-2 ring-primary-foreground-low;
	}

	/* Smooth transitions that respect reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.b-collapse *,
		.content-wrapper {
			transition-duration: 0ms !important;
			animation-duration: 0ms !important;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.b-collapse button:focus {
			outline: 3px solid;
		}
	}

	/* Content transition animations */
	.content-enter-active,
	.content-leave-active {
		transition: max-height 0.3s ease-in-out, opacity 0.2s ease-in-out;
	}

	.content-enter-from,
	.content-leave-to {
		max-height: 0 !important;
		opacity: 0;
	}

	.content-enter-to,
	.content-leave-from {
		opacity: 1;
	}

	/* Ensure proper spacing and alignment */
	.b-collapse [role="region"] {
		@apply focus:outline-none;
	}

	.b-collapse [role="region"]:focus {
		@apply ring-2 ring-primary-foreground-low ring-offset-2 rounded-xs;
	}
</style>