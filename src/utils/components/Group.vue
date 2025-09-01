<script setup lang="ts">
import { reactive, watch, provide } from 'vue';
import type { GroupState } from '../types/Group.types';

interface GroupProps {
	modelValue?: any;
	vertical?: boolean;
	disabled?: boolean;
}

const props = withDefaults(defineProps<GroupProps>(), {
	modelValue: null,
	vertical: false,
	disabled: false,
});

const emit = defineEmits<{
	'update:modelValue': [value: any];
}>();

const groupState = reactive<GroupState>({
	selected: props.modelValue,
	get disabled(): boolean {
		return props.disabled;
	},

	select: updateSelection,
});

watch(
	() => props.modelValue,
	(cur) => (groupState.selected = cur)
);

provide<GroupState>('groupState', groupState);

function updateSelection(value: any) {
	groupState.selected = value;
	emit('update:modelValue', value);
}
</script>

<template>
	<div class="group inline-flex" :class="[vertical ? 'vert' : 'hor']">
		<slot />
	</div>
</template>

<style scoped>
@reference "../../assets/main.css";

.vert {
	@apply flex-col;
}

.hor {
	@apply items-end;
}
</style>
