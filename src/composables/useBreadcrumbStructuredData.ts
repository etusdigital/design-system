import { computed, onMounted, onUnmounted, watch, ref, type Ref } from 'vue';
import { useAriaAttributes } from '#composables/useAriaAttributes';
import type { BreadcrumbItemType } from '#/components/BBreadcrumb/BBreadcrumb.types';

export interface UseBreadcrumbStructuredDataOptions {
  includeStructuredData?: boolean;
  labelKey?: string;
  urlKey?: string;
  baseUrl?: string;
}

export function useBreadcrumbStructuredData(
  items: Ref<BreadcrumbItemType[] | undefined>,
  options: UseBreadcrumbStructuredDataOptions = {}
) {
  const { useAriaId } = useAriaAttributes();
  const structuredDataId = ref<string>();
  const structuredDataScriptId = useAriaId('breadcrumb-structured-data');

  /**
   * Gets the label from an item
   */
  function getLabel(item: unknown): string {
    if (!item) return '';
    if (typeof item === 'string') return item;
    if (typeof item === 'object' && item !== null) {
      return String((item as any)[options.labelKey || 'label'] || '');
    }
    return String(item);
  }

  /**
   * Gets the URL from an item
   */
  function getUrl(item: BreadcrumbItemType): string {
    if (typeof item === 'object' && item !== null && options.urlKey && (item as any)[options.urlKey]) {
      return String((item as any)[options.urlKey]);
    }
    
    if (options.baseUrl) {
      const value = typeof item === 'object' && item !== null && (item as any).value 
        ? (item as any).value 
        : item;
      return `${options.baseUrl.replace(/\/$/, '')}/${String(value).toLowerCase().replace(/\s+/g, '-')}`;
    }
    
    return '';
  }

  /**
   * Generates structured data for SEO and accessibility
   */
  const structuredData = computed(() => {
    if (!options.includeStructuredData || !items.value?.length) return null;

    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.value.map((item, index) => {
        const label = getLabel(item);
        const url = getUrl(item);
        return {
          "@type": "ListItem",
          position: index + 1,
          name: label,
          ...(url && { item: url }),
        };
      }),
    };

    return JSON.stringify(breadcrumbList);
  });

  /**
   * Injects structured data script into document head
   */
  function injectStructuredData(): void {
    if (!structuredData.value) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = structuredDataScriptId;
    script.textContent = structuredData.value;
    document.head.appendChild(script);
    structuredDataId.value = structuredDataScriptId;
  }

  /**
   * Updates existing structured data script
   */
  function updateStructuredData(): void {
    if (structuredDataId.value && structuredData.value) {
      const script = document.getElementById(structuredDataId.value);
      if (script) {
        script.textContent = structuredData.value;
      }
    }
  }

  /**
   * Removes structured data script from document head
   */
  function removeStructuredData(): void {
    if (structuredDataId.value) {
      const script = document.getElementById(structuredDataId.value);
      if (script) {
        document.head.removeChild(script);
      }
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    if (options.includeStructuredData) {
      injectStructuredData();
    }
  });

  onUnmounted(() => {
    removeStructuredData();
  });

  // Watch for changes in structured data
  watch(structuredData, (newData, oldData) => {
    if (options.includeStructuredData && newData !== oldData) {
      if (structuredDataId.value) {
        updateStructuredData();
      } else if (newData) {
        injectStructuredData();
      }
    }
  });

  return {
    structuredData: computed(() => structuredData.value),
    structuredDataId: computed(() => structuredDataId.value),
    injectStructuredData,
    updateStructuredData,
    removeStructuredData,
  };
}