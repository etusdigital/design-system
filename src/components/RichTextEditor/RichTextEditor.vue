<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from "vue";
import Label from "../../utils/components/Label.vue";
import Option from "../../utils/components/Option.vue";

type EditorAction = 'bold' | 'italic' | 'underline' | 'strikeThrough' | 'insertUnorderedList' | 'insertOrderedList' | 'justifyLeft' | 'justifyCenter' | 'justifyRight' | 'formatBlock' | 'removeFormat' | 'undo' | 'redo';
type FontSize = '12px' | '14px' | '16px' | '18px' | '20px' | '24px' | '28px' | '32px' | '36px' | '48px';

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
        colorOptions?: string[];
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
        colorOptions: () => [
            '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff',
            '#ff0000', '#ff6600', '#ffaa00', '#ffff00', '#99ff00', '#00ff00',
            '#00ffaa', '#00ffff', '#0099ff', '#0000ff', '#6600ff', '#ff00ff',
            '#ff0099', '#990099', '#660066', '#330066', '#003366', '#006666'
        ]
    }
);

const emit = defineEmits<{
    "update:modelValue": [value: string];
    focus: [];
    blur: [];
}>();

const editorRef = ref<HTMLDivElement>();
const textColorPickerRef = ref<HTMLDivElement>();
const backgroundColorPickerRef = ref<HTMLDivElement>();
const showColorPicker = ref(false);
const showBackgroundPicker = ref(false);
const currentFontSize = ref<FontSize>('16px');
const savedSelection = ref<Range | null>(null);

const fontSizeOptions = [
    { label: '12', value: '12px' },
    { label: '14', value: '14px' },
    { label: '16', value: '16px' },
    { label: '18', value: '18px' },
    { label: '20', value: '20px' },
    { label: '24', value: '24px' },
    { label: '28', value: '28px' },
    { label: '32', value: '32px' },
    { label: '36', value: '36px' },
    { label: '48', value: '48px' }
];

const isFocused = ref(false);
const isActive = ref<Record<string, boolean>>({});
const isInBlockquote = ref(false);

const showImageUpload = ref(false);
const selectedImageFile = ref<File>();

const showLinkDialog = ref(false);
const linkUrl = ref('');
const linkText = ref('');



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

function sanitizeHTML(html: string): string {
    const allowedTags = ['b', 'i', 'u', 'strong', 'em', 'br', 'div', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'span'];
    const allowedAttributes = ['style', 'href', 'src', 'alt', 'title'];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    function cleanNode(node: Node): Node | null {
        if (node.nodeType === Node.TEXT_NODE) {
            return node;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            const tagName = element.tagName.toLowerCase();

            if (!allowedTags.includes(tagName)) {
                return document.createTextNode(element.textContent || '');
            }

            const cleanElement = document.createElement(tagName);
            for (const attr of Array.from(element.attributes)) {
                if (allowedAttributes.includes(attr.name)) {
                    cleanElement.setAttribute(attr.name, attr.value);
                }
            }

            for (const child of Array.from(element.childNodes)) {
                const cleanChild = cleanNode(child);
                if (cleanChild) {
                    cleanElement.appendChild(cleanChild);
                }
            }

            return cleanElement;
        }

        return null;
    }

    const body = doc.body;
    const cleanBody = document.createElement('div');

    for (const child of Array.from(body.childNodes)) {
        const cleanChild = cleanNode(child);
        if (cleanChild) {
            cleanBody.appendChild(cleanChild);
        }
    }

    return cleanBody.innerHTML;
}

onMounted(() => {
    if (editorRef.value) {
        editorRef.value.innerHTML = sanitizeHTML(props.modelValue);
        setTimeout(() => forceListStyles(), 50);
    }

    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
});

watch(() => props.modelValue, (newValue) => {
    if (editorRef.value && editorRef.value.innerHTML !== newValue) {
        editorRef.value.innerHTML = sanitizeHTML(newValue || "");
        setTimeout(() => forceListStyles(), 50);
    }
});

function execCommand(command: EditorAction, value?: string) {
    if (props.disabled || !editorRef.value) return;

    try {
        if (!document.queryCommandSupported(command)) {
            return;
        }

        const success = document.execCommand(command, false, value);

        if (!success) {
            switch (command) {
                case 'bold':
                    applyStyleCommand('font-weight', 'bold');
                    break;
                case 'italic':
                    applyStyleCommand('font-style', 'italic');
                    break;
                case 'underline':
                    applyStyleCommand('text-decoration', 'underline');
                    break;
            }
        }
    } catch (error) {
        console.error(error);
    }

    editorRef.value?.focus();
    updateActiveStates();

    if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
        setTimeout(() => forceListStyles(), 10);
    }
}

function applyStyleCommand(property: string, value: string) {
    try {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || !editorRef.value) return;

        const range = selection.getRangeAt(0);

        if (range.collapsed) {
            const span = document.createElement('span');
            span.style.setProperty(property, value);
            span.textContent = '\u200B';

            range.insertNode(span);
            range.setStart(span, 1);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        } else {
            const contents = range.extractContents();
            const span = document.createElement('span');
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

function applyFontSize(fontSize: FontSize) {
    if (props.disabled || !editorRef.value) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (selection.isCollapsed) {
        let blockElement = range.startContainer;

        while (blockElement && blockElement !== editorRef.value) {
            if (blockElement.nodeType === Node.ELEMENT_NODE) {
                const nodeName = (blockElement as Element).nodeName.toLowerCase();
                if (['div', 'p', 'li'].includes(nodeName)) {
                    (blockElement as HTMLElement).style.fontSize = fontSize;
                    break;
                }
            }
            const parent = blockElement.parentNode;
            if (!parent) break;
            blockElement = parent;
        }

        if (!blockElement || blockElement === editorRef.value) {
            const newDiv = document.createElement('div');
            newDiv.style.fontSize = fontSize;
            newDiv.innerHTML = '<br>';

            range.insertNode(newDiv);

            const newRange = document.createRange();
            newRange.setStart(newDiv, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
        }
    } else {
        const contents = range.extractContents();
        const span = document.createElement('span');
        span.style.fontSize = fontSize;
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

function onFontSizeChange(value: string) {
    const newValue = value as FontSize;
    applyFontSize(newValue);
}

function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (showColorPicker.value && textColorPickerRef.value && !textColorPickerRef.value.contains(target)) {
        showColorPicker.value = false;
    }

    if (showBackgroundPicker.value && backgroundColorPickerRef.value && !backgroundColorPickerRef.value.contains(target)) {
        showBackgroundPicker.value = false;
    }

}

function saveCurrentSelection() {
    try {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            if (editorRef.value && editorRef.value.contains(range.commonAncestorContainer)) {
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

function toggleTextColorPicker() {
    if (props.disabled) return;
    saveCurrentSelection();
    showColorPicker.value = !showColorPicker.value;
    showBackgroundPicker.value = false;

    if (showColorPicker.value) {
        nextTick(() => {
            positionColorPicker(textColorPickerRef.value);
        });
    }
}

function toggleBackgroundColorPicker() {
    if (props.disabled) return;
    saveCurrentSelection();
    showBackgroundPicker.value = !showBackgroundPicker.value;
    showColorPicker.value = false;

    if (showBackgroundPicker.value) {
        nextTick(() => {
            positionColorPicker(backgroundColorPickerRef.value);
        });
    }
}

function positionColorPicker(wrapperRef: HTMLDivElement | undefined) {
    if (!wrapperRef) return;

    const colorPicker = wrapperRef.querySelector('.color-picker') as HTMLElement;
    if (!colorPicker) return;

    const rect = wrapperRef.getBoundingClientRect();
    const pickerRect = colorPicker.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    colorPicker.style.left = '';
    colorPicker.style.right = '';
    colorPicker.style.top = '';
    colorPicker.style.bottom = '';

    if (rect.left + pickerRect.width > viewportWidth) {
        colorPicker.style.right = '0';
        colorPicker.style.left = 'auto';
    } else {
        colorPicker.style.left = '0';
        colorPicker.style.right = 'auto';
    }

    if (rect.bottom + pickerRect.height > viewportHeight) {
        colorPicker.style.bottom = '100%';
        colorPicker.style.top = 'auto';
        colorPicker.style.marginBottom = '4px';
        colorPicker.style.marginTop = '0';
    } else {
        colorPicker.style.top = '100%';
        colorPicker.style.bottom = 'auto';
        colorPicker.style.marginTop = '4px';
        colorPicker.style.marginBottom = '0';
    }
}

function setColor(color: string, isBackground = false) {
    if (props.disabled || !editorRef.value) return;

    try {
        restoreSavedSelection();

        const selection = window.getSelection();
        if (!selection) {
            showColorPicker.value = false;
            showBackgroundPicker.value = false;
            return;
        }

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
                const span = document.createElement('span');

                if (isBackground) {
                    span.style.backgroundColor = color;
                } else {
                    span.style.color = color;
                }

                span.innerHTML = '\u00A0';

                range.insertNode(span);
                range.setStartAfter(span);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }

        if (!selection.isCollapsed && selection.rangeCount > 0) {
            const command = isBackground ? 'backColor' : 'foreColor';

            const success = document.execCommand(command, false, color);

            if (!success) {
                try {
                    const range = selection.getRangeAt(0);
                    const contents = range.extractContents();
                    const span = document.createElement('span');

                    if (isBackground) {
                        span.style.backgroundColor = color;
                    } else {
                        span.style.color = color;
                    }

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
        showColorPicker.value = false;
        showBackgroundPicker.value = false;
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
        linkText.value = '';
    }

    linkUrl.value = 'https://';
    showLinkDialog.value = true;

    nextTick(() => {
        setTimeout(() => {
            const urlInput = document.querySelector('.link-dialog-body input') as HTMLInputElement;
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

        const link = document.createElement('a');
        link.href = linkUrl.value.trim();
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

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
        linkUrl.value = '';
        linkText.value = '';

        editorRef.value.focus();
        onInput();
        updateActiveStates();

    } catch (error) {
    }
}

function cancelLinkDialog() {
    showLinkDialog.value = false;
    linkUrl.value = '';
    linkText.value = '';
}


function insertImage() {
    if (props.disabled) return;

    saveCurrentSelection();

    selectedImageFile.value = undefined;
    showImageUpload.value = true;
}

function handleImageUpload(file: File | undefined) {
    if (!file || !editorRef.value) {
        showImageUpload.value = false;
        return;
    }

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

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = file.name;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.borderRadius = '0.25rem';
        img.style.margin = '0.5rem 0';

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
}

function insertBlockquote() {
    if (props.disabled || !editorRef.value) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
        return;
    }

    const execCommandSuccess = document.execCommand('formatBlock', false, 'blockquote');
    if (execCommandSuccess) {
        setTimeout(() => {
            const blockquotes = editorRef.value?.querySelectorAll('blockquote');
            blockquotes?.forEach(bq => {
                const htmlBq = bq as HTMLElement;
                htmlBq.style.borderLeft = '4px solid #3b82f6';
                htmlBq.style.paddingLeft = '1rem';
                htmlBq.style.marginLeft = '1rem';
                htmlBq.style.fontStyle = 'italic';
                htmlBq.style.backgroundColor = '#f8fafc';
                htmlBq.style.padding = '1rem';
                htmlBq.style.margin = '1rem 0';
                htmlBq.style.borderRadius = '0 0.25rem 0.25rem 0';
                htmlBq.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                htmlBq.style.position = 'relative';
            });
            onInput();
            updateActiveStates();
        }, 50);

        editorRef.value.focus();
        return;
    }

    try {
        const range = selection.getRangeAt(0);

        const existingBlockquote = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement?.closest('blockquote')
            : (range.startContainer as Element)?.closest?.('blockquote');

        if (existingBlockquote) {
            const parent = existingBlockquote.parentNode;
            if (parent) {
                const div = document.createElement('div');
                div.innerHTML = existingBlockquote.innerHTML;
                parent.replaceChild(div, existingBlockquote);

                const newRange = document.createRange();
                newRange.selectNodeContents(div);
                selection.removeAllRanges();
                selection.addRange(newRange);
            }
        } else {
            const blockquote = document.createElement('blockquote');

            blockquote.style.borderLeft = '4px solid #3b82f6';
            blockquote.style.paddingLeft = '1rem';
            blockquote.style.marginLeft = '1rem';
            blockquote.style.fontStyle = 'italic';
            blockquote.style.backgroundColor = '#f8fafc';
            blockquote.style.padding = '1rem';
            blockquote.style.margin = '1rem 0';
            blockquote.style.borderRadius = '0 0.25rem 0.25rem 0';
            blockquote.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            blockquote.style.position = 'relative';

            if (selection.isCollapsed) {
                blockquote.textContent = 'Type your quote here...';
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

    } catch (error) {
    }
}

function updateActiveStates() {
    isActive.value = {
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        strikeThrough: document.queryCommandState('strikeThrough'),
        insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        insertOrderedList: document.queryCommandState('insertOrderedList'),
        justifyLeft: document.queryCommandState('justifyLeft'),
        justifyCenter: document.queryCommandState('justifyCenter'),
        justifyRight: document.queryCommandState('justifyRight'),
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

                if (tagName === 'blockquote') {
                    isInBlockquote.value = true;
                }

                if (!fontSizeFound) {
                    const computedStyle = window.getComputedStyle(element);
                    const fontSize = computedStyle.fontSize;

                    const matchingOption = fontSizeOptions.find(option => {
                        const optionPx = parseInt(option.value);
                        const currentPx = parseInt(fontSize);
                        return Math.abs(optionPx - currentPx) <= 1;
                    });

                    if (matchingOption) {
                        currentFontSize.value = matchingOption.value as FontSize;
                        fontSizeFound = true;
                    }
                }
            }
            const parent = currentNode.parentNode;
            if (!parent) break;
            currentNode = parent;
        }

        if (!fontSizeFound) {
            currentFontSize.value = '16px';
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

    const lists = editorRef.value.querySelectorAll('ul, ol');

    lists.forEach((list) => {
        const htmlList = list as HTMLElement;

        if (list.tagName.toLowerCase() === 'ul') {
            htmlList.style.listStyleType = 'disc';
            htmlList.style.paddingLeft = '2rem';
            htmlList.style.listStylePosition = 'outside';
        } else if (list.tagName.toLowerCase() === 'ol') {
            htmlList.style.listStyleType = 'decimal';
            htmlList.style.paddingLeft = '2rem';
            htmlList.style.listStylePosition = 'outside';
        }
    });

    const listItems = editorRef.value.querySelectorAll('li');

    listItems.forEach((li) => {
        const htmlLi = li as HTMLElement;
        htmlLi.style.display = 'list-item';
        htmlLi.style.listStylePosition = 'outside';
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

    if (event.key === 'Enter') {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return;
        }

        const range = selection.getRangeAt(0);

        const currentLi = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement?.closest('li')
            : (range.startContainer as Element)?.closest?.('li');

        if (currentLi) {
            event.preventDefault();

            const currentList = currentLi.closest('ul, ol');
            if (!currentList) {
                return;
            }

            const isEmpty = currentLi.textContent?.trim() === '';
            const isAtStart = range.startContainer.nodeType === Node.TEXT_NODE && range.startOffset === 0;

            if (isEmpty || (isAtStart && currentLi.textContent?.trim() === '')) {
                const currentBlockquote = currentList.closest('blockquote');

                if (currentBlockquote) {
                    currentLi.remove();

                    if (currentList.children.length === 0) {
                        currentList.remove();

                        const br = document.createElement('br');
                        currentBlockquote.appendChild(br);

                        const newRange = document.createRange();
                        newRange.setStartAfter(br);
                        newRange.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(newRange);
                    } else {
                        const br = document.createElement('br');
                        currentList.parentNode?.insertBefore(br, currentList.nextSibling);

                        const newRange = document.createRange();
                        newRange.setStartAfter(br);
                        newRange.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(newRange);
                    }
                } else {
                    const paragraph = document.createElement('p');
                    paragraph.innerHTML = '<br>';

                    if (currentList.parentNode) {
                        currentList.parentNode.insertBefore(paragraph, currentList.nextSibling);

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
                const newLi = document.createElement('li');

                const needsTextSplit = range.startContainer.nodeType === Node.TEXT_NODE &&
                    range.startOffset < range.startContainer.textContent!.length;

                if (needsTextSplit) {
                    const beforeText = range.startContainer.textContent!.substring(0, range.startOffset);
                    const afterText = range.startContainer.textContent!.substring(range.startOffset);

                    range.startContainer.textContent = beforeText;

                    if (afterText.trim()) {
                        newLi.textContent = afterText;
                    } else {
                        newLi.innerHTML = '<br>';
                    }
                } else {
                    newLi.innerHTML = '<br>';
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
            const br = document.createElement('br');
            range.deleteContents();
            range.insertNode(br);

            const nextNode = br.nextSibling;
            if (!nextNode || (nextNode.nodeType === Node.ELEMENT_NODE && (nextNode as Element).tagName.toLowerCase() === 'br')) {
                const br2 = document.createElement('br');
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
        } catch (error) {
        }

        return;
    }

    if (event.key === 'Backspace') {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);

        const currentLi = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement?.closest('li')
            : (range.startContainer as Element)?.closest?.('li');

        if (currentLi) {
            const isAtStart = range.startOffset === 0;
            const isEmpty = currentLi.textContent?.trim() === '';

            if (isEmpty || (isAtStart && range.startContainer === currentLi)) {
                event.preventDefault();

                const currentList = currentLi.closest('ul, ol');
                if (!currentList) {
                    return;
                }

                const currentBlockquote = currentList.closest('blockquote');

                if (currentBlockquote) {
                    currentLi.remove();

                    if (currentList.children.length === 0) {
                        const br = document.createElement('br');
                        currentList.parentNode?.replaceChild(br, currentList);

                        const newRange = document.createRange();
                        newRange.setStartAfter(br);
                        newRange.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(newRange);
                    } else {
                        const br = document.createElement('br');
                        currentList.parentNode?.insertBefore(br, currentList.nextSibling);

                        const newRange = document.createRange();
                        newRange.setStartAfter(br);
                        newRange.collapse(true);
                        selection.removeAllRanges();
                        selection.addRange(newRange);
                    }
                } else {
                    currentLi.remove();

                    const div = document.createElement('div');
                    div.innerHTML = '<br>';

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

        const currentBlockquote = range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement?.closest('blockquote')
            : (range.startContainer as Element)?.closest?.('blockquote');

        if (currentBlockquote) {
            const isEmpty = currentBlockquote.textContent?.trim() === '';

            const blockquoteHtml = currentBlockquote.innerHTML;
            const endsWithBrTags = Boolean(blockquoteHtml.match(/<br\s*\/?>\s*(<br\s*\/?>)*\s*$/i));

            let shouldRemoveBlockquote = false;

            if (isEmpty) {
                shouldRemoveBlockquote = true;
            } else if (endsWithBrTags) {
                let isAtEmptyEnd = false;

                if (range.startContainer === currentBlockquote) {
                    const children = Array.from(currentBlockquote.childNodes);
                    const lastMeaningfulIndex = children.reduce((lastIndex, node, index) => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '' ||
                            (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName !== 'BR')) {
                            return index;
                        }
                        return lastIndex;
                    }, -1);

                    isAtEmptyEnd = range.startOffset > lastMeaningfulIndex;
                } else if (range.startContainer.nodeType === Node.TEXT_NODE) {
                    const textContent = range.startContainer.textContent || '';
                    const afterCursor = textContent.substring(range.startOffset);

                    isAtEmptyEnd = afterCursor.trim() === '' && endsWithBrTags;
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
                            const div = document.createElement('div');
                            div.innerHTML = '<br>';
                            parent.replaceChild(div, currentBlockquote);

                            const newRange = document.createRange();
                            newRange.setStart(div, 0);
                            newRange.collapse(true);
                            selection.removeAllRanges();
                            selection.addRange(newRange);
                        } else {
                            let cleanContent = currentBlockquote.innerHTML.replace(/<br\s*\/?>\s*(<br\s*\/?>)*\s*$/i, '');

                            currentBlockquote.innerHTML = cleanContent;

                            const newDiv = document.createElement('div');
                            newDiv.innerHTML = '<br>';

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

    if (event.key === 'Tab') {
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
                    if (['li', 'ul', 'ol'].includes(tagName)) {
                        inList = true;
                        break;
                    }
                }
                const parent = currentElement.parentNode;
                if (!parent) break;
                currentElement = parent;
            }

            if (inList && !event.shiftKey) {
                document.execCommand('indent', false);
            } else if (inList && event.shiftKey) {
                document.execCommand('outdent', false);
            } else {
                const tabSpan = document.createElement('span');
                tabSpan.style.paddingLeft = '2em';
                tabSpan.innerHTML = '\u00A0';

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
        <Label v-if="labelValue" :label-value="labelValue" :info-message="infoMessage"
            :tooltip-min-width="tooltipMinWidth" :required="required" />

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
                <Select :model-value="currentFontSize" :options="fontSizeOptions" :disabled="disabled" value-key="value"
                    label-key="label" class="font-size-select-component" @update:model-value="onFontSizeChange"
                    absolute />
            </div>

            <div class="toolbar-group">
                <Tooltip label-value="Bold (Ctrl+B)" position="bottom">
                    <Option :selected="isActive.bold" @click="execCommand('bold')" :disabled="disabled">
                        <Icon name="format_bold" />
                    </Option>
                </Tooltip>
                <Tooltip label-value="Italic (Ctrl+I)" position="bottom">
                    <Option :selected="isActive.italic" @click="execCommand('italic')" :disabled="disabled">
                        <Icon name="format_italic" />
                    </Option>
                </Tooltip>
                <Tooltip label-value="Underline (Ctrl+U)" position="bottom">
                    <Option :selected="isActive.underline" @click="execCommand('underline')" :disabled="disabled">
                        <Icon name="format_underlined" />
                    </Option>
                </Tooltip>
                <Tooltip label-value="Strikethrough" position="bottom">
                    <Option :selected="isActive.strikeThrough" @click="execCommand('strikeThrough')"
                        :disabled="disabled">
                        <Icon name="strikethrough_s" />
                    </Option>
                </Tooltip>
            </div>

            <div class="toolbar-group">
                <div class="color-button-wrapper" ref="textColorPickerRef">
                    <Tooltip label-value="Text color" position="bottom">
                        <Option @click="toggleTextColorPicker" :disabled="disabled">
                            <Icon name="format_color_text" />
                        </Option>
                    </Tooltip>
                    <div v-if="showColorPicker" class="color-picker">
                        <div class="color-picker-header">Text Color</div>
                        <div class="color-grid">
                            <div v-for="color in colorOptions" :key="color" :style="{ backgroundColor: color }"
                                :title="color" class="color-option" @click="setColor(color)" />
                        </div>
                    </div>
                </div>

                <div class="color-button-wrapper" ref="backgroundColorPickerRef">
                    <Tooltip label-value="Background color" position="bottom">
                        <Option @click="toggleBackgroundColorPicker" :disabled="disabled">
                            <Icon name="format_color_fill" />
                        </Option>
                    </Tooltip>
                    <div v-if="showBackgroundPicker" class="color-picker">
                        <div class="color-picker-header">Background Color</div>
                        <div class="color-grid">
                            <div v-for="color in colorOptions" :key="color" :style="{ backgroundColor: color }"
                                :title="color" class="color-option" @click="setColor(color, true)" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="toolbar-group">
                <Tooltip label-value="Bulleted list" position="bottom">
                    <Option :selected="isActive.insertUnorderedList" @click="execCommand('insertUnorderedList')"
                        :disabled="disabled">
                        <Icon name="format_list_bulleted" />
                    </Option>
                </Tooltip>
                <Tooltip label-value="Numbered list" position="bottom">
                    <Option :selected="isActive.insertOrderedList" @click="execCommand('insertOrderedList')"
                        :disabled="disabled">
                        <Icon name="format_list_numbered" />
                    </Option>
                </Tooltip>
            </div>

            <div class="toolbar-group">
                <Tooltip label-value="Align left" position="bottom">
                    <Option :selected="isActive.justifyLeft" @click="execCommand('justifyLeft')" :disabled="disabled">
                        <Icon name="format_align_left" />
                    </Option>
                </Tooltip>
                <Tooltip label-value="Align center" position="bottom">
                    <Option :selected="isActive.justifyCenter" @click="execCommand('justifyCenter')"
                        :disabled="disabled">
                        <Icon name="format_align_center" />
                    </Option>
                </Tooltip>
                <Tooltip label-value="Align right" position="bottom">
                    <Option :selected="isActive.justifyRight" @click="execCommand('justifyRight')" :disabled="disabled">
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
                    <Option @click="insertImage" :disabled="disabled">
                        <Icon name="image" />
                    </Option>
                </Tooltip>
                <Tooltip label-value="Quote" position="bottom">
                    <Option @click="insertBlockquote" :disabled="disabled" :selected="isInBlockquote">
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

        <div ref="editorRef" class="editor-content" :style="editorStyle" :contenteditable="!disabled"
            :placeholder="placeholder" @input="onInput" @focus="onFocus" @blur="onBlur" @keydown="onKeyDown"
            @keyup="updateActiveStates" @mouseup="updateActiveStates" role="textbox"
            :aria-label="labelValue || 'Rich text editor'" :aria-required="required" :aria-invalid="isError"
            :aria-describedby="isError ? 'error-message' : infoMessage ? 'info-message' : undefined" />


        <div v-if="showImageUpload" class="image-upload-modal">
            <div class="image-upload-content">
                <div class="image-upload-header">
                    <Icon name="image" />
                    <span>Insert Image</span>
                    <button @click="showImageUpload = false" class="close-button">
                        <Icon name="close" />
                    </button>
                </div>

                <div class="image-upload-body">
                    <FileUpload v-model="selectedImageFile" accept="image/*" placeholder="or drag an image here"
                        @update:model-value="(file: File | File[] | undefined) => handleImageUpload(Array.isArray(file) ? file[0] : file)" />
                </div>
            </div>
        </div>

        <div v-if="showImageUpload" class="modal-overlay" @click="showImageUpload = false"></div>

        <Dialog v-model="showLinkDialog" width="520px" height="fit-content">
            <Card class="link-dialog-card">
                <div class="link-dialog-header">
                    <Icon name="link" />
                    <h3>Insert Link</h3>
                </div>

                <div class="link-dialog-body">
                    <Input v-model="linkUrl" placeholder="Enter URL (e.g. https://example.com)" label-value="URL"
                        :disabled="disabled" @keydown.enter="insertLink" />

                    <Input v-model="linkText" placeholder="Link text (optional)" label-value="Link Text"
                        :disabled="disabled" @keydown.enter="insertLink" />
                </div>

                <div class="link-dialog-actions">
                    <Button @click="cancelLinkDialog" variant="secondary" size="small">
                        Cancel
                    </Button>
                    <Button @click="insertLink" variant="default" size="small" :disabled="!linkUrl.trim()">
                        Insert Link
                    </Button>
                </div>
            </Card>
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

.font-size-select-component {
    @apply min-w-[80px];
}

.color-button-wrapper {
    @apply relative;
}

.color-picker {
    @apply absolute top-full left-0 mt-xs bg-neutral-surface-highlight border border-neutral-default rounded shadow-lg z-50 min-w-[200px];
}

.color-picker-header {
    @apply px-sm py-xs text-sm font-semibold text-neutral-foreground-high bg-neutral-surface-default border-b border-neutral-default;
}

.color-grid {
    @apply p-xs grid grid-cols-6 gap-xs;
}

.color-option {
    @apply w-6 h-6 rounded cursor-pointer border-2 border-neutral-default hover:border-primary-default hover:scale-110 transition-all duration-200;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.color-option:hover {
    @apply shadow-md;
}

.color-option:active {
    @apply scale-95;
}

.color-option[style*="#ffffff"],
.color-option[style*="#cccccc"] {
    border-color: #ccc !important;
}

.color-option[style*="#ffffff"]:hover,
.color-option[style*="#cccccc"]:hover {
    border-color: var(--primary-default) !important;
}


.editor-content {
    @apply min-h-[200px] max-h-[400px] overflow-y-auto p-sm bg-transparent border border-neutral-default rounded-b-sm outline-none text-neutral-foreground-high focus:border-primary-default transition-colors;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.editor-content {
    counter-reset: list-item;
}

.editor-content :where(ul, ol) {
    list-style: revert !important;
}

.editor-content :where(li) {
    display: list-item !important;
}

.editor-content * {
    box-sizing: border-box;
}

.editor-content ul {
    list-style: disc !important;
    list-style-position: outside !important;
    padding-left: 2rem !important;
    margin-left: 0 !important;
    margin-bottom: 1rem !important;
    padding-inline-start: 2rem !important;
}

.editor-content ol {
    list-style: decimal !important;
    list-style-position: outside !important;
    padding-left: 2rem !important;
    margin-left: 0 !important;
    margin-bottom: 1rem !important;
    padding-inline-start: 2rem !important;
}

.editor-content:empty:before {
    content: attr(placeholder);
    @apply text-neutral-foreground-disabled pointer-events-none;
}

.editor-content:focus:empty:before {
    @apply hidden;
}

.editor-content div {
    @apply mb-sm;
}

.editor-content br {
    display: block;
    margin: 0.2em 0;
    line-height: 1.4;
}

.editor-content li {
    display: list-item !important;
    margin-left: 0 !important;
    margin-bottom: 0.25rem !important;
    list-style: inherit !important;
    list-style-position: outside !important;
}

.editor-content ul>li {
    list-style-type: disc !important;
}

.editor-content ol>li {
    list-style-type: decimal !important;
}

.editor-content ul ul,
.editor-content ol ol,
.editor-content ul ol,
.editor-content ol ul {
    margin-bottom: 0 !important;
    margin-top: 0.25rem !important;
    padding-left: 2rem !important;
    margin-left: 0 !important;
}

.editor-content ul ul>li {
    list-style-type: circle !important;
}

.editor-content ul ul ul>li {
    list-style-type: square !important;
}

div.rich-text-editor div.editor-content blockquote {
    border-left: 4px solid #3b82f6 !important;
    padding-left: 1rem !important;
    margin-left: 1rem !important;
    font-style: italic !important;
    background-color: #f8fafc !important;
    padding: 1rem !important;
    margin: 1rem 0 !important;
    border-radius: 0 0.25rem 0.25rem 0 !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
    position: relative !important;
}

div.rich-text-editor div.editor-content blockquote::before {
    content: '"' !important;
    font-size: 2em !important;
    color: #3b82f6 !important;
    opacity: 0.3 !important;
    position: absolute !important;
    left: -0.5em !important;
    top: -0.2em !important;
    font-family: Georgia, serif !important;
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


div.rich-text-editor div.editor-content ul {
    list-style-type: disc !important;
    padding-left: 32px !important;
    margin-left: 0 !important;
    list-style-position: outside !important;
}

div.rich-text-editor div.editor-content ol {
    list-style-type: decimal !important;
    padding-left: 32px !important;
    margin-left: 0 !important;
    list-style-position: outside !important;
}

div.rich-text-editor div.editor-content ul li,
div.rich-text-editor div.editor-content ol li {
    display: list-item !important;
    list-style: inherit !important;
    list-style-position: outside !important;
    margin-left: 0 !important;
}

div.rich-text-editor div.editor-content ul li:not([style*="list-style"])::marker {
    content: "• " !important;
}

div.rich-text-editor div.editor-content ol li:not([style*="list-style"])::marker {
    content: counter(list-item) ". " !important;
}


.link-dialog-card {
    @apply p-0 shadow-2xl;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow: hidden;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.08);
}

.link-dialog-header {
    @apply flex items-center gap-sm px-lg py-md bg-gradient-to-r from-primary-surface-hover to-primary-surface-default border-b border-neutral-default;
    margin: 0;
}

.link-dialog-header h3 {
    @apply text-xl font-semibold text-primary-foreground-high flex-1 m-0;
    line-height: 1.3;
}

.link-dialog-header .material-icons {
    @apply text-primary-foreground-high opacity-80;
    font-size: 24px;
}

.link-dialog-body {
    @apply px-lg py-lg space-y-lg;
    margin: 0;
    background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
}

.link-dialog-actions {
    @apply flex gap-sm justify-end px-lg py-md bg-neutral-surface-highlight border-t border-neutral-default;
    margin: 0;
}

.link-dialog-actions .button {
    @apply min-w-[100px] font-medium transition-all duration-200;
}

.link-dialog-actions .button:hover {
    @apply transform scale-105 shadow-md;
}

.link-dialog-actions .button:active {
    @apply transform scale-95;
}

.link-dialog-body .input-component {
    @apply transition-all duration-200;
}

.link-dialog-body .input-component:focus-within {
    @apply transform scale-[1.02] shadow-lg;
}

.link-dialog-body .input-component input {
    @apply text-base;
}

.link-dialog-body .input-component .label {
    @apply text-sm font-medium text-neutral-foreground-high;
}

.link-dialog-card {
    transform-origin: center center;
    will-change: transform, opacity;
    animation: dialogFadeIn 0.3s ease-out;
}

@keyframes dialogFadeIn {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(-20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

@media (max-width: 640px) {
    .link-dialog-card {
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 64px);
    }

    .link-dialog-header,
    .link-dialog-body,
    .link-dialog-actions {
        @apply px-md;
    }

    .link-dialog-header h3 {
        @apply text-lg;
    }

    .link-dialog-actions {
        @apply flex-col gap-xs;
    }

    .link-dialog-actions .button {
        @apply w-full min-w-0;
    }
}

.link-dialog-card:focus-within {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 1px rgba(59, 130, 246, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.link-dialog-actions .button:disabled {
    @apply opacity-60 cursor-not-allowed transform-none;
}

.link-dialog-card {
    outline: none;
}

.link-dialog-card:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

.link-dialog-header {
    background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.05) 0%,
            rgba(99, 102, 241, 0.05) 50%,
            rgba(139, 92, 246, 0.05) 100%);
    backdrop-filter: blur(8px);
}

.link-dialog-body {
    position: relative;
}

.link-dialog-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.02) 0%, transparent 50%);
    pointer-events: none;
}


.modal-overlay {
    @apply fixed inset-0 z-40;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    animation: overlayFadeIn 0.3s ease-out;
}

@keyframes overlayFadeIn {
    from {
        opacity: 0;
        backdrop-filter: blur(0px);
    }

    to {
        opacity: 1;
        backdrop-filter: blur(4px);
    }
}

.image-upload-modal {
    @apply fixed top-1/2 left-1/2 z-50;
    transform: translate(-50%, -50%);
    min-width: 500px;
    max-width: 600px;
    max-height: 90vh;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translate(-50%, -60%) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.image-upload-content {
    @apply p-0 h-full flex flex-col;
}

.image-upload-header {
    @apply flex items-center gap-sm px-lg py-md border-b border-neutral-default flex-shrink-0;
    background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.05) 0%,
            rgba(99, 102, 241, 0.05) 50%,
            rgba(139, 92, 246, 0.05) 100%);
    backdrop-filter: blur(8px);
}

.image-upload-header span {
    @apply text-xl font-semibold text-primary-foreground-high flex-1 m-0;
    line-height: 1.3;
}

.image-upload-header .material-icons {
    @apply text-primary-foreground-high opacity-80;
    font-size: 24px;
}

.close-button {
    @apply w-10 h-10 flex items-center justify-center rounded-lg border-none bg-transparent cursor-pointer transition-all duration-200;
    color: #6b7280;
}

.close-button:hover {
    @apply bg-neutral-surface-default transform scale-105;
    color: #374151;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.close-button:active {
    @apply transform scale-95;
}

.image-upload-body {
    @apply p-xl flex-1;
    background: linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%);
    position: relative;
}

.image-upload-body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, rgba(59, 130, 246, 0.02) 0%, transparent 70%);
    pointer-events: none;
}

.image-upload-body .file-upload-component {
    @apply transition-all duration-300;
    position: relative;
    z-index: 1;
}

.image-upload-body .file-upload-component:hover {
    @apply transform scale-[1.02];
}

@media (max-width: 640px) {
    .image-upload-modal {
        min-width: calc(100vw - 32px);
        max-width: calc(100vw - 32px);
        max-height: calc(100vh - 64px);
        border-radius: 8px;
    }

    .image-upload-header,
    .image-upload-body {
        @apply px-md;
    }

    .image-upload-header span {
        @apply text-lg;
    }

    .close-button {
        @apply w-8 h-8;
    }
}

.image-upload-modal:focus-within {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 2px rgba(59, 130, 246, 0.2);
}

.close-button:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

.image-upload-body.loading {
    @apply opacity-60 pointer-events-none;
}

.image-upload-body.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}
</style>
