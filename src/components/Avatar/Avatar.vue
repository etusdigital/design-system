<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = withDefaults(defineProps<{
    name?: string;
    src?: string;
    alt?: string;
    size?: 'small' | 'medium' | 'large';
}>(), {
    size: 'medium',
});


const parsedName = computed(() => {
  if (!props.name) return '';
  
  const parts = props.name.trim().split(' ');
  if (parts.length > 1) {
    return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
  }
  return props.name.slice(0,2).toUpperCase();
});

const imageFailed = ref(false);
const showImage = computed(() => !!props.src && !imageFailed.value);

watch(() => props.src, () => {
  imageFailed.value = false;
});
</script>

<template>
    <div class="avatar" :class="size">
        <img v-if="showImage" :src="src" :alt="alt || name" @error="imageFailed = true" />
        <span :class="{'opacity-0': showImage}" :aria-hidden="showImage || undefined">{{ parsedName }}</span>
    </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.avatar {
    @apply h-fit w-fit relative flex items-center justify-center rounded-full bg-primary-surface-default overflow-hidden;

    img {
        @apply absolute inset-0 w-full h-full object-cover z-[1];
    }

    span {
        @apply text-primary-interaction-default font-bold;
    }
}

.avatar.small {
    @apply size-2xl p-xs;

    span {
        @apply text-xxs;
    }
}

.avatar.medium {
    @apply p-sm;
    width: calc(var(--spacing-xxs) * 10);
    height: calc(var(--spacing-xxs) * 10);

    span {
        @apply text-xs;
    }
}

.avatar.large {
    @apply size-3xl p-base;

    span {
        @apply text-sm;
    }
}
</style>
