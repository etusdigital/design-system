import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as r,C as s,a as l}from"./index-CbltXMU5.js";import{C as i,P as o,L as c,a as h,b as x,D as p,M as j,c as m}from"./Calendar.stories-BCXzJc9Y.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function a(d){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:i}),`
`,e.jsx(n.h1,{id:"name-calendar",children:"Name: Calendar"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A calendar component with support for single date selection, date ranges, and localization for flexible date input handling."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Calendar 
        v-model="selectedDate"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedDate = ref<Date | null>(null)
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected date or date range. Type: ",e.jsx(n.code,{children:"Date | Date[] | Date[][] | null"})," (default: ",e.jsx(n.code,{children:"null"}),")"]}),`
`,e.jsx(n.h4,{id:"lang",children:"lang"}),`
`,e.jsxs(n.p,{children:["Language for date formatting and localization. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"en-US"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Selection mode for the calendar. Type: ",e.jsx(n.code,{children:'"date" | "period" | "compare"'})," (default: ",e.jsx(n.code,{children:'"date"'}),")"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'"date"'}),": Single date selection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'"period"'}),": Date range selection"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'"compare"'}),": Comparison mode with two date ranges"]}),`
`]}),`
`,e.jsx(s,{sourceState:"none",of:o}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"double-calendar",children:"double-calendar"}),`
`,e.jsxs(n.p,{children:["Shows two calendar months side by side. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"min-date",children:"min-date"}),`
`,e.jsxs(n.p,{children:["Earliest selectable date constraint. Type: ",e.jsx(n.code,{children:"Date"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"max-date",children:"max-date"}),`
`,e.jsxs(n.p,{children:["Latest selectable date constraint. Type: ",e.jsx(n.code,{children:"Date"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the selected date or date range changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses the internal Calendar component and doesn't expose custom slots."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Supports single date, date range, and comparison modes via ",e.jsx(n.code,{children:"type"})," prop"]}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.code,{children:"double-calendar"})," prop to show two months side by side"]}),`
`,e.jsx(n.li,{children:"Automatically handles locale-specific date formatting and display"}),`
`,e.jsxs(n.li,{children:["Date constraints can be applied using ",e.jsx(n.code,{children:"min-date"})," and ",e.jsx(n.code,{children:"max-date"})," props"]}),`
`,e.jsxs(n.li,{children:["Returns ",e.jsx(n.code,{children:"Date"})," for single selection, ",e.jsx(n.code,{children:"Date[]"})," for ranges, or ",e.jsx(n.code,{children:"Date[][]"})," for comparison mode"]}),`
`]})]})}function b(d={}){const{wrapper:n}={...t(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(a,{...d})}):a(d)}export{b as default};
