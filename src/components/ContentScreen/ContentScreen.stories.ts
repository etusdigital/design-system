import type { Meta, StoryObj } from "@storybook/vue3";
import ContentScreen from "./ContentScreen.vue";

export default {
  component: ContentScreen,
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
    "bg-logo-label": {
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
} satisfies Meta<typeof ContentScreen>;

type Story = StoryObj<typeof ContentScreen>;

const defArgs = {
  progression: 0,
  steps: 0,
  isImgRight: false,
  isAnimatedLogo: false,
};

const defaultRender = (args: any) => ({
  components: { ContentScreen },
  setup() {
    return { args };
  },
  template: `
      <ContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
          <template #card-content>
              <div class="w-full p-base">
                  <h3 class="font-bold mb-xs">Title</h3>
                  <Input placeholder="Type here" />
              </div>
          </template>
          <template #actions>
              <div class="w-full flex justify-between items-center">
                  <a class="font-bold text-xs cursor-pointer hover:no-underline">
                      Previous
                  </a>
                  <Button>Next</Button>
              </div>
          </template>
      </ContentScreen>
      `,
})

export const Primary: Story = {
  render: defaultRender,
  args: defArgs,
};

export const IsImgRight: Story = {
  render: defaultRender,
  args: {
    ...defArgs,
    isImgRight: true,
  },
};

export const Default: Story = {
  render: (args: any) => ({
    components: { ContentScreen },
    setup() {
      return { args };
    },
    template: `
        <ContentScreen>
            Slot: default
        </ContentScreen>
        `,
  }),
  args: defArgs,
};

export const BgLogo: Story = {
  render: (args: any) => ({
    components: { ContentScreen },
    setup() {
      return { args };
    },
    template: `
        <ContentScreen>
            <template #bg-logo>
                Slot: bg-logo
            </template>
        </ContentScreen>
        `,
  }),
  args: defArgs,
};

export const BgLogoText: Story = {
  render: (args: any) => ({
    components: { ContentScreen },
    setup() {
      return { args };
    },
    template: `
        <ContentScreen>
            <template #bg-logo-label>
                Slot: bg-logo-label
            </template>
        </ContentScreen>
        `,
  }),
  args: defArgs,
};

export const Logo: Story = {
  render: (args: any) => ({
    components: { ContentScreen },
    setup() {
      return { args };
    },
    template: `
        <ContentScreen>
            <template #logo>
                Slot: logo
            </template>
        </ContentScreen>
        `,
  }),
  args: defArgs,
};

export const ProgressBar: Story = {
  render: (args: any) => ({
    components: { ContentScreen },
    setup() {
      return { args };
    },
    template: `
        <ContentScreen>
            <template #progress-bar>
                Slot: progress-bar
            </template>
        </ContentScreen>
        `,
  }),
  args: defArgs,
};

export const Card: Story = {
  render: (args: any) => ({
    components: { ContentScreen },
    setup() {
      return { args };
    },
    template: `
        <ContentScreen>
            <template #card>
                Slot: card
            </template>
        </ContentScreen>
        `,
  }),
  args: defArgs,
};

export const CardContent: Story = {
  render: (args: any) => ({
    components: { ContentScreen },
    setup() {
      return { args };
    },
    template: `
        <ContentScreen>
            <template #card-content>
                Slot: card-content
            </template>
        </ContentScreen>
        `,
  }),
  args: defArgs,
};

export const Actions: Story = {
  render: (args: any) => ({
    components: { ContentScreen },
    setup() {
      return { args };
    },
    template: `
        <ContentScreen>
            <template #actions>
                <div>Slot: actions</div>
            </template>
        </ContentScreen>
        `,
  }),
  args: defArgs,
};
