import type { StoryObj } from "@storybook/vue3";
import BDivider from "./BDivider.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
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
        };
    };
};
export default _default;
type Story = StoryObj<typeof BDivider>;
export declare const Primary: Story;
export declare const Positions: Story;
//# sourceMappingURL=BDivider.stories.d.ts.map