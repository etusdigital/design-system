import type { StoryObj } from "@storybook/vue3";
import BCollapse from "./BCollapse.vue";
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
            description: string;
        };
        duration: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: number;
                };
            };
            description: string;
        };
        noShadow: {
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
        header: {
            description: string;
        };
        default: {
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BCollapse>;
export declare const Primary: Story;
//# sourceMappingURL=BCollapse.stories.d.ts.map