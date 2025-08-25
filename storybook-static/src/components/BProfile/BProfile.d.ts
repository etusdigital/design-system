type __VLS_Props = {
    modelValue?: object;
    name: string;
    profilePicture?: string;
    accounts?: any[] | never[];
    nameKey?: string;
    absolute?: boolean;
    disabled?: boolean;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        editProfile?(_: {}): any;
        account?(_: {
            account: any;
            index: number;
            active: boolean;
        }): any;
        editAccount?(_: {}): any;
        logout?(_: {}): any;
        privacyPolicy?(_: {}): any;
        termsOfUse?(_: {}): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('../../../vue/dist/vue.esm-bundler.js').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('../../../vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, {
    "update:modelValue": (value: object) => any;
    logout: () => any;
    editProfile: () => any;
    editAccount: () => any;
    changeAccount: (account: any) => any;
    privacyPolicyFunction: () => any;
    termsOfUseFucntion: () => any;
}, string, import('../../../vue/dist/vue.esm-bundler.js').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: object) => any) | undefined;
    onLogout?: (() => any) | undefined;
    onEditProfile?: (() => any) | undefined;
    onEditAccount?: (() => any) | undefined;
    onChangeAccount?: ((account: any) => any) | undefined;
    onPrivacyPolicyFunction?: (() => any) | undefined;
    onTermsOfUseFucntion?: (() => any) | undefined;
}>, {
    disabled: boolean;
    modelValue: object;
    absolute: boolean;
    nameKey: string;
}, {}, {}, {}, string, import('../../../vue/dist/vue.esm-bundler.js').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
