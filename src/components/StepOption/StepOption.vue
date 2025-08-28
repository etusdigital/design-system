<script setup lang="ts">
const props = withDefaults(defineProps<{
    title?: string;
    description?: string;
    icon?: string;
    color?: string;
    disabled?: boolean;
    isIconRound?: boolean;
}>(), {
    title: '',
    description: '',
    icon: '',
    color: '',
    disabled: false,
    isIconRound: false,
});

const emit = defineEmits<{
    (e: 'click'): void;
}>();

function handleClick() {
    emit('click');
}
</script>

<template>
    <div class="step-option" :class="{'disabled': disabled}" @click="handleClick">
        <div class="icon" :class="{'round-icon': isIconRound, 'colored-background': color, 'colored-text': color && isIconRound}">
            <Icon :name="icon" />
        </div>
        <div class="flex flex-col gap-1">
            <h4 class="option-title" :class="{'colored-text': color}">{{ title }}</h4>
            <p class="option-description">{{ description }}</p>
        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.step-option {
    @apply flex items-center gap-base cursor-pointer min-w-[400px] p-base rounded-2xl transition-colors hover:bg-neutral-surface-hover;
}

.step-option.disabled {
    @apply pointer-events-none;

    .icon {
        @apply bg-neutral-interaction-disabled;
    }

    .icon.round-icon {
        @apply bg-neutral-surface-default;
    }

    .icon.round-icon, .option-title, .option-description {
        @apply text-neutral-interaction-disabled;
    }
}

.icon {
    @apply flex items-center justify-center rounded-full bg-primary-interaction-default p-sm w-fit h-fit text-neutral-foreground-negative;

    .icon {
        @apply text-3xl;
    }
}

.icon.round-icon {
    @apply bg-neutral-surface-default text-primary-interaction-default p-0;

    .icon {
        @apply text-5xl;
    }
}

.option-title {
    @apply text-primary-interaction-default font-bold text-base;
}

.option-description {
    @apply text-neutral-foreground-low text-sm text-wrap;
}

*.colored-background {
    background: v-bind(color);
}

.step-option *.colored-text {
    color: v-bind(color);
}
</style>