<script setup lang="ts">
import { computed, ref } from "vue";
import { useOptionalModel } from "#composables";
import Option from "../../utils/components/Option.vue";
import { isObject } from "../../utils";

const props = withDefaults(
  defineProps<{
    modelValue: any;
    options?: any[];
    labelKey?: string;
    valueKey?: string;
    getObject?: boolean;
  }>(),
  {
    modelValue: undefined,
    options: undefined,
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

const parsedOptions = computed(() => {
  if (!props.options?.length) return [];

  const options = [...props.options];
  let selectedIndex = options.findIndex((option) => isActive(option));
  if (selectedIndex === -1) selectedIndex = 0;

  const result = [];

  for (let i = 0; i < options.length; i++) {
    if (
      i === 0 ||
      i === options.length - 1 ||
      (selectedIndex === 0 && i < 2) ||
      (selectedIndex === options.length - 1 && i >= options.length - 2) ||
      selectedIndex - 1 === i ||
      selectedIndex + 1 === i ||
      selectedIndex === i
    ) {
      result.push(options[i]);
    } else if (i === 1 && selectedIndex > 1) {
      result.push({
        icon: "more_horiz",
        options: options.slice(1, selectedIndex - 1)
      });
    } else if (i === options.length - 2 && selectedIndex < options.length - 2) {
      result.push({
        icon: "more_horiz",
        options: options.slice(selectedIndex + 2, options.length - 1)
      });
    }
  }

  return result;
});

function setModel(option: any) {
  const value = props.getObject ? option : getValue(option);
  expanded.value = expanded.value.map(() => false);

  setTimeout(() => {
    model.value = value;
    emit("update:modelValue", value);
  }, 200);
}

function getLabel(value: any): string {
  return isObject(value) ? value[props.labelKey] : value;
}

function getValue(option: any): any {
  return isObject(option) ? option[props.valueKey] : option;
}

function isActive(option: any): boolean {
  const value = getValue(option);
  const selectedValue = getValue(model.value);
  return selectedValue == value;
}
</script>

<template>
  <div class="breadcrumb">
    <template v-for="(option, index) in parsedOptions" :key="option">
      <div v-if="isObject(option) && option.icon == 'more_horiz'">
        <FloatCard v-model="expanded[index]">
          <Icon name="more_horiz" class="cursor-pointer" />
            <template #card>
              <div class="more-options">
                <Option v-for="option in option.options" :key="option" @click="setModel(option)">
                  {{ getLabel(option) }}
                </Option>
              </div>
            </template>
        </FloatCard>
      </div>
      <h5
        v-else
        class="option"
        :class="{ active: isActive(option) }"
        @click="setModel(option)"
      >
        {{ getLabel(option) }}
      </h5>
      <Icon v-if="index < parsedOptions.length - 1" name="chevron_right" />
    </template>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.breadcrumb {
  @apply flex items-center gap-xs;
}

.option {
  @apply text-neutral-interaction-default cursor-pointer hover:text-primary-interaction-hover;
}

.option.active {
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
