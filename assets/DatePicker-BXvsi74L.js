import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as l}from"./index-D2LXvqQ0.js";import{M as d,C as t,a as o}from"./index-qxoUpuLt.js";import{D as i,P as r,L as c,a as h,C as p,A as x,M as j,b as u,c as m,d as f,R as g,I as b,e as y,S as v}from"./DatePicker.stories-C0sXGlfn.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CEhHUQ6Y.js";function a(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:i}),`
`,e.jsx(n.h1,{id:"name-datepicker",children:"Name: DatePicker"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A comprehensive date picker component with predefined options, custom date selection, and comparison mode for advanced filtering in dashboards and reports."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(t,{of:r}),`
`,e.jsx(o,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <DatePicker 
        v-model="selectedDates"
        label-value="label"
    >
        Date Filter
        <template #clear-label>
            Clear
        </template>
        <template #apply-label>
            Apply
        </template>
        <template #compare-label>
            Compare two periods
        </template>
    </DatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedDates = ref(null)
<\/script>
`})}),`
`,e.jsx(t,{sourceState:"none",of:r}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected date or date ranges. Type: ",e.jsx(n.code,{children:"Date[] | Date[][] | null"})," (default: ",e.jsx(n.code,{children:"null"}),")"]}),`
`,e.jsx(n.h4,{id:"v-modelexpanded",children:"v-model:expanded"}),`
`,e.jsxs(n.p,{children:["Controls the filter dropdown open/close state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["Label displayed above the filter component. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"lang",children:"lang"}),`
`,e.jsxs(n.p,{children:["Language for date formatting and localization. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"en-US"'}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Selection mode for the date picker. Type: ",e.jsx(n.code,{children:"'date' | 'period' | 'compare'"})," (default: ",e.jsx(n.code,{children:"'date'"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:r}),`
`,e.jsx(t,{sourceState:"none",of:h}),`
`,e.jsx(t,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"allow-change-type",children:"allow-change-type"}),`
`,e.jsxs(n.p,{children:["Allows users to switch between different selection modes. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"min-date",children:"min-date"}),`
`,e.jsxs(n.p,{children:["Earliest selectable date constraint. Type: ",e.jsx(n.code,{children:"Date"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"max-date",children:"max-date"}),`
`,e.jsxs(n.p,{children:["Latest selectable date constraint. Type: ",e.jsx(n.code,{children:"Date"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of predefined date range options. Type: ",e.jsx(n.code,{children:"OptionType[]"})," (default: predefined options)"]}),`
`,e.jsx(n.h4,{id:"absolute",children:"absolute"}),`
`,e.jsxs(n.p,{children:["Uses absolute positioning for the dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the filter interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:f}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required for form validation. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:g}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error visual state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:b}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message displayed when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"align-right",children:"align-right"}),`
`,e.jsxs(n.p,{children:["Aligns the dropdown to the right (requires absolute=true). Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:y}),`
`,e.jsx(n.h4,{id:"separator",children:"separator"}),`
`,e.jsxs(n.p,{children:["Custom separator text for comparison mode. Type: ",e.jsx(n.code,{children:"string"})," (default: auto-detected based on language)"]}),`
`,e.jsx(t,{sourceState:"none",of:v}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the selected date or date ranges change."}),`
`,e.jsx(n.h4,{id:"updateexpanded",children:"@update:expanded"}),`
`,e.jsx(n.p,{children:"Triggered when the dropdown open/close state changes."}),`
`,e.jsx(n.h4,{id:"updatetype",children:"@update:type"}),`
`,e.jsx(n.p,{children:"Triggered when the selection mode changes (when allow-change-type is enabled)."}),`
`,e.jsx(n.h4,{id:"apply",children:"@apply"}),`
`,e.jsx(n.p,{children:"Triggered when the Apply button is clicked."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Content displayed in the picker trigger area when no date is selected."}),`
`,e.jsx(n.h4,{id:"compare-label",children:"#compare-label"}),`
`,e.jsx(n.p,{children:"Custom text for the comparison mode checkbox."}),`
`,e.jsx(n.h4,{id:"clear-label",children:"#clear-label"}),`
`,e.jsx(n.p,{children:"Custom text for the Clear button."}),`
`,e.jsx(n.h4,{id:"apply-label",children:"#apply-label"}),`
`,e.jsx(n.p,{children:"Custom text for the Apply button."}),`
`,e.jsx(n.h4,{id:"actions",children:"#actions"}),`
`,e.jsx(n.p,{children:"Custom actions area to replace the default Clear/Apply buttons."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <DatePicker v-model="dateFilter">
        Date Filter
        <template #actions>
            <Button size="small" variant="plain" @click="handleReset">
                Cancel
            </Button>
            <Button size="small" @click="handleSave">
                Save Filter
            </Button>
        </template>
    </DatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dateFilter = ref(null)

const handleReset = () => {}

const handleSave = () => {}
<\/script>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Combines predefined quick options with custom date selection for maximum flexibility"}),`
`,e.jsx(n.li,{children:"Supports single date, date range, and comparison modes with visual distinction"}),`
`,e.jsx(n.li,{children:"Built-in localization support with automatic separator detection"}),`
`,e.jsx(n.li,{children:"Integrates seamlessly with form validation and error handling"}),`
`,e.jsx(n.li,{children:"Customizable action buttons and text through comprehensive slot system"}),`
`,e.jsx(n.li,{children:"Optimized for dashboard and analytics use cases with apply/clear workflow"}),`
`]})]})}function M(s={}){const{wrapper:n}={...l(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}export{M as default};
