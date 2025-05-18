import type { StoryObj } from "@storybook/vue3";
import BCrop from "./BCrop.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            description: string;
        };
        src: {
            type: {
                summary: string;
            };
            description: string;
        };
        width: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        height: {
            type: {
                summary: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BCrop>;
export declare const Primary: Story;
//# sourceMappingURL=BCrop.stories.d.ts.map