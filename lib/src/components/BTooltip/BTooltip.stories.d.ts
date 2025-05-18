import type { StoryObj } from "@storybook/vue3";
import BTooltip from "./BTooltip.vue";
declare const meta: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        text: {
            type: {
                summary: string;
            };
            description: string;
        };
        position: {
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
    };
    args: {
        text: string;
        position: string;
    };
};
export default meta;
type Story = StoryObj<typeof BTooltip>;
export declare const Primary: Story;
export declare const Positions: Story;
//# sourceMappingURL=BTooltip.stories.d.ts.map