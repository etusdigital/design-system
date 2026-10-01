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
            description: string;
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
        searchable: {
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
        creatable: {
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
        placeholder: {
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
        default: {
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
        options: string[];
        labelValue: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        searchable: boolean;
        creatable: boolean;
        placeholder: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
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
        options: string[];
        labelValue: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        searchable: boolean;
        creatable: boolean;
        placeholder: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
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
        options: string[];
        labelValue: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        searchable: boolean;
        creatable: boolean;
        placeholder: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
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
        options: string[];
        labelValue: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        searchable: boolean;
        creatable: boolean;
        placeholder: string;
        buttonLabel: string;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
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
        options: string[];
        labelValue: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        searchable: boolean;
        creatable: boolean;
        placeholder: string;
        buttonLabel: string;
        required: boolean;
        infoMessage: string;
        icon: string;
        disabled: boolean;
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
        options: string[];
        labelValue: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        searchable: boolean;
        creatable: boolean;
        placeholder: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
    };
};
export declare const Creatable: {
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
        options: any[];
        searchable: boolean;
        creatable: boolean;
        modelValue: any;
        expanded: boolean;
        labelValue: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        placeholder: string;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
    };
};
export declare const Searchable: {
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
        searchable: boolean;
        placeholder: string;
        options: {
            label: string;
            value: string;
        }[];
        modelValue: any;
        expanded: boolean;
        labelValue: string;
        labelKey: string;
        valueKey: string;
        getObject: boolean;
        creatable: boolean;
        buttonLabel: string;
        required: boolean;
        errorMessage: string;
        infoMessage: string;
        icon: string;
        isError: boolean;
        disabled: boolean;
    };
};
//# sourceMappingURL=TagSelect.stories.d.ts.map