declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
                value: string;
            };
            description: string;
        };
        labelValue: {
            type: {
                name: string;
            };
            description: string;
        };
        options: {
            type: {
                name: string;
                value: {
                    name: string;
                    value: {};
                };
            };
            description: string;
        };
        icon: {
            type: {
                name: string;
            };
        };
        expanded: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        labelKey: {
            type: {
                name: string;
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
        isError: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        errorMessage: {
            type: {
                name: string;
            };
            description: string;
        };
        infoMessage: {
            type: {
                name: string;
            };
            description: string;
        };
        buttonLabel: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        "search-label": {
            description: string;
        };
        "no-options-found": {
            description: string;
        };
        "empty-state": {
            description: string;
        };
        option: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            TagSelect: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        expanded: boolean;
        options: any[];
        labelValue: string;
        labelKey: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
        absolute: boolean;
    };
};
export declare const Icon: {
    render: (args: any) => {
        components: {
            TagSelect: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        icon: string;
        modelValue: any;
        expanded: boolean;
        options: any[];
        labelValue: string;
        labelKey: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
        isError: boolean;
        disabled: boolean;
        absolute: boolean;
    };
};
export declare const Absolute: {
    render: (args: any) => {
        components: {
            TagSelect: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        absolute: boolean;
        modelValue: any;
        expanded: boolean;
        options: any[];
        labelValue: string;
        labelKey: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            TagSelect: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: any;
        expanded: boolean;
        options: any[];
        labelValue: string;
        labelKey: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
        absolute: boolean;
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            TagSelect: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        required: boolean;
        modelValue: any;
        expanded: boolean;
        options: any[];
        labelValue: string;
        labelKey: string;
        buttonLabel: string;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
        absolute: boolean;
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            TagSelect: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        isError: boolean;
        errorMessage: string;
        modelValue: any;
        expanded: boolean;
        options: any[];
        labelValue: string;
        labelKey: string;
        buttonLabel: string;
        required: boolean;
        infoMessage: string;
        icon: string;
        disabled: boolean;
        absolute: boolean;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        components: {
            TagSelect: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        infoMessage: string;
        modelValue: any;
        expanded: boolean;
        options: any[];
        labelValue: string;
        labelKey: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
        absolute: boolean;
    };
};
//# sourceMappingURL=TagSelect.stories.d.ts.map