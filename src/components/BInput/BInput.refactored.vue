<script setup lang="ts">
import BInputCore from "./BInputCore.vue";
import type { BInputProps, BInputEmits } from "./BInput.types";

// Define props with same structure as before for backward compatibility
const props = withDefaults(defineProps<BInputProps>(), {
	modelValue: undefined,
	labelValue: "",
	type: "text",
	mask: undefined,
	max: undefined,
	min: undefined,
	step: 1,
	errorMessage: "",
	infoMessage: "",
	size: "100",
	isTextArea: false,
	disabled: false,
	isError: false,
	required: false,
	placeholder: "",
	textAlign: "start",
	tooltipMinWidth: "none",
	icon: "",
	appendIcon: false,
	loading: false,
	validationState: 'none',
	announceValidation: true,
	announceCharacterCount: false,
	autocomplete: undefined,
});

// Define emits with same structure for backward compatibility
const emit = defineEmits<BInputEmits>();
</script>

<template>
	<!-- Use the new BInputCore component with pass-through props -->
	<BInputCore
		v-bind="$props"
		@update:modelValue="emit('update:modelValue', $event)"
		@focus="emit('focus', $event)"
		@blur="emit('blur', $event)"
		@input="emit('input', $event)"
		@validation-change="emit('validation-change', $event, $event)"
		@character-count-change="emit('character-count-change', $event, $event)"
		@keydown="emit('keydown', $event)"
		@keyup="emit('keyup', $event)"
		@enter="emit('enter', $event)"
		@clear="emit('clear')"
		@file-select="emit('file-select', $event)"
		@file-remove="emit('file-remove', $event)"
		@drag-enter="emit('drag-enter', $event)"
		@drag-leave="emit('drag-leave', $event)"
		@drop="emit('drop', $event)"
		@password-toggle="emit('password-toggle', $event)"
		@step-up="emit('step-up', $event)"
		@step-down="emit('step-down', $event)"
		@accessibility="emit('accessibility', $event, $event)"
		@loading-change="emit('loading-change', $event)"
	>
		<!-- Pass through all slots -->
		<template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
			<slot :name="slot" v-bind="scope" />
		</template>
	</BInputCore>
</template>

<!-- Import styles from original component -->
<style scoped src="./BInput.vue"></style>