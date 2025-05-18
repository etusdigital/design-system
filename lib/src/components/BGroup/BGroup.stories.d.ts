import type { StoryObj } from "@storybook/vue3";
import BGroup from "./BGroup.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: null;
                };
            };
        };
        vertical: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        disabled: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof BGroup>;
export declare const BRadio: Story;
export declare const BRadioButton: Story;
export declare const BRadioDiv: Story;
export declare const BConector: Story;
//# sourceMappingURL=BGroup.stories.d.ts.map