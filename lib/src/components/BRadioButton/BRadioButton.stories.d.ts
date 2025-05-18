import type { StoryObj } from "@storybook/vue3";
import BRadioButton from "./BRadioButton.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        groupValue: {
            description: string;
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: string;
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
        isDiv: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
        };
        default: {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BRadioButton>;
export declare const Primary: Story;
export declare const RadioDiv: Story;
//# sourceMappingURL=BRadioButton.stories.d.ts.map