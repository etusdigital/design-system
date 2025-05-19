import type { Meta, StoryObj } from "@storybook/vue3";
import BSideMenu from "./BSideMenu.vue";

// Definir localmente para clareza e evitar conflitos de resolução do linter
interface StoryMenuItem {
	label: string;
	value: string;
	icon?: string;
	path?: string; // Path é usado nas stories
	disabled?: boolean;
	bottom?: boolean;
	items?: StoryMenuItem[]; // Recursivo
	selected?: boolean; // Da definição original de MenuItem.ts
	// Adicionar outras props de ItemT ou MenuItem se usadas nos dados da story
}

export default {
	component: BSideMenu,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description: "Will name of the selected item.",
			control: { type: "object" },
			table: { type: { summary: "any" } },
		},
		items: {
			description:
				"Array of object to be used as menu options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean, items: Item[])",
			control: { type: "object" },
			table: { type: { summary: "StoryMenuItem[]" } }, // Usar o tipo local
		},
		parentPath: {
			description: "Path of the parent all items.",
			control: { type: "text" },
			table: { type: { summary: "string | undefined" } },
		},
		getObject: {
			description:
				"If true, the selected value will be an object instead of value-key value.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" },
			},
		},
	},
} satisfies Meta<typeof BSideMenu>;

type Story = StoryObj<typeof BSideMenu>;

const menuModel: StoryMenuItem = {
	// Tipar menuModel com o tipo local
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

// Tipar defaultArgs explicitamente e a propriedade items com StoryMenuItem[]
type BSideMenuProps = InstanceType<typeof BSideMenu>["$props"];
// Usar Pick para pegar apenas as props que não são 'items', e depois adicionar 'items' com o tipo local
type BSideMenuStoryArgs = Partial<
	Pick<BSideMenuProps, Exclude<keyof BSideMenuProps, "items">>
> & { items?: StoryMenuItem[] };

const defaultArgs: BSideMenuStoryArgs = {
	modelValue: "home",
	getObject: false,
	parentPath: "",
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
			items: [
				{
					label: "Group Account",
					value: "group-account",
					path: "/group-account",
					icon: "account_balance",
				},
			],
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
		components: { BSideMenu },
		setup() {
			return { args };
		},
		template: `
    <div class="h-screen">
    <BSideMenu
      v-model="args.modelValue"
      :items="args.items"
      :get-object="args.getObject"
    />
    </div>
      `,
	}),
	args: defaultArgs,
};

export const WithMenu: Story = {
	render: (args: any) => ({
		components: { BSideMenu },
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
