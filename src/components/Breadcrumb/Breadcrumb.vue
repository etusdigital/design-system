<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import { useOptionalModel } from "#composables";
import Option from "../../utils/components/Option.vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    items?: any[];
    labelKey?: string;
    valueKey?: string;
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    items: undefined,
    labelKey: "label",
    valueKey: "value",
    getObject: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any];
}>();

const [model] = useOptionalModel<any>(props, "modelValue", emit, undefined);
const expanded = ref<any[]>([]);

const parsedItems = computed(() => {
  if (!props.items?.length) return [];

  const items = [...props.items];
  let selectedIndex = items.findIndex((item) => isActive(item));
  if (selectedIndex === -1) selectedIndex = 0;

  const result = [];

  for (let i = 0; i < items.length; i++) {
    if (
      i === 0 ||
      i === items.length - 1 ||
      (selectedIndex === 0 && i < 2) ||
      (selectedIndex === items.length - 1 && i >= items.length - 2) ||
      selectedIndex - 1 === i ||
      selectedIndex + 1 === i ||
      selectedIndex === i
    ) {
      result.push(items[i]);
    } else if (i === 1 && selectedIndex > 1) {
      result.push({
        icon: "more_horiz",
        items: items.slice(1, selectedIndex - 1)
      });
    } else if (i === items.length - 2 && selectedIndex < items.length - 2) {
      result.push({
        icon: "more_horiz",
        items: items.slice(selectedIndex + 2, items.length - 1)
      });
    }
  }

  return result;
});

function setModel(item: any) {
  const value = props.getObject ? item : getValue(item);
  expanded.value = expanded.value.map(() => false);

  setTimeout(() => {
    model.value = value;
    emit("update:modelValue", value);
  }, 200);
}

function getLabel(value: any): string {
  return isObject(value) ? value[props.labelKey] : value;
}

function getValue(item: any): any {
  return isObject(item) ? item[props.valueKey] : item;
}

function isActive(item: any): boolean {
  const value = getValue(item);
  const selectedValue = getValue(model.value);
  return selectedValue == value;
}
</script>

<template>
  <div class="breadcrumb">
    <template v-for="(item, index) in parsedItems" :key="item">
      <div v-if="isObject(item) && item.icon == 'more_horiz'">
        <FloatCard v-model="expanded[index]">
          <Icon name="more_horiz" class="cursor-pointer" />
            <template #card>
              <div class="more-options">
                <Option v-for="option in item.items" :key="option" @click="setModel(option)">
                  {{ getLabel(option) }}
                </Option>
              </div>
            </template>
        </FloatCard>
      </div>
      <h5
        v-else
        class="item"
        :class="{ active: isActive(item) }"
        @click="setModel(item)"
      >
        {{ getLabel(item) }}
      </h5>
      <Icon v-if="index < parsedItems.length - 1" name="chevron_right" />
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.breadcrumb {
  @apply flex items-center gap-xs;
}

.item {
  @apply text-neutral-interaction-default cursor-pointer hover:text-primary-interaction-hover;
}

.item.active {
  @apply pointer-events-none text-neutral-foreground-high;
}

.more-options {
  @apply overflow-auto min-w-9xl max-h-9xl p-xxs [&>*]:p-xs;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
