<script setup lang="ts">
import { ref, watch } from "vue";
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
const palette = ref(generateColorPalette());

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
          <Button variant="plain" size="small" @click="closeColorPicker"
            ><slot name="cancel-label"
          /></Button>
          <Button
            variant="secondary"
            size="small"
            @click="setCustom(customColor)"
            ><slot name="add-label"
          /></Button>
        </div>
      </div>
      <div class="flex flex-col gap-xxs w-fit" v-else>
        <div class="color-column">
          <div class="color-row" v-for="row in palette">
            <Color
              v-for="color in row"
              :key="color"
              :model-value="model"
              :color="color"
              @click="setModel(color)"
            />
          </div>
        </div>
        <Divider />
        <div class="color-row p-xs">
          <Tooltip label-value="Add custom color" position="bottom">
            <Icon
              name="add_circle"
              class="text-neutral-interactive-default cursor-pointer"
              @click="showColorPicker = true"
            />
          </Tooltip>
          <Color
            v-for="color in custom"
            :key="color"
            :model-value="model"
            :color="color"
            @click="setModel(color)"
          />
        </div>
      </div>
    </template>
  </FloatCard>
</template>

<style scoped>
@reference "../../assets/main.css";

.color-column {
  @apply flex flex-col gap-xxs p-xs;
}

.color-row {
  @apply flex gap-xxs;
}
</style>
