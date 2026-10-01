declare const _default: {
    component: any;
    argTypes: {
        columns: {
            type: {
                name: string;
                value: {
                    name: string;
                    value: {};
                };
            };
            description: string;
        };
        items: {
            type: {
                name: string;
                value: {
                    name: string;
                    value: {};
                };
            };
            description: string;
        };
        sortOptions: {
            type: {
                name: string;
                value: {};
            };
            description: string;
        };
        page: {
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
        itemsPerPage: {
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
        loading: {
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
        enableSelection: {
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
        enableAggregation: {
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
        isHeaderFixed: {
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
        hasHover: {
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
        hideFooter: {
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
        noShadow: {
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
        numberOfItems: {
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
        renderPaginationInBackEnd: {
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
        actions: {
            description: string;
        };
        select: {
            description: string;
        };
        aggregation: {
            description: string;
        };
        childs: {
            description: string;
        };
        "empty-state": {
            description: string;
        };
        footer: {
            description: string;
        };
        "items-per-page": {
            table: {
                defaultValue: {
                    summary: string;
                };
            };
            description: string;
        };
        "showing-page": {
            description: string;
        };
    };
};
export default _default;
export declare const Primary: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const Options: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        sortOptions: {
            by: string;
            desc: boolean;
        };
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const Loading: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        loading: boolean;
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const Selection: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        enableSelection: boolean;
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const Aggregation: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        enableAggregation: boolean;
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const IsHeaderFixed: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        itemsPerPage: number;
        isHeaderFixed: boolean;
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const HasHover: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        hasHover: boolean;
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const HideFooter: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        hideFooter: boolean;
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const NoShadow: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        noShadow: boolean;
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        items: ({
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs: {
                name: string;
                age: number;
                selected: boolean;
            }[];
        } | {
            name: string;
            age: number;
            memberShip: string;
            selected: boolean;
            childs?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const EmptyState: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        items: any[];
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const Footer: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        items: any[];
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const ItemsPerPage: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        items: any[];
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
export declare const ShowingPage: {
    render: (args: any) => {
        components: {
            Table: any;
        };
        setup(): {
            args: any;
        };
        template: string;
    };
    args: {
        items: any[];
        columns: ({
            label: string;
            value: string;
            sortable: boolean;
            width: string;
        } | {
            label: string;
            value: string;
            width: string;
            sortable?: undefined;
        })[];
        sortOptions: {
            by: string;
            desc: boolean;
        };
        page: number;
        itemsPerPage: number;
        numberOfItems: number;
        renderPaginationInBackEnd: boolean;
        hideFooter: boolean;
        isHeaderFixed: boolean;
        enableSelection: boolean;
        enableAggregation: boolean;
        loading: boolean;
        noShadow: boolean;
        hasHover: boolean;
        sortBy: (_key: any, _isDesc: any) => void;
        pageItems: (_page: any, _itemsPerPage: any) => void;
        selectAll: () => void;
    };
};
//# sourceMappingURL=Table.stories.d.ts.map