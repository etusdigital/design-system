import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BTagSelect from "./BTagSelect.vue";

export default {
	component: BTagSelect,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Array contendo os valores das tags selecionadas (v-model).",
			control: { type: "object" },
			table: {
				type: { summary: "any[]" },
			},
		},
		labelValue: {
			description: "Label do campo.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		items: {
			description:
				"Array de strings ou objetos para as opções. Objetos devem ter uma chave correspondente a 'labelKey'.",
			control: { type: "object" },
			table: {
				type: { summary: "string[] | any[]" },
			},
		},
		icon: {
			description: "Ícone a ser exibido ao lado do label.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		expanded: {
			description:
				"Controla o estado expandido do dropdown (v-model:expanded).",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		labelKey: {
			description:
				"Chave a ser usada como label quando 'items' é um array de objetos.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "label" },
			},
		},
		disabled: {
			description: "Desabilita o componente.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		isError: {
			description: "Ativa o modo de erro visualmente.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		errorMessage: {
			description: "Mensagem de erro a ser exibida.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		infoMessage: {
			description: "Mensagem informativa (ex: tooltip no label).",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		buttonText: {
			description: "Texto do botão de adicionar (se aplicável).",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "Add" },
			},
		},
		"search-text": {
			description: "Slot para o placeholder do input de busca.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		"no-items-found": {
			description: "Slot exibido quando a busca não retorna itens.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		"no-items": {
			description: "Slot exibido se o array 'items' estiver vazio.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		item: {
			description:
				"Slot para customizar a renderização de cada item na lista. Props: item, index.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BTagSelect>;

type Story = StoryObj<typeof BTagSelect>;

const defaultArgs = {
	modelValue: undefined,
	expanded: false,
	items: [],
	labelValue: "label",
	labelKey: "label",
	buttonText: "Add",
	required: false,
	errorMessage: "",
	infoMessage: "",
	icon: "",
	isError: false,
	disabled: false,
	absolute: false,
};

const defaultRender = (args: any) => ({
	components: { BTagSelect },
	setup() {
		return { args };
	},
	template: `
    <BTagSelect
        v-model="args.modelValue"
        :v-model:expanded="args.expanded"
        :items="args.items"
        :labelValue="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :icon="args.icon"
        :required="args.required"
        :label-key="args.labelKey"
        :absolute="args.absolute"
    >
        <template #search-text>
            Search
        </template>
        <template #no-items-found>
            No result found.
        </template>
        <template #no-items>
            No tags created yet.
        </template>
    </BTagSelect>
    `,
});

export const Primary: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
	},
};

export const Error: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		isError: true,
		errorMessage: "Error message",
	},
};

export const ObjectArray: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		items: [
			{ label: "Option 1", something: 0 },
			{ label: "Option 2", something: 1 },
			{ label: "Option 3", something: 2 },
			{ label: "Option 4", something: 3 },
			{ label: "Option 5", something: 4 },
		],
	},
};
