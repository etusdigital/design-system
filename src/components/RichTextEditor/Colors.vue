<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import Color from "./Color.vue";
import { blendColors } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue: string;
    expanded: boolean;
    custom: string[];
  }>(),
  {
    modelValue: "",
    expanded: false,
    custom: () => [],
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  "update:expanded": [value: boolean];
  "update:custom": [value: string[]];
}>();

const model = ref(props.modelValue);
const isExpanded = ref(props.expanded);
const customColors = ref(props.custom);
const customColor = ref(props.modelValue);
const showColorPicker = ref(false);
const palette = ref<string[][]>([]);
const grid = ref<HTMLElement>();

onMounted(() => {
  palette.value = generateColorPalette();
});

watch(
  () => props.modelValue,
  (newValue) => {
    model.value = newValue;
    customColor.value = newValue;
  }
);

watch(
  () => props.custom,
  (newValue) => {
    customColors.value = newValue;
  }
);

watch(isExpanded, (value) => {
  if (value) setTimeout(focusSelectedColor);
});

function generateColorPalette() {
  const palette = [];
  const gray = [];
  for (let i = 10; i >= 0; i--) gray.push(blendColors("#000000", i / 10));

  palette.push(gray);
  const hue = [
    "hsl(0, 100%, 50%)",
    "hsl(30, 100%, 50%)",
    "hsl(60, 100%, 50%)",
    "hsl(90, 100%, 50%)",
    "hsl(120, 100%, 50%)",
    "hsl(150, 100%, 50%)",
    "hsl(180, 100%, 50%)",
    "hsl(210, 100%, 50%)",
    "hsl(240, 100%, 50%)",
    "hsl(270, 100%, 50%)",
    "hsl(300, 100%, 50%)",
  ];
  palette.push(hue);

  const light = [];
  for (let i = 0; i < 3; i++) {
    const colors: string[] = [];
    hue.forEach((color) => colors.push(blendColors(color, i * 0.2 + 0.2)));
    light.push(colors);
  }
  palette.push(...light);
  const dark = [];

  for (let i = 2; i >= 0; i--) {
    const colors: string[] = [];
    hue.forEach((color) =>
      colors.push(blendColors(color, i * 0.2 + 0.2, [0, 0, 0]))
    );
    dark.push(colors);
  }
  palette.push(...dark);
  return palette;
}

function setModel(value: string) {
  model.value = value;
  customColor.value = value;
  setExpanded(false);
  emit("update:modelValue", value);
}

function setExpanded(value: boolean) {
  isExpanded.value = value;
  emit("update:expanded", value);
}

function setCustom(value: string) {
  setModel(value);
  if (customColors.value.includes(value)) return;
  customColors.value = [...customColors.value, value];
  closeColorPicker();
  emit("update:custom", customColors.value);
}

function focusSelectedColor() {
  const selected = grid.value?.querySelector<HTMLElement>(".color-option:has(.icon)");
  (selected ?? getGridRows()[0]?.[0])?.focus();
}

function getGridRows(): HTMLElement[][] {
  return Array.from(grid.value?.querySelectorAll<HTMLElement>(".color-row") ?? [])
    .map((row) => Array.from(row.querySelectorAll<HTMLElement>('[tabindex="0"]')))
    .filter((row) => row.length);
}

function onGridKeyDown(event: KeyboardEvent) {
  const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
  if (!keys.includes(event.key)) return;

  const rows = getGridRows();
  const rowIndex = rows.findIndex((row) => row.includes(event.target as HTMLElement));
  if (rowIndex === -1) return;
  event.preventDefault();

  const row = rows[rowIndex];
  const column = row.indexOf(event.target as HTMLElement);
  let next: HTMLElement | undefined;
  switch (event.key) {
    case "ArrowLeft":
      next = row[Math.max(column - 1, 0)];
      break;
    case "ArrowRight":
      next = row[Math.min(column + 1, row.length - 1)];
      break;
    case "ArrowUp":
    case "ArrowDown": {
      const target = rows[rowIndex + (event.key === "ArrowUp" ? -1 : 1)];
      next = target?.[Math.min(column, target.length - 1)];
      break;
    }
    case "Home":
      next = row[0];
      break;
    case "End":
      next = row[row.length - 1];
      break;
  }
  next?.focus();
}

function closeColorPicker() {
  setTimeout(() => {
    showColorPicker.value = false;
  });
}
</script>

<template>
  <FloatCard v-model="isExpanded" @update:model-value="setExpanded">
    <slot />
    <template #card>
      <div class="flex flex-col gap-xxs" v-if="showColorPicker">
        <ColorPicker v-model="customColor" no-shadow />
        <div class="flex justify-end gap-xxs px-xs pb-xs">
          <Button variant="plain" size="small" color="neutral" @click="closeColorPicker">
            <slot name="cancel-label" />
          </Button>
          <Button size="small" @click="setCustom(customColor)">
            <slot name="add-label" />
          </Button>
        </div>
      </div>
      <div ref="grid" class="color-picker" v-else @keydown="onGridKeyDown">
        <div class="color-column">
          <div class="color-row" v-for="row in palette">
            <Color v-for="color in row" :key="color" :model-value="model" :color="color" @click="setModel(color)"
              @keyup.enter.space="setModel(color)" />
          </div>
        </div>
        <hr class="color-divider" />
        <div class="color-row custom-row">
          <Tooltip label-value="Add custom color" position="bottom">
            <Icon name="add_circle" class="text-neutral-interactive-default cursor-pointer rich-text-editor-icon"
              tabindex="0" @click="showColorPicker = true" @keyup.enter.space="showColorPicker = true" />
          </Tooltip>
          <Color v-for="color in custom" :key="color" :model-value="model" :color="color" @click="setModel(color)"
            @keyup.enter.space="setModel(color)" />
        </div>
      </div>
    </template>
  </FloatCard>
</template>

<style scoped>
@reference "../../assets/main.css";

.color-picker {
  @apply flex flex-col gap-xxs w-fit p-xs min-w-15xl;
}

.color-column {
  @apply flex flex-col;
}

.color-row {
  @apply flex;
}

.custom-row {
  @apply items-center py-xxs px-xs gap-xxs;
}

.color-divider {
  @apply border-neutral-default my-xxs;
}

.rich-text-editor-icon {
  @apply leading-xs;
}
</style>
