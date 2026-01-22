import{R as g,_ as e}from"./iframe-D9ZodyF1.js";var n,d,l,s,t,i,u,m,p;const b={component:g,argTypes:{modelValue:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},groupValue:{description:"Used by the Group component.",type:{name:"other",value:"any"},table:{defaultValue:{summary:"null"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},variant:{type:{name:"string"},control:"select",options:["default","onboarding"],table:{defaultValue:{summary:"default"}},description:"This will be the radio variantion."},default:{description:"This slot will be displayed next to the radio circle."}}};var c={modelValue:!1,groupValue:null,disabled:!1,variant:"default"},v=function(f){return{components:{Radio:g},setup:function(){return{args:f}},template:`
    <Radio 
      v-model="args.modelValue" 
      name="test" 
      :group-value="args.groupValue" 
      :disabled="args.disabled" 
      :variant="args.variant"
    >
      Test radio
    </Radio>
  `}},a={render:v,args:c},r={render:v,args:e(e({},c),{disabled:!0})},o={render:v,args:e(e({},c),{variant:"onboarding"})};a.parameters=e(e({},a.parameters),{docs:e(e({},(n=a.parameters)===null||n===void 0?void 0:n.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(l=(d=a.parameters)===null||d===void 0?void 0:d.docs)===null||l===void 0?void 0:l.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(s=r.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(i=(t=r.parameters)===null||t===void 0?void 0:t.docs)===null||i===void 0?void 0:i.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(u=o.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: 'onboarding'
  }
}`},(p=(m=o.parameters)===null||m===void 0?void 0:m.docs)===null||p===void 0?void 0:p.source)})});const y=Object.freeze(Object.defineProperty({__proto__:null,Disabled:r,Onboarding:o,Primary:a,default:b},Symbol.toStringTag,{value:"Module"}));export{r as D,o as O,a as P,y as R};
