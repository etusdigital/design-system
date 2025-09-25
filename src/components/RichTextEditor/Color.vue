<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string;
    color: string;
  }>(),
  {
    modelValue: "",
    color: "",
  }
);

function getContrastColor(): string {
  let r = 0,
    g = 0,
    b = 0;

  const color = props.color;

  if (color.startsWith("rgb(")) {
    const matches = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (matches) {
      r = parseInt(matches[1]);
      g = parseInt(matches[2]);
      b = parseInt(matches[3]);
    }
  } else if (color.startsWith("hsl(")) {
    const matches = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (matches) {
      const h = parseInt(matches[1]) / 360;
      const s = parseInt(matches[2]) / 100;
      const l = parseInt(matches[3]) / 100;

      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      if (s === 0) {
        r = g = b = l;
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      r = Math.round(r * 255);
      g = Math.round(g * 255);
      b = Math.round(b * 255);
    }
  } else if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    if (/^[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/i.test(hex)) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5 ? "text-white" : "text-black";
}
</script>

<template>
  <div :style="{ backgroundColor: color }" class="color-option">
    <Icon
      v-if="modelValue === color"
      name="check"
      :class="getContrastColor()"
    />
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.color-option {
  @apply flex items-center justify-center w-xl h-xl rounded-full cursor-pointer border-xxs border-neutral-default
  hover:scale-110 hover:shadow-default transition-all duration-200;
}

.color-option:active {
  @apply scale-95;
}

.color-option .icon {
  @apply text-xl;
}

.color-option {
  font-size: 0;
}
</style>
