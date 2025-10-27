declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    columns: {};
    items: {};
    sortOptions: {};
    page: {
        default: number;
    };
    itemsPerPage: {
        default: number;
    };
    numberOfItems: {
        default: number;
    };
    renderPaginationInBackEnd: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    isHeaderFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableSelection: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableAggregation: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    noShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    hasHover: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, (_ctx: any, _cache: any) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:page" | "update:itemsPerPage" | "sortBy" | "pageItems" | "selectAll")[], "update:page" | "update:itemsPerPage" | "sortBy" | "pageItems" | "selectAll", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    columns: {};
    items: {};
    sortOptions: {};
    page: {
        default: number;
    };
    itemsPerPage: {
        default: number;
    };
    numberOfItems: {
        default: number;
    };
    renderPaginationInBackEnd: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    isHeaderFixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableSelection: {
        type: BooleanConstructor;
        default: boolean;
    };
    enableAggregation: {
        type: BooleanConstructor;
        default: boolean;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    noShadow: {
        type: BooleanConstructor;
        default: boolean;
    };
    hasHover: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:page"?: (...args: any[]) => any;
    "onUpdate:itemsPerPage"?: (...args: any[]) => any;
    onSortBy?: (...args: any[]) => any;
    onPageItems?: (...args: any[]) => any;
    onSelectAll?: (...args: any[]) => any;
}>, {
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
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=Table.vue?vue&type=script&setup=true&lang.d.ts.map