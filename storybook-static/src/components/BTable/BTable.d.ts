type Header = {
    label?: string;
    value: string;
    sortable?: boolean;
    width?: string;
    align?: string;
};
type Options = {
    sortBy?: string;
    sortDesc?: boolean;
};
type __VLS_Props = {
    headers: Header[];
    items: any[];
    options?: Options;
    page?: number;
    itemsPerPage?: number;
    numberOfItems?: number;
    renderPaginationInBackEnd?: boolean;
    hideFooter?: boolean;
    isHeaderFixed?: boolean;
    enableSelection?: boolean;
    enableAggregation?: boolean;
    loading?: boolean;
    noShadow?: boolean;
    hasHover?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<string, (_: {
        key: string;
        item: any;
        index: number;
    }) => any>> & {
        'empty-state'?(_: {}): any;
        aggregation?(_: {
            item: any;
            index: number;
        }): any;
        select?(_: {
            item: any;
            index: number;
        }): any;
        actions?(_: {
            item: any;
            index: number;
        }): any;
        childs?(_: {
            item: any;
            index: number;
        }): any;
        footer?(_: {}): any;
        'items-per-page'?(_: {}): any;
        'showing-page'?(_: {
            min: number;
            max: number;
            total: number;
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:page": (value: number) => any;
    "update:itemsPerPage": (value: number) => any;
    sortBy: (key: string, isSortDesc: boolean) => any;
    pageItems: (page: number, itemsPerPage: number) => any;
    selectAll: (value: boolean) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:page"?: ((value: number) => any) | undefined;
    "onUpdate:itemsPerPage"?: ((value: number) => any) | undefined;
    onSortBy?: ((key: string, isSortDesc: boolean) => any) | undefined;
    onPageItems?: ((page: number, itemsPerPage: number) => any) | undefined;
    onSelectAll?: ((value: boolean) => any) | undefined;
}>, {
    loading: boolean;
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
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
