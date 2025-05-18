import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any[] | any[][]>;
        required: true;
    };
    hovered: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    day: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    isCompare: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    maxInit: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    maxEnd: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    index: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    size: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    position: {
        type: __PropType<"start" | "end" | "middle" | undefined>;
        required: false;
        default: string;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("select" | "update:modelValue" | "update:hovered")[], "select" | "update:modelValue" | "update:hovered", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any[] | any[][]>;
        required: true;
    };
    hovered: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    day: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    isCompare: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    maxInit: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    maxEnd: {
        type: __PropType<Date | undefined>;
        required: false;
    };
    index: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    size: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    position: {
        type: __PropType<"start" | "end" | "middle" | undefined>;
        required: false;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSelect?: ((...args: any[]) => any) | undefined;
    "onUpdate:hovered"?: ((...args: any[]) => any) | undefined;
}>, {
    size: number | undefined;
    position: "start" | "end" | "middle" | undefined;
    isCompare: boolean | undefined;
    index: number | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
