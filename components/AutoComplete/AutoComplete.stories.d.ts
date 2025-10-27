declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
            };
            description: string;
        };
        expanded: {
            type: {
                name: string;
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
        placeholder: {
            type: {
                name: string;
            };
        };
        required: {
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
        absolute: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
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
        option: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        expanded: boolean;
        options: string[];
        labelValue: string;
        placeholder: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
    };
};
export declare const Absolute: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        absolute: boolean;
        modelValue: any;
        expanded: boolean;
        options: string[];
        labelValue: string;
        placeholder: string;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
    };
};
export declare const Required: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        required: boolean;
        modelValue: any;
        expanded: boolean;
        options: string[];
        labelValue: string;
        placeholder: string;
        disabled: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: any;
        expanded: boolean;
        options: string[];
        labelValue: string;
        placeholder: string;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
    };
};
export declare const IsError: {
    render: (args: any) => {
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
        options: string[];
        labelValue: string;
        placeholder: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        infoMessage: string;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        infoMessage: string;
        modelValue: any;
        expanded: boolean;
        options: string[];
        labelValue: string;
        placeholder: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
    };
};
export declare const CustomOption: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        expanded: boolean;
        options: string[];
        labelValue: string;
        placeholder: string;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
    };
};
//# sourceMappingURL=AutoComplete.stories.d.ts.map