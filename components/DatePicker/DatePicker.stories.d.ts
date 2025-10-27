declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            type: {
                name: string;
                value: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        labelValue: {
            type: {
                name: string;
            };
            description: string;
        };
        lang: {
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
        type: {
            type: {
                name: string;
            };
            control: {
                type: string;
            };
            options: string[];
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        allowChangeType: {
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
        minDate: {
            type: {
                name: string;
                value: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        maxDate: {
            type: {
                name: string;
                value: string;
            };
            table: {
                defaultValue: {
                    summary: string;
                };
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
        absolute: {
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
        required: {
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
        alignRight: {
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
        separator: {
            type: {
                name: string;
            };
            description: string;
        };
        default: {
            description: string;
        };
        "compare-label": {
            description: string;
        };
        "clear-label": {
            description: string;
        };
        "apply-label": {
            description: string;
        };
        actions: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        labelValue: string;
        lang: string;
        type: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const Lang: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        lang: string;
        separator: string;
        modelValue: any;
        labelValue: string;
        type: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const AllowChangeType: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        allowChangeType: boolean;
        modelValue: any[];
        type: string;
        labelValue: string;
        lang: string;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const Period: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any[];
        type: string;
        labelValue: string;
        lang: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const Compare: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any[];
        type: string;
        labelValue: string;
        lang: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const MinDate: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        minDate: Date;
        modelValue: any;
        labelValue: string;
        lang: string;
        type: string;
        allowChangeType: boolean;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const MaxDate: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        maxDate: Date;
        modelValue: any;
        labelValue: string;
        lang: string;
        type: string;
        allowChangeType: boolean;
        minDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const Absolute: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        absolute: boolean;
        modelValue: any;
        labelValue: string;
        lang: string;
        type: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: any;
        labelValue: string;
        lang: string;
        type: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const Required: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        required: boolean;
        modelValue: any;
        labelValue: string;
        lang: string;
        type: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const IsError: {
    render: (args: any) => {
        components: {
            DatePicker: any;
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
        labelValue: string;
        lang: string;
        type: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const AlignRight: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        alignRight: boolean;
        modelValue: any;
        labelValue: string;
        lang: string;
        type: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        separator: string;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
export declare const Separator: {
    render: (args: any) => {
        components: {
            DatePicker: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any[][];
        type: string;
        separator: string;
        labelValue: string;
        lang: string;
        allowChangeType: boolean;
        minDate: any;
        maxDate: any;
        disabled: boolean;
        required: boolean;
        isError: boolean;
        errorMessage: string;
        absolute: boolean;
        expanded: boolean;
        alignRight: boolean;
        options: ({
            selected: boolean;
            value: string;
            label: string;
            calculate: () => Date[];
        } | {
            value: string;
            label: string;
            calculate: () => Date[];
            selected?: undefined;
        })[];
    };
};
//# sourceMappingURL=DatePicker.stories.d.ts.map