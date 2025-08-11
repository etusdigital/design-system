import { computed, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';

/**
 * Generates unique IDs for ARIA relationships
 */
function generateId(prefix: string = 'aria'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Composable for managing ARIA attributes and relationships
 */
export function useAriaAttributes() {
  /**
   * Creates a unique ID for ARIA labelling
   */
  function useAriaId(prefix?: string): string {
    return generateId(prefix);
  }

  /**
   * Creates ARIA attributes for a progress component
   */
  function useProgressAria(
    value: Ref<number>,
    min: Ref<number> = ref(0),
    max: Ref<number> = ref(100),
    valueText?: Ref<string>
  ) {
    return computed(() => ({
      role: 'progressbar',
      'aria-valuenow': value.value,
      'aria-valuemin': min.value,
      'aria-valuemax': max.value,
      ...(valueText?.value && { 'aria-valuetext': valueText.value }),
    }));
  }

  /**
   * Creates ARIA attributes for an alert component
   */
  function useAlertAria(
    type: Ref<'info' | 'success' | 'warning' | 'danger' | 'neutral'>
  ) {
    return computed(() => ({
      role: 'alert' as const,
      'aria-live': (type.value === 'danger' ? 'assertive' : 'polite') as 'assertive' | 'polite',
    }));
  }

  /**
   * Creates ARIA attributes for a dialog component
   */
  function useDialogAria(
    isOpen: Ref<boolean>,
    titleId?: string,
    descriptionId?: string
  ) {
    return computed(() => ({
      role: 'dialog' as const,
      'aria-modal': true,
      ...(titleId && { 'aria-labelledby': titleId }),
      ...(descriptionId && { 'aria-describedby': descriptionId }),
    }));
  }

  /**
   * Creates ARIA attributes for a combobox/select component
   */
  function useComboboxAria(
    isExpanded: Ref<boolean>,
    hasPopup: boolean = true,
    listboxId?: string,
    activeDescendant?: Ref<string | undefined>
  ) {
    return computed(() => ({
      role: 'combobox' as const,
      'aria-expanded': isExpanded.value,
      ...(hasPopup && { 'aria-haspopup': 'listbox' as const }),
      ...(listboxId && { 'aria-controls': listboxId }),
      ...(activeDescendant?.value && { 'aria-activedescendant': activeDescendant.value }),
    }));
  }

  /**
   * Creates ARIA attributes for a listbox component
   */
  function useListboxAria(
    multiselectable: boolean = false,
    orientation: 'horizontal' | 'vertical' = 'vertical'
  ) {
    return computed(() => ({
      role: 'listbox' as const,
      'aria-multiselectable': multiselectable,
      'aria-orientation': orientation,
    }));
  }

  /**
   * Creates ARIA attributes for an option component
   */
  function useOptionAria(
    isSelected: Ref<boolean>,
    isDisabled: Ref<boolean> = ref(false),
    id?: string
  ) {
    return computed(() => ({
      role: 'option' as const,
      'aria-selected': isSelected.value,
      ...(isDisabled.value && { 'aria-disabled': true }),
      ...(id && { id }),
    }));
  }

  /**
   * Creates ARIA attributes for a button component
   */
  function useButtonAria(
    isPressed?: Ref<boolean>,
    isExpanded?: Ref<boolean>,
    controls?: string,
    describedBy?: string
  ) {
    return computed(() => ({
      role: 'button' as const,
      ...(isPressed && { 'aria-pressed': isPressed.value }),
      ...(isExpanded && { 'aria-expanded': isExpanded.value }),
      ...(controls && { 'aria-controls': controls }),
      ...(describedBy && { 'aria-describedby': describedBy }),
    }));
  }

  /**
   * Creates ARIA attributes for navigation components
   */
  function useNavigationAria(
    currentPage?: Ref<string | number>,
    label?: string
  ) {
    return computed(() => ({
      role: 'navigation' as const,
      ...(label && { 'aria-label': label }),
      ...(currentPage && { 'aria-current': 'page' as const }),
    }));
  }

  /**
   * Creates ARIA attributes for tab components
   */
  function useTabAria(
    isSelected: Ref<boolean>,
    controls: string,
    id: string
  ) {
    return computed(() => ({
      role: 'tab',
      'aria-selected': isSelected.value.toString(),
      'aria-controls': controls,
      id,
      tabindex: isSelected.value ? 0 : -1,
    }));
  }

  /**
   * Creates ARIA attributes for tab panel components
   */
  function useTabPanelAria(
    labelledBy: string,
    id: string
  ) {
    return computed(() => ({
      role: 'tabpanel',
      'aria-labelledby': labelledBy,
      id,
      tabindex: 0,
    }));
  }

  /**
   * Creates ARIA attributes for expandable/collapsible components
   */
  function useExpandableAria(
    isExpanded: Ref<boolean>,
    controls?: string,
    labelledBy?: string
  ) {
    return computed(() => ({
      'aria-expanded': isExpanded.value,
      ...(controls && { 'aria-controls': controls }),
      ...(labelledBy && { 'aria-labelledby': labelledBy }),
    }));
  }

  /**
   * Creates ARIA attributes for menu components (action-oriented dropdowns)
   */
  function useMenuAria(
    orientation: 'horizontal' | 'vertical' = 'vertical',
    labelledBy?: string,
    label?: string
  ) {
    return computed(() => ({
      role: 'menu' as const,
      'aria-orientation': orientation,
      ...(labelledBy && { 'aria-labelledby': labelledBy }),
      ...(label && { 'aria-label': label }),
    }));
  }

  /**
   * Creates ARIA attributes for menuitem components
   */
  function useMenuItemAria(
    id?: string,
    hasSubmenu: boolean = false,
    isExpanded?: Ref<boolean>
  ) {
    return computed(() => ({
      role: 'menuitem' as const,
      ...(id && { id }),
      ...(hasSubmenu && { 'aria-haspopup': 'menu' as const }),
      ...(hasSubmenu && isExpanded && { 'aria-expanded': isExpanded.value }),
    }));
  }

  /**
   * Creates ARIA attributes for menubar components (menu trigger)
   */
  function useMenuBarAria(
    orientation: 'horizontal' | 'vertical' = 'horizontal',
    label?: string
  ) {
    return computed(() => ({
      role: 'menubar' as const,
      'aria-orientation': orientation,
      ...(label && { 'aria-label': label }),
    }));
  }

  /**
   * Creates ARIA attributes for busy/loading states
   */
  function useBusyAria(
    isBusy: Ref<boolean>,
    label?: string
  ) {
    return computed(() => ({
      'aria-busy': isBusy.value,
      ...(isBusy.value && label && { 'aria-label': label }),
    }));
  }

  return {
    useAriaId,
    useProgressAria,
    useAlertAria,
    useDialogAria,
    useComboboxAria,
    useListboxAria,
    useOptionAria,
    useButtonAria,
    useNavigationAria,
    useTabAria,
    useTabPanelAria,
    useExpandableAria,
    useMenuAria,
    useMenuItemAria,
    useMenuBarAria,
    useBusyAria,
  };
}