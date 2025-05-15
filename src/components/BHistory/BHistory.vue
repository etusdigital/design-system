<script setup lang="ts">
import { useOptionalModel } from "#composables";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    items: any[];
    position?: "top" | "bottom" | "left" | "right";
    type?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    disabled?: boolean;
  }>(),
  {
    modelValue: undefined,
    position: "right",
    type: "primary",
    disabled: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const [model, setModel] = useOptionalModel<any>(
  props,
  "modelValue",
  emit,
  null
);
</script>

<template>
  <div class="b-history" :class="{ flex: position === 'top' || position === 'bottom' }">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="item"
      :class="[
        position,
        item.type ? item.type : type,
        {
          'last-item': !items[index + 1],
          'first-item': index == 0,
          active: (index == 0 && !model && !disabled) || item === model,
          disabled: disabled,
        },
      ]"
      @click="!disabled && setModel(item, { index })"
    >
      <div
        class="circle"
        :class="{
          'circle-icon': !!item.icon && !item.isIconRound,
          'round-icon': !!item.icon && item.isIconRound,
        }"
      >
        <BIcon :name="item.icon" v-if="item.icon" :filled="!item.unfilled" />
      </div>
      <div
        class="custom-border"
        :class="{ 'have-icon': !!item.icon && !item.isIconRound }"
      />
      <div class="data-list">
        <slot
          name="item"
          :item="item"
          :index="index"
          :active="(index == 0 && !model && !disabled) || item === model"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
.first-item {
  .data-list {
    @apply border-none;
  }

  .circle {
    @apply z-[1];
  }
}

.last-item {
  .data-list {
    @apply border-none;
  }
}

.item.first-item.last-item {
  .custom-border {
    @apply hidden;
  }
}

.item {
  @apply w-full relative cursor-pointer;
}

.item.disabled {
  @apply hover:bg-transparent cursor-default;
}

.item.disabled.primary {
  @apply hover:bg-transparent;

  .circle {
    @apply bg-primary-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-primary-interaction-default bg-neutral-surface-default;
  }
}

.item.disabled.info {
  @apply hover:bg-transparent;

  .circle {
    @apply bg-informative-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-informative-interaction-default bg-neutral-surface-default;
  }
}

.item.disabled.success {
  @apply hover:bg-transparent;

  .circle {
    @apply bg-success-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-success-interaction-default bg-neutral-surface-default;
  }
}

.item.disabled.warning {
  @apply hover:bg-transparent;

  .circle {
    @apply bg-warning-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-warning-interaction-default bg-neutral-surface-default;
  }
}

.item.disabled.danger {
  @apply hover:bg-transparent;

  .circle {
    @apply bg-danger-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-danger-interaction-default bg-neutral-surface-default;
  }
}

.item.disabled.neutral {
  @apply hover:bg-transparent;

  .circle {
    @apply bg-neutral-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-neutral-interaction-default bg-neutral-surface-default;
  }
}

.item.primary {
  @apply hover:bg-primary-surface-default;
}

.item.info {
  @apply hover:bg-informative-surface-default;
}

.item.success {
  @apply hover:bg-success-surface-default;
}

.item.warning {
  @apply hover:bg-warning-surface-default;
}

.item.danger {
  @apply hover:bg-danger-surface-default;
}

.item.neutral {
  @apply hover:bg-neutral-surface-highlight;
}

.primary.active {
  @apply bg-primary-surface-default;

  .circle {
    @apply bg-primary-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-primary-interaction-default bg-neutral-surface-default;
  }
}

.info.active {
  @apply bg-informative-surface-default;

  .circle {
    @apply bg-informative-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-informative-interaction-default bg-neutral-surface-default;
  }
}

.success.active {
  @apply bg-success-surface-default;

  .circle {
    @apply bg-success-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-success-interaction-default bg-neutral-surface-default;
  }
}

.warning.active {
  @apply bg-warning-surface-default;

  .circle {
    @apply bg-warning-interaction-default z-[2];
  }
  .circle.round-icon {
    @apply text-warning-interaction-default bg-neutral-surface-default;
  }
}

.danger.active {
  @apply bg-danger-surface-default;

  .circle {
    @apply bg-danger-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-danger-interaction-default bg-neutral-surface-default;
  }
}

.neutral.active {
  @apply bg-neutral-surface-highlight;

  .circle {
    @apply bg-neutral-interaction-default z-[2];
  }

  .circle.round-icon {
    @apply text-neutral-interaction-default bg-neutral-surface-default;
  }
}

.circle {
  @apply bg-neutral-surface-disabled absolute w-[10px] h-[10px] rounded-full;
}

.custom-border {
  @apply border-neutral-default absolute;
}

.data-list {
  @apply border-neutral-default;
}

.circle.circle-icon {
  @apply flex items-center justify-center p-sm text-neutral-foreground-negative bg-neutral-surface-disabled;

  span {
    @apply text-base;
  }
}

.circle.round-icon {
  @apply bg-neutral-surface-default w-fit h-[20px] text-neutral-surface-disabled;

  .b-icon {
    @apply text-3xl;
  }
}

.right {
  @apply pl-[20.5px] pr-[16px];

  .circle {
    @apply top-[22px] left-[21px];
  }

  .circle.round-icon {
    @apply top-[22px] left-[11px];
  }

  .circle.circle-icon {
    @apply top-[22px] left-[15px];
  }

  .data-list {
    @apply border-l-[1.5px] pb-[16px] pt-[20px] ml-[5px] pl-[20px];
  }
}

.right.first-item {
  @apply pt-[20px];

  .custom-border {
    @apply border-r-xxs h-full w-[.5px] mt-[10px] ml-[5px];
  }

  .data-list {
    @apply pt-[0px];
  }

  .circle {
    @apply top-[26px];
  }

  .circle.circle-icon,
  .circle.round-icon {
    @apply top-[22px];
  }
}

.right.last-item {
  .custom-border {
    @apply border-r-xxs h-[22px] w-[.5px] mt-[0] ml-[5px];
  }
}

.left {
  @apply pl-[16px] pr-[20.5px];

  .circle {
    @apply top-[22px] right-[21px];
  }

  .circle.round-icon {
    @apply top-[22px] right-[13.5px];
  }

  .circle.circle-icon {
    @apply top-[22px] right-[14.5px];
  }

  .data-list {
    @apply border-r-[1.5px] mr-[5px] pr-[20px] pb-[16px] pt-[20px];
  }
}

.left.first-item {
  @apply pt-[20px];

  .custom-border {
    @apply border-l-xxs h-full w-[.5px] right-[26px] mt-[10px];
  }

  .data-list {
    @apply pt-[0px];
  }

  .circle {
    @apply top-[26px];
  }

  .circle.circle-icon,
  .circle.round-icon {
    @apply top-[22px];
  }
}

.left.last-item {
  .custom-border {
    @apply border-l-xxs h-[22px] w-[.5px] right-[26px];
  }
}

.top {
  .circle {
    @apply top-[16px] left-[16px];
  }

  .circle.round-icon {
    @apply top-[7px] left-[16px];
  }

  .circle.circle-icon {
    @apply top-[9.5px] left-[16px];
  }

  .data-list {
    @apply border-t-[1.5px] pt-[20px] px-[16px] ml-0;
  }

  .custom-border {
    @apply h-[.5px] w-full;
  }
}

.top.item {
  @apply pt-[20px] pb-[16px];
}

.top.first-item {
  .custom-border {
    @apply border-t-xxs ml-[26px] 2xl:mt-[0.5%];
  }

  .custom-border.have-icon {
    @apply mt-[1px];
  }

  .circle {
    @apply left-[26px];
  }

  .circle.round-icon,
  .circle.circle-icon {
    @apply left-[17px];
  }
}

.top.last-item {
  .custom-border {
    @apply border-t-xxs w-[22px] left-[-5px] 2xl:mt-[0.5%];
  }

  .custom-border.have-icon {
    @apply mt-[1px];
  }
}

.bottom {
  @apply pb-[20.5px] pt-[16px];

  .circle {
    @apply bottom-[16px] left-[16px];
  }

  .circle.round-icon {
    @apply bottom-[14px] left-[16px];
  }

  .circle.circle-icon {
    @apply bottom-[10px] left-[16px];
  }

  .data-list {
    @apply border-b-[1.5px] pb-[20px] px-[16px];
  }

  .custom-border {
    @apply h-[.5px] w-full;
  }
}

.bottom.first-item {
  .custom-border {
    @apply border-b-xxs ml-[26px] bottom-[20.5px];
  }

  .circle {
    @apply left-[26px];
  }

  .circle.round-icon,
  .circle.circle-icon {
    @apply left-[17px];
  }
}

.bottom.last-item {
  .custom-border {
    @apply border-b-xxs w-[22px] left-[-5px] bottom-[20.5px];
  }
}
</style>
