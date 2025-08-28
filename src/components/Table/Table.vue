<script setup lang="ts">
import { ref, watch, onBeforeMount, computed, useSlots } from "vue";

type Header = {
  label?: string;
  value: string;
  sortable?: boolean;
  width?: string;
  align?: string;
};

type Options = {
  sortBy?: string;
  sortDesc?: boolean;
};

const props = withDefaults(
  defineProps<{
    headers: Header[];
    items: any[];
    options?: Options;
    page?: number;
    itemsPerPage?: number;
    numberOfItems?: number;
    renderPaginationInBackEnd?: boolean;
    hideFooter?: boolean;
    isHeaderFixed?: boolean;
    enableSelection?: boolean;
    enableAggregation?: boolean;
    loading?: boolean;
    noShadow?: boolean;
    hasHover?: boolean;
  }>(),
  {
    page: 1,
    itemsPerPage: 10,
    numberOfItems: 0,
    renderPaginationInBackEnd: false,
    hideFooter: false,
    isHeaderFixed: false,
    enableSelection: false,
    enableAggregation: false,
    loading: false,
    noShadow: false,
    hasHover: false,
  }
);

const emit = defineEmits<{
  "update:page": [value: number];
  "update:itemsPerPage": [value: number];
  sortBy: [key: string, isSortDesc: boolean];
  pageItems: [page: number, itemsPerPage: number];
  selectAll: [value: boolean];
}>();
const slots = useSlots();

const sortByName = ref(props.options?.sortBy || "");
const pagedItems = ref(props.items || []);
const sortDesc: any = ref(getAllHeaderKeys());
const itemsPerPageHolder = ref(props.itemsPerPage || 10);
const pageHolder = ref(props.page || 1);
const listPerPage = ref([5, 10, 20, 50, 100]);
const allSelected = ref(false);

const numberPage = computed((): number => {
  if (props.renderPaginationInBackEnd) {
    return Math.ceil(props.numberOfItems / itemsPerPageHolder.value);
  }

  return Math.ceil(props.items?.length / itemsPerPageHolder.value);
});
const min = computed((): number =>
  pageHolder.value === 1
    ? 1
    : (pageHolder.value - 1) * itemsPerPageHolder.value + 1
);
const max = computed(
  (): number =>
    (pageHolder.value - 1) * itemsPerPageHolder.value + pagedItems.value.length
);
const total = computed((): number =>
  props.renderPaginationInBackEnd
    ? props.numberOfItems
    : props.items?.length || 0
);
const colspan = computed((): number => {
  let colspan = props.headers.length;
  if (props.enableSelection) colspan++;
  if (props.enableAggregation) colspan++;
  if (slots.actions) colspan++;
  return colspan;
});

onBeforeMount(() => {
  if (props.renderPaginationInBackEnd) return;

  if (sortByName.value) {
    sortBy(sortByName.value, props.options?.sortDesc);
  } else {
    pageItems(props.page, props.itemsPerPage);
  }
});

watch(
  () => props.itemsPerPage,
  (newValue) => {
    changeItemsPerPage(newValue, false);
  }
);

watch(
  () => props.page,
  (newValue) => {
    changePage(newValue, false);
  }
);

watch(
  () => props.items,
  () => {
    pagedItems.value = props.items;

    if (!props.renderPaginationInBackEnd)
      sortBy(sortByName.value, sortDesc.value[sortByName.value], false);
  },
  { deep: true, immediate: true }
);

function getAllHeaderKeys(): { [key: string]: boolean } {
  const result: any = {};
  props.headers.forEach((header: any) => {
    if (header.value == sortByName.value) {
      result[header.value] = !!props.options?.sortDesc;
    } else {
      result[header.value] = false;
    }
  });
  return result;
}

function changePage(page: number, emitEvent = true) {
  pageHolder.value = page;
  if (emitEvent) emit("update:page", page);
  pageItems(page, itemsPerPageHolder.value);
}

function changeItemsPerPage(itemsPerPage: number, emitEvent = true) {
  itemsPerPageHolder.value = itemsPerPage || 10;
  pageHolder.value = 1;

  if (emitEvent) emit("update:itemsPerPage", itemsPerPage);
  emit("update:page", 1);

  sortBy(sortByName.value, sortDesc.value[sortByName.value]);
}

function sortBy(key: string, isSortDesc = true, emitEvent = true) {
  if (props.renderPaginationInBackEnd) {
    if (emitEvent) emit("sortBy", key, isSortDesc);
  } else {
    sortByName.value = key;
    pagedItems.value = props.items?.sort((a: any, b: any) => {
      const valueA = a[key];
      const valueB = b[key];

      if (typeof valueA === "string" && typeof valueB === "string") {
        const lowerA = valueA.toLowerCase();
        const lowerB = valueB.toLowerCase();
        return isSortDesc
          ? lowerA.localeCompare(lowerB)
          : lowerB.localeCompare(lowerA);
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return isSortDesc ? valueA - valueB : valueB - valueA;
      } else if (valueA instanceof Date && valueB instanceof Date) {
        return isSortDesc
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      } else {
        const stringA = String(valueA);
        const stringB = String(valueB);
        const lowerA = stringA.toLowerCase();
        const lowerB = stringB.toLowerCase();
        return isSortDesc
          ? lowerA.localeCompare(lowerB)
          : lowerB.localeCompare(lowerA);
      }
    });
  }
  pageItems(pageHolder.value, itemsPerPageHolder.value);
}

function pageItems(page: number, itemsPerPage: number) {
  if (props.renderPaginationInBackEnd) {
    emit("pageItems", page, itemsPerPage);
  } else {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    pagedItems.value = props.items?.slice(startIndex, endIndex);
  }
}

function selectAll(value: boolean) {
  emit("selectAll", value);
  props.items?.map((item: any) => (item.selected = value));
  pagedItems.value = props.items;
}
</script>

<template>
  <div class="table">
    <div
      class="table-content"
      :class="{ 'header-fixed-table': isHeaderFixed, 'no-shadow': noShadow }"
    >
      <table class="table-style">
        <thead v-if="!loading">
          <tr>
            <th
              v-if="enableAggregation"
              :disabled="!pagedItems.length"
              class="first-th pointer-events-none"
              :style="{ width: '2%' }"
            />
            <th
              v-if="enableSelection"
              :disabled="!pagedItems.length"
              class="hover:bg-neutral-surface-default"
              :class="{ 'first-th': !enableAggregation }"
              :style="{ width: '2%' }"
            >
              <Checkbox v-model="allSelected" @update:model-value="selectAll" />
            </th>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="cursor-pointer"
              :class="{
                'first-th': index === 0 && !enableSelection && !enableAggregation,
                'last-th': !headers[index + 1] && !$slots.actions,
                'pointer-events-none': !header.sortable,
              }"
              :style="{ width: header.width ? header.width : 'fit-content' }"
              @click="
                sortBy(
                  header.value,
                  (sortDesc[header.value] = !sortDesc[header.value])
                )
              "
            >
              <div
                class="flex w-full items-center gap-xs text-neutral-interaction-default"
                :style="{
                  'justify-content': header.align ? header.align : 'flex-start',
                }"
              >
                <p class="truncate">{{ header.label }}</p>
                <span
                  v-if="header.sortable"
                  class="icon"
                  :class="{
                    'rotate-180': sortDesc[header.value],
                    'icon-active': header.value == sortByName,
                  }"
                >
                  <Icon name="arrow_upward" />
                </span>
              </div>
            </th>
            <th
              v-if="$slots.actions"
              style="flex: 1"
              class="bg-white pointer-events-none"
            />
          </tr>
        </thead>
        <thead v-else>
          <tr>
            <th
              v-for="header in colspan || 3"
              :key="header"
              class="skeleton-table-cell"
            >
              <Skeleton />
            </th>
          </tr>
        </thead>
        <tbody v-if="loading || !pagedItems.length">
          <tr v-if="loading" v-for="index in 10" :key="index">
            <td
              v-for="header in colspan || 3"
              :key="header"
              class="skeleton-table-cell"
            >
              <Skeleton />
            </td>
            <td v-if="$slots.actions" class="skeleton-table-cell">
              <Skeleton />
            </td>
          </tr>
          <tr v-else-if="!pagedItems.length">
            <td colspan="100%">
              <slot name="empty-state" />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <template v-for="(item, index) in pagedItems" :key="index">
            <tr
              class="[&>*]:py-sm [&>*]:px-lg text-neutral-foreground-low"
              :class="{ 'hover:bg-primary-surface-default': hasHover }"
            >
              <slot
                v-if="enableAggregation"
                name="aggregation"
                :item="item"
                :index="index"
              />
              <slot
                v-if="enableSelection"
                name="select"
                :item="item"
                :index="index"
              />
              <slot
                v-for="header in headers"
                :key="header.value"
                :name="header.value"
                :item="item"
                :index="index"
              />
              <slot
                v-if="$slots.actions"
                name="actions"
                :item="item"
                :index="index"
              />
            </tr>
            <slot
              name="childs"
              :item="item"
              :index="index"
              v-if="item.expanded"
            />
          </template>
        </tbody>
        <tfoot v-if="$slots.footer">
          <slot name="footer" />
        </tfoot>
      </table>
    </div>
    <footer
      class="flex items-center justify-between mt-base text-neutral-foreground-low flex-wrap"
      v-if="!hideFooter"
    >
      <div class="flex items-center gap-xs">
        <p class="text-sm">
          <slot name="items-per-page"> Items per page </slot>
        </p>
        <Select
          v-model="itemsPerPageHolder"
          :items="listPerPage"
          absolute
          @update:model-value="changeItemsPerPage"
        >
          {{ itemsPerPageHolder }}
        </Select>
      </div>
      <Pagination
        v-model="pageHolder"
        :length="numberPage"
        @update:model-value="changePage"
      />
      <div>
        <p class="text-sm">
          <slot name="showing-page" :min="min" :max="max" :total="total">
            Showing {{ min }}-{{ max }} of {{ total }}
          </slot>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.table-content {
  @apply min-w-full max-w-full overflow-x-auto rounded-xl bg-neutral-surface-default border-xxs border-neutral-default shadow-neutral-selected;
}

.table-content.no-shadow {
  @apply shadow-none border-none;
}

.table-content.header-fixed-table {
  @apply overflow-y-auto max-h-[35em];

  .table-style thead {
    @apply bg-white top-0 sticky;
  }
}

.icon {
  @apply h-fit w-fit flex items-center transition-transform ease-in-out duration-300;

  .icon {
    @apply text-lg;
  }
}

.table-style {
  @apply w-full rounded-xl bg-neutral-surface-default;

  thead {
    @apply border-xxs border-neutral-default;
  }

  tbody {
    @apply divide-y-xxs divide-neutral-default w-full;
  }

  tr {
    @apply rounded-xl;
  }

  th {
    @apply py-base px-lg hover:bg-neutral-surface-highlight;

    .icon.icon-active {
      @apply text-primary-interaction-default opacity-100;
    }

    .icon {
      @apply opacity-0;
      transition: opacity 0.2s ease, transform 0.3s ease;
    }
  }

  th:hover .icon {
    @apply opacity-100;
  }
}

.first-th {
  @apply rounded-ss-xl;
}

.last-th {
  @apply rounded-se-xl;
}

.skeleton-table-cell {
  @apply p-base;
}

.skeleton-table-cell .skeleton {
  @apply h-sm w-full;
}
</style>
