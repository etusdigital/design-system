import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as l,C as i,a}from"./index-CCS_Va9-.js";import{H as d,P as o,M as c,I as p,a as h,U as x,b as m,T as u,D as j}from"./History.stories-TKaAAhDs.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function s(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:d}),`
`,e.jsx(n.h1,{id:"name-history",children:"Name: History"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": An interactive timeline component for displaying chronological events with customizable positioning, icons, and color themes for tracking progress, version control, or activity feeds."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:o}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <History 
        v-model="selectedOption"
        :options="historyOptions"
    >
        <template #option="{ option, index, active }">
            <div class="p-base">
                <p class="text-sm font-semibold mxs" :class="{ 'text-primary-default': active }">
                    {{ option.label }}
                </p>
                <p class="text-xs text-neutral-foreground-medium">
                    {{ formatDate(option.date) }}
                </p>
            </div>
        </template>
    </History>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedOption = ref(null)
const historyOptions = ref([...])

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    })
}
<\/script>
`})}),`
`,e.jsx(i,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected history option from the options array. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"null"}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of history options to display in the timeline. Type: ",e.jsx(n.code,{children:"any[]"})," (required)"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`type HistoryOption = {
  label: string;           // Display name for the option
  date?: Date;            // Timestamp for the event
  type?: "primary" | "info" | "success" | "warning" | "danger" | "neutral"; // Color theme
  icon?: string;          // Icon name to display
  isIconRound?: boolean;  // Whether to use round icon styling
  unfilled?: boolean;     // Whether to use unfilled icon variant
  [key: string]: any;     // Additional custom properties
}
`})}),`
`,e.jsx(i,{sourceState:"none",of:c}),`
`,e.jsx(i,{sourceState:"none",of:p}),`
`,e.jsx(i,{sourceState:"none",of:h}),`
`,e.jsx(i,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"position",children:"position"}),`
`,e.jsxs(n.p,{children:["Position of the history timeline relative to content. Type: ",e.jsx(n.code,{children:'"top" | "bottom" | "left" | "right"'})," (default: ",e.jsx(n.code,{children:'"right"'}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Default color theme for history options (overridden by option.type). Type: ",e.jsx(n.code,{children:'"primary" | "info" | "success" | "warning" | "danger" | "neutral"'})," (default: ",e.jsx(n.code,{children:'"primary"'}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables option selection interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(i,{sourceState:"none",of:j}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when a history option is selected. Receives the selected option and additional context including the index."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"option",children:"#option"}),`
`,e.jsx(n.p,{children:"Custom rendering for each history option in the timeline."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Slot Props:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"option"}),": The history option object"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"index"}),": Position in the options array"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"active"}),": Whether this option is currently selected"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <History v-model="selected" :options="options">
        <template #option="{ option, index, active }">
            <div class="p-base border rounded" :class="{ 'border-primary-default': active }">
                <h4 class="font-semibold">{{ option.title }}</h4>
                <p class="text-sm text-neutral-foreground-medium">{{ option.description }}</p>
                <div class="flex items-center gap-xs mt-xs">
                    <icon :name="option.icon" />
                    <span class="text-xs">{{ formatDate(option.date) }}</span>
                </div>
            </div>
        </template>
    </History>
</template>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Automatic timeline connector lines between options for visual continuity"}),`
`,e.jsx(n.li,{children:"Support for both regular and round icon variants with customizable styling"}),`
`,e.jsx(n.li,{children:"Flexible positioning system (top, bottom, left, right) for different layout needs"}),`
`,e.jsx(n.li,{children:"Individual option type override allows mixed color themes within a single timeline"}),`
`,e.jsx(n.li,{children:"Click interaction for option selection with visual feedback"}),`
`,e.jsx(n.li,{children:"Responsive design adapts to different screen sizes and orientations"}),`
`,e.jsx(n.li,{children:"Icon support with filled/unfilled variants for different visual emphasis"}),`
`,e.jsx(n.li,{children:"Active state management with automatic highlighting"}),`
`,e.jsx(n.li,{children:"Disabled mode prevents interaction while maintaining visual presentation"}),`
`,e.jsx(n.li,{children:"Z-index management ensures proper layering of timeline elements"}),`
`,e.jsx(n.li,{children:"Smooth hover effects and transitions for enhanced user experience"}),`
`,e.jsx(n.li,{children:"Accessibility support with proper keyboard navigation and ARIA attributes"}),`
`,e.jsx(n.li,{children:"Flexible option structure allows custom properties for extended functionality"}),`
`]})]})}function I(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}const A=[];export{A as __namedExportsOrder,I as default};
