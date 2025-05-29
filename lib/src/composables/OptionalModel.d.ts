import { WritableComputedRef } from '../../vue/dist/vue.esm-bundler.js';
/** Make sure to set the prop default to undefined manually.
 * Ex.: const props = withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: undefined });
 */
export declare function useOptionalModel<T>(props: any, propKey: string, emit: any, defaultValue: T): [WritableComputedRef<T>, (value: T, extra?: any) => void];
