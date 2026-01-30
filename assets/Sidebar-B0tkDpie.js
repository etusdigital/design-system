import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as a,C as o,a as d}from"./index-CCS_Va9-.js";import{S as l,P as t,E as c}from"./Sidebar.stories-mM8l60s2.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function s(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l}),`
`,e.jsx(n.h1,{id:"name-sidebar",children:"Name: Sidebar"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A vertical navigation sidebar component with expandable/collapsible layout, icon support, and flexible routing integration for building application sidebars and navigation systems."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(o,{of:t}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <div class="h-screen flex">
        <Sidebar 
            v-model="selectedOption"
            :expanded="isExpanded"
            :options="sidebarOptions"
        />
        <main class="flex-1 p-base">
            <h1>Selected: {{ selectedOption }}</h1>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedOption = ref("dashboard")
const isExpanded = ref(true)
const sidebarOptions = ref([...])
<\/script>
`})}),`
`,e.jsx(o,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected sidebar option value or object. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"expanded",children:"expanded"}),`
`,e.jsxs(n.p,{children:["Controls whether the sidebar is expanded to show labels. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of sidebar options with navigation and display properties. Type: ",e.jsx(n.code,{children:"Option[]"})," (required)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`type Option = {
  label: string;       // Display text for the sidebar option
  value: string;       // Unique identifier for the option
  icon?: string;       // Icon name to display
  path?: string;       // Navigation path/route
  disabled?: boolean;  // Whether the option is disabled
  bottom?: boolean;    // Whether to position at bottom of sidebar
  options?: Option[];  // Nested sidebar options
}
`})}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["Returns the complete option object instead of just the value. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsxs(n.p,{children:["Triggered when a sidebar option is selected. Receives either the option value or complete object based on ",e.jsx(n.code,{children:"get-object"})," prop."]}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses internal SidebarOption components and doesn't expose custom slots for option rendering."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Automatic routing integration with Vue Router and Nuxt Link detection"}),`
`,e.jsx(n.li,{children:"Responsive height calculation based on navbar presence for optimal layout"}),`
`,e.jsx(n.li,{children:"Icon-only mode when collapsed with tooltip support for better UX"}),`
`,e.jsx(n.li,{children:"Bottom positioning support for logout, settings, and help options"}),`
`,e.jsx(n.li,{children:"Disabled state prevents interaction while maintaining visual consistency"}),`
`,e.jsx(n.li,{children:"Path normalization ensures proper navigation regardless of input format"}),`
`,e.jsx(n.li,{children:"Selected state management with visual highlighting of active options"}),`
`,e.jsx(n.li,{children:"Flexible return value (object vs value) for different use cases"}),`
`,e.jsx(n.li,{children:"Automatic current route detection and selection on component mount"}),`
`,e.jsx(n.li,{children:"CSS custom properties for dynamic height calculation"}),`
`,e.jsx(n.li,{children:"Border and spacing optimized for sidebar layouts"}),`
`,e.jsx(n.li,{children:"Z-index management for proper layering in complex layouts"}),`
`,e.jsx(n.li,{children:"Support for hierarchical sidebar structures with 3 nesting levels"}),`
`,e.jsx(n.li,{children:"Seamless coordination between primary and secondary navigation panels"}),`
`]})]})}function f(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(s,{...i})}):s(i)}export{f as default};
