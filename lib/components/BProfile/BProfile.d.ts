import type { PropType as __PropType } from './vue/dist/vue.esm-bundler.js';
declare const _sfc_main: import('./vue/dist/vue.esm-bundler.js').DefineComponent<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<object | undefined>;
        required: false;
        default: undefined;
    };
    name: {
        type: __PropType<string>;
        required: true;
    };
    profilePicture: {
        type: __PropType<string | undefined>;
        required: false;
    };
    accounts: {
        type: __PropType<any[] | never[] | undefined>;
        required: false;
    };
    nameKey: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    absolute: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, import('./vue/dist/vue.esm-bundler.js').ComponentOptionsMixin, ("update:modelValue" | "logout" | "editProfile" | "editAccount" | "changeAccount" | "privacyPolicyFunction" | "termsOfUseFucntion")[], "update:modelValue" | "logout" | "editProfile" | "editAccount" | "changeAccount" | "privacyPolicyFunction" | "termsOfUseFucntion", import('./vue/dist/vue.esm-bundler.js').PublicProps, Readonly<import('./vue/dist/vue.esm-bundler.js').ExtractPropTypes<{
    modelValue: {
        type: __PropType<object | undefined>;
        required: false;
        default: undefined;
    };
    name: {
        type: __PropType<string>;
        required: true;
    };
    profilePicture: {
        type: __PropType<string | undefined>;
        required: false;
    };
    accounts: {
        type: __PropType<any[] | never[] | undefined>;
        required: false;
    };
    nameKey: {
        type: __PropType<string | undefined>;
        required: false;
        default: string;
    };
    absolute: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
    disabled: {
        type: __PropType<boolean | undefined>;
        required: false;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onLogout?: ((...args: any[]) => any) | undefined;
    onEditProfile?: ((...args: any[]) => any) | undefined;
    onEditAccount?: ((...args: any[]) => any) | undefined;
    onChangeAccount?: ((...args: any[]) => any) | undefined;
    onPrivacyPolicyFunction?: ((...args: any[]) => any) | undefined;
    onTermsOfUseFucntion?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: object | undefined;
    absolute: boolean | undefined;
    disabled: boolean | undefined;
    nameKey: string | undefined;
}, {}, {}, {}, string, import('./vue/dist/vue.esm-bundler.js').ComponentProvideOptions, true, {}, any>;
export default _sfc_main;
