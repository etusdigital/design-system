import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BMenu from "./BMenu.vue";

export default {
	component: BMenu,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Will name of the selected item.",
			control: { type: "object" },
			table: {
				type: { summary: "any" },
			},
		},
		items: {
			description:
				"Array of object to be used as menu options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean)",
			control: { type: "object" },
			table: {
				type: { summary: "Item[]" },
			},
		},
		getObject: {
			description:
				"If true, the selected value will be an object instead of value-key value.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof BMenu>;

type Story = StoryObj<typeof BMenu>;

const menuModel = {
	label: "Home",
	value: "home",
	icon: "home",
	path: "/",
	items: [
		{
			label: "Publisher",
			value: "publisher",
			path: "/publisher",
			icon: "people",
			items: [
				{
					label: "Group Account",
					value: "group-account",
					path: "/group-account",
					icon: "account_balance",
				},
			],
		},
	],
};

type BMenuStoryArgs = Partial<InstanceType<typeof BMenu>["$props"]>;

const defaultArgs: BMenuStoryArgs = {
	modelValue: "home",
	getObject: false,
	items: [
		{
			label: "Home",
			value: "home",
			icon: "home",
			path: "/",
		},
		{
			label: "Publisher",
			value: "publisher",
			path: "/publisher",
			icon: "people",
		},
		{
			label: "Errors",
			value: "errors",
			path: "/errors",
			icon: "error",
			disabled: true,
		},
		{
			label: "Settings",
			value: "settings",
			path: "/settings",
			icon: "settings",
			bottom: true,
		},
	],
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BMenu },
		setup() {
			return { args };
		},
		template: `
    <div class="h-screen">
    <BMenu
      v-model="args.modelValue"
      :items="args.items"
      :get-object="args.getObject"
    />
    </div>
      `,
	}),
	args: defaultArgs,
};

export const WithSideMenu: Story = {
	render: (args: any) => ({
		components: { BMenu },
		setup() {
			return { args };
		},
		template: `
    <div class="flex h-screen">
      <BMenu
        v-model="args.modelValue"
        :items="args.items"
        get-object
      />
      <BSideMenu
        :items="args.modelValue.items"
        :parent-path="args.modelValue.path"
        :get-object="args.getObject"
      />
    </div>
      `,
	}),
	args: {
		...defaultArgs,
		modelValue: menuModel,
		items: [
			menuModel,
			{
				label: "Errors",
				value: "errors",
				path: "/errors",
				icon: "error",
				disabled: true,
			},
			{
				label: "Settings",
				value: "settings",
				path: "/settings",
				icon: "settings",
				bottom: true,
			},
		],
	},
};
