import{w as g,_ as e}from"./iframe-D9ZodyF1.js";var o,d,s,n,t,u,i,v,c;const f={component:g,argTypes:{modelValue:{type:{name:"other",value:"any"},table:{defaultValue:{summary:"undefined"}}},vertical:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}}}};var m={modelValue:1,vertical:!1,disabled:!1,options:[{label:"First",value:1},{label:"Second",value:2},{label:"Third",value:3}],labelKey:"label",valueKey:"value",getObject:!1},y=`
  <RadioGroup
    v-model="args.modelValue"
    :vertical="args.vertical"
    :disabled="args.disabled"
    :options="args.options"
    :label-key="args.labelKey"
    :value-key="args.valueKey"
    :get-object="args.getObject"
  />
`,p=function(b){return{components:{RadioGroup:g},setup:function(){return{args:b}},template:y}},a={render:p,args:m},r={render:p,args:e(e({},m),{vertical:!0})},l={render:p,args:e(e({},m),{disabled:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(o=a.parameters)===null||o===void 0?void 0:o.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(s=(d=a.parameters)===null||d===void 0?void 0:d.docs)===null||s===void 0?void 0:s.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(n=r.parameters)===null||n===void 0?void 0:n.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    vertical: true
  }
}`},(u=(t=r.parameters)===null||t===void 0?void 0:t.docs)===null||u===void 0?void 0:u.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(i=l.parameters)===null||i===void 0?void 0:i.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(c=(v=l.parameters)===null||v===void 0?void 0:v.docs)===null||c===void 0?void 0:c.source)})});const R=Object.freeze(Object.defineProperty({__proto__:null,Disabled:l,Primary:a,Vertical:r,default:f},Symbol.toStringTag,{value:"Module"}));export{l as D,a as P,R,r as V};
