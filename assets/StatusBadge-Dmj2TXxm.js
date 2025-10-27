import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as a}from"./index-D2LXvqQ0.js";import{M as l,C as s,a as d}from"./index-qxoUpuLt.js";import{S as r,P as o,C as c,a as h,T as p,L as x,W as j,I as u,b as m}from"./StatusBadge.stories-BAwkKry3.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CEhHUQ6Y.js";function t(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:r}),`
`,e.jsx(n.h1,{id:"name-statusbadge",children:"Name: StatusBadge"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A versatile tag component with multiple color schemes, sizes, and visual styles for labeling, categorization, and status indication with support for icons and close functionality."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(s,{of:o}),`
`,e.jsx(d,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <StatusBadge 
        label-value="StatusBadge component"
        icon="star"
    />
</template>
`})}),`
`,e.jsx(s,{sourceState:"none",of:o}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The text content displayed in the tag. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"color",children:"color"}),`
`,e.jsxs(n.p,{children:["Visual color scheme for the tag. Type: ",e.jsx(n.code,{children:'"primary" | "informative" | "success" | "warning" | "danger" | "neutral"'})," (default: ",e.jsx(n.code,{children:'"primary"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:c}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Badge size variant affecting padding and font size. Type: ",e.jsx(n.code,{children:'"small" | "medium" | "large"'})," (default: ",e.jsx(n.code,{children:'"medium"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:h}),`
`,e.jsx(n.h4,{id:"type",children:"type"}),`
`,e.jsxs(n.p,{children:["Visual style variant affecting background and border appearance. Type: ",e.jsx(n.code,{children:'"default" | "secondary" | "heavy"'})," (default: ",e.jsx(n.code,{children:'"default"'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:p}),`
`,e.jsx(n.h4,{id:"loading",children:"loading"}),`
`,e.jsxs(n.p,{children:["Shows spinner animation instead of content. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:x}),`
`,e.jsx(n.h4,{id:"icon",children:"icon"}),`
`,e.jsxs(n.p,{children:["Icon name to display within the tag. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:j}),`
`,e.jsx(n.h4,{id:"is-appended-icon",children:"is-appended-icon"}),`
`,e.jsxs(n.p,{children:["Controls icon position - when true, icon appears after text. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:u}),`
`,e.jsx(n.h4,{id:"closeable",children:"closeable"}),`
`,e.jsxs(n.p,{children:["Adds close button functionality with click event emission. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(s,{sourceState:"none",of:m}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"close",children:"@close"}),`
`,e.jsxs(n.p,{children:["Triggered when the close button is clicked (only when ",e.jsx(n.code,{children:"closeable"})," is true)."]}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Content displayed instead of text prop when provided."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <StatusBadge>
       Slot: default
    </StatusBadge>
</template>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Three visual types: default (filled), secondary (outlined), heavy (high contrast)"}),`
`,e.jsx(n.li,{children:"Six semantic color options with consistent theming across all types"}),`
`,e.jsx(n.li,{children:"Icon positioning supports both prepend (default) and append modes"}),`
`,e.jsx(n.li,{children:"Close functionality automatically adds close icon when enabled"}),`
`,e.jsx(n.li,{children:"Loading state replaces all content with animated spinner"}),`
`,e.jsx(n.li,{children:"Text automatically truncates with ellipsis for long content"}),`
`,e.jsx(n.li,{children:"Responsive sizing with proportional icon scaling"}),`
`,e.jsx(n.li,{children:"Accessibility support with proper contrast ratios in all color combinations"}),`
`]})]})}function C(i={}){const{wrapper:n}={...a(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{C as default};
