import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
type Info = 'default' | 'sample' | 'primary' | 'info' | 'success' | 'danger' | 'warning';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    title: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    description: {
        type: __PropType<string | number | undefined>;
        required: false;
        default: string;
    };
    value: {
        type: __PropType<string | number | undefined>;
        required: false;
        default: string;
    };
    icon: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    color: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    type: {
        type: __PropType<"success" | "danger" | "default" | "sample" | "card" | undefined>;
        required: false;
        default: string;
    };
    size: {
        type: __PropType<"small" | "medium" | "large" | undefined>;
        required: false;
        default: string;
    };
    infoMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    infoType: {
        type: __PropType<Info | undefined>;
        required: false;
        default: string;
    };
    tooltipMinWidth: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    loading: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    noTooltip: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    boldTitle: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    title: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    description: {
        type: __PropType<string | number | undefined>;
        required: false;
        default: string;
    };
    value: {
        type: __PropType<string | number | undefined>;
        required: false;
        default: string;
    };
    icon: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    color: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    type: {
        type: __PropType<"success" | "danger" | "default" | "sample" | "card" | undefined>;
        required: false;
        default: string;
    };
    size: {
        type: __PropType<"small" | "medium" | "large" | undefined>;
        required: false;
        default: string;
    };
    infoMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    infoType: {
        type: __PropType<Info | undefined>;
        required: false;
        default: string;
    };
    tooltipMinWidth: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    loading: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    noTooltip: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    boldTitle: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>> & Readonly<{}>, {
    title: string | undefined;
    size: "small" | "medium" | "large" | undefined;
    icon: string | undefined;
    color: string | undefined;
    type: "success" | "danger" | "default" | "sample" | "card" | undefined;
    infoMessage: string | undefined;
    value: string | number | undefined;
    loading: boolean | undefined;
    description: string | number | undefined;
    tooltipMinWidth: string | undefined;
    infoType: Info | undefined;
    noTooltip: boolean | undefined;
    boldTitle: boolean | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
