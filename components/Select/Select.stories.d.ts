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
        valueKey: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        getObject: {
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
        multiple: {
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
        secondary: {
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
        searchable: {
            type: {
                name: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
        };
        clearable: {
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
        default: {
            description: string;
        };
        status: {
            description: string;
        };
        "clear-label": {
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
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        absolute: boolean;
    };
};
export declare const Absolute: {
    render: (args: any) => {
        components: {
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        absolute: boolean;
        modelValue: any;
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: any;
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        required: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        absolute: boolean;
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        required: boolean;
        modelValue: any;
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        absolute: boolean;
    };
};
export declare const Searchable: {
    render: (args: any) => {
        components: {
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        searchable: boolean;
        modelValue: any;
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        absolute: boolean;
    };
};
export declare const Multiple: {
    render: (args: any) => {
        components: {
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        multiple: boolean;
        options: {
            label: string;
            value: number;
        }[];
        modelValue: any;
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        absolute: boolean;
    };
};
export declare const Secondary: {
    render: (args: any) => {
        components: {
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        secondary: boolean;
        modelValue: any;
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        absolute: boolean;
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            Select: any;
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
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        secondary: boolean;
        infoMessage: string;
        absolute: boolean;
    };
};
export declare const InfoMessage: {
    render: (args: any) => {
        components: {
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        infoMessage: string;
        modelValue: any;
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
    };
};
export declare const Clearable: {
    render: (args: any) => {
        components: {
            Select: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        clearable: boolean;
        modelValue: any;
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        absolute: boolean;
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
        options: string[];
        icon: string;
        expanded: boolean;
        labelKey: string;
        valueKey: string;
        labelValue: string;
        searchable: boolean;
        clearable: boolean;
        multiple: boolean;
        getObject: boolean;
        disabled: boolean;
        required: boolean;
        secondary: boolean;
        isError: boolean;
        errorMessage: string;
        infoMessage: string;
        absolute: boolean;
    };
};
//# sourceMappingURL=Select.stories.d.ts.map