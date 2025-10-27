import{j as n}from"./index-DhQHbkge.js";import{useMDXComponents as i}from"./index-D2LXvqQ0.js";import{M as l,C as t,a as d}from"./index-qxoUpuLt.js";import{B as a,P as o,C as c,S as u,V as h,D as x,L as j,a as p,R as m,A as g}from"./Button.stories-DNERTe1Y.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-CEhHUQ6Y.js";function r(s){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...s.components};return n.jsxs(n.Fragment,{children:[n.jsx(l,{of:a}),`
`,n.jsx(e.h1,{id:"name-button",children:"Name: Button"}),`
`,n.jsx(e.h2,{id:"component-overview",children:"Component Overview"}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Purpose"}),": A customizable button component with support for different colors, sizes, variants, loading states, and progress indicators."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,n.jsx("br",{}),`
`,n.jsx(e.h3,{id:"playground",children:"Playground"}),`
`,n.jsx(t,{of:o}),`
`,n.jsx(d,{}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Button>Label</Button>
</template>
`})}),`
`,n.jsx(t,{sourceState:"none",of:o}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"props-api",children:"Props API"}),`
`,n.jsx(e.h4,{id:"type",children:"type"}),`
`,n.jsxs(e.p,{children:["Controls the HTML button type attribute. Options: ",n.jsx(e.code,{children:'"button"'})," | ",n.jsx(e.code,{children:'"submit"'})," | ",n.jsx(e.code,{children:'"reset"'})," (default: ",n.jsx(e.code,{children:'"button"'}),")"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"button"}),": Regular button for interactions"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"submit"}),": Submit button for forms"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"reset"}),": Reset button for forms"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Button type="button" @click="handleClick">Click me</Button>
    <Button type="submit">Submit Form</Button>
    <Button type="reset">Reset Form</Button>
</template>
`})}),`
`,n.jsx(e.h4,{id:"color",children:"color"}),`
`,n.jsxs(e.p,{children:["Sets the button's color theme. Options: ",n.jsx(e.code,{children:'"primary"'})," | ",n.jsx(e.code,{children:'"info"'})," | ",n.jsx(e.code,{children:'"success"'})," | ",n.jsx(e.code,{children:'"warning"'})," | ",n.jsx(e.code,{children:'"danger"'})," | ",n.jsx(e.code,{children:'"neutral"'})," (default: ",n.jsx(e.code,{children:'"primary"'}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <div class="flex gap-xs">
        <Button color="primary">Primary</Button>
        <Button color="info">Info</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <Button color="neutral">Neutral</Button>
    </div>
</template>
`})}),`
`,n.jsx(t,{sourceState:"none",of:c}),`
`,n.jsx(e.h4,{id:"size",children:"size"}),`
`,n.jsxs(e.p,{children:["Controls the button's dimensions and padding. Options: ",n.jsx(e.code,{children:'"small"'})," | ",n.jsx(e.code,{children:'"medium"'})," | ",n.jsx(e.code,{children:'"large"'})," (default: ",n.jsx(e.code,{children:'"medium"'}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <div class="flex gap-xs">
        <Button class="h-fit" size="small">Small</Button>
        <Button class="h-fit" size="medium">Medium</Button>
        <Button class="h-fit" size="large">Large</Button>
    </div>
</template>
`})}),`
`,n.jsx(t,{sourceState:"none",of:u}),`
`,n.jsx(e.h4,{id:"variant",children:"variant"}),`
`,n.jsxs(e.p,{children:["Changes the button's visual style. Options: ",n.jsx(e.code,{children:'"default"'})," | ",n.jsx(e.code,{children:'"secondary"'})," | ",n.jsx(e.code,{children:'"plain"'})," | ",n.jsx(e.code,{children:'"reverse"'})," (default: ",n.jsx(e.code,{children:'"default"'}),")"]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"default"}),": Solid filled button with colored background and white text"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"secondary"}),": Outlined button with transparent background and colored border"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"plain"}),": Minimal button with no background or border, only colored text"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"reverse"}),": Similar to secondary, but reverses colors on hover interaction"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <div class="flex gap-xs">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="plain">Plain</Button>
        <Button variant="reverse">Reverse</Button>
    </div>
</template>
`})}),`
`,n.jsx(t,{sourceState:"none",of:h}),`
`,n.jsx(e.h4,{id:"disabled",children:"disabled"}),`
`,n.jsxs(e.p,{children:["Disables the button and prevents interactions. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Button disabled>Disabled</Button>
</template>
`})}),`
`,n.jsx(t,{sourceState:"none",of:x}),`
`,n.jsx(e.h4,{id:"loading",children:"loading"}),`
`,n.jsxs(e.p,{children:["Shows a spinner and disables interactions. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Button loading>Loading...</Button>
</template>
`})}),`
`,n.jsx(t,{sourceState:"none",of:j}),`
`,n.jsx(e.h4,{id:"progress",children:"progress"}),`
`,n.jsxs(e.p,{children:["Shows a progress bar overlay (0-1 range). When > 0, automatically enables loading state. Type: ",n.jsx(e.code,{children:"number"})," (default: ",n.jsx(e.code,{children:"0"}),")"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <div class="flex gap-xs">
        <Button :progress="0.3">30% Complete</Button>
        <Button :progress="0.75">75% Complete</Button>
        <Button :progress="1">Complete!</Button>
    </div>
</template>
`})}),`
`,n.jsx(t,{sourceState:"none",of:p}),`
`,n.jsx(e.h4,{id:"round",children:"round"}),`
`,n.jsxs(e.p,{children:["Applies rounded border styling to the button. Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(t,{sourceState:"none",of:m}),`
`,n.jsx(e.h4,{id:"always-open",children:"always-open"}),`
`,n.jsxs(e.p,{children:["Keeps the button in an always-open state (used with round buttons). Type: ",n.jsx(e.code,{children:"boolean"})," (default: ",n.jsx(e.code,{children:"false"}),")"]}),`
`,n.jsx(t,{sourceState:"none",of:g}),`
`,n.jsx(e.h4,{id:"background",children:"background"}),`
`,n.jsxs(e.p,{children:["Custom background color for the button. Type: ",n.jsx(e.code,{children:"string"})," (default: ",n.jsx(e.code,{children:'""'}),")"]}),`
`,n.jsx(e.h4,{id:"id--name",children:"id & name"}),`
`,n.jsxs(e.p,{children:["HTML attributes for form handling and accessibility. Type: ",n.jsx(e.code,{children:"string"})," (optional)"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <form>
        <!-- When id/name is provided, creates a label element for better accessibility -->
        <Button id="submit-btn" name="submit-button" type="submit">
            Submit Form
        </Button>
    </form>
</template>
`})}),`
`,n.jsx(e.hr,{}),`
`,n.jsx(e.h3,{id:"events-api",children:"Events API"}),`
`,n.jsx(e.h4,{id:"click",children:"@click"}),`
`,n.jsx(e.p,{children:"Triggered when the button is clicked (unless disabled or loading)."}),`
`,n.jsx(e.h3,{id:"slots-api",children:"Slots API"}),`
`,n.jsx(e.h4,{id:"default",children:"#default"}),`
`,n.jsx(e.p,{children:"The main content slot for the button. Displays text, icons, or any other content inside the button. Content is hidden (but still rendered) when the button is in loading state to maintain button dimensions."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-vue",children:`<template>
    <Button>Slot: default</Button>
</template>
`})}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"Important Notes:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["When ",n.jsx(e.code,{children:"loading"})," or ",n.jsx(e.code,{children:"progress > 0"}),", the slot content becomes invisible but remains rendered to preserve button size"]}),`
`,n.jsx(e.li,{children:"You can include any Vue component or HTML element in the slot"}),`
`,n.jsx(e.li,{children:"The slot content will automatically inherit button styles like text color and alignment"}),`
`,n.jsx(e.li,{children:"For accessibility, consider using semantic elements when appropriate"}),`
`]})]})}function k(s={}){const{wrapper:e}={...i(),...s.components};return e?n.jsx(e,{...s,children:n.jsx(r,{...s})}):r(s)}export{k as default};
