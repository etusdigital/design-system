<script setup lang="ts">
import { computed } from "vue";
import { type Item } from "#utils/types/DropItem";

const props = defineProps<{
  items?: Item[] | undefined;
}>();

const parsedItems = computed((): Item[][] => {
  const topItems = props.items?.filter((item: Item) => !item.bottom) || [];
  const bottomItems = props.items?.filter((item: Item) => item.bottom) || [];
  return [topItems, bottomItems];
});
</script>

<template>
  <BCard class="custom-card">
    <template v-for="(items, index) in parsedItems">
      <slot :items="items" />
      <BDivider v-if="index == 0 && items.length > 1" />
    </template>
  </BCard>
</template>

<style scoped>
@reference "../../assets/main.css";

.custom-card {
  @apply shadow-neutral-default rounded-t-base rounded-b-base;
}
</style>
