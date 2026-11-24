declare const _default: {
    component: any;
    argTypes: {
        modelValue: {
            control: {
                type: string;
            };
        };
        options: {
            control: {
                type: string;
            };
        };
        visible: {
            control: {
                type: string;
            };
        };
        interval: {
            control: {
                type: string;
            };
        };
        disabled: {
            control: {
                type: string;
            };
        };
        circular: {
            control: {
                type: string;
            };
        };
        vertical: {
            control: {
                type: string;
            };
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
            Carousel: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        modelValue: number;
        options: {
            url: string;
            sample: {
                value: string;
            };
            open: {
                value: string;
                description: string;
            };
            click: {
                value: string;
                description: string;
            };
            ctor: {
                value: string;
            };
            totalDelivered: string;
        }[];
        visible: number;
        interval: number;
        disabled: boolean;
        circular: boolean;
        vertical: boolean;
    };
};
export declare const Interval: {
    render: (args: any) => {
        components: {
            Carousel: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        circular: boolean;
        interval: number;
        modelValue: number;
        options: {
            url: string;
            sample: {
                value: string;
            };
            open: {
                value: string;
                description: string;
            };
            click: {
                value: string;
                description: string;
            };
            ctor: {
                value: string;
            };
            totalDelivered: string;
        }[];
        visible: number;
        disabled: boolean;
        vertical: boolean;
    };
};
export declare const Circular: {
    render: (args: any) => {
        components: {
            Carousel: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        circular: boolean;
        modelValue: number;
        options: {
            url: string;
            sample: {
                value: string;
            };
            open: {
                value: string;
                description: string;
            };
            click: {
                value: string;
                description: string;
            };
            ctor: {
                value: string;
            };
            totalDelivered: string;
        }[];
        visible: number;
        interval: number;
        disabled: boolean;
        vertical: boolean;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Carousel: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        modelValue: number;
        options: {
            url: string;
            sample: {
                value: string;
            };
            open: {
                value: string;
                description: string;
            };
            click: {
                value: string;
                description: string;
            };
            ctor: {
                value: string;
            };
            totalDelivered: string;
        }[];
        visible: number;
        interval: number;
        circular: boolean;
        vertical: boolean;
    };
};
export declare const Vertical: {
    render: (args: any) => {
        components: {
            Carousel: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        vertical: boolean;
        modelValue: number;
        options: {
            url: string;
            sample: {
                value: string;
            };
            open: {
                value: string;
                description: string;
            };
            click: {
                value: string;
                description: string;
            };
            ctor: {
                value: string;
            };
            totalDelivered: string;
        }[];
        visible: number;
        interval: number;
        disabled: boolean;
        circular: boolean;
    };
};
//# sourceMappingURL=Carousel.stories.d.ts.map