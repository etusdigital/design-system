type Info = "default" | "sample" | "primary" | "info" | "success" | "danger" | "warning";
type __VLS_Props = {
    title?: string;
    description?: string | number;
    value?: string | number;
    icon?: string;
    color?: string;
    type?: "default" | "success" | "danger" | "sample" | "card";
    size?: "small" | "medium" | "large";
    infoMessage?: string;
    infoType?: Info;
    tooltipMinWidth?: string;
    loading?: boolean;
    noTooltip?: boolean;
    boldTitle?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        'title-slot'?(_: {}): any;
        info?(_: {}): any;
        content?(_: {}): any;
        'value-slot'?(_: {}): any;
        'description-slot'?(_: {}): any;
        default?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    title: string;
    type: "default" | "success" | "danger" | "sample" | "card";
    color: string;
    size: "small" | "medium" | "large";
    loading: boolean;
    icon: string;
    infoMessage: string;
    value: string | number;
    tooltipMinWidth: string;
    description: string | number;
    infoType: Info;
    noTooltip: boolean;
    boldTitle: boolean;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
