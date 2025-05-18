import type { StoryObj } from "@storybook/vue3";
import BToggle from "./BToggle.vue";
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
type Story = StoryObj<typeof BToggle>;
export declare const Primary: Story;
export declare const RHS: Story;
//# sourceMappingURL=BToggle.stories.d.ts.map