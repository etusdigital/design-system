type __VLS_Props = {
    modelValue?: number;
    size?: "small" | "medium" | "large";
    type?: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    color?: string;
    icon?: string;
    infoMessage?: string;
    steps?: number;
    animationType?: "indeterminate" | "query" | undefined;
    displayPercentage?: "center" | "bar" | undefined;
    neutralBackground?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'icon-slot'?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    type: "primary" | "info" | "success" | "warning" | "danger" | "neutral";
    color: string;
    size: "small" | "medium" | "large";
    icon: string;
    modelValue: number;
    infoMessage: string;
    steps: number;
    neutralBackground: boolean;
    animationType: "indeterminate" | "query";
    displayPercentage: "center" | "bar";
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
