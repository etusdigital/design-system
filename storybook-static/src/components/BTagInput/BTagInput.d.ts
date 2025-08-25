type __VLS_Props = {
    modelValue: any[];
    labelValue?: string;
    errorMessage?: string;
    infoMessage?: string;
    disabled?: boolean;
    required?: boolean;
    allowDuplicate?: boolean;
    max?: number;
    isError?: boolean;
    placeholder?: string;
    mask?: "cpf" | "cnpj" | "cep" | "domain" | "url" | "email";
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'info-text'?(_: {}): any;
    };
    refs: {
        tagInput: HTMLDivElement;
    };
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: any[]) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: any[]) => any) | undefined;
}>, {
    mask: "cpf" | "cnpj" | "cep" | "domain" | "url" | "email";
    disabled: boolean;
    modelValue: any[];
    labelValue: string;
    isError: boolean;
    errorMessage: string;
    infoMessage: string;
    required: boolean;
    placeholder: string;
    max: number;
    allowDuplicate: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {
    tagInput: HTMLDivElement;
}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
