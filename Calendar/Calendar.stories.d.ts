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
        doubleCalendar: {
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
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Calendar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: any;
        lang: string;
        type: string;
        doubleCalendar: boolean;
        minDate: any;
        maxDate: any;
    };
};
export declare const Lang: {
    render: (args: any) => {
        components: {
            Calendar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        lang: string;
        modelValue: any;
        type: string;
        doubleCalendar: boolean;
        minDate: any;
        maxDate: any;
    };
};
export declare const Period: {
    render: (args: any) => {
        components: {
            Calendar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        type: string;
        modelValue: any;
        lang: string;
        doubleCalendar: boolean;
        minDate: any;
        maxDate: any;
    };
};
export declare const Compare: {
    render: (args: any) => {
        components: {
            Calendar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        type: string;
        modelValue: any;
        lang: string;
        doubleCalendar: boolean;
        minDate: any;
        maxDate: any;
    };
};
export declare const DoubleCalendar: {
    render: (args: any) => {
        components: {
            Calendar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        doubleCalendar: boolean;
        modelValue: any;
        lang: string;
        type: string;
        minDate: any;
        maxDate: any;
    };
};
export declare const MinDate: {
    render: (args: any) => {
        components: {
            Calendar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        minDate: Date;
        modelValue: any;
        lang: string;
        type: string;
        doubleCalendar: boolean;
        maxDate: any;
    };
};
export declare const MaxDate: {
    render: (args: any) => {
        components: {
            Calendar: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        maxDate: Date;
        modelValue: any;
        lang: string;
        type: string;
        doubleCalendar: boolean;
        minDate: any;
    };
};
//# sourceMappingURL=Calendar.stories.d.ts.map