declare const meta: {
    component: any;
    argTypes: {
        type: {
            type: string;
            control: string;
            options: string[];
            table: {
                default: string;
            };
        };
        color: {
            type: string;
            control: string;
            options: string[];
            table: {
                default: string;
            };
        };
        variant: {
            type: string;
            control: string;
            options: string[];
            table: {
                default: string;
            };
        };
        size: {
            type: string;
            control: string;
            options: string[];
            table: {
                default: string;
            };
        };
        disabled: {
            type: string;
            table: {
                default: boolean;
            };
            description: string;
        };
        round: {
            type: string;
            table: {
                default: boolean;
            };
            description: string;
        };
        alwaysOpen: {
            type: string;
            table: {
                default: boolean;
            };
            description: string;
        };
        background: {
            type: string;
            table: {
                default: string;
            };
            description: string;
        };
        loading: {
            type: string;
            table: {
                category: string;
                default: boolean;
            };
            description: string;
        };
        progress: {
            type: string;
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
            table: {
                category: string;
                default: number;
            };
            description: string;
        };
        default: {
            description: string;
        };
    };
};
export default meta;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        type: string;
        color: string;
        variant: string;
        size: string;
        disabled: boolean;
        round: boolean;
        alwaysOpen: boolean;
        background: string;
        loading: boolean;
        progress: number;
    };
};
export declare const Colors: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        type: string;
        color: string;
        variant: string;
        size: string;
        disabled: boolean;
        round: boolean;
        alwaysOpen: boolean;
        background: string;
        loading: boolean;
        progress: number;
    };
};
export declare const Variants: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        type: string;
        color: string;
        variant: string;
        size: string;
        disabled: boolean;
        round: boolean;
        alwaysOpen: boolean;
        background: string;
        loading: boolean;
        progress: number;
    };
};
export declare const Disabled: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        disabled: boolean;
        type: string;
        color: string;
        variant: string;
        size: string;
        round: boolean;
        alwaysOpen: boolean;
        background: string;
        loading: boolean;
        progress: number;
    };
};
export declare const Round: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        round: boolean;
        type: string;
        color: string;
        variant: string;
        size: string;
        disabled: boolean;
        alwaysOpen: boolean;
        background: string;
        loading: boolean;
        progress: number;
    };
};
export declare const AlwaysOpen: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        round: boolean;
        alwaysOpen: boolean;
        type: string;
        color: string;
        variant: string;
        size: string;
        disabled: boolean;
        background: string;
        loading: boolean;
        progress: number;
    };
};
export declare const Loading: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        loading: boolean;
        type: string;
        color: string;
        variant: string;
        size: string;
        disabled: boolean;
        round: boolean;
        alwaysOpen: boolean;
        background: string;
        progress: number;
    };
};
export declare const Progress: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        type: string;
        color: string;
        variant: string;
        size: string;
        disabled: boolean;
        round: boolean;
        alwaysOpen: boolean;
        background: string;
        loading: boolean;
        progress: number;
    };
};
export declare const Sizes: {
    render: (args: any) => {
        components: {
            Button: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        type: string;
        color: string;
        variant: string;
        size: string;
        disabled: boolean;
        round: boolean;
        alwaysOpen: boolean;
        background: string;
        loading: boolean;
        progress: number;
    };
};
//# sourceMappingURL=Button.stories.d.ts.map