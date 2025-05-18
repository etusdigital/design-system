import type { StoryObj } from '@storybook/vue3';
import BInput from './BInput.vue';
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
        labelValue: {
            type: {
                summary: string;
            };
            description: string;
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
        max: {
            type: {
                summary: string;
            };
            description: string;
        };
        min: {
            type: {
                summary: string;
            };
            description: string;
        };
        step: {
            type: {
                summary: string;
            };
            description: string;
        };
        errorMessage: {
            type: {
                summary: string;
            };
            description: string;
        };
        infoMessage: {
            type: {
                summary: string;
            };
            description: string;
        };
        placeholder: {
            type: {
                summary: string;
            };
            description: string;
        };
        isError: {
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
        size: {
            type: {
                summary: string;
            };
            description: string;
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        mask: {
            type: {
                summary: string;
            };
            description: string;
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: undefined;
                };
            };
        };
        isTextArea: {
            type: {
                summary: string;
            };
            description: string;
            table: {
                defaultValue: {
                    summary: boolean;
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
        icon: {
            type: {
                summary: string;
            };
            description: string;
        };
        appendIcon: {
            type: {
                summary: string;
            };
            description: string;
        };
        textAlign: {
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
        tooltipMinWidth: {
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
        focus: {
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
        blur: {
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
        'uploaded-file': {
            description: string;
        };
    };
};
export default _default;
type Story = StoryObj<typeof BInput>;
export declare const Primary: Story;
export declare const Number: Story;
export declare const TextArea: Story;
export declare const Search: Story;
export declare const Color: Story;
export declare const MaxLetters: Story;
export declare const Error: Story;
export declare const Password: Story;
export declare const File: Story;
export declare const Email: Story;
export declare const InfoMessage: Story;
//# sourceMappingURL=BInput.stories.d.ts.map