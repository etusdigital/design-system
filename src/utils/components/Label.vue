<script setup lang="ts">
	const props = withDefaults(
		defineProps<{
			labelValue?: string;
			infoMessage?: string;
			tooltipMinWidth?: string;
			required?: boolean;
		}>(),
		{
			labelValue: "",
			infoMessage: "",
			tooltipMinWidth: "none",
			required: false,
		}
	);
</script>

<template>
	<h5
		v-if="labelValue"
		class="label-value">
		{{ labelValue }}
		<BTooltip
			v-if="infoMessage"
			class="ml-xxs">
			<template #text>
				<div
					class="tooltip-text"
					:class="{
						'whitespace-nowrap break-words text-wrap':
							tooltipMinWidth != 'none',
					}"
					:style="{ minWidth: tooltipMinWidth }">
					{{ infoMessage }}
				</div>
			</template>
			<BIcon
				name="info"
				class="info-icon" />
		</BTooltip>
		<span
			v-if="required"
			class="text-primary-foreground-low ml-xxs"
			>*</span
		>
	</h5>
</template>

<style scoped>
	@import "../../assets/main.css";

	.label-value {
		@apply flex items-center;
	}

	.tooltip-text {
		@apply p-xxs text-neutral-foreground-negative;
	}

	.info-icon.b-icon {
		@apply flex items-center text-primary-foreground-low text-lg;
	}
</style>
