import type { StoryObj } from "@storybook/vue3";
import BCheckbox from "./BCheckbox.vue";
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
        rhs: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
            description: string;
        };
        allowIndeterminate: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: boolean;
                };
            };
            description: string;
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
        default: {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BCheckbox>;
export declare const Primary: Story;
export declare const RHS: Story;
//# sourceMappingURL=BCheckbox.stories.d.ts.map