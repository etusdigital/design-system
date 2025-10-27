import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as a}from"./index-D2LXvqQ0.js";import{M as l,C as r,a as o}from"./index-qxoUpuLt.js";import{T as d,P as s,M as c,I as h,a as x,D as j,R as p,b as u}from"./Textarea.stories-DLxuX6Nl.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CEhHUQ6Y.js";function t(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(n.h1,{id:"name-textarea",children:"Name: Textarea"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A versatile textarea component for multi-line text input with character counting, validation, and customization options for form data collection."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(r,{of:s}),`
`,e.jsx(o,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Textarea 
        v-model="textareaValue"
        label-value="Message"
        placeholder="Enter your message..."
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const textareaValue = ref('')
<\/script>
`})}),`
`,e.jsx(r,{sourceState:"none",of:s}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the textarea value. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed above the textarea. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"max",children:"max"}),`
`,e.jsxs(n.p,{children:["Maximum character limit for textarea. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error styling mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message to display when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Informational message displayed with tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables textarea interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"placeholder",children:"placeholder"}),`
`,e.jsxs(n.p,{children:["Placeholder text for the textarea. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"text-align",children:"text-align"}),`
`,e.jsxs(n.p,{children:["Text alignment within textarea. Type: ",e.jsx(n.code,{children:"'start' | 'center' | 'end'"})," (default: ",e.jsx(n.code,{children:'"start"'}),")"]}),`
`,e.jsx(r,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"tooltip-min-width",children:"tooltip-min-width"}),`
`,e.jsxs(n.p,{children:["Minimum width for info tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"none"'}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the textarea value changes."}),`
`,e.jsx(n.h4,{id:"focus",children:"@focus"}),`
`,e.jsx(n.p,{children:"Triggered when the textarea gains focus. Receives the current value."}),`
`,e.jsx(n.h4,{id:"blur",children:"@blur"}),`
`,e.jsx(n.p,{children:"Triggered when the textarea loses focus. Receives the current value."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Multi-line text input with automatic resizing based on content"}),`
`,e.jsx(n.li,{children:"Character limit validation with real-time counter display"}),`
`,e.jsx(n.li,{children:"Comprehensive error handling and visual feedback"}),`
`,e.jsx(n.li,{children:"Text alignment options (start, center, end)"}),`
`,e.jsx(n.li,{children:"Responsive sizing options from extra small to full width"}),`
`,e.jsx(n.li,{children:"Built-in accessibility features and keyboard navigation"}),`
`,e.jsx(n.li,{children:"Support for required field validation"}),`
`,e.jsx(n.li,{children:"Info tooltips for additional context"}),`
`]})]})}function M(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{M as default};
