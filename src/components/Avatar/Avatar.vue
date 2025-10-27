<script setup lang="ts">
import { computed } from 'vue';

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


</script>

<template>
    <div class="avatar" :class="size">
        <img v-if="src" :src="src" :alt="alt || name" />
        <span :class="{'opacity-0': src}">{{ parsedName }}</span>
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
    @apply p-xs;

    span {
        @apply text-xxs;
    }
}

.avatar.medium {
    @apply p-sm;

    span {
        @apply text-xs;
    }
}

.avatar.large {
    @apply p-base;

    span {
        @apply text-sm;
    }
}
</style>
