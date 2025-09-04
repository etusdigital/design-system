<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Icon from '../Icon/Icon.vue';
import Overlay from '../../utils/components/Overlay.vue';

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  preview?: boolean;
  previewButtonProps?: Record<string, any>;
}

const props = withDefaults(defineProps<ImageProps>(), {
  preview: false,
});

const emit = defineEmits<{
  show: [];
  hide: [];
}>();

const previewVisible = ref(false);
const previewImageRef = ref<HTMLImageElement>();
const previewContainer = ref<HTMLDivElement>();

const rotate = ref(0);
const scale = ref(1);

const imageStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }
  return style;
});

const previewImageStyle = computed(() => ({
  transform: `rotate(${rotate.value}deg) scale(${scale.value})`,
  transition: 'transform 0.15s',
}));

const showPreview = () => {
  previewVisible.value = true;
  emit('show');
  document.body.style.overflow = 'hidden';
};

const hidePreview = () => {
  previewVisible.value = false;
  emit('hide');
  rotate.value = 0;
  scale.value = 1;
  document.body.style.overflow = '';
};

const onPreviewImageClick = (event: MouseEvent) => {
  previewImageRef.value = event.target as HTMLImageElement;
};

const rotateRight = () => {
  rotate.value += 90;
};

const rotateLeft = () => {
  rotate.value -= 90;
};

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 1.5);
};

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5);
};

const closePreview = () => {
  hidePreview();
};

const onKeyDown = (event: KeyboardEvent) => {
  if (!previewVisible.value) return;
  
  switch (event.code) {
    case 'Escape':
      hidePreview();
      break;
  }
};

onMounted(() => {
  window.addEventListener('keydown', onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown);
  document.body.style.overflow = '';
});
</script>

<template>
  <span class="image-wrapper">
    <slot name="image">
      <img 
        :src="src" 
        :alt="alt"
        :style="imageStyle"
        class="image"
        :class="{ 'image-preview-indicator': preview }"
        @click="preview && showPreview()"
      />
    </slot>

    <div 
      v-if="preview" 
      class="image-preview-overlay"
      @click="showPreview"
    >
      <slot name="previewicon">
        <Icon name="visibility" />
      </slot>
    </div>

    <Teleport to="body">
      <Overlay v-model="previewVisible" :z-index="1000" @click="closePreview">
        <Transition name="fade-in">
          <div
            v-if="previewVisible"
            class="image-preview-modal"
            role="dialog"
            :aria-modal="true"
          >
            <div class="image-preview-toolbar">
              <Icon
                name="rotate_left"
                size="32px"
                :aria-label="'Rotate Left'"
                @click="rotateLeft"
                class="preview-control-icon"
              />
              <Icon
                name="rotate_right"
                size="32px"
                :aria-label="'Rotate Right'"
                @click="rotateRight"
                class="preview-control-icon"
              />
              <Icon
                name="zoom_out"
                size="32px"
                :aria-label="'Zoom Out'"
                @click="zoomOut"
                class="preview-control-icon"
              />
              <Icon
                name="zoom_in"
                size="32px"
                :aria-label="'Zoom In'"
                @click="zoomIn"
                class="preview-control-icon"
              />
              <Icon
                name="close"
                size="32px"
                :aria-label="'Close'"
                @click="hidePreview"
                class="preview-control-icon"
              />
            </div>

            <div class="image-preview-container" ref="previewContainer">
              <div class="image-preview-content">
                <slot 
                  name="preview" 
                  :style="previewImageStyle"
                  :onClick="onPreviewImageClick"
                >
                  <img 
                    :src="src" 
                    :alt="alt"
                    :style="previewImageStyle"
                    class="image-preview"
                    @click="onPreviewImageClick"
                  />
                </slot>
              </div>
            </div>
          </div>
        </Transition>
      </Overlay>
    </Teleport>
  </span>
</template>

<style scoped>
@reference "../../assets/main.css";

.image-wrapper {
  @apply relative inline-block;
}

.image {
  @apply max-w-full h-auto;
}

.image-preview-indicator {
  @apply cursor-pointer;
}

.image-preview-overlay {
  @apply absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity cursor-pointer;
}

.image-wrapper:hover .image-preview-overlay {
  @apply opacity-100;
}

.image-preview-overlay .icon {
  @apply text-white text-2xl;
}

.image-preview-modal {
  @apply fixed inset-0 flex items-center justify-center z-[1001];
}

.image-preview-toolbar {
  @apply fixed top-4 right-4 flex gap-2 z-[1002] bg-black/30 p-2 rounded-lg backdrop-blur-sm;
}

.image-preview-container {
  @apply flex items-center justify-center max-w-[90vw] max-h-[90vh];
}

.preview-control-icon {
  @apply bg-black/50 text-white p-2 rounded cursor-pointer transition-all hover:bg-black/70;
}

.image-preview-content {
  @apply flex items-center justify-center;
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
</style>
