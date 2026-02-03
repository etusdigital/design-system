import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as i}from"./index-D2LXvqQ0.js";import{M as o,C as s,a as l}from"./index-CYZ60NiU.js";import{D as a,P as t,L as c,a as h,C as p,A as x,M as j,b as u,c as m,d as f,R as g,I as y,e as b,S as v}from"./DatePicker.stories-B6qj4ORY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-BuduemLd.js";function r(d){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:a}),`
`,e.jsx(n.h1,{id:"name-datepicker",children:"Name: DatePicker"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A comprehensive date picker component with predefined options, custom date selection, and comparison mode for advanced filtering in dashboards and reports."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:t}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.h4,{id:"single-date-selection",children:"Single Date Selection"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <DatePicker 
        v-model="selectedDate"
        type="date"
        label-value="Select Date"
    >
        Choose a date
    </DatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedDate = ref<Date | undefined>(undefined)
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"date-range-selection",children:"Date Range Selection"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <DatePicker 
        v-model="selectedRange"
        type="period"
        label-value="Date Range"
    >
        Select date range
    </DatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedRange = ref<Date[] | undefined>(undefined)
<\/script>
`})}),`
`,e.jsx(n.h4,{id:"comparison-mode",children:"Comparison Mode"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <DatePicker 
        v-model="comparisonDates"
        v-model:type="dateType"
        type="compare"
        label-value="Compare Periods"
        allow-change-type
    >
        Compare periods
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
const comparisonDates = ref<Date[][] | undefined>(undefined)
const dateType = ref<'date' | 'period' | 'compare'>('compare')
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:t}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected date or date ranges. The type depends on the ",e.jsx(n.code,{children:"type"})," prop:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:'type="date"'}),": ",e.jsx(n.code,{children:"Date | undefined"})," (single date)"]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:'type="period"'}),": ",e.jsx(n.code,{children:"Date[] | undefined"})," (date range with start and end)"]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:'type="compare"'}),": ",e.jsx(n.code,{children:"Date[][] | undefined"})," (two date ranges for comparison)"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Type: ",e.jsx(n.code,{children:"Date | Date[] | Date[][] | undefined"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"v-modelexpanded",children:"v-model:expanded"}),`
`,e.jsxs(n.p,{children:["Controls the filter dropdown open/close state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"v-modeltype",children:"v-model:type"}),`
`,e.jsxs(n.p,{children:["Controls the selection mode. Type: ",e.jsx(n.code,{children:"'date' | 'period' | 'compare'"})," (default: ",e.jsx(n.code,{children:"'date'"}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["Label displayed above the filter component. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"lang",children:"lang"}),`
`,e.jsxs(n.p,{children:["Language for date formatting and localization. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"en-US"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Selection mode for the date picker. Type: ",e.jsx(n.code,{children:"'date' | 'period' | 'compare'"})," (default: ",e.jsx(n.code,{children:"'date'"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:t}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"is-compare",children:"is-compare"}),`
`,e.jsxs(n.p,{children:["Legacy prop for comparison mode (use ",e.jsx(n.code,{children:'type="compare"'})," instead). Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"allow-change-type",children:"allow-change-type"}),`
`,e.jsxs(n.p,{children:["Allows users to switch between different selection modes. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"min-date",children:"min-date"}),`
`,e.jsxs(n.p,{children:["Earliest selectable date constraint. Type: ",e.jsx(n.code,{children:"Date | undefined"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"max-date",children:"max-date"}),`
`,e.jsxs(n.p,{children:["Latest selectable date constraint. Type: ",e.jsx(n.code,{children:"Date | undefined"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsx(n.p,{children:"Array of predefined date range options. Each option should have:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"label"}),": string - Display text"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"value"}),": string - Unique identifier"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"calculate"}),": () => Date[] - Function that returns the date range"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"selected?"}),": boolean - Whether this option is pre-selected"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"disabled?"}),": boolean - Whether this option is disabled"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Type: ",e.jsx(n.code,{children:"OptionType[]"})," (default: predefined options)"]}),`
`,e.jsx(n.h4,{id:"absolute",children:"absolute"}),`
`,e.jsxs(n.p,{children:["Uses absolute positioning for the dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the filter interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:f}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required for form validation. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:g}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error visual state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:y}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message displayed when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"align-right",children:"align-right"}),`
`,e.jsxs(n.p,{children:["Aligns the dropdown to the right (requires absolute=true). Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:b}),`
`,e.jsx(n.h4,{id:"separator",children:"separator"}),`
`,e.jsxs(n.p,{children:["Custom separator text for comparison mode. Type: ",e.jsx(n.code,{children:"string"}),' (default: auto-detected based on language - "and" for English, "e" for Portuguese)']}),`
`,e.jsx(s,{sourceState:"none",of:v}),`
`,e.jsx(n.h4,{id:"hide-actions",children:"hide-actions"}),`
`,e.jsxs(n.p,{children:["Hides the default Clear and Apply buttons. Use with the ",e.jsx(n.code,{children:"#actions"})," slot for custom actions. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsxs(n.p,{children:["Triggered when the selected date or date ranges change. Emits the new value based on the current ",e.jsx(n.code,{children:"type"}),":"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Date"})," when ",e.jsx(n.code,{children:'type="date"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Date[]"})," when ",e.jsx(n.code,{children:'type="period"'})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"Date[][]"})," when ",e.jsx(n.code,{children:'type="compare"'})]}),`
`]}),`
`,e.jsx(n.h4,{id:"updateexpanded",children:"@update:expanded"}),`
`,e.jsxs(n.p,{children:["Triggered when the dropdown open/close state changes. Emits the new expanded state (",e.jsx(n.code,{children:"boolean"}),")."]}),`
`,e.jsx(n.h4,{id:"updatetype",children:"@update:type"}),`
`,e.jsxs(n.p,{children:["Triggered when the selection mode changes (when ",e.jsx(n.code,{children:"allow-change-type"})," is enabled). Emits the new type: ",e.jsx(n.code,{children:"'date' | 'period' | 'compare'"}),"."]}),`
`,e.jsx(n.h4,{id:"apply",children:"@apply"}),`
`,e.jsxs(n.p,{children:["Triggered when the Apply button is clicked. Emits the current model value: ",e.jsx(n.code,{children:"Date | Date[] | Date[][]"}),"."]}),`
`,e.jsx(n.h4,{id:"clear",children:"@clear"}),`
`,e.jsx(n.p,{children:"Triggered when the Clear button is clicked. This event is emitted before the model value is cleared."}),`
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
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Type-based value handling"}),": The ",e.jsx(n.code,{children:"v-model"})," type changes based on the ",e.jsx(n.code,{children:"type"})," prop:",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="date"'})," → returns ",e.jsx(n.code,{children:"Date"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="period"'})," → returns ",e.jsx(n.code,{children:"Date[]"})]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'type="compare"'})," → returns ",e.jsx(n.code,{children:"Date[][]"})]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Predefined options"}),": Quick-select options (Today, Yesterday, Last 7 days, etc.) are available when ",e.jsx(n.code,{children:"type"})," is not ",e.jsx(n.code,{children:'"date"'}),". These options calculate dates automatically."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Comparison mode"}),": When ",e.jsx(n.code,{children:'type="compare"'}),", users can select two separate date ranges for side-by-side comparison."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Localization"}),': Automatic language detection for date formatting and separator text ("and" vs "e").']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Form integration"}),": Supports ",e.jsx(n.code,{children:"required"}),", ",e.jsx(n.code,{children:"disabled"}),", ",e.jsx(n.code,{children:"is-error"}),", and ",e.jsx(n.code,{children:"error-message"})," props for seamless form validation."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Custom actions"}),": Use ",e.jsx(n.code,{children:"hide-actions"})," prop with the ",e.jsx(n.code,{children:"#actions"})," slot to completely customize the action buttons area."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Expandable container"}),": Built on top of ",e.jsx(n.code,{children:"ExpandableContainer"})," component, providing consistent dropdown behavior across the design system."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Apply/Clear workflow"}),": The component uses an apply/clear pattern where changes are confirmed with the Apply button, optimized for dashboard and analytics use cases."]}),`
`]})]})}function E(d={}){const{wrapper:n}={...i(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(r,{...d})}):r(d)}export{E as default};
