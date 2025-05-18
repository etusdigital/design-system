import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
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
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    headers: {
        type: __PropType<Header[]>;
        required: true;
    };
    items: {
        type: __PropType<any[]>;
        required: true;
    };
    options: {
        type: __PropType<Options | undefined>;
        required: false;
    };
    page: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    itemsPerPage: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    numberOfItems: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    renderPaginationInBackEnd: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    hideFooter: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    isHeaderFixed: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    enableSelection: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    enableAggregation: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    loading: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    noShadow: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    hasHover: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:page" | "update:itemsPerPage" | "sortBy" | "pageItems" | "selectAll")[], "update:page" | "update:itemsPerPage" | "sortBy" | "pageItems" | "selectAll", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    headers: {
        type: __PropType<Header[]>;
        required: true;
    };
    items: {
        type: __PropType<any[]>;
        required: true;
    };
    options: {
        type: __PropType<Options | undefined>;
        required: false;
    };
    page: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    itemsPerPage: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    numberOfItems: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    renderPaginationInBackEnd: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    hideFooter: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    isHeaderFixed: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    enableSelection: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    enableAggregation: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    loading: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    noShadow: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    hasHover: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:page"?: ((...args: any[]) => any) | undefined;
    "onUpdate:itemsPerPage"?: ((...args: any[]) => any) | undefined;
    onSortBy?: ((...args: any[]) => any) | undefined;
    onPageItems?: ((...args: any[]) => any) | undefined;
    onSelectAll?: ((...args: any[]) => any) | undefined;
}>, {
    loading: boolean | undefined;
    noShadow: boolean | undefined;
    page: number | undefined;
    itemsPerPage: number | undefined;
    numberOfItems: number | undefined;
    renderPaginationInBackEnd: boolean | undefined;
    hideFooter: boolean | undefined;
    isHeaderFixed: boolean | undefined;
    enableSelection: boolean | undefined;
    enableAggregation: boolean | undefined;
    hasHover: boolean | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
