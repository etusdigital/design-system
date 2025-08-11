<script setup lang="ts">
import type { BHistoryPaginationContext } from './BHistory.types';

interface HistoryPaginationProps {
  /** Current page number */
  currentPage: number;
  /** Pagination context with navigation info */
  paginationContext: BHistoryPaginationContext;
}

const props = defineProps<HistoryPaginationProps>();

const emit = defineEmits<{
  'update:currentPage': [page: number];
}>();

// Handlers
const goToPreviousPage = () => {
  if (props.paginationContext.hasPreviousPage) {
    emit('update:currentPage', props.currentPage - 1);
  }
};

const goToNextPage = () => {
  if (props.paginationContext.hasNextPage) {
    emit('update:currentPage', props.currentPage + 1);
  }
};
</script>

<template>
  <nav
    v-if="paginationContext.totalPages > 1"
    class="history-pagination"
    aria-label="History pagination"
  >
    <button
      type="button"
      :disabled="!paginationContext.hasPreviousPage"
      :aria-label="`Go to previous page, page ${currentPage - 1}`"
      @click="goToPreviousPage"
      class="pagination-button focus-ring"
    >
      Previous
    </button>
    
    <span 
      aria-live="polite"
      class="pagination-info"
    >
      Page {{ currentPage }} of {{ paginationContext.totalPages }}
    </span>
    
    <button
      type="button"
      :disabled="!paginationContext.hasNextPage"
      :aria-label="`Go to next page, page ${currentPage + 1}`"
      @click="goToNextPage"
      class="pagination-button focus-ring"
    >
      Next
    </button>
  </nav>
</template>

<style scoped>
@import "../../assets/styles/components/accessibility.css";

.history-pagination {
  @apply flex items-center justify-center gap-base mt-base px-base py-sm;
  @apply border-t border-neutral-border-default;
}

.pagination-button {
  @apply px-base py-sm border border-neutral-border-default rounded-base;
  @apply bg-neutral-surface-default hover:bg-neutral-surface-highlight;
  @apply text-neutral-foreground-high;
  @apply transition-colors duration-200 ease-in-out;
}

.pagination-button:disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-neutral-surface-default;
}

.pagination-info {
  @apply text-sm text-neutral-foreground-medium font-medium;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .pagination-button {
    transition: none !important;
  }
}
</style>