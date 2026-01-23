import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as s,C as o,a}from"./index-CbltXMU5.js";import{T as c,P as i,a as d,L as p}from"./Tooltip.stories-DTXZaVOq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function l(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(n.h1,{id:"name-tooltip",children:"Name: Tooltip"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A versatile tooltip component with smart positioning, automatic viewport detection, and flexible content support for providing contextual information and help text on hover interactions."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(o,{of:i}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tooltip label-value="Helpful tooltip text">
        <button>Hover me</button>
    </Tooltip>
</template>
`})}),`
`,e.jsx(o,{sourceState:"none",of:i}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"label-value",children:"label-value"}),`
`,e.jsxs(n.p,{children:["The text content displayed inside the tooltip. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"text-deprecated",children:"text (deprecated)"}),`
`,e.jsxs(n.p,{children:["The text content displayed inside the tooltip. Use ",e.jsx(n.code,{children:"label-value"})," instead. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'""'}),")"]}),`
`,e.jsx(n.h4,{id:"position",children:"position"}),`
`,e.jsxs(n.p,{children:["Controls the tooltip positioning relative to the trigger element. Type: ",e.jsx(n.code,{children:'"top" | "bottom" | "left" | "right"'})," (default: ",e.jsx(n.code,{children:'"right"'}),")"]}),`
`,e.jsx(o,{sourceState:"none",of:d}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.p,{children:"This component doesn't emit custom events. Tooltip visibility is controlled internally by hover interactions."}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"The trigger element that activates the tooltip on hover."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tooltip label-value="Tooltip text">
        Slot: default
    </Tooltip>
</template>
`})}),`
`,e.jsx(n.h4,{id:"label",children:"#label"}),`
`,e.jsxs(n.p,{children:["Custom content for the tooltip, overrides the ",e.jsx(n.code,{children:"label-value"})," prop."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tooltip>
        <button>Rich tooltip</button>
        <template #label>
            <div class="flex items-center gap-xs">
                <icon name="info" />
                <span>Rich content here</span>
            </div>
        </template>
    </Tooltip>
</template>
`})}),`
`,e.jsx(o,{sourceState:"none",of:p}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Smart viewport detection prevents tooltips from extending beyond screen boundaries"}),`
`,e.jsx(n.li,{children:"Automatic text wrapping and word breaking for long content with dynamic width adjustment"}),`
`,e.jsx(n.li,{children:"Portal rendering to body prevents z-index conflicts and ensures proper layering"}),`
`,e.jsx(n.li,{children:"Smooth fade animations with optimized timing for better user experience"}),`
`,e.jsx(n.li,{children:"Scroll-aware behavior automatically hides tooltips during page scrolling"}),`
`,e.jsx(n.li,{children:"Dynamic positioning calculation accounts for trigger element size and viewport constraints"}),`
`,e.jsx(n.li,{children:"CSS-only triangular pointers positioned accurately for all four directions"}),`
`,e.jsx(n.li,{children:"Memory efficient event handling with automatic cleanup on component unmount"}),`
`]})]})}function b(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(l,{...t})}):l(t)}export{b as default};
