<script setup lang="ts">
withDefaults(
  defineProps<{
    labelValue?: string;
    infoMessage?: string;
    tooltipMinWidth?: string;
    required?: boolean;
    id?: string;
    for?: string;
  }>(),
  {
    labelValue: "",
    infoMessage: "",
    tooltipMinWidth: "none",
    required: false,
    id: undefined,
    for: undefined,
  }
);
</script>

<template>
  <div v-if="labelValue" class="label-value">
    <label :id="id" :for="$props.for">{{ labelValue }}</label>
    <Tooltip v-if="infoMessage" class="ml-xxs">
      <template #label>
        <div
          class="tooltip-text"
          :class="{
            'whitespace-nowrap break-words text-wrap':
              tooltipMinWidth != 'none',
          }"
          :style="{ minWidth: tooltipMinWidth }"
        >
          {{ infoMessage }}
        </div>
      </template>
      <Icon name="info" class="info-icon" tabindex="0" aria-label="More information" />
    </Tooltip>
    <span v-if="required" class="text-primary-foreground-low ml-xxs" aria-hidden="true">*</span>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.label-value {
  @apply flex items-center text-sm font-semibold leading-base;
}

.tooltip-text {
  @apply text-neutral-foreground-negative;
}

.info-icon.icon {
  @apply flex items-center text-primary-foreground-low text-base leading-xxs;
}
</style>
