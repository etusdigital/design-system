import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BContentScreen from "./BContentScreen.vue";

const meta = {
  component: BContentScreen,
  argTypes: {
    progression: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 0 },
      },
      description:
        "Thil will be the current step the user is on. If the steps is not defined, it will be the progress bar fill percentage in 0 to 1 scale.",
    },
    steps: {
      type: { summary: "number" },
      table: {
        defaultValue: { summary: 0 },
      },
      description:
        "Thil will be the amount of steps used to calculate the loading percentage.",
    },
    isImgRight: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    isAnimatedLogo: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    "bg-logo": {
      description: "This slot is meant to change the content on the left side",
    },
    "bg-logo-text": {
      description: "This slot is meant to change the text on left side",
    },
    default: {
      description: "This slot is meant to change the content on the right side",
    },
    logo: {
      description: "This slot is meant to change the logo on the right side",
    },
    "progress-bar": {
      description:
        "This slot is meant to change the progress bar on the right side",
    },
    card: {
      description: "This slot is meant to change the card on the right side",
    },
    "card-content": {
      description:
        "This slot is meant to change the card content on the right side",
    },
    actions: {
      description: "This slot is meant to change the actions on the right side",
    },
  },
} satisfies Meta<typeof BContentScreen>;
export default meta;

type Story = StoryObj<typeof BContentScreen>;

const defArgs = {
  progression: 0,
  steps: 0,
  isImgRight: false,
  isAnimatedLogo: false,
};

export const Primary: Story = {
  render: (args: any) => ({
    components: { BContentScreen },
    setup() {
      return { args };
    },
    template: `
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <template #card-content>
                <div class="w-full p-base">
                    <h3 class="font-bold mb-xs">Title</h3>
                    <BInput placeholder="Type here" />
                </div>
            </template>
            <template #actions>
                <div class="w-full flex justify-between items-center">
                    <a class="font-bold text-[12px] cursor-pointer hover:no-underline">
                        Previous
                    </a>
                    <BButton>
                        Next
                    </BButton>
                </div>
            </template>
        </BContentScreen>
        `,
  }),
  args: defArgs,
};

export const Slots: Story = {
  render: (args: any) => ({
    components: { BContentScreen },
    setup() {
      return { args };
    },
    template: `
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <template #bg-logo-text>
                <div>slot: bg-logo-text</div>
            </template>
            <template #card>
                <div>slot: card</div>
            </template>
            <template #logo>
                <div>slot: logo</div>
            </template>
            <template #progress-bar>
                <div>slot: progress-bar</div>
            </template>
            <template #actions>
                <div>slot: actions</div>
            </template>
        </BContentScreen>
        `,
  }),
  args: defArgs,
};

export const Slots2: Story = {
  render: (args: any) => ({
    components: { BContentScreen },
    setup() {
      return { args };
    },
    template: `
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <div>slot: default</div>
            <template #bg-logo>
                <div>slot: bg-logo</div>
            </template>
        </BContentScreen>
        `,
  }),
  args: defArgs,
};
