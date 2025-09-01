import type { Meta, StoryObj } from '@storybook/vue3';
import FileUpload from './FileUpload.vue';

export default {
	component: FileUpload,
	argTypes: {
		modelValue: {
			type: { summary: 'any' },
			description: 'Will be the uploaded file(s). Can be a single File or File[] if multiple is true.',
		},
		labelValue: {
			type: { summary: 'text' },
			description: 'Will be the file upload label.',
		},
		errorMessage: {
			type: { summary: 'text' },
			description: 'Will be the file upload error message.',
		},
		infoMessage: {
			type: { summary: 'text' },
			description: 'Will be the file upload info message.',
		},
		placeholder: {
			type: { summary: 'text' },
			description: 'Will be the file upload placeholder text.',
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
			description: 'Will be file upload size.',
			control: 'select',
			options: ['xs', 'sm', 'base', 'lg', 'xl', 'full'],
			table: {
				defaultValue: { summary: 'full' },
			},
		},
		disabled: {
			type: { summary: 'boolean' },
			table: {
				defaultValue: { summary: false },
			},
			description: 'Disables the file upload functionality.',
		},
		accept: {
			description: 'Specifies the types of files that the server accepts. E.g., ".jpg,.png,.pdf"',
		},
		multiple: {
			table: {
				defaultValue: { summary: '(value)=>{void}' },
			},
			description: 'Allows multiple file selection.',
		},
		'uploaded-file': {
			description: 'Custom slot for displaying uploaded file information',
		},
	},
} satisfies Meta<typeof FileUpload>;

type Story = StoryObj<typeof FileUpload>;

const defaultArgs = {
	modelValue: undefined,
	labelValue: 'Upload File',
	errorMessage: '',
	infoMessage: '',
	placeholder: 'or drag and drop it here',
	isError: false,
	size: 'base' as const,
	disabled: false,
	required: false,
	tooltipMinWidth: 'none',
	accept: undefined,
	multiple: false,
};

const defaultRender = (args: any) => ({
	components: { FileUpload },
	setup() {
		return { args };
	},
	template: `
    <FileUpload
		class="h-fit"
         v-model="args.modelValue"
         :labelValue="args.labelValue"
         :error-message="args.errorMessage"
         :info-message="args.infoMessage"
         :is-error="args.isError"
         :size="args.size"
         :disabled="args.disabled"
         :required="args.required"
         :placeholder="args.placeholder"
         :tooltip-min-width="args.tooltipMinWidth"
         :accept="args.accept"
         :multiple="args.multiple"
    />`,
});

export const Primary: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
	},
};

export const WithAcceptTypes: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Upload Image',
		accept: '.jpg,.jpeg,.png,.gif',
		placeholder: 'Only image files allowed',
	},
};

export const MultipleFiles: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Upload Multiple Files',
		multiple: true,
		placeholder: 'Select multiple files or drag them here',
	},
};

export const Error: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Upload with Error',
		isError: true,
		errorMessage: 'File upload failed. Please try again.',
	},
};

export const InfoMessage: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Upload with Info',
		infoMessage: 'Maximum file size: 10MB. Supported formats: PDF, DOC, DOCX',
	},
};

export const Disabled: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Disabled Upload',
		disabled: true,
	},
};

export const Required: Story = {
	render: defaultRender,
	args: {
		...defaultArgs,
		labelValue: 'Required Upload',
		required: true,
	},
};

export const DifferentSizes: Story = {
	render: () => ({
		components: { FileUpload },
		template: `
		<div class="space-y-4">
			<div>
				<h3 class="text-sm font-medium mb-2">Extra Small (xs)</h3>
				<FileUpload 
					size="xs" 
					labelValue="Extra Small Upload"
				/>
			</div>
			<div>
				<h3 class="text-sm font-medium mb-2">Small (sm)</h3>
				<FileUpload 
					size="sm" 
					labelValue="Small Upload"
				/>
			</div>
			<div>
				<h3 class="text-sm font-medium mb-2">Base</h3>
				<FileUpload 
					size="base" 
					labelValue="Base Upload"
				/>
			</div>
			<div>
				<h3 class="text-sm font-medium mb-2">Large (lg)</h3>
				<FileUpload 
					size="lg" 
					labelValue="Large Upload"
				/>
			</div>
		</div>
		`,
	}),
};