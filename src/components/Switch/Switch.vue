<script setup lang="ts">
import { useOptionalModel } from '#composables';

const props = withDefaults(defineProps<{
    id?: string;
    name?: string;
    modelValue?: boolean;
    rhs?: boolean;
    disabled?: boolean;
}>(), {
    modelValue: undefined,
    rhs: false,
    disabled: false,
});

const emit = defineEmits<{
    'update:modelValue': [value: boolean],
}>();

const [model] = useOptionalModel<boolean>(props, 'modelValue', emit, false);

function switchState() {
    if (props.disabled) return;
    model.value = !model.value;
}
</script>

<template>
    <div
        :id="id"
        :name="name || id"
        role="switch"
        :aria-checked="model"
        :aria-disabled="disabled"
        class="switch"
        :class="{ 'flex-row-reverse': rhs, disabled }"
        @click="switchState"
    >
        <div
            tabindex="0"
            class="container"
            :class="{ active: model }"
            @keyup.space="switchState"
        >
            <div
                class="inline-block rounded-full w-[.85em] h-[.85em] bg-current transition"
                :class="[ model ? 'ml-[1em]' : 'ml-[.125em]' ]"
            />
        </div>
        <template v-if="$slots.default">
            <label v-if="name || id" :for="name || id" class="switch-label cursor-[inherit]">
                <slot />
            </label>
            <div v-else class="switch-label">
                <slot />
            </div>
        </template>
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.switch {
    @apply inline-flex text-base gap-xs items-center cursor-pointer;
}

.switch.disabled {
    @apply pointer-events-none;

    .container {
        @apply bg-neutral-surface-disabled;
    }

    .switch-label {
        @apply text-neutral-interaction-disabled;
    }
}

.transition {
    @apply transition-all duration-150 ease-out;
}

.container {
    @apply inline-flex text-neutral-foreground-negative bg-neutral-interaction-default rounded-full h-[1.16em] w-[2em] items-center transition;
}

.container.active {
    @apply bg-primary-interaction-default;
}

.switch-label {
    @apply text-xs text-neutral-interaction-default;
}
</style>
