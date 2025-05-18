import type { StoryObj } from "@storybook/vue3";
import BColorPicker from "./BColorPicker.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
        };
        type: {
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
    };
};
export default meta;
type Story = StoryObj<typeof BColorPicker>;
export declare const Primary: Story;
//# sourceMappingURL=BColorPicker.stories.d.ts.map