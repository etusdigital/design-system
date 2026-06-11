import{p as g,_ as e}from"./iframe-BfZTDEbZ.js";var o,i,d,u,p,c,b,m,v,f,h,y;const O={component:g,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Controls the selected filter values by category."},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},options:{type:{name:"other",value:"any"},description:`Array of filter categories with their available options. It's objects must contains "options" property.`},labelValue:{type:{name:"string"},description:"Will be the filter label."},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}}},icon:{type:{name:"string"},table:{defaultValue:{summary:"filter_list"}},description:"This will be filter icon."},searchLabel:{type:{name:"string"},table:{defaultValue:{summary:"Search"}},description:"This slot will be placeholder for the input when searchable is true."},searchable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},getObject:{type:{name:"function"},description:"Will be the function that returns the object with the selected options."},hideActions:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Hides the default Clear and Apply buttons. Use with the #actions slot for custom actions."},onApply:{type:{name:"function"},table:{defaultValue:{summary:"()=>{void}"}},description:"Will be the function that execute when apply button is pressed."},status:{description:"This slot will be status when a option is selected. Param: selected (number of selected options)."},"status-label":{description:"This slot will be status text when a option is selected. Param: selected (number of selected options)."},"clear-label":{description:"Will be clear button text."},"apply-label":{description:"Will be apply button text."},default:{description:"This slot will be displayed on the multi-select area."},actions:{description:"This slot will be the select actions, displayed in the bottom of the dropdown"}}};var s={modelValue:{},options:[{label:"Option 1",value:"option1",options:[{label:"Option 1",value:0},{label:"Option 2",value:1},{label:"Option 3",value:2},{label:"Option 4",value:3},{label:"Option 5",value:4}]},{label:"Option 2",value:"option2",options:[{label:"Option 1",value:0},{label:"Option 2",value:1},{label:"Option 3",value:2},{label:"Option 4",value:3},{label:"Option 5",value:4}]}],labelValue:"label",expanded:!1,labelKey:"label",valueKey:"value",searchLabel:"Search",icon:"filter_list",searchable:!1,disabled:!1,getObject:!1,hideActions:!1,onApply:function(){}},n=function(_){return{components:{Filter:g},setup:function(){return{args:_}},template:`
    <Filter 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :options="args.options"
        :label-value="args.labelValue"
        :label-key="args.labelKey" 
        :value-key="args.valueKey"
        :required="args.required" 
        :icon="args.icon" 
        :searchable="args.searchable" 
        :disabled="args.disabled"
        :search-label="args.searchLabel"
        :get-object="args.getObject"
        :hide-actions="args.hideActions"
        @apply="args.onApply"
    />
  `}},a={render:n,args:s},l={render:n,args:e(e({},s),{disabled:!0})},t={render:n,args:e(e({},s),{searchable:!0})},r={render:n,args:e(e({},s),{hideActions:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(o=a.parameters)===null||o===void 0?void 0:o.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(d=(i=a.parameters)===null||i===void 0?void 0:i.docs)===null||d===void 0?void 0:d.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(u=l.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(c=(p=l.parameters)===null||p===void 0?void 0:p.docs)===null||c===void 0?void 0:c.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(b=t.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true
  }
}`},(v=(m=t.parameters)===null||m===void 0?void 0:m.docs)===null||v===void 0?void 0:v.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(f=r.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideActions: true
  }
}`},(y=(h=r.parameters)===null||h===void 0?void 0:h.docs)===null||y===void 0?void 0:y.source)})});const V=Object.freeze(Object.defineProperty({__proto__:null,Disabled:l,HideActions:r,Primary:a,Searchable:t,default:O},Symbol.toStringTag,{value:"Module"}));export{l as D,V as F,r as H,a as P,t as S};
