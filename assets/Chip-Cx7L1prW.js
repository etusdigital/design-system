import{j as e}from"./iframe-C-VLzmCM.js";import{useMDXComponents as c}from"./index-CtRrkioO.js";import{M as d,C as s,a as r}from"./index-CxUO9RFi.js";import{C as a,P as i,a as t,S as h,L as x,W as p,I as j,b as u}from"./Chip.stories-D2IGA5de.js";import"./preload-helper-PPVm8Dsz.js";function l(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...c(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(d,{of:a}),`
`,e.jsx(n.h1,{id:"name-chip",children:"Name: Chip"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A compact, flat label built on ",e.jsx(n.code,{children:"StatusBadge"})," for short metadata such as categories, statuses or counts inside tables, cards and lists."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:i}),`
`,e.jsx(r,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Chip label-value="Active" color="success" />
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The text content displayed in the chip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"color",children:"color"}),`
`,e.jsxs(n.p,{children:["Visual color scheme for the chip. Type: ",e.jsx(n.code,{children:'"primary" | "info" | "success" | "warning" | "danger" | "neutral"'})," (default: ",e.jsx(n.code,{children:'"primary"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:t}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Chip size variant affecting font and icon size. Type: ",e.jsx(n.code,{children:'"small" | "medium" | "large"'})," (default: ",e.jsx(n.code,{children:'"small"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"loading",children:"loading"}),`
`,e.jsxs(n.p,{children:["Shows a spinner instead of the content. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon name displayed within the chip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"is-appended-icon",children:"is-appended-icon"}),`
`,e.jsxs(n.p,{children:["When true, the icon appears after the text. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"closeable",children:"closeable"}),`
`,e.jsxs(n.p,{children:["Adds a close button that emits ",e.jsx(n.code,{children:"@close"}),'. The button is keyboard accessible and named "Remove". Type: ',e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"close",children:"@close"}),`
`,e.jsxs(n.p,{children:["Triggered when the close button is activated (only when ",e.jsx(n.code,{children:"closeable"})," is true)."]}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsxs(n.p,{children:["Content displayed instead of ",e.jsx(n.code,{children:"label-value"})," when provided."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Chip color="info">
       Slot: default
    </Chip>
</template>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Same colors, sizes, icon and close behavior as ",e.jsx(n.code,{children:"StatusBadge"}),", with a flat, borderless and tighter look"]}),`
`,e.jsx(n.li,{children:"Text never wraps; long content keeps a single line"}),`
`]})]})}function y(o={}){const{wrapper:n}={...c(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(l,{...o})}):l(o)}export{y as default};
