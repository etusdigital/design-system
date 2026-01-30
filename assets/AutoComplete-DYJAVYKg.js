import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as r,C as s,a as l}from"./index-CCS_Va9-.js";import{A as a,P as i,a as c,R as p,D as h,I as x,b as u,C as j}from"./AutoComplete.stories-BMhDvMvK.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function d(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a}),`
`,e.jsx(n.h1,{id:"name-autocomplete",children:"Name: AutoComplete"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": An autocomplete input component that provides filtered suggestions as the user types, with customizable option rendering and form validation support."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:i}),`
`,e.jsx(l,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <AutoComplete 
        v-model="selectedValue"
        v-model:expanded="isExpanded"
        label-value="label"
        placeholder="Placeholder"
        :options="options"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref('')
const isExpanded = ref(false)
const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["The current input value. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"v-modelexpanded",children:"v-model:expanded"}),`
`,e.jsxs(n.p,{children:["Controls whether the dropdown is open. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["Label displayed above the input. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of string options to filter and display. Type: ",e.jsx(n.code,{children:"number[] | string[]"})," (required)"]}),`
`,e.jsx(n.h4,{id:"placeholder",children:"placeholder"}),`
`,e.jsxs(n.p,{children:["Placeholder text for the input field. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"absolute",children:"absolute"}),`
`,e.jsxs(n.p,{children:["Uses absolute positioning for the dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"true"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required for form validation. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the input and dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error visual state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message displayed when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Informational message displayed below the input. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"max-height",children:"max-height"}),`
`,e.jsxs(n.p,{children:["Maximum height of the input area. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"40px"'}),")"]}),`
`,e.jsx(n.h4,{id:"min-width",children:"min-width"}),`
`,e.jsxs(n.p,{children:["Minimum width of the component. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"15em"'}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the input value changes."}),`
`,e.jsx(n.h4,{id:"updateexpanded",children:"@update:expanded"}),`
`,e.jsx(n.p,{children:"Triggered when the dropdown open/close state changes."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"option",children:"#option"}),`
`,e.jsxs(n.p,{children:["Customizes the rendering of each dropdown option. Provides ",e.jsx(n.code,{children:"option"})," and ",e.jsx(n.code,{children:"index"})," as slot props."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <AutoComplete
        v-model="selectedValue"
        v-model:expanded="isExpanded"
        label-value="label"
        placeholder="Placeholder"
        :options="options"
    >
        <template #option="{ option, index }">
            <Icon name="account_circle" /> {{ option }}
        </template>
    </AutoComplete>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref('')
const isExpanded = ref(false)
const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Filtering is case-insensitive and matches partial strings"}),`
`,e.jsx(n.li,{children:"Built on top of SelectContainer for consistent styling and behavior"}),`
`,e.jsx(n.li,{children:"Dropdown automatically opens on focus and closes when an option is selected"}),`
`,e.jsxs(n.li,{children:["Use the ",e.jsx(n.code,{children:"option"})," slot for rich content like icons, badges, or structured data"]}),`
`,e.jsx(n.li,{children:"Input value can be different from available options for flexible user input"}),`
`]})]})}function T(o={}){const{wrapper:n}={...t(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(d,{...o})}):d(o)}export{T as default};
