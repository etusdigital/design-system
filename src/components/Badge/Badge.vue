<script setup lang="ts">
import { computed } from "vue";
import { blendColors } from "../../utils";

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

const background = computed((): string => {
  return blendColors(props.color);
});
</script>

<template>
  <div :class="[type, size]" class="badge">
    <Spinner v-if="loading" class="colored" />
    <template v-else>
      <Icon class="colored" :name="prependIcon" v-if="prependIcon" />
      <p class="colored font-semibold whitespace-nowrap truncate">
        <slot>{{ labelValue }}</slot>
      </p>
      <Icon
        class="colored"
        :class="{ 'cursor-pointer': closeable }"
        :name="appendedIcon"
        v-if="appendedIcon"
        @click="closeable && emit('close')"
      />
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.badge {
  @apply flex items-center justify-center gap-xxs text-center w-fit h-fit rounded-full border-xxs;
  color: v-bind(color);
  border-color: v-bind(color);
  background: v-bind(background);
}

.small {
  @apply text-xs py-xxs px-sm;

  .icon {
    @apply text-lg;
  }
}

.medium {
  @apply text-sm py-xs px-base;

  .icon {
    @apply text-base;
  }
}

.large {
  @apply text-lg py-sm px-lg;

  .icon {
    @apply text-2xl;
  }
}

.badge.secondary {
  @apply bg-transparent;
}

.badge.heavy {
  background-color: v-bind(color);
}

.badge.heavy .colored {
  @apply text-white;
}
</style>
