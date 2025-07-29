import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BSmartSelect from "./BSmartSelect.vue";

export default {
	component: BSmartSelect,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Valor(es) selecionado(s) (v-model). Pode ser any ou any[].",
			control: { type: "object" },
			table: {
				type: { summary: "any | any[]" },
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
				"Array de strings ou objetos para as opções. Objetos devem ter chaves correspondentes a 'labelKey' e 'valueKey'.",
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
			description: "Chave do objeto item a ser usada como label.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "label" },
			},
		},
		valueKey: {
			description: "Chave do objeto item a ser usada como valor.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "value" },
			},
		},
		getObject: {
			description:
				"Se verdadeiro, o modelValue será o objeto item inteiro, não apenas o valor da 'valueKey'.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		isMultiple: {
			description: "Permite múltiplas seleções. modelValue será um array.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
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
		searchable: {
			description: "Habilita a funcionalidade de busca dentro do dropdown.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		clearable: {
			description: "Mostra um botão para limpar a seleção.",
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
		default: {
			description:
				"Slot para o conteúdo exibido no campo de seleção antes de abrir o dropdown.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		status: {
			description:
				"Slot para exibir um status ou ícone adicional dentro do campo de seleção. Props: item (item selecionado).",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		"clear-text": {
			description:
				"Slot para o texto do botão 'Limpar' (se 'clearable' for true).",
			table: {
				type: { summary: "VNode | string" },
			},
		},
		item: {
			description:
				"Slot para customizar a renderização de cada item na lista do dropdown. Props: item, index.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BSmartSelect>;

type Story = StoryObj<typeof BSmartSelect>;

const defaultArgs = {
	modelValue: null,
	items: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
	icon: "",
	expanded: false,
	labelKey: "label",
	valueKey: "value",
	labelValue: "label",
	searchable: false,
	clearable: false,
	isMultiple: false,
	getObject: false,
	disabled: false,
	required: false,
	isError: false,
	errorMessage: "",
	infoMessage: "",
	absolute: false,
};

const defaultRender = (args: any) => ({
	setup() {
		return { args };
	},
	template: `
    <BSmartSelect 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :labelValue="args.labelValue"
        :items="args.items" 
        :icon="args.icon" 
        :absolute="args.absolute" 
        :label-key="args.labelKey" 
        :value-key="args.valueKey"
        :required="args.required" 
        :searchable="args.searchable" 
        :clearable="args.clearable"
        :disabled="args.disabled"
        :is-multiple="args.isMultiple"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :get-object="args.getObject"
    >
        Placeholder
    </BSmartSelect>
    <span class="block mt-[1em]">Selected: {{ (typeof args.modelValue == 'object') ? JSON.stringify(args.modelValue) : args.modelValue }}</span>
  `,
});

export const Primary: Story = {
	render: defaultRender,
	args: defaultArgs,
};

export const ObjectArray: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		getObject: true,
		items: [
			{ label: "Option 1", value: 0 },
			{ label: "Option 2", value: 1 },
			{ label: "Option 3", value: 2 },
			{ label: "Option 4", value: 3 },
		],
	},
};

export const Multiple: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		isMultiple: true,
		items: [
			{ label: "Option 1", value: 0 },
			{ label: "Option 2", value: 1 },
			{ label: "Option 3", value: 2 },
			{ label: "Option 4", value: 3 },
		],
	},
};

export const CustomItem: Story = {
	render: (args: any) => ({
		setup() {
			return { args };
		},
		template: `
      <BSmartSelect
          v-model="args.modelValue" 
          v-model:expanded="args.expanded" 
          :labelValue="args.labelValue"
          :items="args.items" 
          :icon="args.icon" 
          :absolute="args.absolute" 
          :label-key="args.labelKey" 
          :value-key="args.valueKey"
          :required="args.required" 
          :searchable="args.searchable" 
          :clearable="args.clearable"
          :disabled="args.disabled"
          :is-multiple="args.isMultiple"
          :is-error="args.isError"
          :error-message="args.errorMessage"
          :info-message="args.infoMessage"
          :get-object="args.getObject"
      >
          Placeholder
          <template #item="{ item, index }">
              <div class="flex items-center gap-2">
                  <BIcon name="account_circle" />
                  {{ item }}
              </div>
          </template>
      </BSmartSelect>
    `,
	}),
	args: defaultArgs,
};
