import type { StoryObj } from "@storybook/vue3";
import BRadio from "./BRadio.vue";
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
        variant: {
            type: {
                summary: string;
            };
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        default: {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BRadio>;
export declare const Primary: Story;
//# sourceMappingURL=BRadio.stories.d.ts.map