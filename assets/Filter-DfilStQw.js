import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as o,C as i,a as d}from"./index-DN5oYWrE.js";import{F as a,P as t,S as c,A as h,D as p}from"./Filter.stories-CZXgiD_K.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function l(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a}),`
`,e.jsx(n.h1,{id:"name-filter",children:"Name: Filter"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A multi-level filter component with search functionality, nested options, and customizable actions for complex data filtering scenarios."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:t}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Filter 
        v-model="selectedFilters"
        :options="filterOptions"
        label-value="label"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedFilters = ref({...})
const filterOptions = ref([...])
<\/script>
`})}),`
`,e.jsx(i,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected filter values by category. Type: ",e.jsx(n.code,{children:"SelectedFilters"})," (required)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`type SelectedFilters = {
  [categoryKey: string]: any[];  // Array of selected option indices per category
}
`})}),`
`,e.jsx(n.h4,{id:"v-modelexpanded",children:"v-model:expanded"}),`
`,e.jsxs(n.p,{children:["Controls the filter dropdown expanded state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of filter categories with their available options. Type: ",e.jsx(n.code,{children:"FilterOption[]"})," (required)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`type FilterOption = {
  [labelKey]: string | number;        // Display text for filter option
  [valueKey]: any;        // Unique value for the option
  options: any[];   // Additional custom properties
}
`})}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed for the filter button. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name used for displaying option labels. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsxs(n.p,{children:["Property name used for option values in the data structure. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon displayed on the filter button. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"filter_list"'}),")"]}),`
`,e.jsx(n.h4,{id:"search-label",children:"search-label"}),`
`,e.jsxs(n.p,{children:["Placeholder text for search input when searchable is enabled. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"Search"'}),")"]}),`
`,e.jsx(n.h4,{id:"searchable",children:"searchable"}),`
`,e.jsxs(n.p,{children:["Enables search functionality within filter categories. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"absolute",children:"absolute"}),`
`,e.jsxs(n.p,{children:["Controls absolute positioning of the filter dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the filter interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["Returns the full object instead of just the value. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when filter selections change. Receives updated filter data and selection details."}),`
`,e.jsx(n.h4,{id:"updateexpanded",children:"@update:expanded"}),`
`,e.jsx(n.p,{children:"Triggered when the filter dropdown expanded state changes."}),`
`,e.jsx(n.h4,{id:"apply",children:"@apply"}),`
`,e.jsx(n.p,{children:"Triggered when the Apply button is clicked to confirm filter selections."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"status",children:"#status"}),`
`,e.jsx(n.p,{children:"Custom content for displaying filter status when options are selected."}),`
`,e.jsx(n.h4,{id:"status-label",children:"#status-label"}),`
`,e.jsx(n.p,{children:"Custom text for the filter status display."}),`
`,e.jsx(n.h4,{id:"clear-label",children:"#clear-label"}),`
`,e.jsx(n.p,{children:"Custom text for the Clear button."}),`
`,e.jsx(n.h4,{id:"apply-label",children:"#apply-label"}),`
`,e.jsx(n.p,{children:"Custom text for the Apply button."}),`
`,e.jsx(n.h4,{id:"actions",children:"#actions"}),`
`,e.jsx(n.p,{children:"Custom action buttons to replace the default Clear/Apply buttons."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Supports hierarchical filter categories with unlimited options per category"}),`
`,e.jsx(n.li,{children:"Built-in search functionality for finding specific filter options quickly"}),`
`,e.jsx(n.li,{children:"Automatic selection counting and status display"}),`
`,e.jsx(n.li,{children:"Expandable categories with smooth animations and visual feedback"}),`
`,e.jsx(n.li,{children:"Flexible data structure allows custom properties on filter options"}),`
`,e.jsx(n.li,{children:"Clear and Apply actions for batch filter management"}),`
`,e.jsx(n.li,{children:"Disabled state preserves selections while preventing modifications"}),`
`,e.jsx(n.li,{children:"Absolute positioning option prevents layout shifts when dropdown opens"}),`
`]})]})}function v(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(l,{...s})}):l(s)}export{v as default};
