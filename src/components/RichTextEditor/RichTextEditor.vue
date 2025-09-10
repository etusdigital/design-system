<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from "vue";
import Label from "../../utils/components/Label.vue";
import Option from "../../utils/components/Option.vue";
import Colors from "./Colors.vue";

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
  | "formatBlock"
  | "removeFormat"
  | "undo"
  | "redo";

type ToolbarOption = {
  label: string;
  value: string;
  icon?: string;
  command: EditorAction;
};

type Color = {
  value: string;
  expanded: boolean;
  style: "color" | "backgroundColor";
  command: "foreColor" | "backColor";
  icon: string;
  label: string;
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
const colors = ref<Color[]>([
  {
    value: "#000000",
    expanded: false,
    style: "color",
    command: "foreColor",
    icon: "format_color_text",
    label: "Text color",
  },
  {
    value: "#000000",
    expanded: false,
    style: "backgroundColor",
    command: "backColor",
    icon: "format_color_fill",
    label: "Background color",
  },
]);
const list = ref<ToolbarOption[]>([
  {
    label: "Bulleted list",
    value: "insertUnorderedList",
    icon: "format_list_bulleted",
    command: "insertUnorderedList",
  },
  {
    label: "Numbered list",
    value: "insertOrderedList",
    icon: "format_list_numbered",
    command: "insertOrderedList",
  },
]);
const customColorOptions = ref<string[]>([]);
const currentFontSize = ref<number>(16);
const savedSelection = ref<Range | null>(null);

const fontSizeOptions = ref(
  Array.from({ length: 10 }, (_, i: number) => i * 4 + 12)
);

const isFocused = ref(false);
const isActive = ref<Record<string, boolean>>({});
const isInBlockquote = ref(false);

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
    setTimeout(() => forceListStyles(), 50);
  }
);

onMounted(() => {
  if (!editorRef.value) return;

  editorRef.value.innerHTML = sanitizeHTML(props.modelValue);
  setTimeout(() => forceListStyles(), 50);
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

function execCommand(command: EditorAction, value?: string) {
  if (props.disabled || !editorRef.value) return;

  try {
    if (!document.queryCommandSupported(command)) return;

    const success = document.execCommand(command, false, value);

    if (!success) {
      switch (command) {
        case "bold":
          applyStyleCommand("font-weight", "bold");
          break;
        case "italic":
          applyStyleCommand("font-style", "italic");
          break;
        case "underline":
          applyStyleCommand("text-decoration", "underline");
          break;
      }
    }
  } catch (error) {
    console.error(error);
  }

  editorRef.value?.focus();
  updateActiveStates();

  if (command === "insertUnorderedList" || command === "insertOrderedList")
    setTimeout(() => forceListStyles(), 10);
}

function applyStyleCommand(property: string, value: string) {
  try {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.value) return;

    const range = selection.getRangeAt(0);

    if (range.collapsed) {
      const span = document.createElement("span");
      span.style.setProperty(property, value);
      span.textContent = "\u200B";

      range.insertNode(span);
      range.setStart(span, 1);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      const contents = range.extractContents();
      const span = document.createElement("span");
      span.style.setProperty(property, value);
      span.appendChild(contents);

      range.insertNode(span);
      range.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    onInput();
  } catch (error) {
    console.error(error);
  }
}

function applyFontSize(fontSize: number) {
  if (props.disabled || !editorRef.value) return;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);

  if (selection.isCollapsed) {
    let blockElement = range.startContainer;

    while (blockElement && blockElement !== editorRef.value) {
      if (blockElement.nodeType === Node.ELEMENT_NODE) {
        const nodeName = (blockElement as Element).nodeName.toLowerCase();
        if (["div", "p", "li"].includes(nodeName)) {
          (blockElement as HTMLElement).style.fontSize =
            fontSize.toString() + "px";
          break;
        }
      }
      const parent = blockElement.parentNode;
      if (!parent) break;
      blockElement = parent;
    }

    if (!blockElement || blockElement === editorRef.value) {
      const newDiv = document.createElement("div");
      newDiv.style.fontSize = fontSize.toString() + "px";
      newDiv.innerHTML = "<br>";

      range.insertNode(newDiv);

      const newRange = document.createRange();
      newRange.setStart(newDiv, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  } else {
    const contents = range.extractContents();
    const span = document.createElement("span");
    span.style.fontSize = fontSize.toString() + "px";
    span.appendChild(contents);

    range.insertNode(span);

    range.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  editorRef.value.focus();
  onInput();
  updateActiveStates();
}

function onFontSizeChange(value: number | string) {
  const newValue = value as number;
  applyFontSize(newValue);
}

function saveCurrentSelection() {
  try {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (
        editorRef.value &&
        editorRef.value.contains(range.commonAncestorContainer)
      ) {
        savedSelection.value = range.cloneRange();
      }
    }
  } catch (error) {
    savedSelection.value = null;
  }
}

function restoreSavedSelection() {
  try {
    if (savedSelection.value && editorRef.value) {
      editorRef.value.focus();
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();

        const range = savedSelection.value;
        if (editorRef.value.contains(range.commonAncestorContainer)) {
          selection.addRange(range);
        } else {
          const newRange = document.createRange();
          newRange.setStart(editorRef.value, 0);
          newRange.collapse(true);
          selection.addRange(newRange);
        }
      }
    }
  } catch (error) {
    savedSelection.value = null;
  }
}

function setColor(color: string, option: Color) {
  if (props.disabled || !editorRef.value) return;

  try {
    restoreSavedSelection();

    const selection = window.getSelection();
    if (!selection) return;

    if (selection.rangeCount === 0 || selection.isCollapsed) {
      let range: Range;

      if (savedSelection.value && !savedSelection.value.collapsed) {
        try {
          range = savedSelection.value;
          selection.removeAllRanges();
          selection.addRange(range);
        } catch (rangeError) {
          range = document.createRange();
          range.setStart(editorRef.value, 0);
          range.collapse(true);
        }
      } else {
        range = document.createRange();
        if (selection.rangeCount > 0) {
          range = selection.getRangeAt(0);
        } else {
          range.setStart(editorRef.value, 0);
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
    }

    if (!selection.isCollapsed && selection.rangeCount > 0) {
      const success = document.execCommand(option.command, false, color);

      if (!success) {
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
        } catch (error) {
          console.error(error);
        }
      }
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

  if (selection && !selection.isCollapsed) {
    linkText.value = selection.toString();
  } else {
    linkText.value = "";
  }

  linkUrl.value = "https://";
  showLinkDialog.value = true;

  nextTick(() => {
    setTimeout(() => {
      const urlInput = document.querySelector(
        ".link-dialog-body input"
      ) as HTMLInputElement;
      urlInput?.focus();
    }, 100);
  });
}

function insertLink() {
  if (!linkUrl.value.trim()) return;

  try {
    restoreSavedSelection();

    const selection = window.getSelection();
    if (!selection || !editorRef.value) return;

    let range: Range;
    if (selection.rangeCount > 0) {
      range = selection.getRangeAt(0);
    } else {
      range = document.createRange();
      range.setStart(editorRef.value, 0);
      range.collapse(true);
    }

    const link = document.createElement("a");
    link.href = linkUrl.value.trim();
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const finalText = linkText.value.trim() || linkUrl.value.trim();
    link.textContent = finalText;

    if (!range.collapsed) {
      range.deleteContents();
    }

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
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
      } else {
        range = document.createRange();
        range.setStart(editorRef.value, 0);
        range.collapse(true);
      }

      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = file.name;
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.borderRadius = "0.25rem";
      img.style.margin = "0.5rem 0";

      if (!range.collapsed) {
        range.deleteContents();
      }
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

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return;
  }

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

    editorRef.value.focus();
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
      if (parent) {
        const div = document.createElement("div");
        div.innerHTML = existingBlockquote.innerHTML;
        parent.replaceChild(div, existingBlockquote);

        const newRange = document.createRange();
        newRange.selectNodeContents(div);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else {
      const blockquote = document.createElement("blockquote");

      addBlockquoteStyles([blockquote]);

      if (selection.isCollapsed) {
        blockquote.textContent = "Type your quote here...";
        range.insertNode(blockquote);

        const newRange = document.createRange();
        newRange.selectNodeContents(blockquote);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        const contents = range.extractContents();
        blockquote.appendChild(contents);
        range.insertNode(blockquote);

        const newRange = document.createRange();
        newRange.selectNodeContents(blockquote);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
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
  const borderRadius = getComputedStyle(editorRef.value).getPropertyValue(
    "--border-radius-sm"
  );

  blockquotes.forEach((bq) => {
    const htmlBq = bq as HTMLElement;
    htmlBq.style.borderLeft = `${borderWidth} solid ${borderColor}`;
    htmlBq.style.fontStyle = "italic";
    htmlBq.style.backgroundColor = backgroundColor;
    htmlBq.style.padding = spacing;
    htmlBq.style.margin = spacing;
    htmlBq.style.borderRadius = `0 ${borderRadius} ${borderRadius} 0`;
    htmlBq.style.position = "relative";
  });
}

function updateActiveStates() {
  isActive.value = {
    bold: document.queryCommandState("bold"),
    italic: document.queryCommandState("italic"),
    underline: document.queryCommandState("underline"),
    strikeThrough: document.queryCommandState("strikeThrough"),
    insertUnorderedList: document.queryCommandState("insertUnorderedList"),
    insertOrderedList: document.queryCommandState("insertOrderedList"),
    justifyLeft: document.queryCommandState("justifyLeft"),
    justifyCenter: document.queryCommandState("justifyCenter"),
    justifyRight: document.queryCommandState("justifyRight"),
  };

  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0 && editorRef.value) {
    let currentNode = selection.getRangeAt(0).startContainer;
    let fontSizeFound = false;
    isInBlockquote.value = false;

    while (currentNode && currentNode !== editorRef.value) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        const element = currentNode as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        if (tagName === "blockquote") {
          isInBlockquote.value = true;
        }

        if (!fontSizeFound) {
          const computedStyle = window.getComputedStyle(element);
          const fontSize = computedStyle.fontSize;

          const matchingOption = fontSizeOptions.value.find(
            (option: number) => {
              const optionPx = option;
              const currentPx = parseInt(fontSize);
              return Math.abs(optionPx - currentPx) <= 1;
            }
          );

          if (matchingOption) {
            currentFontSize.value = matchingOption;
            fontSizeFound = true;
          }
        }
      }
      const parent = currentNode.parentNode;
      if (!parent) break;
      currentNode = parent;
    }

    if (!fontSizeFound) {
      currentFontSize.value = 16;
    }
  }
}

function onInput() {
  if (!editorRef.value) return;

  const content = editorRef.value.innerHTML;
  emit("update:modelValue", content);
  updateActiveStates();

  forceListStyles();
}

function forceListStyles() {
  if (!editorRef.value) return;

  const lists = editorRef.value.querySelectorAll("ul, ol");

  lists.forEach((list) => {
    const htmlList = list as HTMLElement;

    if (list.tagName.toLowerCase() === "ul") {
      htmlList.style.listStyleType = "disc";
      htmlList.style.paddingLeft = "2rem";
      htmlList.style.listStylePosition = "outside";
    } else if (list.tagName.toLowerCase() === "ol") {
      htmlList.style.listStyleType = "decimal";
      htmlList.style.paddingLeft = "2rem";
      htmlList.style.listStylePosition = "outside";
    }
  });

  const listItems = editorRef.value.querySelectorAll("li");

  listItems.forEach((li) => {
    const htmlLi = li as HTMLElement;
    htmlLi.style.display = "list-item";
    htmlLi.style.listStylePosition = "outside";
  });
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

function onKeyDown(event: KeyboardEvent) {
  if (props.disabled) return;

  if (event.key === "Enter") {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);

    const currentLi =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement?.closest("li")
        : (range.startContainer as Element)?.closest?.("li");

    if (currentLi) {
      event.preventDefault();

      const currentList = currentLi.closest("ul, ol");
      if (!currentList) {
        return;
      }

      const isEmpty = currentLi.textContent?.trim() === "";
      const isAtStart =
        range.startContainer.nodeType === Node.TEXT_NODE &&
        range.startOffset === 0;

      if (isEmpty || (isAtStart && currentLi.textContent?.trim() === "")) {
        const currentBlockquote = currentList.closest("blockquote");

        if (currentBlockquote) {
          currentLi.remove();

          if (currentList.children.length === 0) {
            currentList.remove();

            const br = document.createElement("br");
            currentBlockquote.appendChild(br);

            const newRange = document.createRange();
            newRange.setStartAfter(br);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          } else {
            const br = document.createElement("br");
            currentList.parentNode?.insertBefore(br, currentList.nextSibling);

            const newRange = document.createRange();
            newRange.setStartAfter(br);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        } else {
          const paragraph = document.createElement("p");
          paragraph.innerHTML = "<br>";

          if (currentList.parentNode) {
            currentList.parentNode.insertBefore(
              paragraph,
              currentList.nextSibling
            );

            currentLi.remove();

            if (currentList.children.length === 0) {
              currentList.remove();
            }

            const newRange = document.createRange();
            newRange.setStart(paragraph, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
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

          if (afterText.trim()) {
            newLi.textContent = afterText;
          } else {
            newLi.innerHTML = "<br>";
          }
        } else {
          newLi.innerHTML = "<br>";
        }

        currentLi.parentNode!.insertBefore(newLi, currentLi.nextSibling);

        const newRange = document.createRange();
        if (newLi.firstChild) {
          if (newLi.firstChild.nodeType === Node.TEXT_NODE) {
            newRange.setStart(newLi.firstChild, 0);
          } else {
            newRange.setStart(newLi, 0);
          }
        } else {
          newRange.setStart(newLi, 0);
        }
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }

      setTimeout(() => {
        forceListStyles();
        onInput();
        updateActiveStates();
      }, 10);

      return;
    }

    event.preventDefault();

    try {
      const br = document.createElement("br");
      range.deleteContents();
      range.insertNode(br);

      const nextNode = br.nextSibling;
      if (
        !nextNode ||
        (nextNode.nodeType === Node.ELEMENT_NODE &&
          (nextNode as Element).tagName.toLowerCase() === "br")
      ) {
        const br2 = document.createElement("br");
        range.setStartAfter(br);
        range.insertNode(br2);
        range.setStartAfter(br2);
      } else {
        range.setStartAfter(br);
      }

      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      onInput();
      updateActiveStates();
    } catch (error) {}

    return;
  }

  if (event.key === "Backspace") {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    const currentLi =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement?.closest("li")
        : (range.startContainer as Element)?.closest?.("li");

    if (currentLi) {
      const isAtStart = range.startOffset === 0;
      const isEmpty = currentLi.textContent?.trim() === "";

      if (isEmpty || (isAtStart && range.startContainer === currentLi)) {
        event.preventDefault();

        const currentList = currentLi.closest("ul, ol");
        if (!currentList) {
          return;
        }

        const currentBlockquote = currentList.closest("blockquote");

        if (currentBlockquote) {
          currentLi.remove();

          if (currentList.children.length === 0) {
            const br = document.createElement("br");
            currentList.parentNode?.replaceChild(br, currentList);

            const newRange = document.createRange();
            newRange.setStartAfter(br);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          } else {
            const br = document.createElement("br");
            currentList.parentNode?.insertBefore(br, currentList.nextSibling);

            const newRange = document.createRange();
            newRange.setStartAfter(br);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        } else {
          currentLi.remove();

          const div = document.createElement("div");
          div.innerHTML = "<br>";

          if (currentList.children.length === 0) {
            currentList.parentNode?.replaceChild(div, currentList);
          } else {
            currentList.parentNode?.insertBefore(div, currentList.nextSibling);
          }

          const newRange = document.createRange();
          newRange.setStart(div, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }

        onInput();
        updateActiveStates();
        return;
      }
    }

    const currentBlockquote =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement?.closest("blockquote")
        : (range.startContainer as Element)?.closest?.("blockquote");

    if (currentBlockquote) {
      const isEmpty = currentBlockquote.textContent?.trim() === "";

      const blockquoteHtml = currentBlockquote.innerHTML;
      const endsWithBrTags = Boolean(
        blockquoteHtml.match(/<br\s*\/?>\s*(<br\s*\/?>)*\s*$/i)
      );

      let shouldRemoveBlockquote = false;

      if (isEmpty) {
        shouldRemoveBlockquote = true;
      } else if (endsWithBrTags) {
        let isAtEmptyEnd = false;

        if (range.startContainer === currentBlockquote) {
          const children = Array.from(currentBlockquote.childNodes);
          const lastMeaningfulIndex = children.reduce(
            (lastIndex, node, index) => {
              if (
                (node.nodeType === Node.TEXT_NODE &&
                  node.textContent?.trim() !== "") ||
                (node.nodeType === Node.ELEMENT_NODE &&
                  (node as Element).tagName !== "BR")
              ) {
                return index;
              }
              return lastIndex;
            },
            -1
          );

          isAtEmptyEnd = range.startOffset > lastMeaningfulIndex;
        } else if (range.startContainer.nodeType === Node.TEXT_NODE) {
          const textContent = range.startContainer.textContent || "";
          const afterCursor = textContent.substring(range.startOffset);

          isAtEmptyEnd = afterCursor.trim() === "" && endsWithBrTags;
        }

        if (isAtEmptyEnd) {
          shouldRemoveBlockquote = true;
        }
      }

      if (shouldRemoveBlockquote) {
        event.preventDefault();

        try {
          const parent = currentBlockquote.parentNode;
          if (parent) {
            if (isEmpty) {
              const div = document.createElement("div");
              div.innerHTML = "<br>";
              parent.replaceChild(div, currentBlockquote);

              const newRange = document.createRange();
              newRange.setStart(div, 0);
              newRange.collapse(true);
              selection.removeAllRanges();
              selection.addRange(newRange);
            } else {
              let cleanContent = currentBlockquote.innerHTML.replace(
                /<br\s*\/?>\s*(<br\s*\/?>)*\s*$/i,
                ""
              );

              currentBlockquote.innerHTML = cleanContent;

              const newDiv = document.createElement("div");
              newDiv.innerHTML = "<br>";

              parent.insertBefore(newDiv, currentBlockquote.nextSibling);

              const newRange = document.createRange();
              newRange.setStart(newDiv, 0);
              newRange.collapse(true);
              selection.removeAllRanges();
              selection.addRange(newRange);
            }

            editorRef.value?.focus();
            onInput();
            updateActiveStates();
          }
        } catch (error) {
          console.error(error);
        }
        return;
      }
    }
  }

  if (event.key === "Tab") {
    event.preventDefault();

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    try {
      const range = selection.getRangeAt(0);

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

      if (inList && !event.shiftKey) {
        document.execCommand("indent", false);
      } else if (inList && event.shiftKey) {
        document.execCommand("outdent", false);
      } else {
        const tabSpan = document.createElement("span");
        tabSpan.style.paddingLeft = "2em";
        tabSpan.innerHTML = "\u00A0";

        range.deleteContents();
        range.insertNode(tabSpan);

        range.setStartAfter(tabSpan);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      onInput();
      updateActiveStates();
    } catch (error) {
      console.error(error);
    }

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
    />

    <div class="toolbar" :class="{ compact: compact }">
      <div class="toolbar-group">
        <Tooltip label-value="Undo (Ctrl+Z)" position="bottom">
          <Option @click="execCommand('undo')" :disabled="disabled">
            <Icon name="undo" />
          </Option>
        </Tooltip>
        <Tooltip label-value="Redo (Ctrl+Y)" position="bottom">
          <Option @click="execCommand('redo')" :disabled="disabled">
            <Icon name="redo" />
          </Option>
        </Tooltip>
      </div>

      <div class="toolbar-group">
        <Select
          v-model="currentFontSize"
          :options="fontSizeOptions"
          :disabled="disabled"
          absolute
          @update:model-value="onFontSizeChange"
        />
      </div>

      <div class="toolbar-group">
        <Tooltip label-value="Bold (Ctrl+B)" position="bottom">
          <Option
            :selected="isActive.bold"
            @click="execCommand('bold')"
            :disabled="disabled"
          >
            <Icon name="format_bold" />
          </Option>
        </Tooltip>
        <Tooltip label-value="Italic (Ctrl+I)" position="bottom">
          <Option
            :selected="isActive.italic"
            @click="execCommand('italic')"
            :disabled="disabled"
          >
            <Icon name="format_italic" />
          </Option>
        </Tooltip>
        <Tooltip label-value="Underline (Ctrl+U)" position="bottom">
          <Option
            :selected="isActive.underline"
            @click="execCommand('underline')"
            :disabled="disabled"
          >
            <Icon name="format_underlined" />
          </Option>
        </Tooltip>
        <Tooltip label-value="Strikethrough" position="bottom">
          <Option
            :selected="isActive.strikeThrough"
            @click="execCommand('strikeThrough')"
            :disabled="disabled"
          >
            <Icon name="strikethrough_s" />
          </Option>
        </Tooltip>
      </div>

      <div class="toolbar-group">
        <div class="color-button-wrapper" ref="textColorPickerRef"></div>
        <Tooltip
          v-for="color in colors"
          :key="color.value"
          :label-value="color.label"
          position="bottom"
        >
          <Colors
            v-model="color.value"
            v-model:custom="customColorOptions"
            :expanded="color.expanded"
            @update:model-value="(value) => setColor(value, color)"
            @update:expanded="saveCurrentSelection"
            @update:custom="(value) => (customColorOptions = value)"
          >
            <Option :disabled="disabled">
              <Icon :name="color.icon" />
            </Option>
          </Colors>
        </Tooltip>
      </div>

      <div class="toolbar-group">
        <Tooltip
          v-for="list in list"
          :key="list.value"
          :label-value="list.label"
          position="bottom"
        >
          <Option
            :selected="isActive[list.value]"
            @click="execCommand(list.command)"
            :disabled="disabled"
          >
            <Icon :name="list.icon" />
          </Option>
        </Tooltip>
      </div>

      <div class="toolbar-group">
        <Tooltip label-value="Align left" position="bottom">
          <Option
            :selected="isActive.justifyLeft"
            @click="execCommand('justifyLeft')"
            :disabled="disabled"
          >
            <Icon name="format_align_left" />
          </Option>
        </Tooltip>
        <Tooltip label-value="Align center" position="bottom">
          <Option
            :selected="isActive.justifyCenter"
            @click="execCommand('justifyCenter')"
            :disabled="disabled"
          >
            <Icon name="format_align_center" />
          </Option>
        </Tooltip>
        <Tooltip label-value="Align right" position="bottom">
          <Option
            :selected="isActive.justifyRight"
            @click="execCommand('justifyRight')"
            :disabled="disabled"
          >
            <Icon name="format_align_right" />
          </Option>
        </Tooltip>
      </div>

      <div class="toolbar-group">
        <Tooltip label-value="Insert link" position="bottom">
          <Option @click="createLink" :disabled="disabled">
            <Icon name="link" />
          </Option>
        </Tooltip>
        <Tooltip label-value="Insert image" position="bottom">
          <Option class="relative" :disabled="disabled" @click="insertImage">
            <Icon name="image" />
            <input
              type="file"
              ref="imageInputRef"
              accept="image/*"
              class="z-[1] absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              @change="handleImageUpload"
            />
          </Option>
        </Tooltip>
        <Tooltip label-value="Quote" position="bottom">
          <Option
            :disabled="disabled"
            :selected="isInBlockquote"
            @click="insertBlockquote"
          >
            <Icon name="format_quote" />
          </Option>
        </Tooltip>
      </div>

      <div class="toolbar-group">
        <Tooltip label-value="Remove formatting" position="bottom">
          <Option @click="execCommand('removeFormat')" :disabled="disabled">
            <Icon name="format_clear" />
          </Option>
        </Tooltip>
      </div>
    </div>

    <div
      ref="editorRef"
      class="editor-content"
      :style="editorStyle"
      :contenteditable="!disabled"
      :placeholder="placeholder"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keydown="onKeyDown"
      @keyup="updateActiveStates"
      @mouseup="updateActiveStates"
      role="textbox"
      :aria-label="labelValue || 'Rich text editor'"
      :aria-required="required"
      :aria-invalid="isError"
      :aria-describedby="
        isError ? 'error-message' : infoMessage ? 'info-message' : undefined
      "
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

    <small v-if="isError" id="error-message" class="error-message">
      {{ errorMessage }}
    </small>
  </div>
</template>

<style scoped>
@reference "../../assets/main.css";

.rich-text-editor {
  @apply flex flex-col gap-xs;
}

.rich-text-editor.no-border {
  @apply border-none;
}

.toolbar {
  @apply flex items-center gap-xs p-sm bg-neutral-surface-default border border-neutral-default border-b-0 rounded-t-sm flex-wrap;
}

.toolbar.compact {
  @apply p-xs gap-xxs;
}

.toolbar-group {
  @apply flex items-center gap-xxs border-r border-neutral-default pr-xs mr-xs last:border-r-0 last:pr-0 last:mr-0;
}

.toolbar-group:last-child {
  @apply border-r-0 pr-0 mr-0;
}

.color-button-wrapper {
  @apply relative;
}

.editor-content {
  @apply min-h-[200px] max-h-[400px] overflow-y-auto p-sm bg-transparent border border-neutral-default rounded-b-sm outline-none text-neutral-foreground-high focus:border-primary-default transition-colors;
  white-space: pre-wrap;
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
  @apply bg-neutral-surface-disabled opacity-50 pointer-events-none;
}

.rich-text-editor.error .editor-content {
  @apply border-danger-default;
}

.rich-text-editor.no-border .toolbar {
  @apply border-0 rounded-none;
}

.rich-text-editor.no-border .editor-content {
  @apply border-0 rounded-none;
}

.error-message {
  @apply text-sm text-danger-foreground-low text-start;
}
</style>
