import { BContainerModelExtra } from '../../utils/components/BContainerModelExtra.types';
type BSelectExpandedExtra = {
    source: BContainerModelExtra["source"] | "value-selected";
};
type __VLS_Props = {
    modelValue?: any[];
    items?: any[];
    labelValue?: string;
    icon?: string;
    expanded?: boolean;
    labelKey?: string;
    errorMessage?: string;
    infoMessage?: string;
    disabled?: boolean;
    required?: boolean;
    isError?: boolean;
    absolute?: boolean;
    buttonText?: string;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'search-text'?(_: {}): any;
        'search-text'?(_: {}): any;
        'no-items-found'?(_: {}): any;
        'no-items'?(_: {}): any;
        item?(_: {
            item: any;
            index: number;
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any[]) => any;
    "update:expanded": (value: boolean, extra: BSelectExpandedExtra) => any;
    "update:items": (value: any[]) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
    "onUpdate:expanded"?: ((value: boolean, extra: BSelectExpandedExtra) => any) | undefined;
    "onUpdate:items"?: ((value: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: any[];
    labelValue: string;
    absolute: boolean;
    isError: boolean;
    errorMessage: string;
    infoMessage: string;
    required: boolean;
    expanded: boolean;
    items: any[];
    labelKey: string;
    buttonText: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
