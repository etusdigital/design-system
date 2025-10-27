import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as a,C as o,a as l}from"./index-qxoUpuLt.js";import{T as d,P as r,O as c,I as h,N as p}from"./Tab.stories-CDLVWK5C.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CEhHUQ6Y.js";function i(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(n.h1,{id:"name-tab",children:"Name: Tab"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A tab navigation component with support for text and icon modes, flexible sizing, and card or plain styling variants for organizing content sections."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(o,{of:r}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tab 
        v-model="selectedTab"
        :options="tabs"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedTab = ref(null)
const tabs = [...]
<\/script>
`})}),`
`,e.jsx(o,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the currently selected tab. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of tab options. Can be strings or objects with label, value, and icon properties. Type: ",e.jsx(n.code,{children:"any[]"})," (required)"]}),`
`,e.jsx(o,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name used for displaying option labels when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsxs(n.p,{children:["Property name used for option values when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"is-icon",children:"is-icon"}),`
`,e.jsxs(n.p,{children:["Displays icons instead of text labels. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"not-card",children:"not-card"}),`
`,e.jsxs(n.p,{children:["Removes card wrapper styling for a plain appearance. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:p}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the selected tab changes. Receives the selected tab option."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses internal rendering for tab options and doesn't expose custom slots."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Automatically selects the first tab if no initial value is provided"}),`
`,e.jsx(n.li,{children:"Supports both string arrays and object arrays with configurable properties"}),`
`,e.jsx(n.li,{children:"Icon mode displays Material Icons by name"}),`
`,e.jsx(n.li,{children:"Card styling provides elevated appearance with background and shadow"}),`
`,e.jsx(n.li,{children:"Plain styling (not-card) offers minimal visual styling for inline use"}),`
`,e.jsx(n.li,{children:"Responsive design adapts tab widths based on content and container"}),`
`,e.jsx(n.li,{children:"Smooth hover effects and active state transitions for better user experience"}),`
`]})]})}function v(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(i,{...s})}):i(s)}export{v as default};
