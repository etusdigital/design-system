import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as c,C as i,a as l}from"./index-DN5oYWrE.js";import{C as d,P as t,R as a,A as h,D as x}from"./Checkbox.stories-DmMMcGBr.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function o(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{of:d}),`
`,e.jsx(n.h1,{id:"name-checkbox",children:"Name: Checkbox"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A checkbox input component with support for indeterminate state, flexible positioning, and accessibility features for form controls and selection interfaces."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:t}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Checkbox 
        v-model="isChecked"
        id="basic-checkbox"
        name="basic"
    >
        Test label
    </Checkbox>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isChecked = ref(false)
<\/script>
`})}),`
`,e.jsx(i,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the checkbox state. Type: ",e.jsx(n.code,{children:"boolean | null"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"id",children:"id"}),`
`,e.jsxs(n.p,{children:["HTML id attribute for the checkbox. Type: ",e.jsx(n.code,{children:"string"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"name",children:"name"}),`
`,e.jsxs(n.p,{children:["HTML name attribute for the checkbox. Type: ",e.jsx(n.code,{children:"string"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"rhs",children:"rhs"}),`
`,e.jsxs(n.p,{children:["Positions the checkbox on the right-hand side. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"allow-indeterminate",children:"allow-indeterminate"}),`
`,e.jsxs(n.p,{children:["Allows the checkbox to be in an indeterminate state. The ",e.jsx(n.code,{children:"null"})," value is treated as indeterminate. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the checkbox interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:x}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the checkbox state changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Content displayed next to the checkbox box (typically the label text)."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Checkbox v-model="isSelected" id="slot-example">
        Slot: default
    </Checkbox>
</template>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Supports three states: checked (",e.jsx(n.code,{children:"true"}),"), unchecked (",e.jsx(n.code,{children:"false"}),"), and indeterminate (",e.jsx(n.code,{children:"null"}),")"]}),`
`,e.jsx(n.li,{children:"Accessible with proper ARIA attributes and keyboard navigation (Space key)"}),`
`,e.jsxs(n.li,{children:["Label automatically associates with checkbox when ",e.jsx(n.code,{children:"id"})," or ",e.jsx(n.code,{children:"name"})," is provided"]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"rhs"})," prop for right-aligned layouts (common in settings interfaces)"]}),`
`,e.jsx(n.li,{children:"Indeterminate state is useful for parent-child checkbox relationships"}),`
`]})]})}function v(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(o,{...s})}):o(s)}export{v as default};
