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
    <div class="b-avatar" :class="size">
        <img v-if="src" :src="src" :alt="alt || name" />
        <span :class="{'opacity-0': src}">{{ parsedName }}</span>
    </div>
</template>

<style scoped>
.b-avatar {
    height: fit-content;
    width: fit-content;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: var(--primary-surface-default);

    img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
    }

    span {
        color: var(--primary-interaction-default);
        font-weight: var(--font-weight-bold);
    }
}

.b-avatar.small {
    padding: var(--spacing-xs);

    span {
        font-size: var(--font-size-xxs);
    }
}

.b-avatar.medium {
    padding: var(--spacing-sm);

    span {
        font-size: var(--font-size-xs);
    }
}

.b-avatar.large {
    padding: var(--spacing-base);

    span {
        font-size: var(--font-size-sm);
    }
}
</style>
