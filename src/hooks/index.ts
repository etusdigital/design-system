/**
 * forwardRef Pattern (FOUND-05):
 *
 * All form input components must use forwardRef to expose the underlying
 * DOM element to consumers:
 *
 *   export const Input = forwardRef<HTMLInputElement, InputProps>(
 *     function Input({ value, defaultValue, onChange, className, ...rest }, ref) {
 *       const [val, setVal] = useControllable({ value, defaultValue, onChange });
 *       return <input ref={ref} value={val} onChange={e => setVal(e.target.value)} className={className} {...rest} />;
 *     }
 *   );
 *
 * React 19 ref-as-prop (ENH-02) is deferred to v2.
 */

export { useControllable } from './useControllable';
export type { UseControllableOptions } from './useControllable';
export { useTransition } from './useTransition';
export type { UseTransitionOptions } from './useTransition';
