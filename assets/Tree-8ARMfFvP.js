import{j as e}from"./index-DhQHbkge.js";import{useMDXComponents as o}from"./index-D2LXvqQ0.js";import{M as r,C as t,a as c}from"./index-DMV-UF4P.js";import{T as d,P as s,M as a,D as h}from"./Tree.stories-CaTj8UkZ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./preload-helper-PPVm8Dsz.js";import"./index-1y_dBDU3.js";import"./iframe-D9ZodyF1.js";function l(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(n.h1,{id:"name-tree",children:"Name: Tree"}),`
`,e.jsx(n.h2,{id:"component-overview",children:"Component Overview"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Purpose"}),": A hierarchical tree component with advanced selection management, supporting both single and multiple selection modes with intelligent parent-child relationship handling."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Import"}),": Automatic - no need to import any DS components"]}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"playground",children:"Playground"}),`
`,e.jsx(t,{of:s}),`
`,e.jsx(c,{}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-vue",children:`<template>
    <Tree 
      v-model="selectedOptions"
      :options="treeData"
      :multiple="true"
      :get-object="true"
    />
</template>
`})}),`
`,e.jsx(t,{sourceState:"none",of:s}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"props-api",children:"Props API"}),`
`,e.jsx(n.h4,{id:"v-model",children:"v-model"}),`
`,e.jsxs(n.p,{children:["The selected value(s). Can be a single option or array for multiple selection. Type: ",e.jsx(n.code,{children:"any"})," (default: ",e.jsx(n.code,{children:"undefined"}),")"]}),`
`,e.jsx(n.h4,{id:"options",children:"options"}),`
`,e.jsxs(n.p,{children:["The tree data structure with nested options. Type: ",e.jsx(n.code,{children:"array"})," (required)"]}),`
`,e.jsx(n.h4,{id:"label-key",children:"label-key"}),`
`,e.jsxs(n.p,{children:["The property name to use for displaying option labels. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"label"'}),")"]}),`
`,e.jsx(n.h4,{id:"value-key",children:"value-key"}),`
`,e.jsxs(n.p,{children:["The property name to use for option values/identification. Type: ",e.jsx(n.code,{children:"string"})," (default: ",e.jsx(n.code,{children:'"value"'}),")"]}),`
`,e.jsx(n.h4,{id:"get-object",children:"get-object"}),`
`,e.jsxs(n.p,{children:["When true, returns complete objects in selection. When false, returns only values. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(n.h4,{id:"multiple",children:"multiple"}),`
`,e.jsxs(n.p,{children:["Enables multiple option selection with hierarchical relationship management. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:a}),`
`,e.jsx(n.h4,{id:"disabled",children:"disabled"}),`
`,e.jsxs(n.p,{children:["Disables the entire tree component. Type: ",e.jsx(n.code,{children:"boolean"})," (default: ",e.jsx(n.code,{children:"false"}),")"]}),`
`,e.jsx(t,{sourceState:"none",of:h}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{id:"events-api",children:"Events API"}),`
`,e.jsx(n.h4,{id:"updatemodel-value",children:"update:model-value"}),`
`,e.jsxs(n.p,{children:["Emitted when selection changes. Payload contains the selected option(s) based on ",e.jsx(n.code,{children:"getObject"})," and ",e.jsx(n.code,{children:"multiple"})," settings."]}),`
`,e.jsx(n.h3,{id:"slots-api",children:"Slots API"}),`
`,e.jsx(n.p,{children:"This component uses internal logic for page display and doesn't expose custom slots."}),`
`,e.jsx(n.h3,{id:"selection-behavior",children:"Selection Behavior"}),`
`,e.jsx(n.h4,{id:"hierarchical-selection-getobject-true-multiple-true",children:"Hierarchical Selection (getObject: true, multiple: true)"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Selecting a child automatically adds all parent ancestors to maintain hierarchy"}),`
`,e.jsx(n.li,{children:"Removing a child removes parents only if they have no other selected children"}),`
`,e.jsx(n.li,{children:"Selected options maintain the tree structure with only selected branches"}),`
`]}),`
`,e.jsx(n.h4,{id:"example-selection-flow",children:"Example Selection Flow:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['Select "Settings.txt" → Model contains: ',e.jsx(n.code,{children:'[{Documents: {options: [{Work: {options: ["Settings.txt"]}}]}}]'})]}),`
`,e.jsx(n.li,{children:`Select "Code.js" → Adds to Work's options`}),`
`,e.jsx(n.li,{children:'Remove "Settings.txt" → Removes only that option, keeps Work with Code.js'}),`
`,e.jsx(n.li,{children:'Remove "Code.js" → Removes Work, and Documents if no other children'}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Important Notes:"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Intelligent parent-child relationship management prevents orphaned selections"}),`
`,e.jsxs(n.li,{children:["Hierarchical structure is preserved in the model when ",e.jsx(n.code,{children:"getObject: true"})]}),`
`,e.jsx(n.li,{children:"Memory efficient with automatic cleanup of empty parent nodes"}),`
`,e.jsx(n.li,{children:"Deep cloning prevents mutation of original data structure"}),`
`,e.jsx(n.li,{children:"Supports unlimited nesting levels with recursive selection handling"}),`
`]})]})}function y(i={}){const{wrapper:n}={...o(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(l,{...i})}):l(i)}export{y as default};
