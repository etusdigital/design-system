import{o as h,_ as e}from"./iframe-oiXQscte.js";var n,i,u,d,p,c,b,m,v,f,y,g;const O={component:h,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Controls the selected filter values by category."},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},options:{type:{name:"other",value:"any"},description:`Array of filter categories with their available options. It's objects must contains "options" property.`},labelValue:{type:{name:"string"},description:"Will be the filter label."},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}}},icon:{type:{name:"string"},table:{defaultValue:{summary:"filter_list"}},description:"This will be filter icon."},searchLabel:{type:{name:"string"},table:{defaultValue:{summary:"Search"}},description:"This slot will be placeholder for the input when searchable is true."},searchable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},absolute:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Makes the content dropdown have an absolute position."},getObject:{type:{name:"function"},description:"Will be the function that returns the object with the selected options."},onApply:{type:{name:"function"},table:{defaultValue:{summary:"()=>{void}"}},description:"Will be the function that execute when apply button is pressed."},status:{description:"This slot will be status when a option is selected. Param: selected (number of selected options)."},"status-label":{description:"This slot will be status text when a option is selected. Param: selected (number of selected options)."},"clear-label":{description:"Will be clear button text."},"apply-label":{description:"Will be apply button text."},default:{description:"This slot will be displayed on the multi-select area."},actions:{description:"This slot will be the select actions, displayed in the bottom of the dropdown"}}};var s={modelValue:{},options:[{label:"Option 1",value:"option1",options:[{label:"Option 1",value:0},{label:"Option 2",value:1},{label:"Option 3",value:2},{label:"Option 4",value:3},{label:"Option 5",value:4}]},{label:"Option 2",value:"option2",options:[{label:"Option 1",value:0},{label:"Option 2",value:1},{label:"Option 3",value:2},{label:"Option 4",value:3},{label:"Option 5",value:4}]}],labelValue:"label",expanded:!1,labelKey:"label",valueKey:"value",searchLabel:"Search",icon:"filter_list",searchable:!1,disabled:!1,absolute:!1,getObject:!1,onApply:function(){}},o=function(_){return{components:{Filter:h},setup:function(){return{args:_}},template:`
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
        :absolute="args.absolute"
        :search-label="args.searchLabel"
        :get-object="args.getObject"
        @apply="args.onApply" 
    />
  `}},a={render:o,args:s},l={render:o,args:e(e({},s),{absolute:!0})},t={render:o,args:e(e({},s),{disabled:!0})},r={render:o,args:e(e({},s),{searchable:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(n=a.parameters)===null||n===void 0?void 0:n.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(u=(i=a.parameters)===null||i===void 0?void 0:i.docs)===null||u===void 0?void 0:u.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(d=l.parameters)===null||d===void 0?void 0:d.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true
  }
}`},(c=(p=l.parameters)===null||p===void 0?void 0:p.docs)===null||c===void 0?void 0:c.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(b=t.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(v=(m=t.parameters)===null||m===void 0?void 0:m.docs)===null||v===void 0?void 0:v.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(f=r.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true
  }
}`},(g=(y=r.parameters)===null||y===void 0?void 0:y.docs)===null||g===void 0?void 0:g.source)})});const w=Object.freeze(Object.defineProperty({__proto__:null,Absolute:l,Disabled:t,Primary:a,Searchable:r,default:O},Symbol.toStringTag,{value:"Module"}));export{l as A,t as D,w as F,a as P,r as S};
