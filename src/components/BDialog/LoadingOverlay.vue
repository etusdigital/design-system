<script setup lang="ts">
import { computed } from 'vue';
import BSpinner from '../BSpinner/BSpinner.vue';

interface Props {
  /** Loading message to display */
  message?: string;
  /** Spinner size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to block all interactions */
  blocking?: boolean;
  /** Custom loading component */
  component?: any;
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Loading...',
  size: 'md',
  blocking: true,
});

// Compute spinner size in pixels
const spinnerSize = computed(() => {
  const sizeMap = {
    sm: '24px',
    md: '32px',
    lg: '48px',
  };
  return sizeMap[props.size];
});
</script>

<template>
  <div
    class="dialog-loading-overlay"
    :class="{
      'dialog-loading-overlay--blocking': blocking
    }"
    role="status"
    aria-live="polite"
    :aria-label="message">
    
    <!-- Custom loading component -->
    <component
      v-if="component"
      :is="component"
      :message="message"
      :size="size" />
    
    <!-- Default loading layout -->
    <div 
      v-else
      class="dialog-loading-content">
      
      <!-- Loading spinner -->
      <BSpinner 
        :size="spinnerSize"
        class="dialog-loading-spinner" />
      
      <!-- Loading message -->
      <div 
        v-if="message"
        class="dialog-loading-message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-loading-overlay {
  @apply absolute inset-0 flex items-center justify-center;
  @apply bg-white bg-opacity-90 backdrop-blur-sm;
  @apply z-50 transition-all duration-200;
}

.dialog-loading-overlay--blocking {
  @apply cursor-wait;
  pointer-events: all;
}

.dialog-loading-content {
  @apply flex flex-col items-center gap-md text-center;
  @apply p-lg rounded-lg;
  @apply bg-white shadow-lg border border-gray-200;
  @apply max-w-xs;
}

.dialog-loading-spinner {
  @apply text-blue-500;
}

.dialog-loading-message {
  @apply text-sm font-medium text-gray-700;
  @apply leading-relaxed;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .dialog-loading-overlay {
    @apply bg-gray-900 bg-opacity-90;
  }
  
  .dialog-loading-content {
    @apply bg-gray-800 border-gray-600 text-white;
  }
  
  .dialog-loading-message {
    @apply text-gray-200;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .dialog-loading-overlay {
    @apply bg-black bg-opacity-95;
  }
  
  .dialog-loading-content {
    @apply border-2 border-black;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .dialog-loading-overlay {
    @apply transition-none;
  }
  
  .dialog-loading-spinner {
    animation: none;
  }
}
</style>