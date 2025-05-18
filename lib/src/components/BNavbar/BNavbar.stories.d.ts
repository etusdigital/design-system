import type { StoryObj } from "@storybook/vue3";
import BNavbar from "./BNavbar.vue";
declare const _default: {
    component: import("vue").DefineComponent<{}, {}, any>;
    tags: string[];
    argTypes: {
        modelValue: {
            type: {
                summary: string;
            };
            description: string;
        };
        title: {
            type: {
                summary: string;
            };
            description: string;
        };
        items: {
            type: {
                summary: string;
            };
            description: string;
        };
        profile: {
            type: {
                summary: string;
            };
            description: string;
        };
        logo: {
            description: string;
        };
        default: {
            description: string;
        };
        actions: {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BNavbar>;
export declare const Primary: Story;
export declare const Slots: Story;
//# sourceMappingURL=BNavbar.stories.d.ts.map