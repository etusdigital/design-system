<script setup lang="ts">
withDefaults(
  defineProps<{
    labelValue?: string;
    infoMessage?: string;
    tooltipMinWidth?: string;
    required?: boolean;
  }>(),
  {
    labelValue: "",
    infoMessage: "",
    tooltipMinWidth: "none",
    required: false,
  }
);
</script>

<template>
  <h5 v-if="labelValue" class="label-value">
    {{ labelValue }}
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
      <Icon name="info" class="info-icon" />
    </Tooltip>
    <span v-if="required" class="text-primary-foreground-low ml-xxs">*</span>
  </h5>
</template>

<style scoped>
@reference "../../assets/main.css";

.label-value {
  @apply flex items-center;
}

.tooltip-text {
  @apply p-1 text-neutral-foreground-negative;
}

.info-icon.icon {
  @apply flex items-center text-primary-foreground-low text-lg;
}
</style>