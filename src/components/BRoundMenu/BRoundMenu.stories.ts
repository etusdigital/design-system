import type { Meta, StoryObj } from "@storybook/vue3";
import BRoundMenu from "./BRoundMenu.vue";

export default {
  component: BRoundMenu,
  argTypes: {
    items: {
      type: { summary: "array" },
      table: {
        defaultValue: { summary: "[]" },
      },
      description:
        "This property will be items in menu. Props(label: string, icon: string, background: string, action: ()=>{void})",
    },
  },
} satisfies Meta<typeof BRoundMenu>;

type Story = StoryObj<typeof BRoundMenu>;

export const Primary: Story = {
  render: (args: any) => ({
    components: { BRoundMenu },
    setup() {
      return { args };
    },
    template: `
        <div class="px-[3em] py-[4em]">
            <BRoundMenu :items="args.items" />
        </div>
        `,
  }),
  args: {
    items: [
      {
        icon: "email",
        label: "Send email",
        background: "#0057F4",
        action: () => {}
      },
      {
        icon: "stop",
        label: "Finish Automation",
        background: "#F03232",
        action: () => {},
      },
      {
        icon: "schedule",
        label: "Wait",
        background: "#5C5C5C",
        action: () => {},
      },
      {
        icon: "history",
        label: "Time condition",
        background: "#FF9654",
        action: () => {},
      },
      {
        icon: "add",
        label: "Conditional",
        background: "#4A004F",
        action: () => {},
      },
      {
        icon: "new_label",
        label: "Add tag",
        background: "#009BE4",
        action: () => {}
      },
      {
        icon: "label_off",
        label: "Remove tag",
        background: "#F06158",
        action: () => {},
      },
      {
        icon: "add_circle",
        label: "Trigger",
        background: "#7B61FF",
        action: () => {},
      },
      {
        icon: "call_split",
        label: "Split",
        background: "#FFC500",
        action: () => {}
      },
    ],
  },
};
