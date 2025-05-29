import { BContainerModelExtra } from '../../utils/components/BContainerModelExtra.types';
type __VLS_Props = {
    modelValue?: boolean;
    labelValue?: string;
    role?: string;
    absolute?: boolean;
    disabled?: boolean;
    isError?: boolean;
    errorMessage?: string;
    infoMessage?: string;
    required?: boolean;
    closeOnBlur?: boolean;
    dontHaveMaxHeight?: boolean;
    maxHeight?: string;
    minWidth?: string;
    secondary?: boolean;
    hideArrow?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        default?(_: {}): any;
        complement?(_: {}): any;
        label?(_: {}): any;
        content?(_: {}): any;
        items?(_: {}): any;
        actions?(_: {}): any;
    };
    refs: {
        fatherContainer: HTMLDivElement;
        content: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: boolean, extra: BContainerModelExtra) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean, extra: BContainerModelExtra) => any) | undefined;
}>, {
    secondary: boolean;
    disabled: boolean;
    modelValue: boolean;
    role: string;
    labelValue: string;
    absolute: boolean;
    isError: boolean;
    errorMessage: string;
    infoMessage: string;
    required: boolean;
    closeOnBlur: boolean;
    dontHaveMaxHeight: boolean;
    maxHeight: string;
    minWidth: string;
    hideArrow: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {
    fatherContainer: HTMLDivElement;
    content: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
