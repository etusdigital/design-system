import type { Meta, StoryObj } from "@storybook/vue3";
import BInput from "./BInput.vue";

export default {
	component: BInput,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Will be the input current value.",
			control: { type: "object" },
			table: { type: { summary: "any" } },
		},
		labelValue: {
			description: "Will be the input label.",
			control: { type: "text" },
			table: { type: { summary: "string" } },
		},
		type: {
			description: "Will be the input type.",
			control: "select",
			options: [
				"text",
				"number",
				"search",
				"color",
				"password",
				"file",
				"email",
			],
			table: {
				type: {
					summary:
						"'text' | 'number' | 'search' | 'color' | 'password' | 'file' | 'email'",
				},
				defaultValue: { summary: "text" },
			},
		},
		max: {
			description: "Will be the maximum number of letters or input value.",
			control: { type: "number" },
			table: { type: { summary: "number" } },
		},
		min: {
			description: "Will be the minimum input value.",
			control: { type: "number" },
			table: { type: { summary: "number" } },
		},
		step: {
			description:
				"Will be the increase or decrease amount of the number input.",
			control: { type: "number" },
			table: { type: { summary: "number" } },
		},
		errorMessage: {
			description: "Will be the input error message.",
			control: { type: "text" },
			table: { type: { summary: "string" } },
		},
		infoMessage: {
			description: "Will be the input info message.",
			control: { type: "text" },
			table: { type: { summary: "string" } },
		},
		placeholder: {
			description: "Will be the input placeholder.",
			control: { type: "text" },
			table: { type: { summary: "string" } },
		},
		isError: {
			description: "Ative error mode.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		size: {
			description: "Will be input size.",
			control: "select",
			options: ["xs", "sm", "base", "lg", "xl", "100"],
			table: {
				type: { summary: "'xs' | 'sm' | 'base' | 'lg' | 'xl' | '100'" },
				defaultValue: { summary: "100" },
			},
		},
		mask: {
			description:
				"Will be the masked applied to the input. Only triggered on input type text without min or max limit.",
			control: "select",
			options: ["cpf", "cnpj", "cep", "domain", "url"],
			table: {
				type: {
					summary: "'cpf' | 'cnpj' | 'cep' | 'domain' | 'url' | undefined",
				},
				defaultValue: { summary: "undefined" },
			},
		},
		isTextArea: {
			description:
				"Instead of a regular input the component will be a text area.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		disabled: {
			description: "Desabilita o input",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		icon: {
			description: "Will be the input icon.",
			control: { type: "text" },
			table: { type: { summary: "string" } },
		},
		appendIcon: {
			description: "If true, the icon will be appended to the input.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
			},
		},
		textAlign: {
			description: "This property will be input text alignment.",
			control: "select",
			options: ["start", "center", "end"],
			table: {
				type: { summary: "'start' | 'center' | 'end'" },
				defaultValue: { summary: "start" },
			},
		},
		tooltipMinWidth: {
			description:
				"This property will be info tooltip min-width. It doesn't work with file input",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "none" },
			},
		},
		onFocus: {
			description: "Will be the function that execute when input get focus.",
			table: {
				category: "events",
				type: { summary: "(event: FocusEvent) => void" },
			},
		},
		onBlur: {
			description:
				"Will be the function that execute when input get out of focus.",
			table: {
				category: "events",
				type: { summary: "(event: FocusEvent) => void" },
			},
		},
		"uploaded-file": {
			description:
				"When the type is file and a file is uploaded, this slot will appear",
			table: { type: { summary: "slot" } },
		},
	},
} satisfies Meta<typeof BInput>;

type Story = StoryObj<typeof BInput>;

type BInputStoryArgs = Partial<InstanceType<typeof BInput>["$props"]>;

const defaultArgs: BInputStoryArgs = {
	modelValue: null,
	labelValue: "label",
	type: "text",
	mask: undefined,
	max: undefined,
	min: undefined,
	step: 1,
	errorMessage: "",
	infoMessage: "",
	placeholder: "",
	isError: false,
	size: "sm",
	isTextArea: false,
	disabled: false,
	required: false,
	textAlign: "start",
	tooltipMinWidth: "none",
	icon: "",
	appendIcon: false,
};

const defaultRender = (args: any) => ({
	components: { BInput },
	setup() {
		return { args };
	},
	template: `
    <BInput
		class="h-fit"
         v-model="args.modelValue"
         :labelValue="args.labelValue"
         :type="args.type"
         :mask="args.mask"
         :max="args.max"
         :min="args.min"
         :step="args.step"
         :error-message="args.errorMessage"
         :info-message="args.infoMessage"
         :is-error="args.isError"
         :is-text-area="args.isTextArea"
         :size="args.size"
         :disabled="args.disabled"
         :required="args.required"
         :placeholder="args.placeholder"
         :text-align="args.textAlign"
         :tooltip-min-width="args.tooltipMinWidth"
         :icon="args.icon"
         :append-icon="args.appendIcon"
    />`,
});

export const Primary: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		errorMessage: "Error message",
	},
};

export const Number: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: "Number",
		max: 10,
		min: 0,
		type: "number",
	},
};

export const TextArea: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: "Text area",
		isTextArea: true,
	},
};

export const Search: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: "Search",
		type: "search",
	},
};

export const Color: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: "Color",
		type: "color",
	},
};

export const MaxLetters: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		max: 20,
		type: "text",
	},
};

export const Error: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: "Error",
		isError: true,
		errorMessage: "Error message",
		type: "text",
	},
};

export const Password: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: "Password",
		type: "password",
	},
};

export const File: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: "Select a file",
		placeholder: "or drag and drop it here",
		type: "file",
	},
};

export const Email: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: "Email",
		errorMessage: "Invalid email",
		type: "email",
	},
};

export const InfoMessage: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		infoMessage: "Info message",
	},
};
