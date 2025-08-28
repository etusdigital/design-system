import type { Meta, StoryObj } from '@storybook/vue3';
import Input from './Input.vue';

export default {
	component: Input,
	argTypes: {
		modelValue: {
			type: { summary: 'any' },
			description: 'Will be the input current value.',
		},
		labelValue: {
			type: { summary: 'text' },
			description: 'Will be the input label.',
		},
		type: {
			type: { summary: 'text' },
			control: 'select',
			options: ['text', 'number', 'search', 'color', 'password', 'file', 'email'],
			table: {
				defaultValue: { summary: 'text' },
			},
			description: 'Will be the input type.',
		},
		max: {
			type: { summary: 'number' },
			description: 'Will be the maximum number of letters or input value.',
		},
		min: {
			type: { summary: 'number' },
			description: 'Will be the minimum input value.',
		},
		step: {
			type: { summary: 'number' },
			description: 'Will be the increase or decrease amount of the number input.',
		},
		errorMessage: {
			type: { summary: 'text' },
			description: 'Will be the input error message.',
		},
		infoMessage: {
			type: { summary: 'text' },
			description: 'Will be the input info message.',
		},
		placeholder: {
			type: { summary: 'text' },
			description: 'Will be the input placeholder.',
		},
		isError: {
			type: { summary: 'boolean' },
			table: {
				defaultValue: { summary: false },
			},
			description: 'Ative error mode.',
		},
		size: {
			type: { summary: 'text' },
			description: 'Will be input size.',
			control: 'select',
			options: ['xs', 'sm', 'base', 'lg', 'xl', 'full'],
			table: {
				defaultValue: { summary: 'full' },
			},
		},
		mask: {
			type: { summary: 'text' },
			description:
				'Will be the masked applied to the input. Only triggered on input type text without min or max limit.',
			control: 'select',
			options: ['cpf', 'cnpj', 'cep', 'domain', 'url'],
			table: {
				defaultValue: { summary: undefined },
			},
		},
		isTextArea: {
			type: { summary: 'boolean' },
			description: 'Instead of a regular input the component will be a text area.',
			table: {
				defaultValue: { summary: false },
			},
		},
		disabled: {
			type: { summary: 'boolean' },
			table: {
				defaultValue: { summary: false },
			},
		},
		icon: {
			type: { summary: 'text' },
			description: 'Will be the input icon.',
		},
		appendIcon: {
			type: { summary: 'boolean' },
			description: 'If true, the icon will be appended to the input.',
		},
		textAlign: {
			type: { summary: 'text' },
			control: 'select',
			options: ['start', 'center', 'end'],
			table: {
				defaultValue: { summary: 'start' },
			},
			description: 'This property will be input text alignment.',
		},
		tooltipMinWidth: {
			type: { summary: 'text' },
			table: {
				defaultValue: { summary: 'none' },
			},
			description: "This property will be info tooltip min-width. It doesn't work with file input",
		},
		focus: {
			type: { summary: 'function' },
			table: {
				defaultValue: { summary: '(value)=>{void}' },
			},
			description: 'Will be the function that execute when input get focus.',
		},
		blur: {
			type: { summary: 'function' },
			table: {
				defaultValue: { summary: '(value)=>{void}' },
			},
			description: 'Will be the function that execute when input get out of focus.',
		},
		'uploaded-file': {
			description: 'When the type is file and a file is uploaded, this slot will appear',
		},
		"icon-slot": {
		  description: "Will be the icon slot.",
		},
		"appended-icon-slot": {
		  description: "Will be the appended icon slot.",
		},
	},
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

const defaultArgs = {
	modelValue: null,
	labelValue: 'label',
	type: 'text',
	mask: undefined,
	max: undefined,
	min: undefined,
	step: 1,
	errorMessage: '',
	infoMessage: '',
	placeholder: '',
	isError: false,
	size: 'sm',
	isTextArea: false,
	disabled: false,
	required: false,
	textAlign: 'start',
	tooltipMinWidth: 'none',
	icon: '',
	appendIcon: false,
};

const defaultRender = (args: any) => ({
	components: { Input },
	setup() {
		return { args };
	},
	template: `
    <Input
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
		errorMessage: 'Error message',
	},
};

export const Number: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Number',
		max: 10,
		min: 0,
		type: 'number',
	},
};

export const TextArea: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Text area',
		isTextArea: true,
	},
};

export const Search: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Search',
		type: 'search',
	},
};

export const Color: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Color',
		type: 'color',
	},
};

export const MaxLetters: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		max: 20,
		type: 'text',
	},
};

export const Error: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Error',
		isError: true,
		errorMessage: 'Error message',
		type: 'text',
	},
};

export const Password: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Password',
		type: 'password',
	},
};

export const File: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Select a file',
		placeholder: 'or drag and drop it here',
		type: 'file',
	},
};

export const Email: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Email',
		errorMessage: 'Invalid email',
		type: 'email',
	},
};

export const InfoMessage: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		infoMessage: 'Info message',
	},
};

export const Disabled: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		disabled: true,
	},
};

export const Required: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		required: true,
	},
};