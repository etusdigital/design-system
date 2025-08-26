import type { Meta, StoryObj } from "@storybook/vue3";
import BGroup from "./BGroup.vue";

export default {
  component: BGroup,
  argTypes: {
    modelValue: {
      type: { summary: "any" },
      table: {
        defaultValue: { summary: null },
      },
    },
    vertical: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
    disabled: {
      type: { summary: "boolean" },
      table: {
        defaultValue: { summary: false },
      },
    },
  },
} satisfies Meta<typeof BGroup>;

type Story = StoryObj<typeof BGroup>;


const defaultRender = (args: any) => ({
  components: { BGroup },
  setup() {
    return { args };
  },
  template:
    '<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' +
    '\n<BRadio :group-value="1">First</BRadio>' +
    '\n<BRadio :group-value="2">Second</BRadio>' +
    '\n<BRadio :group-value="3">Third</BRadio>' +
    "\n</BGroup>",
})

export const BRadio: Story = {
  render: defaultRender,
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
  },
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    vertical: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    disabled: true,
  },
};

export const BRadioButton: Story = {
  render: (args: any) => ({
    components: { BGroup },
    setup() {
      return { args };
    },
    template:
      '<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' +
      '\n<BRadioButton :group-value="1">First</BRadioButton>' +
      '\n<BRadioButton :group-value="2">Second</BRadioButton>' +
      '\n<BRadioButton :group-value="3">Third</BRadioButton>' +
      "\n</BGroup>",
  }),
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
  },
};

export const BRadioDiv: Story = {
  render: (args: any) => ({
    components: { BGroup },
    setup() {
      return { args };
    },
    template:
      '<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' +
      '\n<BRadioButton :group-value="1" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px]" /></BRadioButton>' +
      '\n<BRadioButton :group-value="2" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[4px]" /></BRadioButton>' +
      '\n<BRadioButton :group-value="3" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[50%]" /></BRadioButton>' +
      "\n</BGroup>",
  }),
  args: {
    modelValue: 1,
    vertical: false,
    disabled: false,
  },
};

export const BConector: Story = {
  render: (args: any) => ({
    components: { BGroup },
    setup() {
      return { args };
    },
    template:
      '<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" class="items-center">' +
      `\n<BCard class="p-[1em]">
                <BGroup>
                    <BInput label-value="label" min-height="3em" placeholder="Type here" />
                    <BSelect
                        label-value="label"
                        :items="[
                            { label: 'Option 1', something: 0, selected: false },
                            { label: 'Option 2', something: 1, selected: true },
                            { label: 'Option 3', something: 2, selected: false },
                            { label: 'Option 4', something: 3, selected: false },
                            { label: 'Option 5', something: 4, selected: false },
                        ]"
                    >
                        Select
                    </BSelect>
                    <BInput label-value="label" min-height="3em" placeholder="Type here" />
                </BGroup>
            </BCard>` +
      `\n<BRoundButton variant="positive" />` +
      "\n</BGroup>",
  }),
  args: {
    modelValue: undefined,
    vertical: true,
    disabled: false,
  },
};
