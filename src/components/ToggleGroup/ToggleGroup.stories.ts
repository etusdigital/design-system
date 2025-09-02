import type { Meta, StoryObj } from "@storybook/vue3";
import ToggleGroup from "./ToggleGroup.vue";

export default {
  component: ToggleGroup,
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
    type: {
      control: "select",
      options: ["default", "secondary"],
      table: {
        defaultValue: { summary: "default" },
      },
    },
  },
} satisfies Meta<typeof ToggleGroup>;

type Story = StoryObj<typeof ToggleGroup>;

const defaultArgs = {
  modelValue: 1,
  vertical: false,
  disabled: false,
  items: [
    { label: "First", value: 1 },
    { label: "Second", value: 2 },
    { label: "Third", value: 3 },
  ],
  labelKey: "label",
  valueKey: "value",
  getObject: false,
  type: "default",
};

const defaultHtml = `
  <ToggleGroup
    v-model="args.modelValue"
    :vertical="args.vertical"
    :disabled="args.disabled"
    :items="args.items"
    :label-key="args.labelKey"
    :value-key="args.valueKey"
    :get-object="args.getObject"
    :type="args.type"
  />
`;

const defaultRender = (args: any) => ({
  components: { ToggleGroup },
  setup() {
    return { args };
  },
  template: defaultHtml,
});

export const Primary: Story = {
  render: defaultRender,
  args: defaultArgs,
};

export const Vertical: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true,
  },
};

export const Disabled: Story = {
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};


export const Types: Story = {
  render: (args: any) => ({
    components: { ToggleGroup },
    setup() {
      return { args };
    },
    template: `
      <div class="flex flex-col gap-xs">
          ${["default", "secondary"]
            .map(
              (type) => `
            ${defaultHtml.replace(/args\.type/g, `'${type}'`)}
          `
            )
            .join("")}
      </div>
    `,
  }),
  args: defaultArgs,
};