<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Overlay from "../../utils/components/Overlay.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    size?: string;
    noOutsideClose?: boolean;
    position?: "top" | "bottom" | "left" | "right";
  }>(),
  {
    modelValue: false,
    size: "fit-content",
    noOutsideClose: false,
    position: "right",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const model = ref(props.modelValue);
const drawer = ref<HTMLElement>();

const isMobile = computed(() => window.innerWidth < 768);

watch(
  () => props.modelValue,
  (cur) => {
    model.value = cur;
  }
);

function closeDialog() {
  if (!props.noOutsideClose) {
    model.value = false;
    emit("update:modelValue", false);
  }
}
</script>

<template>
  <Teleport to="body">
    <Overlay v-model="model" @click="closeDialog">
      <Transition name="slide-in">
        <div
          v-if="model"
          ref="drawer"
          class="drawer"
          :class="position"
          :style="{ 
            width: position === 'left' || position === 'right' ? (isMobile ? '100%' : size) : '100%',
            height: position === 'top' || position === 'bottom' ? (isMobile ? '100%' : size) : '100%'
          }"
        >
          <slot />
        </div>
      </Transition>
    </Overlay>
  </Teleport>
</template>

<style scoped>
@reference "../../assets/main.css";

.drawer {
  @apply z-[1001] fixed bg-neutral-surface-default border-xxs border-neutral-default transform transition-transform;
}

.right {
  @apply top-0 right-0 h-screen rounded-l-base;
  max-width: calc(100% - var(--spacing-xl));
}

.left {
  @apply top-0 left-0 h-screen rounded-r-base;
  max-width: calc(100% - var(--spacing-xl));
}

.top {
  @apply top-0 left-0 w-screen rounded-b-base;
  max-height: calc(100% - var(--spacing-xl));
}

.bottom {
  @apply bottom-0 left-0 w-screen rounded-t-base;
  max-height: calc(100% - var(--spacing-xl));
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.5s ease;
}

/* Right position animations */
.right.slide-in-enter-from,
.right.slide-in-leave-to {
  transform: translateX(100%);
}

.right.slide-in-enter-to,
.right.slide-in-leave-from {
  transform: translateX(0%);
}

/* Left position animations */
.left.slide-in-enter-from,
.left.slide-in-leave-to {
  transform: translateX(-100%);
}

.left.slide-in-enter-to,
.left.slide-in-leave-from {
  transform: translateX(0%);
}

/* Top position animations */
.top.slide-in-enter-from,
.top.slide-in-leave-to {
  transform: translateY(-100%);
}

.top.slide-in-enter-to,
.top.slide-in-leave-from {
  transform: translateY(0%);
}

/* Bottom position animations */
.bottom.slide-in-enter-from,
.bottom.slide-in-leave-to {
  transform: translateY(100%);
}

.bottom.slide-in-enter-to,
.bottom.slide-in-leave-from {
  transform: translateY(0%);
}

@media screen and (max-width: 768px) {
  .slide-in-enter-from,
  .slide-in-leave-to {
    transform: translateY(100%);
  }
  .slide-in-enter-to,
  .slide-in-leave-from {
    transform: translateY(0%);
  }

  .drawer {
    @apply w-full;
  }
}
</style>
