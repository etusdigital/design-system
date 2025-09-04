<script setup lang="ts">
import { computed } from "vue";
import { type Item } from "#utils/types/DropItem";

const props = defineProps<{
  options?: Item[] | undefined;
}>();

const parsedItems = computed((): Item[][] => {
  const topItems = props.options?.filter((item: Item) => !item.bottom) || [];
  const bottomItems = props.options?.filter((item: Item) => item.bottom) || [];
  return [topItems, bottomItems];
});
</script>

<template>
  <Card class="custom-card">
    <template v-for="(items, index) in parsedItems">
      <slot :items="items" />
      <Divider v-if="index == 0 && items.length > 1" />
    </template>
  </Card>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-card {
  @apply shadow-neutral-default rounded-t-base rounded-base;
}
</style>
