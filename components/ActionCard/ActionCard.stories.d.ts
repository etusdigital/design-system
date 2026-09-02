declare const _default: {
    component: any;
    argTypes: {
        icon: {
            type: {
                name: string;
            };
            description: string;
        };
        color: {
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
        hideDrag: {
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
        default: {
            description: string;
        };
        card: {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            ActionCard: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        icon: string;
        color: string;
        hideDrag: boolean;
    };
};
export declare const HideDrag: {
    render: (args: any) => {
        components: {
            ActionCard: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        hideDrag: boolean;
        icon: string;
        color: string;
    };
};
export declare const Card: {
    render: (args: any) => {
        components: {
            ActionCard: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        icon: string;
        color: string;
        hideDrag: boolean;
    };
};
//# sourceMappingURL=ActionCard.stories.d.ts.map