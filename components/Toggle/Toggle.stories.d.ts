declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        groupValue: {
            description: string;
            type: {
                name: string;
                value: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        disabled: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        type: {
            control: string;
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        default: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Toggle: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        groupValue: any;
        disabled: boolean;
        type: string;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Toggle: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: boolean;
        groupValue: any;
        type: string;
    };
};
export declare const Types: {
    render: (args: any) => {
        components: {
            Toggle: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: boolean;
        groupValue: any;
        disabled: boolean;
        type: string;
    };
};
//# sourceMappingURL=Toggle.stories.d.ts.map