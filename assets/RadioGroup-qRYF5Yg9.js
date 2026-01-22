import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as l,C as s,a as d}from"./index-DMV-UF4P.js";import{R as c,P as r,V as a,D as h}from"./RadioGroup.stories-D2YktQNo.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function i(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
`,e.jsx(n.h1,{id:"name-radiogroup",children:"Name: RadioGroup"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A container component for grouping related input components with synchronized selection state, commonly used for radio button groups and visual component grouping."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:r}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <RadioGroup v-model="selectedValue" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref('option1')
const options = ref([...])
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the currently selected component's group-value. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"null"}),")"]}),`
`,e.jsx(n.h4,{id:"vertical",children:"vertical"}),`
`,e.jsxs(n.p,{children:["Arranges grouped components vertically instead of horizontally. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables all grouped components. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of objects or primitive values to render as radio options. Type: ",e.jsx(n.code,{children:"any[]"})," (required)"]}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name to use as display label when options are objects. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsxs(n.p,{children:["Property name to use as option value when options are objects. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["Whether to emit the full object instead of just the value when selection changes. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the selection changes within the group."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsxs(n.p,{children:["This component uses ",e.jsx(n.code,{children:"Radio"})," internally and doesn't expose custom slots."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Model value synchronization works bidirectionally between RadioGroup and child components"}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"vertical"})," prop to change layout orientation for all grouped components"]}),`
`]})]})}function v(o={}){const{wrapper:n}={...t(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(i,{...o})}):i(o)}export{v as default};
