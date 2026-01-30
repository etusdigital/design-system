import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as t}from"./index-D2LXvqQ0.js";import{M as r,C as i,a as o}from"./index-CCS_Va9-.js";import{A as l,P as d,n as c,S as h}from"./Avatar.stories-BC8OCpaa.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-1aJ3cS75.js";function a(s){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(n.h1,{id:"name-avatar",children:"Name: Avatar"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A circular avatar component that displays user profile images or automatically generated initials from names, with support for multiple sizes."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(o,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Avatar name="John Doe" />
</template>
`})}),`
`,e.jsx(i,{sourceState:"none",of:c}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"name",children:"name"}),`
`,e.jsxs(n.p,{children:["The user's name used to generate initials when no image is provided. Type: ",e.jsx(n.code,{children:"string"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"src",children:"src"}),`
`,e.jsxs(n.p,{children:["URL or path to the avatar image. When provided, displays the image instead of initials. Type: ",e.jsx(n.code,{children:"string"})," (optional)"]}),`
`,e.jsx(n.h4,{id:"alt",children:"alt"}),`
`,e.jsxs(n.p,{children:["Alternative text for the avatar image (accessibility). Type: ",e.jsx(n.code,{children:"string"})," (optional, defaults to name)"]}),`
`,e.jsx(n.h4,{id:"size",children:"size"}),`
`,e.jsxs(n.p,{children:["Controls the avatar's dimensions. Options: ",e.jsx(n.code,{children:'"small"'})," | ",e.jsx(n.code,{children:'"medium"'})," | ",e.jsx(n.code,{children:'"large"'})," (default: ",e.jsx(n.code,{children:'"medium"'}),")"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <div class="flex gap-sm">
        <Avatar name="John Doe" size="small" />
        <Avatar name="John Doe" size="medium" />
        <Avatar name="John Doe" size="large" />
    </div>
</template>
`})}),`
`,e.jsx(i,{sourceState:"none",of:h}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.p,{children:"Avatar does not emit any custom events. It's a display component that passes through standard DOM events from the underlying div element."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsxs(n.p,{children:["Avatar does not use slots. All content is controlled through props (",e.jsx(n.code,{children:"name"}),", ",e.jsx(n.code,{children:"src"}),", ",e.jsx(n.code,{children:"alt"}),", ",e.jsx(n.code,{children:"size"}),"). The component automatically handles the display logic between images and initials."]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"The component automatically chooses between image and initials display"}),`
`,e.jsx(n.li,{children:"Image takes priority over initials when both name and src are provided"}),`
`,e.jsx(n.li,{children:"All sizes maintain the same circular aspect ratio"}),`
`,e.jsx(n.li,{children:"Use semantic alt text for better accessibility when providing images"}),`
`]})]})}function y(s={}){const{wrapper:n}={...t(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(a,{...s})}):a(s)}export{y as default};
