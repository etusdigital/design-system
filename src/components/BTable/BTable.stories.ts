import type { Meta, StoryObj } from "@storybook/vue3";
import BTable from "./BTable.vue";

export default {
  component: BTable,
  argTypes: {
    headers: {
      type: { summary: "array" },
      description: "This property will be the table header.",
    },
    items: {
      type: { summary: "array" },
      description:
        "This property will be selected page items displayed in the table.",
    },
    options: {
      type: { summary: "object" },
      description: "This property will be the sort settings.",
    },
    page: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 1 },
      },
      description: "This property will be the current page.",
    },
    itemsPerPage: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 10 },
      },
      description: "This property will be the number of items in 1 page.",
    },
    loading: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Determine the data is loading.",
    },
    enableSelection: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Determine if the user can select all items.",
    },
    enableAggregation: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Determine if the table has a space for aggregations.",
    },
    isHeaderFixed: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "Determine if the table header will be fixed and if the table will have y scroll.",
    },
    hasHover: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "When hasHover property is true, the row will have a hover effect.",
    },
    hideFooter: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Determine if the default footer is shown.",
    },
    noShadow: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description:
        "When noShadow property is true, the card will have no shadow.",
    },
    numberOfItems: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 0 },
      },
      description: "This property will be the total of items in general.",
    },
    renderPaginationInBackEnd: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
      description: "Determine if the pagination is redened in back-end.",
    },
    sortBy: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "(key, isSortDesc = false) =>{void}" },
      },
      description:
        "This function will be the function resposible for sort items. It only will be used if renderPaginationInBackEnd = true.",
    },
    pageItems: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "(page, itemsPerPage) =>{void}" },
      },
      description:
        "This function will be the function resposible for page items. It only will be used if renderPaginationInBackEnd = true.",
    },
    selectAll: {
      type: { summary: "function" },
      table: {
        defaultValue: { summary: "(page, itemsPerPage) =>{void}" },
      },
      description:
        "This function will be called if all items called. It only will be used if enableSelection = true",
    },
    "header.value": {
      description:
        "For each header value, there will be a slot that will be displayed in the respective column in each row. Params: item and index.",
    },
    actions: {
      description:
        "This slot will be displayed on each row. Params: item and index.",
    },
    select: {
      description:
        "This slot will be status text when a item is selected. Params: item and index.",
    },
    aggregation: {
      description:
        "This slot will be status text when a item have aggregation. Params: item and index.",
    },
    childs: {
      description:
        "This slot will be a child of each row. It will be sorted together with it's parent. Params: item and index.",
    },
    "empty-state": {
      description: "This slot will appear when items is an empty array.",
    },
    footer: {
      description: "This slot will be table footer.",
    },
    "items-per-page": {
      table: {
        defaultValue: { summary: "Items per page" },
      },
      description: "This slot will be the text next to select on table footer.",
    },
    "showing-page": {
      description:
        "This slot will be the text in the end of table footer. Params: max(number of the last of this page) and total(total items on the table).",
    },
  },
} satisfies Meta<typeof BTable>;

type Story = StoryObj<typeof BTable>;

const items = [
  {
    name: "Joanna",
    age: 43,
    memberShip: "Platinum",
    selected: false,
    childs: [
      {
        name: "José",
        age: 2,
        selected: false,
      },
    ],
  },
  {
    name: "Jhonny",
    age: 23,
    memberShip: "Gold",
    selected: false,
    childs: [],
  },
  {
    name: "Jeffry",
    age: 55,
    memberShip: "Bronze",
    selected: false,
    childs: [
      {
        name: "Clara",
        age: 5,
        selected: false,
      },
    ],
  },
  {
    name: "Leon",
    age: 76,
    memberShip: "Silver",
    selected: false,
    childs: [
      {
        name: "Maria",
        age: 40,
        selected: false,
      },
      {
        name: "Cristina",
        age: 45,
        selected: false,
      },
    ],
  },
  {
    name: "Luana",
    age: 33,
    memberShip: "Diamont",
    selected: false,
  },
  {
    name: "Carlos",
    age: 34,
    memberShip: "Silver",
    selected: false,
    childs: [
      {
        name: "Carlos",
        age: 11,
        selected: false,
      },
      {
        name: "Carol",
        age: 6,
        selected: false,
      },
      {
        name: "Mariana",
        age: 1,
        selected: false,
      },
    ],
  },
  {
    name: "Jake",
    age: 23,
    memberShip: "Gold",
    selected: false,
  },
  {
    name: "Linda",
    age: 19,
    memberShip: "Bronze",
    selected: false,
  },
  {
    name: "Carol",
    age: 80,
    memberShip: "Diamont",
    selected: false,
    childs: [
      {
        name: "Cristiano",
        age: 38,
        selected: false,
      },
    ],
  },
  {
    name: "Atena",
    age: 55,
    memberShip: "Diamont",
    selected: false,
  },
  {
    name: "Leandra",
    age: 19,
    memberShip: "Bronze",
    selected: false,
  },
  {
    name: "Davi",
    age: 19,
    memberShip: "Bronze",
    selected: false,
  },
  {
    name: "Matheus",
    age: 37,
    memberShip: "Platinum",
    selected: false,
    childs: [
      {
        name: "Lucas",
        age: 1,
        selected: false,
      },
    ],
  },
  {
    name: "Rafael",
    age: 39,
    memberShip: "Diamont",
    selected: false,
  },
  {
    name: "Fernando",
    age: 36,
    memberShip: "Diamont",
    selected: false,
    childs: [
      {
        name: "Ana",
        age: 16,
        selected: false,
      },
      {
        name: "Marina",
        age: 12,
        selected: false,
      },
    ],
  },
  {
    name: "Flávia",
    age: 30,
    memberShip: "Gold",
    selected: false,
  },
  {
    name: "Taís",
    age: 75,
    memberShip: "Silver",
    selected: false,
    childs: [
      {
        name: "Austin",
        age: 66,
        selected: false,
      },
      {
        name: "Gertrudes",
        age: 45,
        selected: false,
      },
    ],
  },
  {
    name: "Nilta",
    age: 79,
    memberShip: "Gold",
    selected: false,
    childs: [
      {
        name: "Irã",
        age: 56,
        selected: false,
      },
      {
        name: "Ana Izabel",
        age: 55,
        selected: false,
      },
      {
        name: "Marcelo",
        age: 54,
        selected: false,
      },
      {
        name: "Danielle",
        age: 51,
        selected: false,
      },
    ],
  },
  {
    name: "Eduardo",
    age: 18,
    memberShip: "Bronze",
    selected: false,
  },
  {
    name: "Melissa",
    age: 33,
    memberShip: "Silver",
    selected: false,
  },
  {
    name: "Lucca",
    age: 66,
    memberShip: "Platinum",
    selected: false,
    childs: [
      {
        name: "Nilce",
        age: 22,
        selected: false,
      },
      {
        name: "Luiz",
        age: 25,
        selected: false,
      },
    ],
  },
  {
    name: "Jéssica",
    age: 22,
    memberShip: "Platinum",
    selected: false,
  },
  {
    name: "Marcelo",
    age: 56,
    memberShip: "Gold",
    selected: false,
    childs: [
      {
        name: "Emerson",
        age: 13,
        selected: false,
      },
      {
        name: "Anne",
        age: 8,
        selected: false,
      },
    ],
  },
  {
    name: "Fernanda",
    age: 45,
    memberShip: "Silver",
    selected: false,
    childs: [
      {
        name: "Eduardo",
        age: 12,
        selected: false,
      },
      {
        name: "Daniel",
        age: 8,
        selected: false,
      },
    ],
  },
  {
    name: "Milena",
    age: 24,
    memberShip: "Bronze",
    selected: false,
  },
  {
    name: "Carla",
    age: 77,
    memberShip: "Gold",
    selected: false,
    childs: [
      {
        name: "Camilla",
        age: 34,
        selected: false,
      },
      {
        name: "Márcio",
        age: 25,
        selected: false,
      },
    ],
  },
  {
    name: "Danilo",
    age: 82,
    memberShip: "Diamont",
    selected: false,
    childs: [
      {
        name: "Valentina",
        age: 45,
        selected: false,
      },
      {
        name: "Enzo",
        age: 44,
        selected: false,
      },
      {
        name: "Luiz",
        age: 43,
        selected: false,
      },
    ],
  },
  {
    name: "Thiago",
    age: 33,
    memberShip: "Bronze",
    selected: false,
    childs: [
      {
        name: "Alice",
        age: 3,
        selected: false,
      },
    ],
  },
  {
    name: "Elizabeth",
    age: 100,
    memberShip: "Platinum",
    selected: false,
  },
  {
    name: "Miranda",
    age: 33,
    memberShip: "Gold",
    selected: false,
  },
  {
    name: "Gabriel",
    age: 58,
    memberShip: "Silver",
    selected: false,
    childs: [
      {
        name: "Marina",
        age: 22,
        selected: false,
      },
    ],
  },
  {
    name: "Laís",
    age: 23,
    memberShip: "Bronze",
    selected: false,
  },
  {
    name: "Laura",
    age: 34,
    memberShip: "Silver",
    selected: false,
  },
  {
    name: "Merlin",
    age: 92,
    memberShip: "Diamont",
    selected: false,
    childs: [
      {
        name: "Raquel",
        age: 67,
        selected: false,
      },
      {
        name: "Rafaela",
        age: 59,
        selected: false,
      },
    ],
  },
  {
    name: "Vitória",
    age: 24,
    memberShip: "Diamont",
    selected: false,
  },
  {
    name: "Anna",
    age: 26,
    memberShip: "Gold",
    selected: false,
  },
  {
    name: "Mônica",
    age: 65,
    memberShip: "Bronze",
    selected: false,
    childs: [
      {
        name: "Marta",
        age: 34,
        selected: false,
      },
      {
        name: "Marco",
        age: 33,
        selected: false,
      },
    ],
  },
  {
    name: "Jeremias",
    age: 49,
    memberShip: "Silver",
    selected: false,
    childs: [
      {
        name: "Denise",
        age: 31,
        selected: false,
      },
      {
        name: "Arthur",
        age: 25,
        selected: false,
      },
    ],
  },
  {
    name: "Henrique",
    age: 53,
    memberShip: "Gold",
    selected: false,
    childs: [
      {
        name: "Caroline",
        age: 17,
        selected: false,
      },
    ],
  },
  {
    name: "Marcela",
    age: 34,
    memberShip: "Bronze",
    selected: false,
  },
  {
    name: "Daniel",
    age: 73,
    memberShip: "Silver",
    selected: false,
    childs: [
      {
        name: "Milene",
        age: 39,
        selected: false,
      },
      {
        name: "Átila",
        age: 38,
        selected: false,
      },
    ],
  },
  {
    name: "Gustavo",
    age: 43,
    memberShip: "Diamont",
    selected: false,
    childs: [
      {
        name: "Fabiano",
        age: 5,
        selected: false,
      },
    ],
  },
  {
    name: "Lucca",
    age: 21,
    memberShip: "Gold",
    selected: false,
  },
  {
    name: "Giulia",
    age: 29,
    memberShip: "Silver",
    selected: false,
  },
];

const defaultArgs = {
  headers: [
    { label: "Name", value: "name", sortable: true, width: "20%" },
    {
      label: "Age",
      value: "age",
      sortable: true,
      width: "10%",
      align: "center",
    },
    { label: "Membership", value: "memberShip", sortable: false, width: "20%" },
  ],
  items: items,
  options: {
    sortBy: "",
    sortDesc: false,
  },
  page: 1,
  itemsPerPage: 10,
  numberOfItems: items.length,
  renderPaginationInBackEnd: false,
  hideFooter: false,
  isHeaderFixed: false,
  enableSelection: false,
  enableAggregation: false,
  loading: false,
  noShadow: false,
  hasHover: false,
  sortBy: (key: string, isSortDesc: boolean) => {},
  pageItems: (page: number, itemsPerPage: number) => {},
  selectAll: () => {},
};

const defaultRender = (args: any) => ({
  components: { BTable },
  setup() {
    return { args };
  },
  template: `
    <BTable
        :headers="args.headers"
        :items="args.items"
        :options="args.options"
        v-model:page="args.page"
        v-model:items-per-page="args.itemsPerPage"
        :number-of-items="args.numberOfItems"
        :render-pagination-in-back-end="args.renderPaginationInBackEnd"
        :hide-footer="args.hideFooter"
        :is-header-fixed="args.isHeaderFixed"
        :enable-selection="args.enableSelection"
        :enable-aggregation="args.enableAggregation"
        :loading="args.loading"
        :no-shadow="args.noShadow"
        :has-hover="args.hasHover"
    >
        <template v-for="header in args.headers" v-slot:[header.value]="{ item, index }">
          <td>{{ item[header.value] }}</td>
        </template>
    </BTable>
  `,
});

export const Primary: Story = {
  render: (args: any) => ({
    components: { BTable },
    setup() {
      return { args };
    },
    template: `
      <BTable
          :headers="args.headers"
          :items="args.items"
          :options="args.options"
          v-model:page="args.page"
          v-model:items-per-page="args.itemsPerPage"
          :number-of-items="args.numberOfItems"
          :render-pagination-in-back-end="args.renderPaginationInBackEnd"
          :hide-footer="args.hideFooter"
          :is-header-fixed="args.isHeaderFixed"
          :enable-selection="args.enableSelection"
          :enable-aggregation="args.enableAggregation"
          :loading="args.loading"
          :no-shadow="args.noShadow"
          :has-hover="args.hasHover"
          @sort-by="args.sortBy"
          @page-items="args.pageItems"
          @select-all="args.selectAll"
      >
          <template v-slot:select="{ item }" v-if="args.enableSelection">
            <td>
              <BCheckbox v-model="item.selected"/>
            </td>
          </template>
          <template v-slot:aggregation="{ item }" v-if="args.enableAggregation">
              <td>
                <div class="flex items-center justify-center p-xxs rounded-full cursor-pointer hover:bg-neutral-surface-highlight">
                  <b-icon
                    name="arrow_drop_down"
                    class="transition-transform"
                    :class="{ 'rotate-180': item.expanded }"
                    @click="item.expanded = !item.expanded"
                  />
                </div>
              </td>
          </template>
          <template v-slot:name="{ item }">
              <td>{{ item.name }}</td>
          </template>
          <template v-slot:age="{ item }">
              <td>
                  <span class="ml-xs">{{ item.age }}</span>
              </td>
          </template>
          <template v-slot:memberShip="{ item }">
              <td>{{ item.memberShip }}</td>
          </template>

          <template #actions>
              <td class="flex items-center justify-end">
                <BRoundButton color="primary" variant="plain" icon="more_vert"/>
              </td>
          </template>

          <template #childs="{ item, index }">
              <template v-if="item.expanded">
              <tr
                  v-for="(child, childIndex) in item.childs"
                  :key="childIndex"
                  class="bg-neutral-surface-highlight text-neutral-foreground-low [&>*]:py-xs [&>*]:px-lg"
              >
                  <td />
                  <td v-if="args.enableSelection">
                    <BCheckbox v-model="child.selected" />
                  </td>
                  <td>
                      {{ child.name }}
                  </td>
                  <td>
                    <span class="ml-[.6em]">{{ child.age }}</span>
                  </td>
                  <td>
                      {{ item.memberShip }}
                  </td>
                  <td />
              </tr>
              </template>
            </template>

          <template #empty-state>
              <div class="flex items-center justify-center p-xxs rounded-full text-xl">
                  <BIcon name="sentiment_dissatisfied" size="1em" />
              </div>
          </template>

          <template #items-per-page>
              Items per page
          </template>

          <template #showing-page="{ min, max, total }">
              Showing {{ min }}-{{ max }} of {{ total }}
          </template>
      </BTable>
    `,
  }),
  args: defaultArgs,
};

export const Options: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    options: {
      sortBy: "name",
      sortDesc: true,
    },
  },
};

export const Loading: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const Selection: Story = {
  render: (args: any) => ({
    components: { BTable },
    setup() {
      return { args };
    },
    template: `
      <BTable 
        :headers="args.headers"
        :items="args.items"
        :enable-selection="args.enableSelection"
      >
          <template #select="{ item }">
            <td>
              <BCheckbox v-model="item.selected" />
            </td>
          </template>

          <template v-for="header in args.headers" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>
      </BTable>
    `,
  }),
  args: {
    ...defaultArgs,
    enableSelection: true,
  },
};

export const Aggregation: Story = {
  render: (args: any) => ({
    components: { BTable },
    setup() {
      return { args };
    },
    template: `
      <BTable 
          :headers="args.headers"
          :items="args.items"
          :enable-aggregation="args.enableAggregation"
      >
          <template #aggregation="{ item }">
              <td>
                <div class="flex items-center justify-center p-xxs rounded-full cursor-pointer hover:bg-neutral-surface-highlight">
                  <b-icon
                    name="arrow_drop_down"
                    class="transition-transform"
                    :class="{ 'rotate-180': item.expanded }"
                    @click="item.expanded = !item.expanded"
                  />
                </div>
              </td>
          </template>

          <template v-for="header in args.headers" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #childs="{ item, index }">
              <template v-if="item.expanded">
              <tr
                  v-for="(child, childIndex) in item.childs"
                  :key="childIndex"
                  class="bg-neutral-surface-highlight text-neutral-foreground-low [&>*]:py-xs [&>*]:px-lg"
              >
                  <td />
                  <td v-for="header in args.headers">{{ child[header.value] }}</td>
              </tr>
          </template>
      </BTable>
    `,
  }),
  args: {
    ...defaultArgs,
    enableAggregation: true,
  },
};

export const IsHeaderFixed: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    itemsPerPage: 100,
    isHeaderFixed: true,
  },
};

export const HasHover: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    hasHover: true,
  },
};

export const HideFooter: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideFooter: true,
  },
};

export const NoShadow: Story = {  
  render: defaultRender,
  args: {
    ...defaultArgs,
    noShadow: true,
  },
};

export const EmptyState: Story = {
  render: (args: any) => ({
    components: { BTable },
    setup() {
      return { args };
    },
    template: `
      <BTable 
        :headers="args.headers"
        :items="args.items"
      >
          <template #empty-state>
              <div class="flex items-center justify-center p-xxs rounded-full text-xl">
                  <BIcon name="sentiment_dissatisfied" size="1em" />
              </div>
          </template>
      </BTable>
    `,
  }),
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const Footer: Story = {
  render: (args: any) => ({
    components: { BTable },
    setup() {
      return { args };
    },
    template: `
      <BTable 
        :headers="args.headers"
        :items="args.items"
      >
          <template v-for="header in args.headers" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #footer>
            Footer
          </template>
      </BTable>
    `,
  }),
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const ItemsPerPage: Story = {
  render: (args: any) => ({
    components: { BTable },
    setup() {
      return { args };
    },
    template: `
      <BTable 
        :headers="args.headers"
        :items="args.items"
      >
          <template v-for="header in args.headers" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #items-per-page>
            Slot: Items per page
          </template>
      </BTable>
    `,
  }),
  args: {
    ...defaultArgs,
    items: [],
  },
};

export const ShowingPage: Story = {
  render: (args: any) => ({
    components: { BTable },
    setup() {
      return { args };
    },
    template: `
      <BTable 
        :headers="args.headers"
        :items="args.items"
      >
          <template v-for="header in args.headers" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #showing-page="{ min, max, total }">
            Slot: Showing page; Min: {{ min }}; Max: {{ max }}; Total: {{ total }}
          </template>
      </BTable>
    `,
  }),
  args: {
    ...defaultArgs,
    items: [],
  },
};
