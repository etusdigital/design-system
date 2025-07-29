import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BTable from "./BTable.vue";

export default {
	component: BTable,
	tags: ["autodocs"],
	argTypes: {
		headers: {
			description: "Define os cabeçalhos da tabela.",
			control: { type: "object" },
			table: {
				type: { summary: "Header[]" },
			},
		},
		items: {
			description: "Array de itens a serem exibidos na tabela.",
			control: { type: "object" },
			table: {
				type: { summary: "any[]" },
			},
		},
		options: {
			description: "Opções de ordenação inicial.",
			control: { type: "object" },
			table: {
				type: { summary: "Options" }, // { sortBy?: string; sortDesc?: boolean; }
			},
		},
		page: {
			description: "Página atual da tabela.",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "1" },
			},
		},
		itemsPerPage: {
			description: "Número de itens por página.",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "10" },
			},
		},
		numberOfItems: {
			description: "Número total de itens (usado para paginação no backend).",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
				defaultValue: { summary: "0" },
			},
		},
		renderPaginationInBackEnd: {
			description: "Indica se a paginação é controlada pelo backend.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		hideFooter: {
			description: "Oculta o rodapé padrão da tabela.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		enableSelection: {
			description: "Habilita a seleção de todos os itens (checkbox no header).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		enableAggregation: {
			description: "Habilita espaço para agregação (coluna extra no início).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		isHeaderFixed: {
			description: "Fixa o cabeçalho da tabela e habilita scroll vertical.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		loading: {
			description: "Indica se os dados estão carregando (exibe skeleton).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		noShadow: {
			description: "Remove a sombra da tabela.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		hasHover: {
			description: "Habilita efeito hover nas linhas.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		sortBy: {
			description:
				"Evento emitido ao ordenar (key, isSortDesc). Usado com renderPaginationInBackEnd.",
			table: {
				type: { summary: "function" },
				// defaultValue: { summary: "(key, isSortDesc) => void" }, // Storybook pode ter dificuldade com isso
			},
		},
		pageItems: {
			description:
				"Evento emitido para buscar itens da página (page, itemsPerPage). Usado com renderPaginationInBackEnd.",
			table: {
				type: { summary: "function" },
				// defaultValue: { summary: "(page, itemsPerPage) => void" },
			},
		},
		selectAll: {
			description:
				"Evento emitido quando o checkbox 'selecionar todos' é clicado. Usado com enableSelection.",
			table: {
				type: { summary: "function" },
				// defaultValue: { summary: "(value: boolean) => void" },
			},
		},
		"empty-state": {
			description: "Slot exibido quando não há itens na tabela.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		select: {
			description:
				"Slot para a célula de seleção de linha. Props: item, index.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		aggregation: {
			description: "Slot para a célula de agregação. Props: item, index.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		footer: {
			description: "Slot para o rodapé customizado da tabela.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		childs: {
			description: "Slot para linhas filhas expansíveis. Props: item, index.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		"header.value": {
			description:
				"Slot para renderizar células de uma coluna específica. Nome do slot é o 'value' do header. Props: item, index.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		"items-per-page": {
			description: "Slot para o texto 'Itens por página' no rodapé.",
			table: {
				type: { summary: "VNode | string" },
				defaultValue: { summary: "Items per page" },
			},
		},
		"showing-page": {
			description:
				"Slot para o texto 'Mostrando X-Y de Z' no rodapé. Props: min, max, total.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		actions: {
			description:
				"Slot para a coluna de ações em cada linha. Props: item, index.",
			table: {
				type: { summary: "VNode | string" },
			},
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
	selectAll: (value: boolean) => {},
};

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
          :page="args.page"
          :items-per-page="args.itemsPerPage"
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
                    size="20px"
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
              <BRoundButton color="primary" variant="plain" icon="more_vert" />
              </td>
          </template>

          <template #childs="{ item, index }">
              <template v-if="item.expanded">
              <tr
                  v-for="(child, childIndex) in item.childs"
                  :key="childIndex"
                  class="bg-neutral-surface-highlight text-neutral-foreground-low *:py-xs *:px-lg"
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
