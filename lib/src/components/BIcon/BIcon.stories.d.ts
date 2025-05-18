import type { StoryObj } from "@storybook/vue3";
import BIcon from "./BIcon.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    argTypes: {
        name: {
            type: {
                summary: string;
            };
            description: string;
        };
        size: {
            type: {
                summary: string;
            };
            description: string;
        };
        filled: {
            type: {
                summary: string;
            };
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof BIcon>;
export declare const Primary: Story;
//# sourceMappingURL=BIcon.stories.d.ts.map