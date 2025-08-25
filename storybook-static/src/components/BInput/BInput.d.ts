export interface Tag {
    id?: string | number;
    label: string;
    color?: "neutral" | "red";
    removable?: boolean;
}
declare const _default: __VLS_WithTemplateSlots<import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<{
    modelValue?: any;
    labelValue?: string;
    type?: "number" | "text" | "color" | "search" | "email" | "file" | "password" | "tag";
    mask?: "cpf" | "cnpj" | "cep" | "domain" | "url";
    max?: number;
    min?: number;
    step?: number;
    errorMessage?: string;
    infoMessage?: string;
    size?: "base" | "sm" | "lg" | "xl" | "100" | "xs";
    isTextArea?: boolean;
    disabled?: boolean;
    isError?: boolean;
    isCompleted?: boolean;
    required?: boolean;
    placeholder?: string;
    textAlign?: "start" | "end" | "center";
    tooltipMinWidth?: string;
    icon?: string;
    appendIcon?: boolean;
    tags?: Tag[];
    maxTags?: number;
    tagPlaceholder?: string;
}, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    blur: (value: any) => any;
    focus: (value: any) => any;
    "update:modelValue": (value: any) => any;
    "update:tags": (value: Tag[]) => any;
    "add-tag": (value: string) => any;
    "remove-tag": (value: Tag) => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<{
    modelValue?: any;
    labelValue?: string;
    type?: "number" | "text" | "color" | "search" | "email" | "file" | "password" | "tag";
    mask?: "cpf" | "cnpj" | "cep" | "domain" | "url";
    max?: number;
    min?: number;
    step?: number;
    errorMessage?: string;
    infoMessage?: string;
    size?: "base" | "sm" | "lg" | "xl" | "100" | "xs";
    isTextArea?: boolean;
    disabled?: boolean;
    isError?: boolean;
    isCompleted?: boolean;
    required?: boolean;
    placeholder?: string;
    textAlign?: "start" | "end" | "center";
    tooltipMinWidth?: string;
    icon?: string;
    appendIcon?: boolean;
    tags?: Tag[];
    maxTags?: number;
    tagPlaceholder?: string;
}> & Readonly<{
    onBlur?: ((value: any) => any) | undefined;
    onFocus?: ((value: any) => any) | undefined;
    "onUpdate:modelValue"?: ((value: any) => any) | undefined;
    "onUpdate:tags"?: ((value: Tag[]) => any) | undefined;
    "onAdd-tag"?: ((value: string) => any) | undefined;
    "onRemove-tag"?: ((value: Tag) => any) | undefined;
}>, {
    mask: "cpf" | "cnpj" | "cep" | "domain" | "url";
    type: "number" | "text" | "color" | "search" | "email" | "file" | "password" | "tag";
    size: "base" | "sm" | "lg" | "xl" | "100" | "xs";
    disabled: boolean;
    icon: string;
    modelValue: any;
    labelValue: string;
    isError: boolean;
    errorMessage: string;
    infoMessage: string;
    required: boolean;
    tooltipMinWidth: string;
    placeholder: string;
    max: number;
    min: number;
    step: number;
    isTextArea: boolean;
    isCompleted: boolean;
    textAlign: "start" | "end" | "center";
    appendIcon: boolean;
    tags: Tag[];
    maxTags: number;
    tagPlaceholder: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {
    inputFile: HTMLInputElement;
}, HTMLDivElement>, {
    'uploaded-file'?(_: {}): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
