import { useRef, useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useControllable } from '../../hooks/useControllable';
import { isValidUrl } from '../../utils';
import { Label } from '../../utils/components/Label';
import { Icon } from '../Icon';
import { Select } from '../Select';
import { Colors } from './Colors';
import { Dialog } from '../Dialog';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import styles from './RichTextEditor.module.css';

interface RichTextEditorProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  labelValue?: string;
  errorMessage?: string;
  hasError?: boolean;
  infoMessage?: string;
  required?: boolean;
  minHeight?: string;
  maxHeight?: string;
  noBorder?: boolean;
  className?: string;
}

const ALLOWED_TAGS = ['b', 'i', 'u', 'strong', 'em', 'br', 'div', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'span', 'font'];
const ALLOWED_ATTRS = ['style', 'href', 'src', 'alt', 'title', 'color'];

const FONT_SIZES = Array.from({ length: 10 }, (_, i) => i * 4 + 12);

function sanitizeHTML(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const cleanBody = document.createElement('div');

  for (const child of Array.from(doc.body.childNodes)) {
    const clean = cleanNode(child);
    if (clean) cleanBody.appendChild(clean);
  }
  return cleanBody.innerHTML;
}

function cleanNode(node: Node): Node | null {
  if (node.nodeType === Node.TEXT_NODE) return node;
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  if (!ALLOWED_TAGS.includes(tag)) return document.createTextNode(el.textContent || '');

  const clean = document.createElement(tag);
  for (const attr of Array.from(el.attributes)) {
    if (ALLOWED_ATTRS.includes(attr.name)) clean.setAttribute(attr.name, attr.value);
  }
  for (const child of Array.from(el.childNodes)) {
    const c = cleanNode(child);
    if (c) clean.appendChild(c);
  }
  return clean;
}

function compressHTML(html: string): string {
  return html.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
}

export function RichTextEditor({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  labelValue,
  errorMessage,
  hasError = false,
  infoMessage,
  required = false,
  minHeight = '200px',
  maxHeight = '400px',
  noBorder = false,
  className,
}: RichTextEditorProps) {
  const [currentValue, setValue] = useControllable<string>({
    value,
    defaultValue: defaultValue ?? '',
    onChange,
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<Range | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const isRestoringHistoryRef = useRef(false);

  const [isFocused, setIsFocused] = useState(false);
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>({});
  const [currentFontSize, setCurrentFontSize] = useState(16);

  // Color states
  const [foreColor, setForeColor] = useState('#000000');
  const [foreColorExpanded, setForeColorExpanded] = useState(false);
  const [backColor, setBackColor] = useState('#ffffff');
  const [backColorExpanded, setBackColorExpanded] = useState(false);
  const [customColors, setCustomColors] = useState<string[]>([]);

  // Link dialog
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  // ─── History ──────────────────────────────────────
  const saveToHistory = useCallback((content: string) => {
    if (isRestoringHistoryRef.current) return;
    const compressed = compressHTML(content);
    if (historyRef.current[historyIndexRef.current] === compressed) return;

    if (historyIndexRef.current < historyRef.current.length - 1)
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);

    historyRef.current.push(compressed);
    historyIndexRef.current = historyRef.current.length - 1;

    if (historyRef.current.length > 50) {
      historyRef.current.shift();
      historyIndexRef.current--;
    }
  }, []);

  // ─── Selection save/restore ───────────────────────
  function saveCurrentSelection() {
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      if (editorRef.current?.contains(range.commonAncestorContainer))
        savedSelectionRef.current = range.cloneRange();
    } catch {
      savedSelectionRef.current = null;
    }
  }

  function restoreSavedSelection() {
    try {
      const selection = window.getSelection();
      if (!savedSelectionRef.current || !editorRef.current || !selection) return;
      editorRef.current.focus();
      selection.removeAllRanges();
      const range = savedSelectionRef.current;
      if (editorRef.current.contains(range.commonAncestorContainer))
        selection.addRange(range);
      else {
        const newRange = document.createRange();
        newRange.setStart(editorRef.current, 0);
        newRange.collapse(true);
        selection.addRange(newRange);
      }
    } catch {
      savedSelectionRef.current = null;
    }
  }

  function isSelectionWithinEditor(selection?: Selection | null): boolean {
    if (!editorRef.current || !selection || selection.rangeCount === 0) return false;
    try {
      const range = selection.getRangeAt(0);
      return (
        editorRef.current.contains(range.startContainer) &&
        editorRef.current.contains(range.endContainer) &&
        editorRef.current.contains(range.commonAncestorContainer)
      );
    } catch {
      return false;
    }
  }

  // ─── Active state ─────────────────────────────────
  const updateActiveStates = useCallback(() => {
    setActiveStates({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      justifyFull: document.queryCommandState('justifyFull'),
    });

    // Font size detection
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !editorRef.current) return;
    let currentNode: Node | null = selection.getRangeAt(0).startContainer;
    let fontSizeFound = false;
    while (currentNode && currentNode !== editorRef.current) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        const computedStyle = window.getComputedStyle(currentNode as HTMLElement);
        const fontSize = parseInt(computedStyle.fontSize);
        const match = FONT_SIZES.find((s) => Math.abs(s - fontSize) <= 1);
        if (match) {
          setCurrentFontSize(match);
          fontSizeFound = true;
          break;
        }
      }
      currentNode = currentNode.parentNode;
    }
    if (!fontSizeFound) setCurrentFontSize(16);
  }, []);

  // ─── Style helpers ────────────────────────────────
  function setListStyles() {
    if (!editorRef.current) return;
    const spacing = getComputedStyle(editorRef.current).getPropertyValue('--spacing-base');
    editorRef.current.querySelectorAll('ul, ol').forEach((list) => {
      const el = list as HTMLElement;
      el.style.listStyleType = list.tagName.toLowerCase() === 'ul' ? 'disc' : 'decimal';
      el.style.paddingLeft = spacing;
      el.style.listStylePosition = 'outside';
    });
    editorRef.current.querySelectorAll('li').forEach((li) => {
      (li as HTMLElement).style.display = 'list-item';
      (li as HTMLElement).style.listStylePosition = 'outside';
    });
  }

  function addBlockquoteStyles(blockquotes: HTMLElement[]) {
    if (!editorRef.current || !blockquotes.length) return;
    const cs = getComputedStyle(editorRef.current);
    const borderWidth = cs.getPropertyValue('--border-width-sm');
    const borderColor = cs.getPropertyValue('--primary-border-default');
    const bgColor = cs.getPropertyValue('--primary-surface-default');
    const spacing = cs.getPropertyValue('--spacing-base');
    const spacingXxs = cs.getPropertyValue('--spacing-xxs');
    const borderRadius = cs.getPropertyValue('--border-radius-sm');

    blockquotes.forEach((bq) => {
      bq.style.borderLeft = `${borderWidth} solid ${borderColor}`;
      bq.style.fontStyle = 'italic';
      bq.style.backgroundColor = bgColor;
      bq.style.padding = spacing;
      bq.style.margin = `${spacingXxs} 0`;
      bq.style.borderRadius = `0 ${borderRadius} ${borderRadius} 0`;
      bq.style.position = 'relative';
    });
  }

  function applyContentStyles() {
    requestAnimationFrame(() => {
      if (!editorRef.current) return;
      setListStyles();
      const bqs = editorRef.current.querySelectorAll('blockquote');
      if (bqs.length) addBlockquoteStyles(Array.from(bqs) as HTMLElement[]);
    });
  }

  // ─── Mount ────────────────────────────────────────
  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = sanitizeHTML(currentValue ?? '');
    applyContentStyles();
    saveToHistory(currentValue ?? '');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Controlled sync
  useEffect(() => {
    if (!editorRef.current || editorRef.current.innerHTML === value) return;
    editorRef.current.innerHTML = sanitizeHTML(value ?? '');
    applyContentStyles();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── execCommand wrapper ──────────────────────────
  function execFormatCommand(command: string, cmdValue?: string) {
    const selection = window.getSelection();
    if (disabled || !editorRef.current || !isSelectionWithinEditor(selection)) return;

    restoreSavedSelection();
    try {
      document.execCommand(command, false, cmdValue);
    } catch { /* ignore */ }

    editorRef.current?.focus();
    updateActiveStates();

    if (command === 'insertUnorderedList' || command === 'insertOrderedList')
      setTimeout(() => setListStyles());

    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setValue(html);
      saveToHistory(html);
    }
  }

  // ─── Font size ────────────────────────────────────
  function handleFontSizeUpdate(fontSize: any) {
    if (disabled || !editorRef.current) return;
    const size = typeof fontSize === 'object' ? fontSize.value : fontSize;

    restoreSavedSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);

    if (range.collapsed) {
      const span = document.createElement('span');
      span.style.fontSize = size + 'px';
      span.textContent = '\u200B';
      range.insertNode(span);
      range.setStartAfter(span);
      range.collapse(true);
    } else {
      const contents = range.extractContents();
      const span = document.createElement('span');
      span.style.fontSize = size + 'px';
      span.appendChild(contents);
      range.insertNode(span);
      range.selectNodeContents(span);
    }

    selection.removeAllRanges();
    selection.addRange(range);
    editorRef.current.focus();
    setCurrentFontSize(size);

    const html = editorRef.current.innerHTML;
    setValue(html);
    saveToHistory(html);
    updateActiveStates();
  }

  // ─── Color ────────────────────────────────────────
  function handleColorCommand(color: string, command: string) {
    const selection = window.getSelection();
    if (!selection || disabled || !editorRef.current) return;

    restoreSavedSelection();
    try {
      document.execCommand(command, false, color);
    } catch { /* ignore */ }

    editorRef.current.focus();
    const html = editorRef.current.innerHTML;
    setValue(html);
    saveToHistory(html);
    updateActiveStates();
  }

  // ─── Undo/Redo ────────────────────────────────────
  function undoAction() {
    if (historyIndexRef.current <= 0 || !editorRef.current) return;
    isRestoringHistoryRef.current = true;
    historyIndexRef.current--;
    const content = historyRef.current[historyIndexRef.current];
    editorRef.current.innerHTML = content;
    setValue(content);
    isRestoringHistoryRef.current = false;
    editorRef.current.focus();
    updateActiveStates();
  }

  function redoAction() {
    if (historyIndexRef.current >= historyRef.current.length - 1 || !editorRef.current) return;
    isRestoringHistoryRef.current = true;
    historyIndexRef.current++;
    const content = historyRef.current[historyIndexRef.current];
    editorRef.current.innerHTML = content;
    setValue(content);
    isRestoringHistoryRef.current = false;
    editorRef.current.focus();
    updateActiveStates();
  }

  // ─── Link ─────────────────────────────────────────
  function handleCreateLink() {
    if (disabled) return;
    saveCurrentSelection();
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && isFocused) setLinkText(selection.toString());
    else setLinkText('');
    setShowLinkDialog(true);
  }

  function handleInsertLink() {
    if (!linkUrl.trim() || !isValidUrl(linkUrl.trim())) return;

    try {
      restoreSavedSelection();
      const selection = window.getSelection();
      if (!selection || !editorRef.current) return;

      let range: Range;
      if (selection.rangeCount === 0) {
        range = document.createRange();
        if (editorRef.current.lastChild) range.setStartAfter(editorRef.current.lastChild);
        else range.setStart(editorRef.current, 0);
        range.collapse(true);
      } else {
        range = selection.getRangeAt(0);
      }

      const link = document.createElement('a');
      link.href = linkUrl.trim();
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = linkText.trim() || linkUrl.trim();

      if (!range.collapsed) range.deleteContents();
      range.insertNode(link);
      range.setStartAfter(link);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      setShowLinkDialog(false);
      setLinkUrl('');
      setLinkText('');

      editorRef.current.focus();
      const html = editorRef.current.innerHTML;
      setValue(html);
      saveToHistory(html);
      updateActiveStates();
    } catch { /* ignore */ }
  }

  // ─── Image ────────────────────────────────────────
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !editorRef.current) return;

    Array.from(files).forEach((file) => {
      if (!editorRef.current) return;
      try {
        const imageUrl = URL.createObjectURL(file);
        restoreSavedSelection();
        const selection = window.getSelection();
        if (!selection) return;

        let range: Range;
        if (selection.rangeCount === 0) {
          range = document.createRange();
          if (editorRef.current.lastChild) range.setStartAfter(editorRef.current.lastChild);
          else range.setStart(editorRef.current, 0);
          range.collapse(true);
        } else {
          range = selection.getRangeAt(0);
        }

        const img = document.createElement('img');
        const cs = getComputedStyle(editorRef.current);
        img.src = imageUrl;
        img.alt = file.name;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        img.style.borderRadius = cs.getPropertyValue('--border-radius-sm');
        img.style.margin = cs.getPropertyValue('--spacing-base');

        if (!range.collapsed) range.deleteContents();
        range.insertNode(img);
        range.setStartAfter(img);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        editorRef.current.focus();
        const html = editorRef.current.innerHTML;
        setValue(html);
        saveToHistory(html);
        updateActiveStates();
      } catch { /* ignore */ }
    });

    // Reset input
    e.target.value = '';
  }

  // ─── Blockquote ───────────────────────────────────
  function handleInsertBlockquote() {
    if (disabled || !editorRef.current) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    try {
      const range = selection.getRangeAt(0);
      const existingBq = range.startContainer.nodeType === Node.TEXT_NODE
        ? (range.startContainer.parentElement as HTMLElement)?.closest('blockquote')
        : (range.startContainer as Element)?.closest?.('blockquote');

      if (existingBq) {
        const parent = existingBq.parentNode;
        if (!parent) return;
        const div = document.createElement('div');
        div.innerHTML = existingBq.innerHTML;
        parent.replaceChild(div, existingBq);
        const newRange = document.createRange();
        newRange.selectNodeContents(div);
        selection.removeAllRanges();
        selection.addRange(newRange);
      } else {
        const blockquote = document.createElement('blockquote');
        addBlockquoteStyles([blockquote]);
        if (range.collapsed) blockquote.innerHTML = 'Type your quote here...';
        else {
          const contents = range.extractContents();
          if (contents.childNodes.length === 1 && contents.firstChild?.nodeType === Node.TEXT_NODE) {
            const span = document.createElement('span');
            span.appendChild(contents);
            blockquote.appendChild(span);
          } else {
            blockquote.appendChild(contents);
          }
        }
        range.insertNode(blockquote);
        const newRange = document.createRange();
        newRange.selectNodeContents(blockquote);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }

      editorRef.current.focus();
      const html = editorRef.current.innerHTML;
      setValue(html);
      saveToHistory(html);
      updateActiveStates();
    } catch { /* ignore */ }
  }

  // ─── onInput ──────────────────────────────────────
  function handleInput() {
    if (isRestoringHistoryRef.current || !editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setValue(html);
    saveToHistory(html);
    updateActiveStates();
  }

  // ─── onKeyDown ────────────────────────────────────
  function handleKeyDown(event: React.KeyboardEvent) {
    if (disabled) return;

    if (event.ctrlKey && !event.shiftKey && event.key === 'z') {
      event.preventDefault();
      undoAction();
      return;
    }
    if (event.ctrlKey && ((event.shiftKey && event.key === 'Z') || event.key === 'y')) {
      event.preventDefault();
      redoAction();
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);

      let currentNode: Node | null = range.startContainer;
      let inList = false;
      while (currentNode && currentNode !== editorRef.current) {
        if (currentNode.nodeType === Node.ELEMENT_NODE) {
          const tag = (currentNode as Element).tagName?.toLowerCase();
          if (['li', 'ul', 'ol'].includes(tag)) { inList = true; break; }
        }
        currentNode = currentNode.parentNode;
      }

      if (inList && !event.shiftKey) document.execCommand('indent', false);
      else if (inList && event.shiftKey) document.execCommand('outdent', false);
      else if (!event.shiftKey) {
        const tab = document.createElement('span');
        tab.classList.add('tab');
        tab.innerHTML = '\t';
        range.deleteContents();
        range.insertNode(tab);
        range.setStartAfter(tab);
      }
    }

    if (['Enter', 'Tab', 'Backspace'].includes(event.key)) {
      handleInput();
      updateActiveStates();
    }
  }

  function handleFocus() {
    setIsFocused(true);
    updateActiveStates();
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handlePaste(event: React.ClipboardEvent) {
    if (disabled) return;
    const selection = window.getSelection();
    if (!isSelectionWithinEditor(selection)) event.preventDefault();
  }

  // ─── Toolbar button helper ────────────────────────
  function toolbarBtn(
    command: string,
    icon: string,
    title: string,
    action?: () => void
  ) {
    return (
      <Tooltip position="bottom" labelValue={title}>
        <button
          key={command}
          className={clsx(styles.toolbarBtn, activeStates[command] && styles.toolbarBtnActive)}
          title={title}
          onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
          onClick={() => action ? action() : execFormatCommand(command)}
        >
          <Icon name={icon} className={styles.richTextEditorIcon} />
        </button>
      </Tooltip>
    );
  }

  const editorClasses = clsx(
    styles.richTextEditor,
    'rich-text-editor',
    isFocused && styles.focus,
    disabled && styles.disabled,
    hasError && styles.error,
    noBorder && styles.noBorder,
    className,
  );

  return (
    <div className={editorClasses}>
      {labelValue && (
        <Label
          labelValue={labelValue}
          infoMessage={infoMessage}
          required={required}
          className="mb-xxs"
        />
      )}

      <div className={styles.toolbar}>
        {/* Undo/Redo */}
        <div className={styles.toolbarGroup}>
          <button
            className={styles.toolbarBtn}
            title="Undo (Ctrl+Z)"
            disabled={historyIndexRef.current <= 0}
            onMouseDown={(e) => e.preventDefault()}
            onClick={undoAction}
          >
            <Icon name="undo" className={styles.richTextEditorIcon} />
          </button>
          <button
            className={styles.toolbarBtn}
            title="Redo (Ctrl+Y)"
            disabled={historyIndexRef.current >= historyRef.current.length - 1}
            onMouseDown={(e) => e.preventDefault()}
            onClick={redoAction}
          >
            <Icon name="redo" className={styles.richTextEditorIcon} />
          </button>
        </div>

        {/* Font size */}
        <div className={styles.toolbarGroup}>
          <Select
            value={currentFontSize}
            onChange={handleFontSizeUpdate}
            options={FONT_SIZES.map((s) => ({ label: String(s), value: s }))}
            disabled={disabled}
          />
        </div>

        {/* Font style */}
        <div className={styles.toolbarGroup}>
          {toolbarBtn('bold', 'format_bold', 'Bold (Ctrl+B)')}
          {toolbarBtn('italic', 'format_italic', 'Italic (Ctrl+I)')}
          {toolbarBtn('underline', 'format_underlined', 'Underline (Ctrl+U)')}
          {toolbarBtn('strikeThrough', 'strikethrough_s', 'Strikethrough')}
        </div>

        {/* Colors */}
        <div className={styles.toolbarGroup}>
          <Colors
            value={foreColor}
            expanded={foreColorExpanded}
            custom={customColors}
            onValueChange={(color) => {
              setForeColor(color);
              handleColorCommand(color, 'foreColor');
            }}
            onExpandedChange={(expanded) => {
              if (expanded) saveCurrentSelection();
              setForeColorExpanded(expanded);
            }}
            onCustomChange={setCustomColors}
          >
            <button
              className={styles.toolbarBtn}
              title="Text color"
              onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
              onClick={() => setForeColorExpanded(!foreColorExpanded)}
            >
              <Icon name="format_color_text" className={styles.richTextEditorIcon} />
            </button>
          </Colors>
          <Colors
            value={backColor}
            expanded={backColorExpanded}
            custom={customColors}
            onValueChange={(color) => {
              setBackColor(color);
              handleColorCommand(color, 'backColor');
            }}
            onExpandedChange={(expanded) => {
              if (expanded) saveCurrentSelection();
              setBackColorExpanded(expanded);
            }}
            onCustomChange={setCustomColors}
          >
            <button
              className={styles.toolbarBtn}
              title="Background color"
              onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
              onClick={() => setBackColorExpanded(!backColorExpanded)}
            >
              <Icon name="format_color_fill" className={styles.richTextEditorIcon} />
            </button>
          </Colors>
        </div>

        {/* Lists */}
        <div className={styles.toolbarGroup}>
          {toolbarBtn('insertUnorderedList', 'format_list_bulleted', 'Bulleted list')}
          {toolbarBtn('insertOrderedList', 'format_list_numbered', 'Numbered list')}
        </div>

        {/* Alignment */}
        <div className={styles.toolbarGroup}>
          {toolbarBtn('justifyLeft', 'format_align_left', 'Align left')}
          {toolbarBtn('justifyCenter', 'format_align_center', 'Align center')}
          {toolbarBtn('justifyRight', 'format_align_right', 'Align right')}
          {toolbarBtn('justifyFull', 'format_align_justify', 'Justify')}
        </div>

        {/* Insert elements */}
        <div className={styles.toolbarGroup}>
          {toolbarBtn('createLink', 'link', 'Insert link', handleCreateLink)}
          <button
            className={styles.toolbarBtn}
            title="Insert image"
            onMouseDown={(e) => { e.preventDefault(); saveCurrentSelection(); }}
          >
            <Icon name="image" className={styles.richTextEditorIcon} />
            <input
              type="file"
              accept="image/*"
              className={styles.imageInput}
              onChange={handleImageUpload}
            />
          </button>
          {toolbarBtn('insertBlockquote', 'format_quote', 'Quote', handleInsertBlockquote)}
        </div>

        {/* Remove formatting */}
        <div className={styles.toolbarGroup}>
          {toolbarBtn('removeFormat', 'format_clear', 'Remove formatting')}
        </div>
      </div>

      <div
        ref={editorRef}
        className={styles.editorContent}
        role="textbox"
        style={{ minHeight, maxHeight }}
        contentEditable={!disabled}
        data-placeholder={placeholder}
        aria-label={labelValue}
        aria-required={required}
        aria-invalid={hasError}
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onKeyUp={updateActiveStates}
        onMouseUp={updateActiveStates}
        onPaste={handlePaste}
      />

      {/* Link Dialog */}
      <Dialog value={showLinkDialog} onChange={setShowLinkDialog}>
          <div className={styles.linkDialogContent}>
            <input
              type="text"
              placeholder="URL (e.g. https://example.com)"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleInsertLink(); }}
              className={styles.linkInput}
              autoFocus
            />
            <input
              type="text"
              placeholder="Link text (optional)"
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleInsertLink(); }}
              className={styles.linkInput}
            />
            <div className={styles.linkDialogActions}>
              <Button
                className={styles.linkCancelBtn}
                variant="plain"
                color="neutral"
                onClick={() => { setShowLinkDialog(false); setLinkUrl(''); setLinkText(''); }}
              >
                Cancel
              </Button>
              <Button
                className={styles.linkInsertBtn}
                disabled={!linkUrl.trim()}
                onClick={handleInsertLink}
              >
                Insert Link
              </Button>
            </div>
          </div>
      </Dialog>

      {hasError && errorMessage && (
        <small className={styles.errorMessage}>{errorMessage}</small>
      )}
    </div>
  );
}
