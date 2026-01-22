import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as o,C as l,a as d}from"./index-DN5oYWrE.js";import{R as h,P as r,I as c,a,D as x,b as j,N as u}from"./RichTextEditor.stories-CE2HWrD8.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:h}),`
`,e.jsx(n.h1,{id:"name-rich-text-editor",children:"Name: Rich Text Editor"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A comprehensive WYSIWYG (What You See Is What You Get) rich text editor component with a full-featured toolbar for creating and editing formatted content."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(l,{of:r}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <RichTextEditor 
        v-model="editorContent"
        label-value="Content"
        placeholder="Start typing..."
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const editorContent = ref('')
<\/script>
`})}),`
`,e.jsx(l,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"toolbar-features",children:"Toolbar Features"}),`
`,e.jsx(n.p,{children:"The Rich Text Editor includes a comprehensive toolbar with the following features:"}),`
`,e.jsx(n.h4,{id:"history-actions",children:"History Actions"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Undo"})," - Reverses the previous action"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Redo"})," - Restores actions undone by Undo"]}),`
`]}),`
`,e.jsx(n.h4,{id:"text-formatting",children:"Text Formatting"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bold"})," - Makes text bold"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Italic"})," - Makes text italic"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Underline"})," - Underlines text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Strikethrough"})," - Strikes through text"]}),`
`]}),`
`,e.jsx(n.h4,{id:"headings",children:"Headings"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Normal Text"})," - Default paragraph format"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"H1"})," - Large heading"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"H2"})," - Medium heading"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"H3"})," - Small heading"]}),`
`]}),`
`,e.jsx(n.h4,{id:"colors",children:"Colors"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Text Color"})," - Changes text color"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Background Color"})," - Changes text background"]}),`
`]}),`
`,e.jsx(n.h4,{id:"lists",children:"Lists"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bulleted List"})," - Creates unordered lists"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Numbered List"})," - Creates ordered lists"]}),`
`]}),`
`,e.jsx(n.h4,{id:"alignment",children:"Alignment"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Left Align"})," - Left-aligns text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Center Align"})," - Center-aligns text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Right Align"})," - Right-aligns text"]}),`
`]}),`
`,e.jsx(n.h4,{id:"insert-elements",children:"Insert Elements"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Link"})," - Creates hyperlinks"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Image"})," - Inserts images"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Block Quote"})," - Creates quoted text blocks"]}),`
`]}),`
`,e.jsx(n.h4,{id:"clear-formatting",children:"Clear Formatting"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Clear Format"})," - Removes all formatting from selected text"]}),`
`]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the HTML content of the editor. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed above the editor. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"placeholder",children:"placeholder"}),`
`,e.jsxs(n.p,{children:["Placeholder text shown when editor is empty. Type: ",e.jsx(n.code,{children:"string"})]}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error styling mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message to display when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Informational message displayed with tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables editor interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"tooltip-min-width",children:"tooltip-min-width"}),`
`,e.jsxs(n.p,{children:["Minimum width for tooltip displaying info messages. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"none"'}),")"]}),`
`,e.jsx(n.h4,{id:"no-border",children:"no-border"}),`
`,e.jsxs(n.p,{children:["Removes border from editor. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(l,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"min-height",children:"min-height"}),`
`,e.jsxs(n.p,{children:["Minimum height of editor content area. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"200px"'}),")"]}),`
`,e.jsx(n.h4,{id:"max-height",children:"max-height"}),`
`,e.jsxs(n.p,{children:["Maximum height of editor content area. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"400px"'}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"undo-label",children:"#undo-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Undo button tooltip."}),`
`,e.jsx(n.h4,{id:"redo-label",children:"#redo-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Redo button tooltip."}),`
`,e.jsx(n.h4,{id:"font-size-label",children:"#font-size-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Font Size selector tooltip."}),`
`,e.jsx(n.h4,{id:"bold-label",children:"#bold-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Bold button tooltip."}),`
`,e.jsx(n.h4,{id:"italic-label",children:"#italic-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Italic button tooltip."}),`
`,e.jsx(n.h4,{id:"underline-label",children:"#underline-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Underline button tooltip."}),`
`,e.jsx(n.h4,{id:"strike-through-label",children:"#strike-through-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Strikethrough button tooltip."}),`
`,e.jsx(n.h4,{id:"color-label",children:"#color-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Text Color picker tooltip."}),`
`,e.jsx(n.h4,{id:"background-color-label",children:"#background-color-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Background Color picker tooltip."}),`
`,e.jsx(n.h4,{id:"insert-unordered-list-label",children:"#insert-unordered-list-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Bulleted List button tooltip."}),`
`,e.jsx(n.h4,{id:"insert-ordered-list-label",children:"#insert-ordered-list-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Numbered List button tooltip."}),`
`,e.jsx(n.h4,{id:"left-label",children:"#left-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Left Align button tooltip."}),`
`,e.jsx(n.h4,{id:"center-label",children:"#center-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Center Align button tooltip."}),`
`,e.jsx(n.h4,{id:"right-label",children:"#right-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Right Align button tooltip."}),`
`,e.jsx(n.h4,{id:"justify-label",children:"#justify-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Justify button tooltip."}),`
`,e.jsx(n.h4,{id:"link-label",children:"#link-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Insert Link button tooltip."}),`
`,e.jsx(n.h4,{id:"image-label",children:"#image-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Insert Image button tooltip."}),`
`,e.jsx(n.h4,{id:"blockquote-label",children:"#blockquote-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Blockquote button tooltip."}),`
`,e.jsx(n.h4,{id:"remove-format-label",children:"#remove-format-label"}),`
`,e.jsx(n.p,{children:"Custom label for the Remove Formatting button tooltip."}),`
`,e.jsx(n.h4,{id:"add-label",children:"#add-label"}),`
`,e.jsx(n.p,{children:'Custom label for the "Add" button in color picker.'}),`
`,e.jsx(n.h4,{id:"cancel-label",children:"#cancel-label"}),`
`,e.jsx(n.p,{children:'Custom label for the "Cancel" button in color picker.'}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the editor content changes. Receives the HTML content string."}),`
`,e.jsx(n.h4,{id:"focus",children:"@focus"}),`
`,e.jsx(n.p,{children:"Triggered when the editor gains focus."}),`
`,e.jsx(n.h4,{id:"blur",children:"@blur"}),`
`,e.jsx(n.p,{children:"Triggered when the editor loses focus."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Content is stored as HTML and can be styled with inline styles"}),`
`,e.jsx(n.li,{children:"All formatting is preserved when saving/loading content"}),`
`,e.jsx(n.li,{children:"Built-in accessibility features and keyboard shortcuts"}),`
`,e.jsx(n.li,{children:"Responsive design works on all screen sizes"}),`
`,e.jsx(n.li,{children:"Color picker supports custom color palettes"}),`
`,e.jsx(n.li,{children:"Toolbar buttons show active state when formatting is applied"}),`
`,e.jsx(n.li,{children:"Content area scrolls when exceeding max height"}),`
`,e.jsx(n.li,{children:"Based on native browser contentEditable with execCommand API"}),`
`]})]})}function k(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{k as default};
