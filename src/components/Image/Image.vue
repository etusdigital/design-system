<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import Icon from "../Icon/Icon.vue";
import Overlay from "../../utils/components/Overlay.vue";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  icon?: string;
  preview?: boolean;
}

const props = withDefaults(defineProps<ImageProps>(), {
  icon: "visibility",
  preview: false,
});

const emit = defineEmits<{
  show: [];
  hide: [];
}>();

const isHovering = ref(false);
const previewVisible = ref(false);
const rotate = ref(0);
const scale = ref(1);
const tools = ref([
  {
    icon: "rotate_left",
    label: "Rotate Left",
    click: rotateLeft,
  },
  {
    icon: "rotate_right",
    label: "Rotate Right",
    click: rotateRight,
  },
  {
    icon: "zoom_out",
    label: "Zoom Out",
    disabled: () => scale.value <= 0.5,
    click: zoomOut,
  },
  {
    icon: "zoom_in",
    label: "Zoom In",
    disabled: () => scale.value >= 1.5,
    click: zoomIn,
  },
  {
    icon: "close",
    label: "Close",
    click: hidePreview,
  },
]);

const imageStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.width) {
    style.width =
      typeof props.width === "number" ? `${props.width}px` : props.width;
  }
  if (props.height) {
    style.height =
      typeof props.height === "number" ? `${props.height}px` : props.height;
  }
  return style;
});

const previewImageStyle = computed(() => ({
  transform: `rotate(${rotate.value}deg) scale(${scale.value})`,
  transition: "transform 0.15s",
}));

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
  document.body.style.overflow = "";
});

function showPreview() {
  previewVisible.value = true;
  emit("show");
  document.body.style.overflow = "hidden";
}

function hidePreview() {
  previewVisible.value = false;
  emit("hide");
  rotate.value = 0;
  scale.value = 1;
  document.body.style.overflow = "";
}

function rotateRight() {
  rotate.value += 90;
}

function rotateLeft() {
  rotate.value -= 90;
}

function zoomIn() {
  scale.value = Math.min(scale.value + 0.1, 1.5);
}

function zoomOut() {
  scale.value = Math.max(scale.value - 0.1, 0.5);
}

function closePreview() {
  hidePreview();
}

function onKeyDown(event: KeyboardEvent) {
  if (!previewVisible.value) return;

  switch (event.code) {
    case "Escape":
      hidePreview();
      break;
  }
}
</script>

<template>
  <span
    class="image"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <slot name="image">
      <img :src="src" :alt="alt" :style="imageStyle" class="image-content" />
    </slot>

    <div v-if="preview" class="cursor-pointer" @click="showPreview">
      <Overlay
        class="image-preview-overlay"
        :model-value="isHovering"
        :z-index="1"
      >
        <div v-if="isHovering" class="image-preview-overlay-content">
          <slot name="image-overlay">
            <Icon :name="icon" />
          </slot>
        </div>
      </Overlay>
    </div>

    <Teleport to="body">
      <Overlay v-model="previewVisible" :z-index="1000" @click="closePreview">
        <Transition name="bounce">
          <div
            class="preview-modal image-preview-container"
            v-if="previewVisible"
          >
            <slot name="preview">
              <img
                :src="src"
                :alt="alt"
                :style="previewImageStyle"
                class="image-preview"
              />
            </slot>
          </div>
        </Transition>
        <Transition name="fade-in">
          <div
            class="preview-modal image-preview-toolbar"
            v-if="previewVisible"
            role="dialog"
            aria-modal
          >
            <Button
              v-for="tool in tools"
              :key="tool.icon"
              :icon="tool.icon"
              :aria-label="tool.label"
              :disabled="tool.disabled ? tool.disabled() : false"
              class="tool"
              color="neutral"
              variant="plain"
              round
              @click="tool.click"
            />
          </div>
        </Transition>
      </Overlay>
    </Teleport>
  </span>
</template>

<style scoped>
@reference "../../assets/main.css";

.image {
  @apply relative inline-block;
}

.image-content {
  @apply max-w-full h-auto;
}

::deep(.image-preview-overlay.background-div) {
  @apply absolute w-full h-full cursor-pointer;
}

.image-preview-overlay-content {
  @apply z-[2] absolute inset-none flex items-center justify-center;
}

.image-preview-overlay-content .icon {
  @apply text-2xl text-neutral-foreground-negative;
}

.preview-modal {
  @apply z-[1001] fixed w-fit h-fit;
}

.image-preview-toolbar {
  @apply top-lg right-lg flex gap-xs bg-emphasis p-xxs rounded-base;
}

.tool {
  @apply h-fit;
}

.image-preview-container {
  @apply top-[50%] left-[50%] flex items-center justify-center;
  transition: transform 0.5s ease;
  transform: translate(-50%, -50%);
  max-width: calc(100% - var(--spacing-xl));
  max-height: calc(100% - var(--spacing-xl));
}

.image-preview {
  @apply max-w-full max-h-[80vh] object-contain;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.15s ease-out;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.fade-in-enter-to,
.fade-in-leave-from {
  opacity: 1;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
</style>
