import{d as o,_ as e}from"./iframe-1aJ3cS75.js";var r,t,l;const s={component:o,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"This property will be the selected option."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"This property will be the number of pages."},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}},description:"This property will be the key of the label."},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}},description:"This property will be the key of the value."},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the selected value will be an object instead of value-key value."}}};var u={modelValue:"Home",options:["Home","Dashboard","Profile","Settings"],labelKey:"label",valueKey:"value",getObject:!1},i=function(n){return{components:{Breadcrumb:o},setup:function(){return{args:n}},template:`
    <Breadcrumb 
      v-model="args.modelValue"
      :options="args.options"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :get-object="args.getObject"
    />
  `}},a={render:i,args:u};a.parameters=e(e({},a.parameters),{docs:e(e({},(r=a.parameters)===null||r===void 0?void 0:r.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(l=(t=a.parameters)===null||t===void 0?void 0:t.docs)===null||l===void 0?void 0:l.source)})});const p=Object.freeze(Object.defineProperty({__proto__:null,Primary:a,default:s},Symbol.toStringTag,{value:"Module"}));export{p as B,a as P};
