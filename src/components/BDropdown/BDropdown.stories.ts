import type { Meta, StoryObj } from "@storybook/vue3";
import BDropdown from "./BDropdown.vue";

export default {
	component: BDropdown,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Will be the selected current value.",
			control: { type: "object" },
			table: { type: { summary: "any" } },
		},
		expanded: {
			description: "Will be the expanded state. (Use with v-model:expanded)",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
			},
		},
		labelValue: {
			description: "Will be the select label.",
			control: { type: "text" },
			table: { type: { summary: "string | undefined" } },
		},
		items: {
			description:
				"Array of object to be used as menu options. Props(label: string, value: string, icon: string, disabled: boolean, bottom: boolean, items: same instruction as items)",
			control: { type: "object" },
			table: { type: { summary: "Item[]" } },
		},
		disabled: {
			description: "Desabilita o dropdown.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" },
			},
		},
		isError: {
			description: "Activate error mode.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" },
			},
		},
		absolute: {
			description: "Makes the content dropdown have an absolute position.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "true" },
			},
		},
		errorMessage: {
			description: "Will be the error message.",
			control: { type: "text" },
			table: { type: { summary: "string | undefined" } },
		},
		infoMessage: {
			description: "Will be the info message.",
			control: { type: "text" },
			table: { type: { summary: "string | undefined" } },
		},
		getObject: {
			description:
				"Se true, o modelValue emitido será o objeto completo do item, senão apenas o 'valueKey' do item.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
			},
		},
		searchable: {
			description: "Habilita a busca nos itens do dropdown.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
			},
		},
		default: {
			description: "Slot para o conteúdo que aciona o dropdown (ex: um botão).",
			table: { type: { summary: "slot" } },
		},
	},
} satisfies Meta<typeof BDropdown>;

type Story = StoryObj<typeof BDropdown>;

type BDropdownStoryArgs = Partial<InstanceType<typeof BDropdown>["$props"]>;

const defaultArgs: BDropdownStoryArgs = {
	modelValue: undefined,
	expanded: false,
	items: [
		{
			label: "Home",
			value: "home",
			icon: "home",
		},
		{
			label: "Publisher",
			value: "publisher",
			icon: "supervisor_account",
			items: [
				{
					label: "Group Account",
					value: "group-account",
					icon: "account_balance",
				},
				{
					label: "Account",
					value: "account",
					icon: "account_balance",
				},
			],
		},
		{
			label: "Errors",
			value: "errors",
			icon: "error",
			disabled: true,
		},
		{
			label: "Settings",
			value: "settings",
			icon: "settings",
			bottom: true,
		},
	],
	labelValue: "label",
	disabled: false,
	required: false,
	absolute: false,
	isError: false,
	errorMessage: "",
	infoMessage: "",
	getObject: false,
	searchable: false,
};

const defaultHtml = `
<BDropdown 
    v-model="args.modelValue"
    v-model:expanded="args.expanded"
    :label-value="args.labelValue"
    :items="args.items"
    :absolute="args.absolute" 
    :required="args.required" 
    :disabled="args.disabled"
    :is-error="args.isError"
    :error-message="args.errorMessage"
    :info-message="args.infoMessage"
    :get-object="args.getObject"
    :searchable="args.searchable"
/>`;

export const Primary: Story = {
	render: (args: any) => ({
		setup() {
			return { args };
		},
		template: defaultHtml,
	}),
	args: defaultArgs,
};

export const Searchable: Story = {
	render: (args: any) => ({
		setup() {
			return { args };
		},
		template: defaultHtml,
	}),
	args: {
		...defaultArgs,
		searchable: true,
	},
};

export const Slot: Story = {
	render: (args: any) => ({
		setup() {
			return { args };
		},
		template: `
    <BDropdown
      v-model="args.modelValue"
      v-model:expanded="args.expanded"
      :items="args.items"
      :absolute="args.absolute"
    >
      <BButton @click="args.expanded = !args.expanded">Custom Label</BButton>
    </BDropdown>`,
	}),
	args: defaultArgs,
};
