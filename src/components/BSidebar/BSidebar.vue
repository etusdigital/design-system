<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Overlay from "../../utils/components/Overlay.vue";

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    width?: string;
    noOutsideClose?: boolean;
  }>(),
  {
    modelValue: false,
    width: "fit-content",
    noOutsideClose: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const model = ref(props.modelValue);
const sidebar = ref<HTMLElement>();

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
          ref="sidebar"
          class="b-sidebar"
          :style="{ width: isMobile ? '100%' : width }"
        >
          <slot />
        </div>
      </Transition>
    </Overlay>
  </Teleport>
</template>

<style scoped>
@reference "../../assets/main.css";

.b-sidebar {
  @apply z-[1001] fixed top-0 right-0 h-screen bg-neutral-surface-default rounded-l-base border-xxs border-neutral-default transform transition-transform;
  max-width: calc(100% - var(--spacing-xl));
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.5s ease;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

.slide-in-enter-to,
.slide-in-leave-from {
  transform: translateX(0%);
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

  .b-sidebar {
    @apply w-full;
  }
}
</style>
