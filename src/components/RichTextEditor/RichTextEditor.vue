<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from "vue";
import Label from "../../utils/components/Label.vue";
import Option from "../../utils/components/Option.vue";
import Colors from "./Colors.vue";
import { isValidUrl } from "#utils/index";

type EditorAction =
  | "bold"
  | "italic"
  | "underline"
  | "strikeThrough"
  | "insertUnorderedList"
  | "insertOrderedList"
  | "justifyLeft"
  | "justifyCenter"
  | "justifyRight"
  | "justifyFull"
  | "formatBlock"
  | "removeFormat"
  | "undo"
  | "redo"
  | "foreColor"
  | "backColor";

type Style =
  | "textAlign"
  | "fontWeight"
  | "fontStyle"
  | "textDecoration"
  | "color"
  | "backgroundColor"
  | "textAlign";

type ToolbarOption = {
  label: string;
  value: string | number;
  icon?: string;
  command: EditorAction;
  shortcut?: string;
  selected?: boolean;
  style?: Style;
  disabled?: boolean;
  type?: "select" | "color" | "image";
  action?: (value: string | number) => void;
};

type Color = ToolbarOption & {
  value: string;
  expanded: boolean;
  style: "color" | "backgroundColor";
};

type FontSize = ToolbarOption & {
  label?: string;
  options: number[];
  action: (value: number) => void;
};

type InsertElement = ToolbarOption & {
  command?: EditorAction;
};

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    labelValue?: string;
    errorMessage?: string;
    infoMessage?: string;
    disabled?: boolean;
    isError?: boolean;
    required?: boolean;
    placeholder?: string;
    tooltipMinWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    compact?: boolean;
    noBorder?: boolean;
  }>(),
  {
    modelValue: "",
    labelValue: "",
    errorMessage: "",
    infoMessage: "",
    disabled: false,
    isError: false,
    required: false,
    placeholder: "Type your text...",
    tooltipMinWidth: "none",
    minHeight: "200px",
    maxHeight: "400px",
    compact: false,
    noBorder: false,
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  focus: [];
  blur: [];
}>();

const editorRef = ref<HTMLDivElement>();

const history = ref<string[]>([]);
const historyIndex = ref(-1);
const isRestoringHistory = ref(false);
const options = ref<Record<string, Record<string, ToolbarOption>>>({
  doCommands: {
    undo: {
      label: "Undo",
      value: "undo",
      icon: "undo",
      command: "undo",
      shortcut: "Ctrl+Z",
      disabled: historyIndex.value <= 0 || !history.value.length,
      action: undoAction,
    },
    redo: {
      label: "Redo",
      value: "redo",
      icon: "redo",
      command: "redo",
      shortcut: "Ctrl+Y",
      disabled: historyIndex.value >= history.value.length - 1,
      action: redoAction,
    },
  },
  size: {
    fontSize: {
      value: 16,
      options: Array.from({ length: 10 }, (_, i: number) => i * 4 + 12),
      type: "select",
      action: handleFontSizeUpdate,
    } as FontSize,
  },
  fontStyle: {
    bold: {
      label: "Bold",
      value: "bold",
      style: "fontWeight",
      icon: "format_bold",
      command: "bold",
      shortcut: "Ctrl+B",
      selected: false,
    },
    italic: {
      label: "Italic",
      value: "italic",
      style: "fontStyle",
      icon: "format_italic",
      command: "italic",
      shortcut: "Ctrl+I",
      selected: false,
    },
    underline: {
      label: "Underline",
      value: "underline",
      style: "textDecoration",
      icon: "format_underlined",
      command: "underline",
      shortcut: "Ctrl+U",
      selected: false,
    },
    strikeThrough: {
      label: "Strikethrough",
      value: "line-through",
      style: "textDecoration",
      icon: "strikethrough_s",
      command: "strikeThrough",
      shortcut: "Ctrl+K",
      selected: false,
    },
  },
  colors: {
    color: {
      value: "#000000",
      expanded: false,
      style: "color",
      command: "foreColor",
      icon: "format_color_text",
      label: "Text color",
      type: "color",
      selected: false,
    },
    backgroundColor: {
      value: "#000000",
      expanded: false,
      style: "backgroundColor",
      command: "backColor",
      icon: "format_color_fill",
      label: "Background color",
      type: "color",
      selected: false,
    },
  } as Record<string, Color>,
  lists: {
    insertUnorderedList: {
      label: "Bulleted list",
      value: "insertUnorderedList",
      icon: "format_list_bulleted",
      command: "insertUnorderedList",
      selected: false,
    },
    insertOrderedList: {
      label: "Numbered list",
      value: "insertOrderedList",
      icon: "format_list_numbered",
      command: "insertOrderedList",
      selected: false,
    },
  },
  alignment: {
    left: {
      label: "Align left",
      value: "justifyLeft",
      icon: "format_align_left",
      style: "textAlign",
      command: "justifyLeft",
      selected: false,
    },
    center: {
      label: "Align center",
      value: "justifyCenter",
      icon: "format_align_center",
      style: "textAlign",
      command: "justifyCenter",
      selected: false,
    },
    right: {
      label: "Align right",
      value: "justifyRight",
      icon: "format_align_right",
      style: "textAlign",
      command: "justifyRight",
      selected: false,
    },
    justify: {
      label: "Justify",
      value: "justifyFull",
      icon: "format_align_justify",
      style: "textAlign",
      command: "justifyFull",
      selected: false,
    },
  },
  insertElements: {
    link: {
      label: "Insert link",
      value: "link",
      icon: "link",
      command: "createLink",
      action: createLink,
    },
    image: {
      label: "Insert image",
      value: "image",
      icon: "image",
      command: "insertImage",
      type: "image",
      action: insertImage,
    },
    blockquote: {
      label: "Quote",
      value: "blockquote",
      icon: "format_quote",
      command: "insertBlockquote",
      selected: false,
      action: insertBlockquote,
    },
  } as unknown as Record<string, InsertElement>,
  formatting: {
    removeFormat: {
      label: "Remove formatting",
      value: "removeFormat",
      icon: "format_clear",
      command: "removeFormat",
    },
  },
});
const customColorOptions = ref<string[]>([]);
const savedSelection = ref<Range | null>(null);

const isFocused = ref(false);

const showImageUpload = ref(false);
const selectedImageFile = ref<File>();

const showLinkDialog = ref(false);
const linkUrl = ref("");
const linkText = ref("");

const allowedTags = ref([
  "b",
  "i",
  "u",
  "strong",
  "em",
  "br",
  "div",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "img",
  "span",
]);
const allowedAttributes = ref(["style", "href", "src", "alt", "title"]);

const editorClasses = computed(() => {
  let classes = "rich-text-editor";
  if (isFocused.value) classes += " focus";
  if (props.disabled) classes += " disabled";
  if (props.isError) classes += " error";
  if (props.compact) classes += " compact";
  if (props.noBorder) classes += " no-border";
  return classes;
});

const editorStyle = computed(() => ({
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
}));

watch(
  () => props.modelValue,
  (newValue) => {
    if (!editorRef.value || editorRef.value.innerHTML === newValue) return;

    editorRef.value.innerHTML = sanitizeHTML(newValue || "");
    applyContentStyles();
  }
);

onMounted(() => {
  if (!editorRef.value) return;

  editorRef.value.innerHTML = sanitizeHTML(props.modelValue);
  applyContentStyles();

  // Inicializar histórico com conteúdo inicial
  saveToHistory(props.modelValue);
});

function sanitizeHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const body = doc.body;
  const cleanBody = document.createElement("div");

  for (const child of Array.from(body.childNodes)) {
    const cleanChild = cleanNode(child);
    if (cleanChild) cleanBody.appendChild(cleanChild);
  }

  return cleanBody.innerHTML;
}

function cleanNode(node: Node): Node | null {
  if (node.nodeType === Node.TEXT_NODE) return node;
  else if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (!allowedTags.value.includes(tagName))
    return document.createTextNode(element.textContent || "");

  const cleanElement = document.createElement(tagName);
  for (const attr of Array.from(element.attributes)) {
    if (allowedAttributes.value.includes(attr.name))
      cleanElement.setAttribute(attr.name, attr.value);
  }

  for (const child of Array.from(element.childNodes)) {
    const cleanChild = cleanNode(child);
    if (cleanChild) cleanElement.appendChild(cleanChild);
  }

  return cleanElement;
}

function applyContentStyles() {
  nextTick(() => {
    if (!editorRef.value) return;

    setListStyles();

    const blockquotes = editorRef.value.querySelectorAll("blockquote");
    if (blockquotes.length) addBlockquoteStyles(Array.from(blockquotes));
  });
}

function isSelectionWithinEditor(selection?: Selection | null): boolean {
  if (!editorRef.value || !selection || selection.rangeCount === 0)
    return false;

  try {
    const range = selection.getRangeAt(0);

    const startWithin = editorRef.value.contains(range.startContainer);
    const endWithin = editorRef.value.contains(range.endContainer);
    const ancestorWithin = editorRef.value.contains(
      range.commonAncestorContainer
    );

    return startWithin && endWithin && ancestorWithin;
  } catch (error) {
    return false;
  }
}

function saveCurrentSelection() {
  try {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);

    if (
      editorRef.value &&
      editorRef.value.contains(range.commonAncestorContainer)
    )
      savedSelection.value = range.cloneRange();
  } catch (error) {
    savedSelection.value = null;
  }
}

function restoreSavedSelection() {
  try {
    const selection = window.getSelection();
    if (!savedSelection.value || !editorRef.value || !selection) return;
    editorRef.value.focus();

    selection.removeAllRanges();

    const range = savedSelection.value;
    if (editorRef.value.contains(range.commonAncestorContainer))
      selection.addRange(range);
    else {
      const newRange = document.createRange();
      newRange.setStart(editorRef.value, 0);
      newRange.collapse(true);
      selection.addRange(newRange);
    }
  } catch (error) {
    savedSelection.value = null;
  }
}

function execCommand(
  command: EditorAction,
  property?: Style,
  value?: string | number
) {
  const selection = window.getSelection();
  if (props.disabled || !editorRef.value || !isSelectionWithinEditor(selection))
    return;

  restoreSavedSelection();
  try {
    if (!document.queryCommandSupported(command)) return;

    const success = document.execCommand(command, false, value?.toString());

    if (!success && property) applyStyleCommand(property, value || "");
  } catch (error) {}

  editorRef.value?.focus();
  updateActiveStates();

  if (command === "insertUnorderedList" || command === "insertOrderedList")
    setTimeout(() => setListStyles());
}

function applyStyleCommand(property: Style, value: string | number) {
  try {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.value) return;

    const range = selection.getRangeAt(0);

    if (range.collapsed) {
      const span = document.createElement("span");
      span.style[property] = value.toString();
      span.textContent = "\u200B";

      range.insertNode(span);
      range.setStart(span, 1);
      range.collapse(true);
    } else {
      const contents = range.extractContents();
      const span = document.createElement("span");
      span.style[property] = value.toString();
      span.appendChild(contents);

      range.insertNode(span);
      range.selectNodeContents(span);
    }

    selection.removeAllRanges();
    selection.addRange(range);
    onInput();
  } catch (error) {
    console.error(error);
  }
}

function handleFontSizeUpdate(fontSize: number) {
  if (props.disabled || !editorRef.value) return;

  let selection = window.getSelection();
  if (!isSelectionWithinEditor(selection)) return;

  restoreSavedSelection();
  selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  let range = selection.getRangeAt(0);
  console.log(range);

  const selectedElements = getSelectedElements(range);

  selectedElements.forEach((element) => {
    const hasFontSize = applyFontSize(fontSize, element);
    if (!hasFontSize) element.style.fontSize = fontSize.toString() + "px";
  });

  selection.removeAllRanges();
  selection.addRange(range);
  editorRef.value.focus();
  onInput();
  updateActiveStates();
}

function getSelectedElements(range: Range): HTMLElement[] {
  const elements: HTMLElement[] = [];

  if (range.collapsed) return elements;

  let commonAncestor = range.commonAncestorContainer;

  if (commonAncestor.nodeType === Node.TEXT_NODE)
    commonAncestor = commonAncestor.parentElement!;

  if (range.startContainer === range.endContainer) {
    const parent = range.startContainer.parentElement;
    if (
      range.startContainer.nodeType === Node.TEXT_NODE &&
      parent &&
      parent !== editorRef.value
    )
      elements.push(parent);
    else elements.push(range.startContainer as HTMLElement);
  } else {
    const walker = document.createTreeWalker(
      commonAncestor,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: (node) => {
          if (range.intersectsNode(node)) return NodeFilter.FILTER_ACCEPT;
          return NodeFilter.FILTER_REJECT;
        },
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      if (node !== editorRef.value && node !== commonAncestor)
        elements.push(node as HTMLElement);
    }

    if (elements.length === 0 && commonAncestor !== editorRef.value)
      elements.push(commonAncestor as HTMLElement);
  }

  return elements;
}

function applyFontSize(fontSize: number, element: HTMLElement): boolean {
  if (element.style.fontSize) {
    element.style.fontSize = fontSize.toString() + "px";
    return true;
  }

  if (element.children.length) {
    let hasFontSize = true;
    Array.from(element.children).forEach(
      (child) =>
        (hasFontSize = applyFontSize(fontSize, child as HTMLElement)) &&
        hasFontSize
    );

    if (!hasFontSize) {
      element.style.fontSize = fontSize.toString() + "px";
      return true;
    }
  }

  return false;
}

function compressHTML(html: string): string {
  return html.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
}

function saveToHistory(content: string) {
  if (isRestoringHistory.value) return;

  const compressed = compressHTML(content);

  if (history.value[historyIndex.value] === compressed) return;

  if (historyIndex.value < history.value.length - 1)
    history.value = history.value.slice(0, historyIndex.value + 1);

  history.value.push(compressed);
  historyIndex.value = history.value.length - 1;

  if (history.value.length <=  50) return;

  history.value.shift();
  historyIndex.value--;
}

function undoAction() {
  if (historyIndex.value <= 0 || !editorRef.value) return;

  historyIndex.value--;
  const content = history.value[historyIndex.value];

  isRestoringHistory.value = true;
  editorRef.value.innerHTML = content;
  emit("update:modelValue", content);
  isRestoringHistory.value = false;

  editorRef.value.focus();
  updateActiveStates();
}

function redoAction() {
  if (historyIndex.value >= history.value.length - 1 || !editorRef.value)
    return;

  historyIndex.value++;
  const content = history.value[historyIndex.value];

  isRestoringHistory.value = true;
  editorRef.value.innerHTML = content;
  emit("update:modelValue", content);
  isRestoringHistory.value = false;

  editorRef.value.focus();
  updateActiveStates();
}

function setColor(color: string, option: Color) {
  const selection = window.getSelection();
  if (!selection || props.disabled || !editorRef.value) return;

  try {
    restoreSavedSelection();

    if (selection.rangeCount === 0 || selection.isCollapsed) {
      let range: Range;

      if (savedSelection.value && !savedSelection.value.collapsed) {
        try {
          range = savedSelection.value;
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (rangeError) {
          range = document.createRange();
          if (editorRef.value.lastChild)
            range.setStartAfter(editorRef.value.lastChild);
          else range.setStart(editorRef.value, 0);

          range.collapse(true);
        }
      } else {
        range = document.createRange();
        if (selection.rangeCount > 0) range = selection.getRangeAt(0);
        else {
          if (editorRef.value.lastChild)
            range.setStartAfter(editorRef.value.lastChild);
          else range.setStart(editorRef.value, 0);

          range.collapse(true);
        }
      }

      if (range.collapsed) {
        const span = document.createElement("span");

        span.style[option.style] = color;

        span.innerHTML = "\u00A0";

        range.insertNode(span);
        range.setStartAfter(span);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      const success = document.execCommand(option.command, false, color);
      if (success) return;

      try {
        const range = selection.getRangeAt(0);
        const contents = range.extractContents();
        const span = document.createElement("span");

        span.style[option.style] = color;

        span.appendChild(contents);
        range.insertNode(span);

        range.selectNodeContents(span);
        selection.removeAllRanges();
        selection.addRange(range);
      } catch (error) {}
    }

    editorRef.value.focus();
    onInput();
    updateActiveStates();
  } catch (error) {
    console.error(error);
  } finally {
    savedSelection.value = null;
  }
}

function createLink() {
  if (props.disabled) return;

  const selection = window.getSelection();

  saveCurrentSelection();

  if (selection && !selection.isCollapsed && isFocused.value)
    linkText.value = selection.toString();
  else linkText.value = "";

  showLinkDialog.value = true;
}

function insertLink() {
  if (!linkUrl.value.trim() || !isValidUrl(linkUrl.value.trim())) return;

  try {
    restoreSavedSelection();

    const selection = window.getSelection();
    if (!selection || !editorRef.value) return;

    let range: Range;
    if (selection.rangeCount == 0 || !isFocused.value) {
      range = document.createRange();
      if (editorRef.value.lastChild)
        range.setStartAfter(editorRef.value.lastChild);
      else range.setStart(editorRef.value, 0);

      range.collapse(true);
    } else range = selection.getRangeAt(0);

    const link = document.createElement("a");
    link.href = linkUrl.value.trim();
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const finalText = linkText.value.trim() || linkUrl.value.trim();
    link.textContent = finalText;

    if (!range.collapsed) range.deleteContents();

    range.insertNode(link);

    range.setStartAfter(link);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    showLinkDialog.value = false;
    linkUrl.value = "";
    linkText.value = "";

    editorRef.value.focus();
    onInput();
    updateActiveStates();
  } catch (error) {}
}

function cancelLinkDialog() {
  showLinkDialog.value = false;
  linkUrl.value = "";
  linkText.value = "";
}

function insertImage() {
  if (props.disabled) return;

  saveCurrentSelection();

  selectedImageFile.value = undefined;
  showImageUpload.value = true;
}

function handleImageUpload(e: any) {
  const files = (e.target.files || e.dataTransfer.files) as File[];

  if (!files || !editorRef.value) {
    showImageUpload.value = false;
    return;
  }

  Array.from(files).forEach((file: File) => {
    if (!editorRef.value) return;

    try {
      const imageUrl = URL.createObjectURL(file);

      restoreSavedSelection();

      const selection = window.getSelection();
      if (!selection) return;

      let range: Range;
      if (selection.rangeCount == 0 || !isFocused.value) {
        range = document.createRange();
        if (editorRef.value.lastChild)
          range.setStartAfter(editorRef.value.lastChild);
        else range.setStart(editorRef.value, 0);

        range.collapse(true);
      } else range = selection.getRangeAt(0);

      const img = document.createElement("img");
      const borderRadius = getComputedStyle(editorRef.value).getPropertyValue(
        "--border-radius-sm"
      );
      const spacing = getComputedStyle(editorRef.value).getPropertyValue(
        "--spacing-base"
      );
      img.src = imageUrl;
      img.alt = file.name;
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.borderRadius = borderRadius;
      img.style.margin = spacing;

      if (!range.collapsed) range.deleteContents();

      range.insertNode(img);

      range.setStartAfter(img);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      showImageUpload.value = false;
      selectedImageFile.value = undefined;

      editorRef.value.focus();
      onInput();
      updateActiveStates();
    } catch (error) {
      showImageUpload.value = false;
    }
  });
}

function insertBlockquote() {
  if (props.disabled || !editorRef.value) return;

  let selection = window.getSelection();

  if (!selection || selection.rangeCount === 0 || !isFocused.value) {
    const span = document.createElement("span");
    span.innerHTML = "<br>";
    editorRef.value.appendChild(span);

    const range = document.createRange();
    range.setStart(span, 0);
    range.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  selection = window.getSelection();
  if (!selection) return;

  const execCommandSuccess = document.execCommand(
    "formatBlock",
    false,
    "blockquote"
  );
  if (execCommandSuccess) {
    setTimeout(() => {
      if (!editorRef.value) return;
      const blockquotes = editorRef.value?.querySelectorAll("blockquote");
      addBlockquoteStyles(Array.from(blockquotes));
      onInput();
      updateActiveStates();
    }, 50);

    return;
  }

  try {
    const range = selection.getRangeAt(0);

    const existingBlockquote =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement?.closest("blockquote")
        : (range.startContainer as Element)?.closest?.("blockquote");

    if (existingBlockquote) {
      const parent = existingBlockquote.parentNode;
      if (!parent) return;
      const div = document.createElement("div");
      div.innerHTML = existingBlockquote.innerHTML;
      parent.replaceChild(div, existingBlockquote);

      const newRange = document.createRange();
      newRange.selectNodeContents(div);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      const blockquote = document.createElement("blockquote");

      addBlockquoteStyles([blockquote]);

      if (selection.isCollapsed) {
        blockquote.textContent = "Type your quote here...";
        range.insertNode(blockquote);
      } else {
        const contents = range.extractContents();
        blockquote.appendChild(contents);
        range.insertNode(blockquote);
      }

      const newRange = document.createRange();
      newRange.selectNodeContents(blockquote);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }

    setTimeout(() => {
      onInput();
      updateActiveStates();
    }, 100);

    editorRef.value.focus();
  } catch (error) {}
}

function addBlockquoteStyles(blockquotes: HTMLElement[]) {
  if (!editorRef.value || !blockquotes.length) return;

  const borderWidth = getComputedStyle(editorRef.value).getPropertyValue(
    "--border-width-sm"
  );
  const borderColor = getComputedStyle(editorRef.value).getPropertyValue(
    "--primary-border-default"
  );
  const backgroundColor = getComputedStyle(editorRef.value).getPropertyValue(
    "--primary-surface-default"
  );
  const spacing = getComputedStyle(editorRef.value).getPropertyValue(
    "--spacing-base"
  );
  const spacingXxs = getComputedStyle(editorRef.value).getPropertyValue(
    "--spacing-xxs"
  );
  const borderRadius = getComputedStyle(editorRef.value).getPropertyValue(
    "--border-radius-sm"
  );

  blockquotes.forEach((bq) => {
    const htmlBq = bq as HTMLElement;
    htmlBq.style.borderLeft = `${borderWidth} solid ${borderColor}`;
    htmlBq.style.fontStyle = "italic";
    htmlBq.style.backgroundColor = backgroundColor;
    htmlBq.style.padding = spacing;
    htmlBq.style.margin = `${spacingXxs} 0`;
    htmlBq.style.borderRadius = `0 ${borderRadius} ${borderRadius} 0`;
    htmlBq.style.position = "relative";
  });
}

function updateActiveStates() {
  Object.keys(options.value).forEach((key) => {
    Object.values(options.value[key]).forEach((option: ToolbarOption) => {
      if (option.hasOwnProperty("selected"))
        option.selected = document.queryCommandState(option.command);
    });
  });

  const selection = window.getSelection();
  if (!selection || selection.rangeCount == 0 || !editorRef.value) return;

  let currentNode = selection.getRangeAt(0).startContainer;
  let fontSizeFound = false;
  options.value.insertElements.blockquote.selected = false;

  while (currentNode && currentNode !== editorRef.value) {
    if (currentNode.nodeType === Node.ELEMENT_NODE) {
      const element = currentNode as HTMLElement;
      const tagName = element.tagName.toLowerCase();

      if (tagName === "blockquote")
        options.value.insertElements.blockquote.selected = true;

      if (!fontSizeFound) {
        const computedStyle = window.getComputedStyle(element);
        const fontSize = computedStyle.fontSize;

        const matchingOption = (
          options.value.size.fontSize as FontSize
        ).options.find((option: number) => {
          const optionPx = option;
          const currentPx = parseInt(fontSize);
          return Math.abs(optionPx - currentPx) <= 1;
        });

        if (matchingOption) {
          options.value.size.fontSize.value = matchingOption;
          fontSizeFound = true;
        }
      }
    }
    const parent = currentNode.parentNode;
    if (!parent) break;
    currentNode = parent;
  }

  if (!fontSizeFound) options.value.size.fontSize.value = 16;
}

function onInput() {
  if (!editorRef.value) return;

  const content = editorRef.value.innerHTML;
  emit("update:modelValue", content);

  if (!isRestoringHistory.value) saveToHistory(content);

  updateActiveStates();
}

function setListStyles() {
  if (!editorRef.value) return;

  const lists = editorRef.value.querySelectorAll("ul, ol");
  const spacing = getComputedStyle(editorRef.value).getPropertyValue(
    "--spacing-base"
  );

  lists.forEach((list) => {
    const htmlList = list as HTMLElement;

    if (list.tagName.toLowerCase() === "ul")
      htmlList.style.listStyleType = "disc";
    else if (list.tagName.toLowerCase() === "ol")
      htmlList.style.listStyleType = "decimal";

    htmlList.style.paddingLeft = spacing;
    htmlList.style.listStylePosition = "outside";
  });

  const listItems = editorRef.value.querySelectorAll("li");

  listItems.forEach((li) => {
    const htmlLi = li as HTMLElement;
    htmlLi.style.display = "list-item";
    htmlLi.style.listStylePosition = "outside";
  });
}

function handleListIndentation(
  event: KeyboardEvent,
  selection: Selection,
  range: Range
) {
  if (event.key !== "Enter" && event.key !== "Backspace") return;

  const currentLi =
    range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement?.closest("li")
      : (range.startContainer as Element)?.closest?.("li");

  if (!currentLi) return;

  const currentList = currentLi.closest("ul, ol");
  if (!currentList) return;

  let newRange: Range | null = null;
  if (event.key === "Enter") {
    event.preventDefault();

    const isEmpty = currentLi.textContent?.trim() === "";
    const isAtStart =
      range.startContainer.nodeType === Node.TEXT_NODE &&
      range.startOffset === 0;

    if (isEmpty || (isAtStart && currentLi.textContent?.trim() === "")) {
      const currentBlockquote = currentList.closest("blockquote");

      if (currentBlockquote) {
        currentLi.remove();

        if (currentList.children.length === 0) currentList.remove();

        const br = document.createElement("br");
        currentList.nextSibling
          ? currentList.parentNode?.insertBefore(br, currentList.nextSibling)
          : currentBlockquote.appendChild(br);

        newRange = document.createRange();
        newRange.setStartAfter(br);
      } else {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = "<br>";
        if (!currentList.parentNode) return;

        currentList.parentNode.insertBefore(paragraph, currentList.nextSibling);

        currentLi.remove();

        if (currentList.children.length === 0) currentList.remove();

        newRange = document.createRange();
        newRange.setStart(paragraph, 0);
      }
    } else {
      const newLi = document.createElement("li");

      const needsTextSplit =
        range.startContainer.nodeType === Node.TEXT_NODE &&
        range.startOffset < range.startContainer.textContent!.length;

      if (needsTextSplit) {
        const beforeText = range.startContainer.textContent!.substring(
          0,
          range.startOffset
        );
        const afterText = range.startContainer.textContent!.substring(
          range.startOffset
        );

        range.startContainer.textContent = beforeText;

        if (afterText.trim()) newLi.textContent = afterText;
        else newLi.innerHTML = "<br>";
      } else newLi.innerHTML = "<br>";

      currentLi.parentNode!.insertBefore(newLi, currentLi.nextSibling);

      newRange = document.createRange();
      if (newLi.firstChild && newLi.firstChild.nodeType === Node.TEXT_NODE)
        newRange.setStart(newLi.firstChild, 0);
      else newRange.setStart(newLi, 0);
    }
  } else if (event.key === "Backspace") {
    const isAtStart = range.startOffset === 0;
    const isEmpty = currentLi.textContent?.trim() === "";
    if (!isEmpty && (isAtStart || range.startContainer !== currentLi)) return;

    event.preventDefault();
    currentLi.remove();

    const div = document.createElement("div");
    div.innerHTML = "<br>";

    if (currentList.children.length === 0)
      currentList.parentNode?.replaceChild(div, currentList);
    else currentList.parentNode?.insertBefore(div, currentList.nextSibling);

    newRange = document.createRange();
    newRange.setStart(div, 0);
  }

  if (!newRange) return;

  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);

  return true;
}

function handleBlockquoteIndentation(
  event: KeyboardEvent,
  selection: Selection,
  range: Range
) {
  if (event.key != "Backspace") return;

  const currentBlockquote =
    range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement?.closest("blockquote")
      : (range.startContainer as Element)?.closest?.("blockquote");
  if (!currentBlockquote) return;

  const isEmpty = currentBlockquote.textContent?.trim() === "";

  const blockquoteHtml = currentBlockquote.innerHTML;
  const endsWithBrTags = Boolean(
    blockquoteHtml.match(/<br\s*\/?>\s*(<br\s*\/?>)*\s*$/i)
  );

  let shouldRemoveBlockquote = isEmpty;

  if (endsWithBrTags) {
    if (range.startContainer === currentBlockquote) {
      const children = Array.from(currentBlockquote.childNodes);
      const lastMeaningfulIndex = children.reduce((lastIndex, node, index) => {
        if (
          (node.nodeType === Node.TEXT_NODE &&
            node.textContent?.trim() !== "") ||
          (node.nodeType === Node.ELEMENT_NODE &&
            (node as Element).tagName !== "BR")
        ) {
          return index;
        }
        return lastIndex;
      }, -1);

      shouldRemoveBlockquote = range.startOffset > lastMeaningfulIndex;
    } else if (range.startContainer.nodeType === Node.TEXT_NODE) {
      const textContent = range.startContainer.textContent || "";
      const afterCursor = textContent.substring(range.startOffset);

      shouldRemoveBlockquote = afterCursor.trim() === "" && endsWithBrTags;
    }
  }

  if (!shouldRemoveBlockquote) return;

  event.preventDefault();

  try {
    const parent = currentBlockquote.parentNode;
    if (!parent) return;

    let div: HTMLDivElement;
    if (isEmpty) {
      div = document.createElement("div");
      div.innerHTML = "<br>";
      parent.replaceChild(div, currentBlockquote);
    } else {
      let cleanContent = currentBlockquote.innerHTML.replace(
        /<br\s*\/?>\s*(<br\s*\/?>)*\s*$/i,
        ""
      );

      currentBlockquote.innerHTML = cleanContent;

      div = document.createElement("div");
      div.innerHTML = "<br>";

      parent.insertBefore(div, currentBlockquote.nextSibling);
    }

    const newRange = document.createRange();
    newRange.setStart(div, 0);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } catch (error) {}
}

function removeIndentation() {
  try {
    if (!editorRef.value) return;

    const allIndentSpans =
      editorRef.value.querySelectorAll('span[class*="tab"]');

    if (allIndentSpans.length === 0) return;

    let spanToRemove: HTMLElement | null = null;

    for (let i = allIndentSpans.length - 1; i >= 0; i--) {
      const span = allIndentSpans[i] as HTMLElement;

      const spanRect = span.getBoundingClientRect();
      if (spanRect.width > 0 && spanRect.height > 0) {
        spanToRemove = span;
        break;
      }
    }

    if (spanToRemove) spanToRemove.remove();
  } catch (error) {}
}

function onKeyDown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.ctrlKey && !event.shiftKey && event.key === "z") {
    event.preventDefault();
    undoAction();
    return;
  } else if (
    event.ctrlKey &&
    ((event.shiftKey && event.key === "Z") || event.key === "y")
  ) {
    event.preventDefault();
    redoAction();
    return;
  }

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  if (handleListIndentation(event, selection, range)) return;
  handleBlockquoteIndentation(event, selection, range);

  if (event.key === "Tab") {
    event.preventDefault();

    try {
      let currentElement = range.startContainer;
      let inList = false;

      while (currentElement && currentElement !== editorRef.value) {
        if (currentElement.nodeType === Node.ELEMENT_NODE) {
          const tagName = (currentElement as Element).tagName?.toLowerCase();
          if (["li", "ul", "ol"].includes(tagName)) {
            inList = true;
            break;
          }
        }
        const parent = currentElement.parentNode;
        if (!parent) break;
        currentElement = parent;
      }

      if (inList && !event.shiftKey) document.execCommand("indent", false);
      else if (inList && event.shiftKey) document.execCommand("outdent", false);
      else if (!event.shiftKey) {
        const tab = document.createElement("span");
        tab.classList.add("tab");
        tab.innerHTML = "\t";

        range.deleteContents();
        range.insertNode(tab);
        range.setStartAfter(tab);
      } else removeIndentation();
    } catch (error) {}
  }

  if (
    event.key === "Enter" ||
    event.key === "Tab" ||
    event.key === "Backspace"
  ) {
    if (event.key != "Backspace") {
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    onInput();
    updateActiveStates();
  }
}

function onFocus() {
  isFocused.value = true;
  emit("focus");
  updateActiveStates();
}

function onBlur() {
  isFocused.value = false;
  emit("blur");
}

function onPaste(event: ClipboardEvent) {
  if (props.disabled) return;

  const selection = window.getSelection();
  if (!isSelectionWithinEditor(selection)) {
    event.preventDefault();
    return;
  }
}

function onCut(event: ClipboardEvent) {
  if (props.disabled) return;

  const selection = window.getSelection();
  if (!isSelectionWithinEditor(selection)) {
    event.preventDefault();
    return;
  }
}

function onCopy(event: ClipboardEvent) {
  const selection = window.getSelection();
  if (!isSelectionWithinEditor(selection)) {
    event.preventDefault();
    return;
  }
}
</script>

<template>
  <div :class="editorClasses">
    <Label
      v-if="labelValue"
      :label-value="labelValue"
      :info-message="infoMessage"
      :tooltip-min-width="tooltipMinWidth"
      :required="required"
      class="mb-xs"
    />

    <div class="toolbar">
      <div v-for="(option, key) in options" :key="key" class="toolbar-group">
        <template v-for="(item, itemKey) in option" :key="itemKey">
          <Select
            v-if="item.type === 'select'"
            v-model="item.value"
            :options="(item as FontSize).options"
            :disabled="disabled"
            absolute
            @update:model-value="(item as FontSize).action(item.value)"
          />
          <Tooltip position="bottom">
            <Colors
              v-if="item.type === 'color'"
              v-model="(item as Color).value"
              v-model:custom="customColorOptions"
              :expanded="(item as Color).expanded"
              @update:model-value="(value) => setColor(value, item as Color)"
              @update:expanded="saveCurrentSelection"
              @update:custom="(value) => (customColorOptions = value)"
            >
              <template #add-label>
                <slot name="add-label"> Add </slot>
              </template>
              <template #cancel-label>
                <slot name="cancel-label"> Cancel </slot>
              </template>
              <Option :disabled="disabled">
                <Icon :name="item.icon" />
              </Option>
            </Colors>
            <Option
              v-else
              class="relative"
              :selected="item.selected"
              :disabled="disabled || item.disabled"
              @click="
                item.action
                  ? item.action(item.value)
                  : execCommand(item.command, item.style, item.value)
              "
            >
              <Icon :name="item.icon" />
              <input
                v-if="item.type === 'image'"
                type="file"
                ref="imageInputRef"
                accept="image/*"
                class="z-[1] absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                @change="handleImageUpload"
              />
            </Option>
            <template #label>
              <slot :name="`${itemKey}-label`">
                {{ item.label }}
              </slot>
              <template v-if="item.shortcut"> ({{ item.shortcut }}) </template>
            </template>
          </Tooltip>
        </template>
      </div>
    </div>

    <div
      ref="editorRef"
      class="editor-content"
      role="textbox"
      :style="editorStyle"
      :contenteditable="!disabled"
      :placeholder="placeholder"
      :aria-label="labelValue"
      :aria-required="required"
      :aria-invalid="isError"
      :aria-describedby="
        isError ? 'error-message' : infoMessage ? 'info-message' : undefined
      "
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeyDown"
      @keyup="updateActiveStates"
      @mouseup="updateActiveStates"
      @paste="onPaste"
      @cut="onCut"
      @copy="onCopy"
    />

    <Dialog v-model="showLinkDialog" width="50%" height="fit-content">
      <div class="flex flex-col gap-sm p-base">
        <Input
          v-model="linkUrl"
          placeholder="Enter URL (e.g. https://example.com)"
          label-value="URL"
          mask="url"
          required
          :disabled="disabled"
          @keydown.enter="insertLink"
        />

        <Input
          v-model="linkText"
          placeholder="Link text"
          label-value="Link Text"
          :disabled="disabled"
          @keydown.enter="insertLink"
        />
        <div class="flex justify-end gap-sm">
          <Button @click="cancelLinkDialog" variant="secondary">
            Cancel
          </Button>
          <Button
            @click="insertLink"
            variant="default"
            :disabled="!linkUrl.trim()"
          >
            Insert Link
          </Button>
        </div>
      </div>
    </Dialog>

    <small v-if="isError" class="error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.rich-text-editor {
  @apply flex flex-col;
}

.rich-text-editor.no-border {
  @apply border-none;
}

.toolbar {
  @apply flex items-center gap-xs p-sm bg-neutral-surface-default border-xxs border-neutral-default border-b-none rounded-t-sm flex-wrap;
}

.toolbar-group {
  @apply flex items-center gap-xxs border-r-xxs border-neutral-default pr-xs mr-xs;
}

.toolbar-group:last-child {
  @apply border-r-none pr-none mr-none;
}

.editor-content {
  @apply min-h-14xl max-h-20xl overflow-y-auto p-sm border-xxs border-neutral-default rounded-b-sm outline-none whitespace-pre-wrap
  text-neutral-foreground-high focus:border-primary-default transition-colors;
  word-wrap: break-word;
}

.editor-content:focus:empty:before {
  @apply hidden;
}

.editor-content div {
  @apply mb-sm;
}

.editor-content a {
  @apply text-primary-foreground-high underline;
}

.editor-content img {
  @apply max-w-full h-auto rounded;
}

.editor-content strong {
  @apply font-bold;
}

.editor-content em {
  @apply italic;
}

.editor-content u {
  @apply underline;
}

.rich-text-editor.focus .editor-content {
  @apply border-primary-default;
}

.rich-text-editor.disabled .toolbar,
.rich-text-editor.disabled .editor-content {
  @apply pointer-events-none;
}

.rich-text-editor.error .editor-content {
  @apply border-danger-default;
}

.rich-text-editor.no-border .toolbar,
.rich-text-editor.no-border .editor-content {
  @apply border-none rounded-none;
}

.error-message {
  @apply text-sm text-danger-foreground-low text-start;
}
</style>
