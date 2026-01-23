import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as l}from"./index-D2LXvqQ0.js";import{M as a,C as i,a as t}from"./index-CbltXMU5.js";import{C as d,P as s,I as c,D as h,a as p,V as x}from"./Carousel.stories-C9zGvhR6.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CjRVAs2g.js";function r(o){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...l(),...o.components};return n.jsxs(n.Fragment,{children:[n.jsx(a,{of:d}),`
`,n.jsx(e.h1,{id:"name-carousel",children:"Name: Carousel"}),`
`,n.jsx(e.h2,{id:"component-overview",children:"Component Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A carousel component that displays a collection of options with navigation controls and pagination indicators."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"playground",children:"Playground"}),`
`,n.jsx(i,{of:s}),`
`,n.jsx(t,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Carousel 
        v-model="currentIndex"
        :options="options"
        :visible="3"
        :vertical="false"
        :disabled="false"
        :circular="false"
    >
        <template #option="{ option, index }">
            <Card class="p-base">
                {{ option.label }}
            </Card>
        </template>
    </Carousel>
</template>
`})}),`
`,n.jsx(i,{sourceState:"none",of:s}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"props-api",children:"Props API"}),`
`,n.jsx(e.h4,{id:"v-model",children:"v-model"}),`
`,n.jsxs(e.p,{children:["Current active index of the carousel. Type: ",n.jsx(e.code,{children:"number"})," (default: ",n.jsx(e.code,{children:"0"}),")"]}),`
`,n.jsx(e.h4,{id:"options",children:"options"}),`
`,n.jsxs(e.p,{children:["Array of options to display in the carousel. Type: ",n.jsx(e.code,{children:"any[]"})," (required)"]}),`
`,n.jsx(e.h4,{id:"visible",children:"visible"}),`
`,n.jsxs(e.p,{children:["Number of options visible at once. Type: ",n.jsx(e.code,{children:"number"})," (default: ",n.jsx(e.code,{children:"1"}),")"]}),`
`,n.jsx(e.h4,{id:"interval",children:"interval"}),`
`,n.jsxs(e.p,{children:["Auto-play interval in milliseconds. Type: ",n.jsx(e.code,{children:"number"})," (default: ",n.jsx(e.code,{children:"3000"}),")"]}),`
`,n.jsx(i,{sourceState:"none",of:c}),`
`,n.jsx(e.h4,{id:"disabled",children:"disabled"}),`
`,n.jsxs(e.p,{children:["Disables navigation controls. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(i,{sourceState:"none",of:h}),`
`,n.jsx(e.h4,{id:"circular",children:"circular"}),`
`,n.jsxs(e.p,{children:["Enables circular navigation. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(i,{sourceState:"none",of:p}),`
`,n.jsx(e.h4,{id:"vertical",children:"vertical"}),`
`,n.jsxs(e.p,{children:["Arranges carousel vertically. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(i,{sourceState:"none",of:x}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"events-api",children:"Events API"}),`
`,n.jsx(e.h4,{id:"updatemodel-value",children:"@update:model-value"}),`
`,n.jsxs(e.p,{children:["Emitted when the active index changes. Payload: ",n.jsx(e.code,{children:"number"})]}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"slots-api",children:"Slots API"}),`
`,n.jsx(e.h4,{id:"option",children:"#option"}),`
`,n.jsx(e.p,{children:"Slot for rendering individual carousel options."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Carousel :options="options">
        <template #option="{ option, index }">
            <div>{{ option.label }}</div>
        </template>
    </Carousel>
</template>
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Use the ",n.jsx(e.code,{children:"#option"})," slot to customize how each option is rendered"]}),`
`,n.jsx(e.li,{children:"Navigation arrows automatically adjust for vertical/horizontal orientation"}),`
`,n.jsx(e.li,{children:"Pagination indicators show current position"}),`
`,n.jsx(e.li,{children:"Supports both manual and automatic navigation"}),`
`]})]})}function C(o={}){const{wrapper:e}={...l(),...o.components};return e?n.jsx(e,{...o,children:n.jsx(r,{...o})}):r(o)}export{C as default};
