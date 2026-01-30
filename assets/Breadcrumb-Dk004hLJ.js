import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as a,C as s,a as d}from"./index-CCS_Va9-.js";import{B as l,P as i}from"./Breadcrumb.stories-DfYMQ79v.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function o(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l}),`
`,e.jsx(n.h1,{id:"name-breadcrumb",children:"Name: Breadcrumb"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A navigation breadcrumb component with intelligent truncation, expandable overflow menus, and smart positioning for displaying hierarchical page structures and navigation paths."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:i}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Breadcrumb 
        v-model="currentPage"
        :options="navigationPath"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref("Settings")
const navigationPath = ["Home", "Dashboard", "Profile", "Settings"]
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the currently selected breadcrumb option. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of breadcrumb navigation options. Can be strings or objects. Type: ",e.jsx(n.code,{children:"any[]"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name used for displaying option labels when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsxs(n.p,{children:["Property name used for option values when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["Returns complete objects instead of just values when enabled. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsxs(n.p,{children:["Triggered when a breadcrumb option is clicked. Receives the selected value based on ",e.jsx(n.code,{children:"get-object"})," setting."]}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses internal rendering for breadcrumb options and doesn't expose custom slots."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Intelligent truncation algorithm shows first, last, and options around current selection"}),`
`,e.jsx(n.li,{children:'Expandable "more" menus with smart viewport positioning to prevent overflow'}),`
`,e.jsx(n.li,{children:"Automatic scroll detection and menu dismissal for better user experience"}),`
`,e.jsx(n.li,{children:"Portal rendering for overflow menus prevents z-index conflicts and ensures proper layering"}),`
`,e.jsx(n.li,{children:"Smooth animations for menu open/close transitions with optimal timing"}),`
`,e.jsx(n.li,{children:"Click-outside handling with scroll-aware behavior for intuitive menu management"}),`
`,e.jsx(n.li,{children:"Responsive design adapts breadcrumb display based on available space and content length"}),`
`,e.jsx(n.li,{children:"Accessibility support with proper navigation semantics and keyboard interaction patterns"}),`
`]})]})}function b(r={}){const{wrapper:n}={...t(),...r.components};return n?e.jsx(n,{...r,children:e.jsx(o,{...r})}):o(r)}export{b as default};
