import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as o}from"./index-D2LXvqQ0.js";import{M as d,C as s,a}from"./index-DN5oYWrE.js";import{R as l,P as r,D as c,O as h}from"./Radio.stories-DsjILEiL.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function t(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:l}),`
`,e.jsx(n.h1,{id:"name-radio",children:"Name: Radio"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A radio button component with support for groups, visual variants, and accessibility features for single-choice selection scenarios."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:r}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Radio 
        v-model="isSelected"
        name="radioGroup"
    >
      Test radio
    </Radio>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isSelected = ref(false)
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the radio button selection state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"id",children:"id"}),`
`,e.jsxs(n.p,{children:["Unique identifier for the radio button element. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"name",children:"name"}),`
`,e.jsxs(n.p,{children:["Name attribute for form grouping and accessibility. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"group-value",children:"group-value"}),`
`,e.jsxs(n.p,{children:["Value used when radio is part of a Group component. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables radio button interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"variant",children:"variant"}),`
`,e.jsxs(n.p,{children:["Visual styling variant for different contexts. Type: ",e.jsx(n.code,{children:"'default' | 'onboarding'"})," (default: ",e.jsx(n.code,{children:'"default"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the radio button selection state changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Content displayed next to the radio button circle."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Radio v-model="selected" name="options">
       Slot: default
    </Radio>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref(false)
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Automatically integrates with Group component for grouped radio selections"}),`
`,e.jsx(n.li,{children:"Supports keyboard navigation with Space key activation"}),`
`,e.jsx(n.li,{children:"Provides proper ARIA attributes for screen reader accessibility"}),`
`,e.jsx(n.li,{children:"Label element automatically associates with input when name/id is provided"}),`
`,e.jsx(n.li,{children:"Onboarding variant provides larger sizing for better visibility in guided flows"}),`
`,e.jsx(n.li,{children:"Disabled state prevents interaction while maintaining visual feedback"}),`
`,e.jsx(n.li,{children:"Single radio buttons behave as toggles, while grouped radios enforce single selection"}),`
`]})]})}function b(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{b as default};
