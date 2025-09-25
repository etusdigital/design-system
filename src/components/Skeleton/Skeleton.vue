<template>
    <div class="skeleton" />
</template>

<style scoped>
@reference "../../assets/main.css";

.skeleton {
    @apply bg-neutral-surface-disabled bg-gradient-to-r from-transparent via-white to-transparent min-h-xs min-w-xs;
    background-size: 200% 100%;
    animation: moveBar 1.5s linear infinite;
}

@keyframes moveBar {
    0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}
</style>