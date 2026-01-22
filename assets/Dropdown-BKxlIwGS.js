import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as d,C as s,a as l}from"./index-DN5oYWrE.js";import{D as a,P as i,A as c,a as h,R as p,S as x,I as u,b as j,c as m}from"./Dropdown.stories-BzAjYRTG.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-oiXQscte.js";function r(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a}),`
`,e.jsx(n.h1,{id:"name-dropdown",children:"Name: Dropdown"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A flexible dropdown component with multi-level navigation, search functionality, and customizable trigger elements for complex menu structures."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:i}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Dropdown 
        v-model="selectedValue"
        label-value="label"
        :options="menuOptions"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedValue = ref('')

const menuOptions = [...]
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected value. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"v-modelexpanded",children:"v-model:expanded"}),`
`,e.jsxs(n.p,{children:["Controls the dropdown expanded state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed for the dropdown. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of menu options with hierarchical support. Type: ",e.jsx(n.code,{children:"Option[]"})," (required)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`type Option = {
  label: string;        // Display text for menu option
  value: string;        // Unique identifier/value for selection
  icon?: string;        // Material icon name for the option
  disabled?: boolean;   // Disable interaction for this option
  bottom?: boolean;     // Position option at bottom of menu (for special options)
  options?: Option[];       // Nested sub-menu options for hierarchical structure
}
`})}),`
`,e.jsx(n.h4,{id:"absolute",children:"absolute"}),`
`,e.jsxs(n.p,{children:["Controls absolute positioning of dropdown menu. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"true"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the dropdown interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"searchable",children:"searchable"}),`
`,e.jsxs(n.p,{children:["Enables search functionality within the dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error styling mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message to display when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Information message to display. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"max-height",children:"max-height"}),`
`,e.jsxs(n.p,{children:["Maximum height of the dropdown container. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"40px"'}),")"]}),`
`,e.jsx(n.h4,{id:"min-width",children:"min-width"}),`
`,e.jsxs(n.p,{children:["Minimum width of the dropdown menu. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"15em"'}),")"]}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["Returns the full object instead of just the value. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the selected value changes."}),`
`,e.jsx(n.h4,{id:"updateexpanded",children:"@update:expanded"}),`
`,e.jsx(n.p,{children:"Triggered when the dropdown expanded state changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Custom trigger element to replace the default dropdown button."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Dropdown 
        v-model="selectedValue"
        :options="menuOptions"
        v-model:expanded="isExpanded"
    >
        <button @click="isExpanded = !isExpanded">
            Custom Trigger
        </button>
    </Dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref('')
const isExpanded = ref(false)
const menuOptions = [...]
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Supports hierarchical menu structures with unlimited nesting levels"}),`
`,e.jsx(n.li,{children:"Searchable mode transforms the component into a filterable select"}),`
`,e.jsx(n.li,{children:"Custom trigger slot allows complete control over the dropdown appearance"}),`
`,e.jsx(n.li,{children:"Automatic option selection state management for nested structures"}),`
`,e.jsx(n.li,{children:"Bottom positioning option for special menu options (like logout/settings)"}),`
`,e.jsx(n.li,{children:"Keyboard navigation support for accessibility"}),`
`,e.jsx(n.li,{children:"Absolute positioning ensures dropdown menu doesn't affect layout"}),`
`]})]})}function S(o={}){const{wrapper:n}={...t(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(r,{...o})}):r(o)}export{S as default};
