import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as o}from"./index-D2LXvqQ0.js";import{M as l,C as r,a}from"./index-DMV-UF4P.js";import{S as c,P as t,C as d,a as p}from"./Spinner.stories-ukGXDWC-.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function i(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(l,{of:c}),`
`,n.jsx(e.h1,{id:"name-spinner",children:"Name: Spinner"}),`
`,n.jsx(e.h2,{id:"component-overview",children:"Component Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A loading spinner component with customizable colors and sizes for indicating loading states."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"playground",children:"Playground"}),`
`,n.jsx(r,{of:t}),`
`,n.jsx(a,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Spinner />
</template>
`})}),`
`,n.jsx(r,{sourceState:"none",of:t}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"props-api",children:"Props API"}),`
`,n.jsx(e.h4,{id:"color",children:"color"}),`
`,n.jsxs(e.p,{children:["Controls the spinner's color. Can be changed through the ",n.jsx(e.strong,{children:"color"})," CSS property or theme colors."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <div class="flex gap-sm">
        <Spinner class="text-neutral-interaction-default" />
        <Spinner class="text-primary-interaction-default" />
        <Spinner class="text-informative-interaction-default" />
        <Spinner class="text-success-interaction-default" />
        <Spinner class="text-warning-interaction-default" />
        <Spinner class="text-danger-interaction-default" />
    </div>
</template>
`})}),`
`,n.jsx(r,{sourceState:"none",of:d}),`
`,n.jsx(e.h4,{id:"size",children:"size"}),`
`,n.jsxs(e.p,{children:["Controls the spinner's dimensions. Can be changed through the ",n.jsx(e.strong,{children:"font-size"})," CSS property, or by manipulating ",n.jsx(e.strong,{children:"width"})," and ",n.jsx(e.strong,{children:"height"})," directly."]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <div class="flex gap-sm">
        <Spinner class="text-xs" />
        <Spinner class="text-xl" />
        <Spinner class="text-3xl" />
        <Spinner class="text-5xl" />
        <Spinner class="text-7xl" />
      </div>
</template>
`})}),`
`,n.jsx(r,{sourceState:"none",of:p}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Use appropriate sizes for different contexts (small for inline, larger for overlays)"}),`
`,n.jsx(e.li,{children:"Consider accessibility by providing loading text or aria-labels"}),`
`,n.jsx(e.li,{children:"The spinner inherits color from its parent element unless explicitly styled"}),`
`]})]})}function C(s={}){const{wrapper:e}={...o(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(i,{...s})}):i(s)}export{C as default};
