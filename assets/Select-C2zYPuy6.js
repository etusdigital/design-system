import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as i}from"./index-D2LXvqQ0.js";import{M as d,C as s,a as r}from"./index-DMV-UF4P.js";import{S as c,P as o,A as a,D as h,R as p,a as x,C as j,M as u,b as m,I as f,c as b,d as g}from"./Select.stories-C4akLgFY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function t(l){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:c}),`
`,e.jsx(n.h1,{id:"name-select",children:"Name: Select"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": An intelligent selection component that dynamically adapts between single and multi-selection modes, offering unified API and enhanced functionality for both scenarios."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(r,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Select 
        v-model="selectedOption"
        label-value="label"
        :options="options"
    >
        Placeholder
    </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedOption = ref(null)
const options = [...]
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected option(s) value. Type: ",e.jsx(n.code,{children:"any"})," (single) or ",e.jsx(n.code,{children:"any[]"})," (multiple) (default: ",e.jsx(n.code,{children:"null"}),")"]}),`
`,e.jsx(n.h4,{id:"v-modelexpanded",children:"v-model:expanded"}),`
`,e.jsxs(n.p,{children:["Controls the dropdown expanded state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed for the select button. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of options to select from. Can be strings or objects. Type: ",e.jsx(n.code,{children:"any[]"})," (required)"]}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon displayed on the select button. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name used for displaying option labels when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsxs(n.p,{children:["Property name used for option values when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"absolute",children:"absolute"}),`
`,e.jsxs(n.p,{children:["Controls absolute positioning of the dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the select interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"searchable",children:"searchable"}),`
`,e.jsxs(n.p,{children:["Enables search functionality within the options. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"clearable",children:"clearable"}),`
`,e.jsxs(n.p,{children:["Adds clear button functionality to reset selections. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"multiple",children:"multiple"}),`
`,e.jsxs(n.p,{children:["Enables multi-selection mode, transforming component behavior and return types. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"secondary",children:"secondary"}),`
`,e.jsxs(n.p,{children:["Enables secondary styling variant. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error styling mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:f}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message to display when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Informational message displayed with tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:b}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["Returns complete objects instead of just values when enabled. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsxs(n.p,{children:["Triggered when the selected option(s) change. Returns value(s) based on ",e.jsx(n.code,{children:"multiple"})," and ",e.jsx(n.code,{children:"get-object"})," settings."]}),`
`,e.jsx(n.h4,{id:"updateexpanded",children:"@update:expanded"}),`
`,e.jsx(n.p,{children:"Triggered when the dropdown expanded state changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Content displayed in the collapsed state of the select."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Select v-model="selected" :options="options">
        Slot: default
    </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref(null)
const options = ref([...])
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"search-label",children:"#search-label"}),`
`,e.jsx(n.p,{children:"Custom placeholder text for the search input when searchable is enabled."}),`
`,e.jsx(n.h4,{id:"status",children:"#status"}),`
`,e.jsx(n.p,{children:"Custom content for displaying the selected option (single mode only)."}),`
`,e.jsx(n.h4,{id:"status-label",children:"#status-label"}),`
`,e.jsx(n.p,{children:"Custom text for the status display (multi-selection mode only)."}),`
`,e.jsx(n.h4,{id:"clear-label",children:"#clear-label"}),`
`,e.jsx(n.p,{children:"Custom text for the clear button when clearable is enabled."}),`
`,e.jsx(n.h4,{id:"option",children:"#option"}),`
`,e.jsx(n.p,{children:"Custom rendering for individual options in the dropdown."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Select v-model="selected" :options="options">
        Placeholder
        <template #option="{ option }">
            <div class="flex items-center gap-xs">
                <icon :name="option.icon" />
                {{ option.label }}
            </div>
        </template>
    </Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref(null)
const options = ref([...])
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:g}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Dynamically switches between Select and MultiSelect components based on ",e.jsx(n.code,{children:"multiple"})," prop"]}),`
`,e.jsx(n.li,{children:"Unified API provides consistent interface regardless of selection mode"}),`
`,e.jsx(n.li,{children:"Intelligent model parsing handles both value extraction and object return modes"}),`
`,e.jsx(n.li,{children:"Clear functionality automatically adapts to single or multiple selection contexts"}),`
`,e.jsx(n.li,{children:"Maintains all functionality from underlying Select and MultiSelect components"}),`
`,e.jsx(n.li,{children:"Seamless migration path from individual select components to unified solution"}),`
`,e.jsx(n.li,{children:"Enhanced slot forwarding ensures all customization options remain available"}),`
`,e.jsx(n.li,{children:"Optimized performance through component-level switching rather than conditional rendering"}),`
`]})]})}function M(l={}){const{wrapper:n}={...i(),...l.components};return n?e.jsx(n,{...l,children:e.jsx(t,{...l})}):t(l)}export{M as default};
