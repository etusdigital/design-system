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
        };
        vertical: {
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
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            RadioGroup: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: number;
        vertical: boolean;
        disabled: boolean;
        options: {
            label: string;
            value: number;
        }[];
        labelKey: string;
        valueKey: string;
        getObject: boolean;
    };
};
export declare const Vertical: {
    render: (args: any) => {
        components: {
            RadioGroup: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        vertical: boolean;
        modelValue: number;
        disabled: boolean;
        options: {
            label: string;
            value: number;
        }[];
        labelKey: string;
        valueKey: string;
        getObject: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            RadioGroup: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: number;
        vertical: boolean;
        options: {
            label: string;
            value: number;
        }[];
        labelKey: string;
        valueKey: string;
        getObject: boolean;
    };
};
//# sourceMappingURL=RadioGroup.stories.d.ts.map