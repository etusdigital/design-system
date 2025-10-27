import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as r}from"./index-D2LXvqQ0.js";import{M as i,C as o,a}from"./index-qxoUpuLt.js";import{C as c,P as s}from"./Connector.stories-B-UMeoWN.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CEhHUQ6Y.js";function l(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c}),`
`,e.jsx(n.h1,{id:"name-connector",children:"Name: Connector"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A visual connector component that adds connecting lines between grouped elements to show relationships and flow."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(o,{of:s}),`
`,e.jsx(a,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Connector vertical class="items-center">
        <Card class="p-base">
            <Connector>
                <Input label-value="label" placeholder="Type here" />
                <Select
                    label-value="label"
                    :options="[
                        { label: 'Option 1', something: 0, selected: false },
                        { label: 'Option 2', something: 1, selected: true },
                        { label: 'Option 3', something: 2, selected: false },
                        { label: 'Option 4', something: 3, selected: false },
                        { label: 'Option 5', something: 4, selected: false },
                    ]"
                >
                    Select
                </Select>
                <Input label-value="label" placeholder="Type here" />
            </Connector>
        </Card>
        <Button variant="success" size="small" round />
    </Connector>
</template>
`})}),`
`,e.jsx(o,{sourceState:"none",of:s}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"vertical",children:"vertical"}),`
`,e.jsxs(n.p,{children:["Arranges connector lines vertically instead of horizontally. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.p,{children:"Connector does not emit any custom events. It's a simple connector component that passes through standard DOM events from the underlying div element."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.h4,{id:"default",children:"#default"}),`
`,e.jsx(n.p,{children:"Contains the elements to be connected with visual lines."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Connector>
        Slot: default
    </Connector>
</template>
`})}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Visual connectors appear automatically between all child elements except the last one"}),`
`,e.jsxs(n.li,{children:["Use the ",e.jsx(n.code,{children:"vertical"})," prop to change connector orientation"]}),`
`,e.jsx(n.li,{children:"Elements are styled with relative positioning to accommodate connector lines"}),`
`,e.jsx(n.li,{children:"Connectors use neutral border styling for subtle visual connection"}),`
`]})]})}function v(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(l,{...t})}):l(t)}export{v as default};
