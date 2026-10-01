<script setup lang="ts">
import { computed } from "vue";
import { type Option } from "#utils/types/DropOption";

const props = defineProps<{
  options?: Option[] | undefined;
}>();

const parsedOptions = computed((): Option[][] => {
  const topOptions = props.options?.filter((option: Option) => !option.bottom) || [];
  const bottomOptions = props.options?.filter((option: Option) => option.bottom) || [];
  return [topOptions, bottomOptions].filter((options: Option[]) => options.length);
});
</script>

<template>
  <div class="custom-card" role="menu">
    <template v-for="(options, index) in parsedOptions">
      <slot :options="options" />
      <Separator v-if="index == 0 && parsedOptions.length > 1" />
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-card {
  @apply shadow-neutral-default rounded-base;
}
</style>
