<script setup lang="ts">
import { getPosition } from "../../utils/index";
import { ref, onMounted, onBeforeUnmount, onUpdated, computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    src: string;
    width?: string;
    height?: string;
  }>(),
  {
    modelValue: undefined,
    src: undefined,
    width: "360px",
    height: "200px",
  }
);

const isDraggingArea = ref(false);
const bCrop = ref<HTMLDivElement>();
const cropArea = ref<HTMLDivElement>();
const selectedArea = ref<Element>();
const zoom = ref(0);
const parsedImg = ref(new Image());
const img = new Image();
img.src = props.src;
const svgProperty = ref({
  width: 0,
  height: 0,
});
const resizeObserver = new ResizeObserver(resize);
const computedBorderRadius = computed((): string => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    return (
      (bCrop.value as any)
        ?.computedStyleMap()
        .get("--border-radius-xl")
        ?.toString() || "16px"
    );
  }
  return "16px";
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

onMounted(async () => {
  window.addEventListener("mousemove", updateCropArea);
  window.addEventListener("mouseup", () => {
    isDraggingArea.value = false;
  });

  window.addEventListener("touchmove", updateCropAreaTouch);
  window.addEventListener("touchend", () => {
    isDraggingArea.value = false;
  });

  if (bCrop.value) resizeObserver.observe(bCrop.value, { box: "border-box" });
  img.onload = () => {
    changeZoom(zoom.value);
  };
});

onUpdated(resize);

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect();

  window.removeEventListener("mousemove", updateCropArea);
  window.removeEventListener("mouseup", () => {
    isDraggingArea.value = false;
  });

  window.removeEventListener("touchmove", updateCropAreaTouch);
  window.removeEventListener("touchend", () => {
    isDraggingArea.value = false;
  });
});

function resize() {
  svgProperty.value.width = bCrop.value?.clientWidth
    ? bCrop.value?.clientWidth + 10
    : 0;
  svgProperty.value.height = bCrop.value?.clientHeight
    ? bCrop.value?.clientHeight + 10
    : 0;
}

function startDraggingAreaTouch(event: TouchEvent) {
  isDraggingArea.value = true;
  updateCropAreaTouch(event);
}

function startDraggingArea(event: MouseEvent) {
  isDraggingArea.value = true;
  updateCropArea(event);
}

function updateCropAreaTouch(event: TouchEvent) {
  updateCropArea(event.touches[0]);
}

function updateCropArea(event: any) {
  if (
    !cropArea.value ||
    !cropArea.value.parentElement ||
    !selectedArea.value ||
    !isDraggingArea.value
  )
    return;

  const clamped = getPosition(
    event,
    cropArea.value,
    cropArea.value.parentElement,
    { left: true, top: true },
    { x: -1, y: -3 }
  );
  cropArea.value.style.top = `${clamped.y}px`;
  cropArea.value.style.left = `${clamped.x}px`;
  selectedArea.value.setAttribute("x", clamped.x.toString());
  selectedArea.value.setAttribute("y", clamped.y.toString());

  crop(cropArea.value, cropArea.value.parentElement);
}

function changeZoom(zoom: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!cropArea.value || !cropArea.value.parentElement || !ctx) return;

  const parsedZoom = zoom + 1;

  const parentRect = cropArea.value.parentElement.getBoundingClientRect();
  const rect = cropArea.value.getBoundingClientRect();
  canvas.width = parentRect.width;
  canvas.height = parentRect.height;

  const sourceX = (parentRect.width - img.width) / 2;
  const sourceY = (parentRect.height - img.height) / 2;

  ctx.drawImage(img, sourceX, sourceY);
  const zoomX = rect.left + rect.width / 2 - parentRect.left;
  const zoomY = rect.top + rect.height / 2 - parentRect.top;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(zoomX, zoomY);
  ctx.scale(parsedZoom, parsedZoom);
  ctx.translate(-zoomX, -zoomY);
  ctx.drawImage(img, sourceX, sourceY);
  ctx.restore();

  const croppedImage = canvas.toDataURL("image/png");
  parsedImg.value = new Image();
  parsedImg.value.src = croppedImage;
  parsedImg.value.onload = () => {
    if (!cropArea.value || !cropArea.value.parentElement) return;
    crop(cropArea.value, cropArea.value.parentElement);
  };
}

function crop(cropArea: HTMLDivElement, parent: HTMLElement) {
  const rect = cropArea.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = rect.width;
  canvas.height = rect.height;

  const parentRect = parent.getBoundingClientRect();
  const cropLeft = rect.left - parentRect.left;
  const cropTop = rect.top - parentRect.top;

  const sourceX = cropLeft;
  const sourceY = cropTop;
  const sourceWidth = rect.width;
  const sourceHeight = rect.height;

  ctx.drawImage(
    parsedImg.value as HTMLImageElement,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    0,
    0,
    rect.width,
    rect.height
  );

  const croppedImage = canvas.toDataURL("image/png");
  emit("update:modelValue", croppedImage);
}
</script>

<template>
  <div ref="bCrop" class="crop">
    <div
      class="relative w-full h-full bg-black rounded-xl"
      :style="{ 'min-width': width, 'min-height': height }"
    >
      <div class="crop-img" @click="startDraggingArea">
        <svg
          class="absolute z-[1]"
          :width="svgProperty.width || 0 + 'px'"
          :height="svgProperty.height || 0 + 'px'"
          :viewBox="`0 0 ${svgProperty.width || 0} ${svgProperty.height || 0}`"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="highlight-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect
                ref="selectedArea"
                x="0"
                y="0"
                :width="width"
                :height="height"
                :rx="computedBorderRadius"
                :ry="computedBorderRadius"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(255, 255, 255, 0.7)"
            mask="url(#highlight-mask)"
          />
        </svg>
        <img :src="parsedImg.src" alt="model value" />
        <img :src="src" style="position: relative; visibility: hidden" />
      </div>
      <div
        ref="cropArea"
        class="crop-area"
        :style="{ width: width, height: height }"
        @mousedown="startDraggingArea"
        @touchstart="startDraggingAreaTouch"
      />
    </div>
    <footer>
      <Icon name="zoom_out" class="select-none" />
      <Slider
        v-model="zoom"
        @update:model-value="changeZoom"
        size="small"
        :max="2"
      />
      <Icon name="zoom_in" class="select-none" />
    </footer>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.crop {
  @apply flex flex-col gap-xs rounded-xl w-full h-full;
}

.crop-area {
  @apply z-[2] absolute w-full border-xxs border-primary-default bg-transparent top-0 cursor-move rounded-xl;
}

.crop-img {
  @apply relative w-full h-full overflow-hidden rounded-xl bg-black;

  img {
    @apply absolute select-none;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
  }
}

footer {
  @apply flex items-center gap-base;
  margin: 0 10%;
}
</style>
