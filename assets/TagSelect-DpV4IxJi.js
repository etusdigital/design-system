import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as d}from"./index-D2LXvqQ0.js";import{M as a,C as s,a as r}from"./index-DMV-UF4P.js";import{T as l,P as o,I as c,A as h,D as p,R as x,a as j,b as u}from"./TagSelect.stories-DSXPWuzs.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function i(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...d(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l}),`
`,e.jsx(n.h1,{id:"name-tagselect",children:"Name: TagSelect"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A tag-based selection component with search functionality, custom tag creation, and removable tag management for collecting multiple values as visual tags."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(r,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <TagSelect 
        v-model="selectedTags"
        label-value="Select Tags"
        :options="availableTags"
    >
        <template #search-label>
            Search
        </template>
        <template #no-options-found>
            No result found
        </template>
        <template #empty-state>
            No tags created yet
        </template>
    </TagSelect>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedTags = ref([...])
const availableTags = ref([...])
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected tags array. Type: ",e.jsx(n.code,{children:"any[]"})," (default: ",e.jsx(n.code,{children:"[]"}),")"]}),`
`,e.jsx(n.h4,{id:"v-modelexpanded",children:"v-model:expanded"}),`
`,e.jsxs(n.p,{children:["Controls the dropdown expanded state. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The label displayed for the tag select input. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["Array of available tag options. Can be strings or objects. Type: ",e.jsx(n.code,{children:"any[]"})," (default: ",e.jsx(n.code,{children:"[]"}),")"]}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon displayed on the tag select input. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["Property name used for displaying option labels when using object arrays. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"absolute",children:"absolute"}),`
`,e.jsxs(n.p,{children:["Controls absolute positioning of the dropdown. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the tag select interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"required",children:"required"}),`
`,e.jsxs(n.p,{children:["Marks the field as required. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"is-error",children:"is-error"}),`
`,e.jsxs(n.p,{children:["Activates error styling mode. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"error-message",children:"error-message"}),`
`,e.jsxs(n.p,{children:["Error message to display when in error state. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"info-message",children:"info-message"}),`
`,e.jsxs(n.p,{children:["Informational message displayed with tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"button-label",children:"button-label"}),`
`,e.jsxs(n.p,{children:["Text displayed on the add button. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"Add"'}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the selected tags change. Receives the updated tags array."}),`
`,e.jsx(n.h4,{id:"updateoptions",children:"@update:options"}),`
`,e.jsx(n.p,{children:"Triggered when new tags are added to the options array. Receives the updated options array."}),`
`,e.jsx(n.h4,{id:"updateexpanded",children:"@update:expanded"}),`
`,e.jsx(n.p,{children:"Triggered when the dropdown expanded state changes."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"search-label",children:"#search-label"}),`
`,e.jsx(n.p,{children:"Custom placeholder text for the search input."}),`
`,e.jsx(n.h4,{id:"no-options-found",children:"#no-options-found"}),`
`,e.jsx(n.p,{children:"Custom content displayed when search yields no results."}),`
`,e.jsx(n.h4,{id:"empty-state",children:"#empty-state"}),`
`,e.jsx(n.p,{children:"Custom content displayed when no options are available."}),`
`,e.jsx(n.h4,{id:"option",children:"#option"}),`
`,e.jsx(n.p,{children:"Custom rendering for individual options in the dropdown."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Prevents duplicate tag selection automatically"}),`
`,e.jsx(n.li,{children:"Supports both string arrays and object arrays with configurable label keys"}),`
`,e.jsx(n.li,{children:"New tags created via search are automatically added to the options array"}),`
`,e.jsx(n.li,{children:"Search input is accessible and maintains focus for continuous tag creation"}),`
`,e.jsx(n.li,{children:"Visual feedback distinguishes between available and selected options"}),`
`,e.jsx(n.li,{children:"Disabled state prevents tag creation while maintaining visual feedback"}),`
`,e.jsx(n.li,{children:"Absolute positioning option prevents layout shifts when dropdown opens"}),`
`]})]})}function S(t={}){const{wrapper:n}={...d(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{S as default};
