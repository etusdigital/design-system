import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as a}from"./index-D2LXvqQ0.js";import{M as o,C as s,a as i}from"./index-qxoUpuLt.js";import{C as d,P as l,F as c}from"./Card.stories-ztXMafrN.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CEhHUQ6Y.js";function r(t){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...a(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(o,{of:d}),`
`,n.jsx(e.h1,{id:"name-card",children:"Name: Card"}),`
`,n.jsx(e.h2,{id:"component-overview",children:"Component Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A simple container component that provides a card-like appearance with background, border, shadow, and rounded corners for grouping related content."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"playground",children:"Playground"}),`
`,n.jsx(s,{of:l}),`
`,n.jsx(i,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
   <Card class="w-fit">
        <div class="w-fit flex flex-col p-base gap-base">
            <h1 class="font-bold text-lg m-none">Form</h1>
            <input abel="Name" />
            <button>Save</button>
        </div>
    </Card>
</template>
`})}),`
`,n.jsx(s,{sourceState:"none",of:c}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"props-api",children:"Props API"}),`
`,n.jsx(e.h4,{id:"class",children:"class"}),`
`,n.jsxs(e.p,{children:["Optional CSS classes to apply additional styling to the card. Type: ",n.jsx(e.code,{children:"string"})," (optional)"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
   <Card class="max-w-sm">...</Card>
</template>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"events-api",children:"Events API"}),`
`,n.jsx(e.p,{children:"Card does not emit any custom events. It's a simple container component that passes through standard DOM events from the underlying div element."}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"slots-api",children:"Slots API"}),`
`,n.jsx(e.h4,{id:"default",children:"#default"}),`
`,n.jsx(e.p,{children:"The main content slot for the card. Accepts any content that should be displayed inside the card container."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Card>
        Slot: default
    </Card>
</template>
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"The slot content determines the card's dimensions - the card adapts to its content"}),`
`,n.jsx(e.li,{children:"Consider adding padding classes to the content for proper spacing"}),`
`,n.jsx(e.li,{children:"The card provides the visual container, but content layout is handled by what you put in the slot"}),`
`,n.jsx(e.li,{children:"Use semantic HTML elements within the card for better accessibility"}),`
`]})]})}function v(t={}){const{wrapper:e}={...a(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(r,{...t})}):r(t)}export{v as default};
