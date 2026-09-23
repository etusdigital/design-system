declare const _default: {
    component: any;
    argTypes: {
        title: {
            type: {
                name: string;
            };
            description: string;
        };
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
        isIconRound: {
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
        "title-actions": {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            IconCard: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        title: string;
        icon: string;
        color: string;
        isIconRound: boolean;
    };
};
export declare const Default: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        title: string;
        icon: string;
        color: string;
        isIconRound: boolean;
    };
};
export declare const isIconRound: {
    render: (args: any) => {
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        icon: string;
        isIconRound: boolean;
        title: string;
        color: string;
    };
};
//# sourceMappingURL=IconCard.stories.d.ts.map