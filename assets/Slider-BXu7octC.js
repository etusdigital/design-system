import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as o}from"./index-D2LXvqQ0.js";import{M as t,C as s,a as d}from"./index-DMV-UF4P.js";import{S as a,P as l,a as c,I as h,b as x,D as p,V as u,F as j,c as m,N as f}from"./Slider.stories-PgUbDgWe.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function r(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(t,{of:a}),`
`,e.jsx(n.h1,{id:"name-slider",children:"Name: Slider"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A single-thumb slider component with customizable styling, tooltips, and support for both horizontal and vertical orientations for selecting single values within a range."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:l}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Slider v-model="selectedValue" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedValue = ref(0)
<\/script>
`})}),`
`,e.jsx(s,{sourceState:"none",of:l}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["Controls the selected value(s). Type: ",e.jsx(n.code,{children:"number | number[]"})," (default: ",e.jsx(n.code,{children:"0"}),")"]}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Controls the slider size variant. Type: ",e.jsx(n.code,{children:"'small' | 'medium' | 'large'"})," (default: ",e.jsx(n.code,{children:"'medium'"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"is-range",children:"is-range"}),`
`,e.jsxs(n.p,{children:["Enables range slider mode with two thumbs for selecting a range of values. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"max",children:"max"}),`
`,e.jsxs(n.p,{children:["Maximum value for the slider. If specified, v-model will be multiplied by this value. Type: ",e.jsx(n.code,{children:"number"})," (default: ",e.jsx(n.code,{children:"0"}),")"]}),`
`,e.jsx(n.h4,{id:"unit",children:"unit"}),`
`,e.jsxs(n.p,{children:["Unit displayed in tooltip alongside the value. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"color",children:"color"}),`
`,e.jsxs(n.p,{children:["Custom color for the slider track and thumb. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"show-tooltip",children:"show-tooltip"}),`
`,e.jsxs(n.p,{children:["Shows tooltip with current value above/beside the thumb. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables slider interaction. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"vertical",children:"vertical"}),`
`,e.jsxs(n.p,{children:["Enables vertical orientation. Requires external container with specified height. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"fill-colors",children:"fill-colors"}),`
`,e.jsxs(n.p,{children:["Array of colors for dividing the fill area between multiple segments. Type: ",e.jsx(n.code,{children:"any[]"})," (default: ",e.jsx(n.code,{children:"[]"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"steps",children:"steps"}),`
`,e.jsxs(n.p,{children:["Array of step positions (scale 0-1) where marks are placed and values snap to. Type: ",e.jsx(n.code,{children:"any[]"})," (default: ",e.jsx(n.code,{children:"[]"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.h4,{id:"neutral-background",children:"neutral-background"}),`
`,e.jsxs(n.p,{children:["Applies neutral background styling to the slider track. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:f}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,e.jsx(n.p,{children:"Triggered when the slider value changes. Receives the new value."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses the internal Slider component and doesn't expose custom slots."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Returns values as percentages (0-1 scale) unless ",e.jsx(n.code,{children:"max"})," prop is specified"]}),`
`,e.jsxs(n.li,{children:["When ",e.jsx(n.code,{children:"max"})," is set, values are automatically scaled to the max value"]}),`
`,e.jsxs(n.li,{children:["Range mode (",e.jsx(n.code,{children:"is-range"}),") returns an array of two values for min/max selection"]}),`
`,e.jsx(n.li,{children:"Single mode returns a single number value"}),`
`,e.jsx(n.li,{children:"Vertical mode requires a parent container with explicit height"}),`
`,e.jsx(n.li,{children:"Step mode constrains values to predefined positions for precise control"}),`
`,e.jsx(n.li,{children:"Fill colors create visual segments across the slider track"}),`
`,e.jsx(n.li,{children:"Tooltip positioning automatically adjusts for vertical/horizontal orientations"}),`
`,e.jsx(n.li,{children:"Supports both keyboard and mouse/touch interactions for accessibility"}),`
`]})]})}function k(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{k as default};
