import { nextTick, onMounted, watch, type Ref } from "vue";

export function useModalFocus(
  panel: Ref<HTMLElement | undefined>,
  open: Ref<boolean>
) {
  let opener: HTMLElement | null = null;
  let openedPanel: HTMLElement | undefined;

  function focusPanel() {
    const active = document.activeElement as HTMLElement | null;
    if (!panel.value?.contains(active)) opener = active;
    openedPanel = panel.value;
    panel.value?.focus({ preventScroll: true });
  }

  function restoreFocus() {
    const lastOpener = opener;
    const lastPanel = openedPanel;
    opener = null;
    openedPanel = undefined;
    if (!lastOpener) return;

    nextTick(() => {
      const active = document.activeElement;
      if (active !== document.body && !lastPanel?.contains(active)) return;
      lastOpener.focus({ preventScroll: true });
    });
  }

  watch(open, (value) => (value ? focusPanel() : restoreFocus()), {
    flush: "post",
  });

  onMounted(() => {
    if (open.value) focusPanel();
  });
}
