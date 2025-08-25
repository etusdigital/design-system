import type { Meta, StoryObj } from "@storybook/vue3";
import BSidebar from "./BSidebar.vue";

export default {
	component: BSidebar,
	tags: ["autodocs"],
	argTypes: {
		modelValue: {
			description:
				"Determine if the dialog is displayed or not. (Use with v-model)",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean" },
			},
		},
		width: {
			description: "Determine the dialog width.",
			control: { type: "text" },
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "fit-content" },
			},
		},
		noOutsideClose: {
			description:
				"Determine if the dialog will not close when the user click outside it.",
			control: { type: "boolean" },
			table: {
				type: { summary: "boolean | undefined" },
				defaultValue: { summary: "false" },
			},
		},
		default: {
			description: "This slot will be the dialog content.",
			table: { type: { summary: "slot" } },
		},
	},
} satisfies Meta<typeof BSidebar>;

type Story = StoryObj<typeof BSidebar>;

type BSidebarStoryArgs = Partial<InstanceType<typeof BSidebar>["$props"]>;

const defaultArgs: BSidebarStoryArgs = {
	modelValue: false,
	width: "40%",
	noOutsideClose: false,
};

export const Primary: Story = {
	render: (args: any) => ({
		components: { BSidebar },
		setup() {
			return { args };
		},
		template: `
        <BButton  @click="args.modelValue = !args.modelValue">Show Sidebar</BButton>
        <BSidebar
             v-model="args.modelValue"
             :width="args.width"
             :no-outside-close="args.noOutsideClose"
        >
            <div class="flex flex-col justify-between h-full p-xl">
                <div class="flex flex-col gap-sm">
                  <h2 class="font-bold text-lg">Sidebar</h2>
                  <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
                </div>
                <div class="flex justify-end w-full gap-xs">
                    <BButton variant="plain" @click="args.modelValue = false">Cancel</BButton>
                    <BButton>Save</BButton>
                </div>
            </div>
        </BSidebar>
        `,
	}),
	args: defaultArgs,
};
