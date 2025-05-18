<script setup lang="ts">
import { ref } from "vue";
import { useOptionalModel } from "../../composables";
import { type BContainerModelExtra } from "../../utils/components/BContainerModelExtra.types";
import Container from '../../utils/components/Container.vue';
import SelectContent from "../../utils/components/SelectContent.vue";
import Option from "../../utils/components/Option.vue";
import { useClickOutside } from '../../composables';

type BMultiSelectModelExtra = {
  selected: number[];
  deselected: number[];
};

const props = withDefaults(
  defineProps<{
    modelValue: any;
    labelValue?: string;
    icon?: string;
    expanded?: boolean;
    labelKey?: string;
    selectedKey?: string;
    searchText?: string;
    searchable?: boolean;
    disabled?: boolean;
    absolute?: boolean;
    error?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    closeOnBlur?: boolean;
    hideBottom?: boolean;
    maxHeight?: string;
    minWidth?: string;
    secondary?: boolean;
    hideArrow?: boolean;
  }>(),
  {
    modelValue: undefined,
    labelValue: "",
    expanded: undefined,
    labelKey: "label",
    selectedKey: "selected",
    searchText: "Search",
    icon: "filter_list",
    searchable: false,
    disabled: false,
    absolute: false,
    error: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    closeOnBlur: true,
    hideBottom: false,
    maxHeight: "",
    minWidth: "22em",
    secondary: false,
    hideArrow: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: any[], extra: BMultiSelectModelExtra];
  "update:expandedModel": [value: boolean];
  apply: [];
}>();

const [expandedModel, setExpandedModel] = useOptionalModel<boolean>(
  props,
  "expanded",
  emit,
  false
);
let itemsSearch: any = ref({});
let itemExpanded = ref(-1);
let selected = ref(getAllSelections());

function getAllSelections() {
  let selecteds = [];
  Object.keys(props.modelValue).forEach((item: any) => {
    selecteds.push(
      props.modelValue[item].filter(
        (subItem: any) => subItem[props.selectedKey] == true
      )
    );
  });
  return selecteds.length;
}

function selectItem(item: any) {
  if (props.disabled) return;
  item[props.selectedKey] = !item[props.selectedKey];
  const extra = item[props.selectedKey]
    ? { selected: [item], deselected: [] }
    : { selected: [], deselected: [item] };

  if (item[props.selectedKey]) selected.value++;
  else selected.value--;

  emit("update:modelValue", props.modelValue, extra);
}

function toggleSubList(index: number) {
  if (itemExpanded.value === index) {
    itemExpanded.value = -1;
  } else {
    itemExpanded.value = index;
  }
}

function getSelected(key: any) {
  return key.filter((x: any) => x[props.selectedKey] == true).length;
}

function searchItem(key: any, search: string) {
  if (!search) {
    return key;
  }
  return key.filter((value: any) => {
    if (value[props.labelKey].toLowerCase().includes(search.toLowerCase())) {
      return value;
    }
  });
}

function clear() {
  Object.keys(props.modelValue).forEach((item: any) => {
    props.modelValue[item] = props.modelValue[item].map((subItem: any) => {
      subItem[props.selectedKey] = false;
      return subItem;
    });
  });
  selected.value = 0;
  apply();
}

function apply() {
  emit("apply");
}
</script>

<template>
  <Container
    :modelValue="expandedModel"
    :labelValue="labelValue"
    class="b-filter"
    :disabled="disabled"
    :isError="error"
    :errorMessage="errorMessage"
    :infoMessage="infoMessage"
    :required="required"
    :closeOnBlur="true"
    :hideBottom="false"
    :maxHeight="maxHeight"
    :minWidth="minWidth"
    :secondary="secondary"
    :hideArrow="hideArrow"
    @update:modelValue="(value: boolean, extra: BContainerModelExtra) => $emit('update:expandedModel', value)"
  >
    <SelectContent
      v-model:expanded="expandedModel"
      :disabled="disabled"
      :icon="icon"
      :items="modelValue"
      @update:expanded="setExpandedModel"
    >
      <template #status>
        <slot v-if="!disabled" name="status" :selected="selected">
          <span class="font-bold text-neutral-interaction-default">
            <slot name="status-text" :selected="selected"> Filters </slot>
          </span>
        </slot>
        <slot v-else-if="!expandedModel || disabled" />
      </template>
    </SelectContent>

    <template #complement v-if="selected && !disabled">
      <span class="select-count">{{ selected }}</span>
    </template>

    <template #items>
      <li
        role="option"
        :aria-selected="
          // @ts-ignore
          modelValue[index][selectedKey]
        "
        v-for="(item, index) in Object.entries(modelValue)"
        :key="item[0]"
        class="
          flex flex-col
          gap-[.75em]
          select-none
          h-max
          transition-[height]
          max-h-[3em]
          overflow-hidden
        "
        :tabindex="index"
        :class="{ active: itemExpanded === index }"
        style="transition: max-height 0.2s ease"
      >
        <div
          class="
            flex
            items-center
            justify-between
            text-neutral-interaction-default
            w-full
            h-full
            cursor-pointer
            [&>*]:p-xs
            hover:text-primary-interaction-default
            hover:bg-primary-surface-hover
          "
          :class="{
            'bg-primary-surface-default text-primary-interaction-default font-bold':
              itemExpanded === index,
          }"
          @click.prevent="toggleSubList(index)"
          @keyup.space="toggleSubList(index)"
        >
          <p class="text-neutral-interaction-default">
            {{ item[0] }}
          </p>
          <div class="flex items-center gap-xs">
            <slot v-if="getSelected(item[1])" name="status">
              <span
                class="select-count font-normal"
                :class="{
                  active: itemExpanded === index,
                }"
              >
                {{ getSelected(item[1]) }}
              </span>
            </slot>
            <div
              class="
                flex
                items-center
                w-fit
                h-fit
                transition-transform
                ease-in-out
                duration-300
                cursor-pointer
                text-xl
              "
              :class="[
                itemExpanded === index
                  ? 'rotate-180 text-primary-interaction-default'
                  : 'text-neutral-interaction-default',
              ]"
            >
              <BIcon name="expand_more" size="xl" />
            </div>
          </div>
        </div>
        <Transition name="content">
          <ul
            v-if="itemExpanded === index"
            class="
              flex flex-col
              gap-xs
              pb-xxs
              overflow-auto
              custom-scroll
              max-h-[12em]
              mr-xxs
              mb-xxs
            "
          >
            <div
              v-if="searchable && !disabled"
              class="
                flex
                items-center
                text-xl
                gap-xs
                pb-xxs
                border-b-xxs border-neutral-default
                mb-xxs
                px-xs
              "
            >
              <BIcon
                name="search"
                class="text-neutral-foreground-low"
                size="xl"
              />
              <input
                v-model="itemsSearch[item[0]]"
                type="search"
                class="
                  h-full
                  w-full
                  p-0
                  m-0
                  border-none
                  text-xs
                  pb-[.05em]
                  placeholder:text-neutral-foreground-low
                  outline-none
                  border-none
                "
                style="box-shadow: none"
                :disabled="disabled"
                :placeholder="searchText"
              />
            </div>
            <Option
              v-for="(subItem, subItemIndex) in searchItem(
                item[1],
                itemsSearch[item[0]]
              )"
              no-hover
              :disabled="subItem.disabled"
              :key="subItemIndex"
              @click="selectItem(subItem)"
              @key.space="selectItem(subItem)"
              class="flex items-center pl-xxs gap-xs"
            >
              <BCheckbox
                :modelValue="
                  // @ts-ignore
                  subItem[selectedKey]
                "
                class="pointer-events-none"
              />
              {{ subItem[labelKey] }}
            </Option>
          </ul>
        </Transition>
      </li>
    </template>

    <template #actions>
      <slot name="actions">
        <div class="flex items-center gap-xs">
          <BButton
            size="small"
            variant="plain"
            @click="clear"
            :disabled="!selected"
          >
            <slot name="clear-text">
              Clear
            </slot>
          </BButton>
          <BButton
            type="button"
            :disabled="!selected"
            size="small"
            @click="apply"
          >
            <slot name="apply-text">
              Apply
            </slot>
          </BButton>
        </div>
      </slot>
    </template>
  </Container>
</template>
<style scoped>
.b-select {
  @apply w-full;
}

.content-enter-active {
  @apply transition-all duration-300 ease-out;
}

.content-leave-active {
  @apply transition-all duration-300 ease-out;
}

.content-enter-from,
.content-leave-to {
  @apply h-max;
}

.active {
  @apply max-h-[12em];
}

.select-count {
  @apply flex items-center justify-center text-neutral-foreground-negative bg-primary-interaction-selected text-xs w-[1.6em] h-[1.6em] rounded-full;
}
</style>
