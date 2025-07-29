import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BTagInput from "./BTagInput.vue";

export default {
	component: BTagInput,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Array contendo os valores das tags (v-model).",
			control: { type: "object" },
			table: {
				type: { summary: "string[] | any[]" },
				defaultValue: { summary: "[]" },
			},
		},
		labelValue: {
			description: "Label do input.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
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
			description: "Mensagem informativa (geralmente para tooltips no label).",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
			},
		},
		placeholder: {
			description: "Placeholder do campo de input para nova tag.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
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
		allowDuplicate: {
			description: "Permite ou não a inserção de tags duplicadas.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		max: {
			description: "Número máximo de tags permitidas.",
			control: { type: "number" },
			table: {
				type: { summary: "number" },
			},
		},
		required: {
			description: "Indica se o campo é obrigatório (visual).",
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
		mask: {
			description: "Máscara a ser aplicada no input de novas tags.",
			control: "select",
			options: ["cpf", "cnpj", "cep", "domain", "url", "email", undefined],
			table: {
				type: {
					summary:
						"'cpf' | 'cnpj' | 'cep' | 'domain' | 'url' | 'email' | undefined",
				},
				defaultValue: { summary: "undefined" },
			},
		},
		"info-text": {
			description: "Slot para texto informativo abaixo do input.",
			table: {
				type: { summary: "VNode | string" },
			},
		},
	},
} satisfies Meta<typeof BTagInput>;

type Story = StoryObj<typeof BTagInput>;

const defaultArgs = {
	modelValue: undefined,
	labelValue: "label",
	errorMessage: "",
	infoMessage: "",
	placeholder: "",
	isError: false,
	required: false,
	allowDuplicate: false,
	max: undefined,
	disabled: false,
	mask: undefined,
};

const defaultRender = (args: any) => ({
	components: { BTagInput },
	setup() {
		return { args };
	},
	template: `
    <BTagInput
        v-model="args.modelValue"
        :label-value="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :allow-duplicate="args.allowDuplicate"
        :max="args.max"
        :required="args.required"
        :placeholder="args.placeholder"
        :mask="args.mask"
    >
        <template #info-text>
            Press enter to add a new tag
        </template>
    </BTagInput>

    `,
});

export const Primary: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
	},
};

export const Max: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		max: 10,
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

export const TagList: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		modelValue: ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5"],
	},
};
