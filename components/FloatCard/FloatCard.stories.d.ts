declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            description: string;
        };
        mode: {
            type: {
                name: string;
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
        disabled: {
            type: {
                name: string;
            };
            control: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        manualFocus: {
            type: {
                name: string;
            };
            control: string;
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            FloatCard: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        mode: string;
        disabled: boolean;
    };
};
export declare const ClickMode: {
    render: (args: any) => {
        components: {
            FloatCard: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        mode: string;
        modelValue: boolean;
        disabled: boolean;
    };
};
export declare const ActionItems: {
    render: (args: any) => {
        components: {
            FloatCard: any;
        };
        setup(): {
            args: any;
            dialog: import("vue").Ref<boolean, boolean>;
            lastAction: import("vue").Ref<string, string>;
            openDialog: () => void;
            closeOnly: () => void;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        mode: string;
        disabled: boolean;
    };
};
//# sourceMappingURL=FloatCard.stories.d.ts.map