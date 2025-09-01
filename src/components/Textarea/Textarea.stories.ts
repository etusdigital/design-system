import type { Meta, StoryObj } from '@storybook/vue3';
import Textarea from './Textarea.vue';

export default {
	component: Textarea,
	argTypes: {
		modelValue: {
			description: 'Will be the textarea current value.',
		},
		labelValue: {
			description: 'Will be the textarea label.',
		},
		max: {
			description: 'Will be the maximum number of characters.',
		},
		errorMessage: {
			description: 'Will be the textarea error message.',
		},
		infoMessage: {
			description: 'Will be the textarea info message.',
		},
		placeholder: {
			description: 'Will be the textarea placeholder.',
		},
		isError: {
			table: {
				defaultValue: { summary: 'false' },
			},
			description: 'Activate error mode.',
		},
		size: {
			description: 'Will be textarea size.',
			control: 'select',
			options: ['xs', 'sm', 'base', 'lg', 'xl', 'full'],
			table: {
				defaultValue: { summary: 'full' },
			},
		},
		disabled: {
			table: {
				defaultValue: { summary: 'false' },
			},
		},
		textAlign: {
			control: 'select',
			options: ['start', 'center', 'end'],
			table: {
				defaultValue: { summary: 'start' },
			},
			description: 'This property will be textarea text alignment.',
		},
		tooltipMinWidth: {
			table: {
				defaultValue: { summary: 'none' },
			},
			description: "This property will be info tooltip min-width.",
		},
	},
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

const defaultArgs = {
	modelValue: '',
	labelValue: 'Textarea Label',
	max: undefined,
	errorMessage: '',
	infoMessage: '',
	placeholder: 'Enter your text here...',
	isError: false,
	size: 'sm' as const,
	disabled: false,
	required: false,
	textAlign: 'start' as const,
	tooltipMinWidth: 'none',
};

const defaultRender = (args: any) => ({
	components: { Textarea },
	setup() {
		return { args };
	},
	template: `
    <Textarea
		class="h-fit"
         v-model="args.modelValue"
         :labelValue="args.labelValue"
         :max="args.max"
         :error-message="args.errorMessage"
         :info-message="args.infoMessage"
         :is-error="args.isError"
         :size="args.size"
         :disabled="args.disabled"
         :required="args.required"
         :placeholder="args.placeholder"
         :text-align="args.textAlign"
         :tooltip-min-width="args.tooltipMinWidth"
    />`,
});

export const Primary: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
	},
};

export const MaxCharacters: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Textarea with Character Limit',
		max: 100,
		placeholder: 'Type your message... (max 100 characters)',
	},
};

export const Error: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Textarea with Error',
		isError: true,
		errorMessage: 'This field contains an error',
	},
};

export const InfoMessage: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Textarea with Info',
		infoMessage: 'This is helpful information about this field',
	},
};

export const Disabled: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Disabled Textarea',
		disabled: true,
		modelValue: 'This textarea is disabled',
	},
};

export const Required: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Required Textarea',
		required: true,
	},
};

export const DifferentSizes: Story = {
	render: () => ({
		components: { Textarea },
		template: `
		<div class="space-y-4">
			<div>
				<h3 class="text-sm font-medium mb-2">Extra Small (xs)</h3>
				<Textarea 
					size="xs" 
					labelValue="Extra Small" 
					placeholder="Extra small textarea..."
				/>
			</div>
			<div>
				<h3 class="text-sm font-medium mb-2">Small (sm)</h3>
				<Textarea 
					size="sm" 
					labelValue="Small" 
					placeholder="Small textarea..."
				/>
			</div>
			<div>
				<h3 class="text-sm font-medium mb-2">Base</h3>
				<Textarea 
					size="base" 
					labelValue="Base" 
					placeholder="Base size textarea..."
				/>
			</div>
			<div>
				<h3 class="text-sm font-medium mb-2">Large (lg)</h3>
				<Textarea 
					size="lg" 
					labelValue="Large" 
					placeholder="Large textarea..."
				/>
			</div>
		</div>
		`,
	}),
};

export const TextAlignment: Story = {
	render: () => ({
		components: { Textarea },
		template: `
		<div class="space-y-4">
			<Textarea 
				labelValue="Left Aligned (default)" 
				text-align="start"
				placeholder="Text aligned to the left..."
			/>
			<Textarea 
				labelValue="Center Aligned" 
				text-align="center"
				placeholder="Text aligned to center..."
			/>
			<Textarea 
				labelValue="Right Aligned" 
				text-align="end"
				placeholder="Text aligned to the right..."
			/>
		</div>
		`,
	}),
};