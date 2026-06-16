<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { blendColors, getContrastColor } from "../../utils";

const props = withDefaults(
  defineProps<{
    labelValue?: string;
    color?: string;
    size?: "small" | "medium" | "large";
    type?: "default" | "secondary" | "heavy";
    loading?: boolean;
    closeable?: boolean;
    icon?: string;
    isAppendedIcon?: boolean;
  }>(),
  {
    labelValue: "",
    color: "",
    size: "medium",
    type: "default",
    loading: false,
    icon: "",
    closeable: false,
    isAppendedIcon: false,
  }
);

const emit = defineEmits(["close"]);

const prependIcon = computed(() => {
  if (!props.isAppendedIcon) return props.icon;
  return "";
});

const appendedIcon = computed(() => {
  if (props.closeable) return "close";
  else if (props.isAppendedIcon) return props.icon;
  return "";
});

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

const background = computed((): string => {
  if (props.type === "secondary") return "transparent";
  if (!mounted.value || props.type === "heavy") return props.color;
  return props.color ? `color-mix(in srgb, ${props.color} 30%, transparent)` : props.color;
});

const textColor = computed(() => props.type === 'heavy' ? getContrastColor(props.color) : props.color);
</script>

<template>
  <div :class="[type, size]" class="badge">
    <Spinner v-if="loading" />
    <template v-else>
      <Icon :name="prependIcon" v-if="prependIcon" />
      <p class="font-semibold whitespace-nowrap truncate">
        <slot>{{ labelValue }}</slot>
      </p>
      <Icon :class="{ 'cursor-pointer': closeable }" :name="appendedIcon" v-if="appendedIcon"
        @click="closeable && emit('close')" />
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.badge {
  @apply flex items-center justify-center gap-xxs text-center w-fit h-fit rounded-full border-xxs;
  color: v-bind(textColor);
  border-color: v-bind(color);
  background: v-bind(background);
}

.small {
  @apply text-xs py-xxs px-sm;

  .icon {
    @apply text-lg leading-xxs;
  }
}

.medium {
  @apply text-sm py-xs px-base;

  .icon {
    @apply text-base leading-xxs;
  }
}

.large {
  @apply text-lg py-sm px-lg;

  .icon {
    @apply text-2xl leading-xxs;
  }
}

.badge.secondary {
  @apply bg-transparent;
}
</style>
