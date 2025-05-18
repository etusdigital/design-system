import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
type InputType = "text" | "number" | "search" | "color" | "password" | "file" | "email";
type Mask = "cpf" | "cnpj" | "cep" | "domain" | "url";
type Size = "xs" | "sm" | "base" | "lg" | "xl" | "100";
type TextAlign = "start" | "center" | "end";
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: false;
        default: undefined;
    };
    labelValue: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    type: {
        type: __PropType<InputType | undefined>;
        required: false;
        default: string;
    };
    mask: {
        type: __PropType<Mask | undefined>;
        required: false;
        default: undefined;
    };
    max: {
        type: __PropType<number | undefined>;
        required: false;
        default: undefined;
    };
    min: {
        type: __PropType<number | undefined>;
        required: false;
        default: undefined;
    };
    step: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    errorMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    infoMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    size: {
        type: __PropType<Size | undefined>;
        required: false;
        default: string;
    };
    isTextArea: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    isError: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    required: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    placeholder: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    textAlign: {
        type: __PropType<TextAlign | undefined>;
        required: false;
        default: string;
    };
    tooltipMinWidth: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    icon: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    appendIcon: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("blur" | "focus" | "update:modelValue")[], "blur" | "focus" | "update:modelValue", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<any>;
        required: false;
        default: undefined;
    };
    labelValue: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    type: {
        type: __PropType<InputType | undefined>;
        required: false;
        default: string;
    };
    mask: {
        type: __PropType<Mask | undefined>;
        required: false;
        default: undefined;
    };
    max: {
        type: __PropType<number | undefined>;
        required: false;
        default: undefined;
    };
    min: {
        type: __PropType<number | undefined>;
        required: false;
        default: undefined;
    };
    step: {
        type: __PropType<number | undefined>;
        required: false;
        default: number;
    };
    errorMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    infoMessage: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    size: {
        type: __PropType<Size | undefined>;
        required: false;
        default: string;
    };
    isTextArea: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    isError: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    required: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    placeholder: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    textAlign: {
        type: __PropType<TextAlign | undefined>;
        required: false;
        default: string;
    };
    tooltipMinWidth: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    icon: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    appendIcon: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
}>, {
    size: Size | undefined;
    icon: string | undefined;
    required: boolean | undefined;
    type: InputType | undefined;
    modelValue: any;
    labelValue: string | undefined;
    disabled: boolean | undefined;
    isError: boolean | undefined;
    errorMessage: string | undefined;
    infoMessage: string | undefined;
    placeholder: string | undefined;
    mask: Mask | undefined;
    textAlign: TextAlign | undefined;
    max: number | undefined;
    min: number | undefined;
    step: number | undefined;
    isTextArea: boolean | undefined;
    tooltipMinWidth: string | undefined;
    appendIcon: boolean | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
