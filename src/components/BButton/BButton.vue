<script setup lang="ts">
	import { computed } from "vue";
	import BSpinner from "../BSpinner/BSpinner.vue";

	const props = withDefaults(
		defineProps<{
			id?: string;
			name?: string;
			type?: "button" | "reset" | "submit";
			color?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
			size?: "small" | "medium" | "large";
			variant?: "default" | "secondary" | "plain" | "reverse";
			disabled?: boolean;
			loading?: boolean;
			progress?: number;
		}>(),
		{
			type: "button",
			color: "primary",
			size: "medium",
			variant: "default",
			disabled: false,
			loading: false,
			progress: 0,
		}
	);

	const isLoading = computed(
		(): boolean => !!(props.progress > 0 || props.loading)
	);
</script>

<template>
	<button
		:id="id"
		:name="name || id"
		:type="type"
		:disabled="disabled"
		class="b-button"
		:class="[
			{ disabled, 'pointer-events-none': isLoading },
			variant,
			size,
			color,
		]">
		<div
			v-if="isLoading"
			class="progress"
			:style="{ 
				width: progress * 100 + '%', 
				borderRadius: progress == 1 ? 'var(--border-radius-sm)' : 'var(--border-radius-sm) 0 0 var(--border-radius-sm)' 
			}" />
		<BSpinner v-if="isLoading" />
		<template v-if="$slots.default">
			<label
				v-if="name || id"
				:for="name || id"
				:class="{ invisible: isLoading }"
				class="button-label cursor-[inherit]">
				<slot />
			</label>
			<div
				v-else
				:class="{ invisible: isLoading }"
				class="button-label">
				<slot />
			</div>
		</template>
	</button>
</template>

<style scoped src="../../utils/styles/button.css" />

<style scoped>
.b-button {
	position: relative;
	display: inline-flex;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	text-transform: capitalize;
	user-select: none;
	border-radius: var(--border-radius-base);
	border-width: var(--border-width-xs);
	font-size: var(--font-size-sm);
	font-weight: var(--font-weight-semibold);
	line-height: var(--line-height-lg);
	letter-spacing: var(--letter-spacing-wider);
}

.b-button:active {
	transform: scale(0.95);
}

.b-button .b-spinner {
	position: absolute;
}

.b-button.small {
	padding: var(--spacing-xs) var(--spacing-base);

	.b-spinner {
		font-size: 0.75rem; /* equivalent to text-xs */
	}
}

.b-button.medium {
	padding: var(--spacing-sm) var(--spacing-base);

	.b-spinner {
		font-size: 0.875rem; /* equivalent to text-sm */
	}
}

.b-button.large {
	padding: var(--spacing-base) var(--spacing-xl);

	.b-spinner {
		font-size: 1rem; /* equivalent to text-base */
	}
}

.button-label {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	column-gap: var(--spacing-xs);
}

.progress {
	position: absolute;
	overflow: hidden;
	top: 0;
	left: 0;
	bottom: 0;
	transition: width 300ms ease-out;
	border-radius: var(--border-radius-sm) 0 0 var(--border-radius-sm);
}
</style>
