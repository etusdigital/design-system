<script setup lang="ts">
import { computed } from 'vue';
import type { BackdropEffect } from './BDialog.types';
import { BACKDROP_EFFECTS } from './BDialog.types';

interface Props {
  /** Backdrop visual effect */
  effect?: BackdropEffect;
  /** Custom blur amount (for blur effect) */
  blur?: string;
  /** Custom backdrop color */
  color?: string;
  /** z-index for backdrop */
  zIndex?: number;
  /** Whether backdrop is clickable */
  clickable?: boolean;
}

interface Emits {
  /** Emitted when backdrop is clicked */
  click: [];
}

const props = withDefaults(defineProps<Props>(), {
  effect: 'darken',
  blur: '8px',
  zIndex: 1000,
  clickable: true,
});

const emit = defineEmits<Emits>();

// Compute backdrop styles
const backdropStyles = computed(() => {
  const effectConfig = BACKDROP_EFFECTS[props.effect];
  
  const styles: Record<string, string> = {
    zIndex: props.zIndex.toString(),
  };
  
  // Apply custom color or use effect default
  if (props.color) {
    styles.backgroundColor = props.color;
  } else {
    styles.backgroundColor = effectConfig.backdrop;
  }
  
  // Apply blur filter for blur effect
  if (props.effect === 'blur') {
    styles.backdropFilter = `blur(${props.blur})`;
    styles.webkitBackdropFilter = `blur(${props.blur})`;
  }
  
  return styles;
});

// Handle backdrop click
const handleClick = (event: MouseEvent) => {
  if (props.clickable && event.target === event.currentTarget) {
    emit('click');
  }
};
</script>

<template>
  <div
    class="enhanced-backdrop"
    :class="{
      'enhanced-backdrop--clickable': clickable,
      'enhanced-backdrop--blur': effect === 'blur',
      'enhanced-backdrop--none': effect === 'none'
    }"
    :style="backdropStyles"
    @click="handleClick">
    
    <!-- Content slot for dialog -->
    <slot />
  </div>
</template>

<style scoped>
.enhanced-backdrop {
  @apply fixed inset-0 flex items-center justify-center;
  @apply transition-all duration-300 ease-out;
}

.enhanced-backdrop--clickable {
  @apply cursor-pointer;
}

.enhanced-backdrop--blur {
  /* Additional blur support for older browsers */
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.enhanced-backdrop--none {
  @apply pointer-events-none;
}

/* Animation classes */
.backdrop-enter-active,
.backdrop-leave-active {
  @apply transition-all duration-300 ease-out;
}

.backdrop-enter-from,
.backdrop-leave-to {
  @apply opacity-0;
}

.backdrop-enter-from.enhanced-backdrop--blur,
.backdrop-leave-to.enhanced-backdrop--blur {
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .enhanced-backdrop {
    @apply transition-opacity duration-200;
  }
  
  .backdrop-enter-active,
  .backdrop-leave-active {
    @apply transition-opacity duration-200;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .enhanced-backdrop:not(.enhanced-backdrop--none) {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }
}

/* Focus styles for accessibility */
.enhanced-backdrop:focus-within {
  @apply outline-none;
}
</style>