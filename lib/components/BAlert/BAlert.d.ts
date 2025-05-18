import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    title: {
        type: __PropType<string | undefined>;
        required: false;
    };
    message: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    type: {
        type: __PropType<"info" | "success" | "warning" | "danger" | "neutral" | undefined>;
        required: false;
        default: string;
    };
    size: {
        type: __PropType<"small" | "medium" | "large" | undefined>;
        required: false;
        default: string;
    };
    icon: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    expandable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    closable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    hideIcon: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    iconPosition: {
        type: __PropType<"start" | "end" | "center" | undefined>;
        required: false;
        default: string;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, "close"[], "close", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    title: {
        type: __PropType<string | undefined>;
        required: false;
    };
    message: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    type: {
        type: __PropType<"info" | "success" | "warning" | "danger" | "neutral" | undefined>;
        required: false;
        default: string;
    };
    size: {
        type: __PropType<"small" | "medium" | "large" | undefined>;
        required: false;
        default: string;
    };
    icon: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    expandable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    closable: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    hideIcon: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    iconPosition: {
        type: __PropType<"start" | "end" | "center" | undefined>;
        required: false;
        default: string;
    };
}>> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
}>, {
    size: "small" | "medium" | "large" | undefined;
    icon: string | undefined;
    type: "info" | "success" | "warning" | "danger" | "neutral" | undefined;
    message: string | undefined;
    expandable: boolean | undefined;
    closable: boolean | undefined;
    hideIcon: boolean | undefined;
    iconPosition: "start" | "end" | "center" | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
