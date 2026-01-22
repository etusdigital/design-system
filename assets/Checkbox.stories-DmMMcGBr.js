import{h as _,_ as e}from"./iframe-oiXQscte.js";var d,n,i,u,m,c,p,v,b,f,g,h;const x={component:_,argTypes:{modelValue:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},rhs:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Puts the button on the right-hand side."},allowIndeterminate:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Allows the checkbox to be in an indeterminate state. The **null** value is treated as indeterminate."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},default:{description:"This slot will be displayed next to the checkbox box."}}};var s={modelValue:!1,rhs:!1,allowIndeterminate:!1,disabled:!1},t=function(y){return{components:{Checkbox:_},setup:function(){return{args:y}},template:'<Checkbox id="primary-checkbox" v-model="args.modelValue" :disabled="args.disabled" :rhs="args.rhs" :allowIndeterminate="args.allowIndeterminate">Test label</Checkbox>'}},a={render:t,args:s},r={render:t,args:e(e({},s),{rhs:!0})},l={render:t,args:e(e({},s),{allowIndeterminate:!0})},o={render:t,args:e(e({},s),{disabled:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(d=a.parameters)===null||d===void 0?void 0:d.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(i=(n=a.parameters)===null||n===void 0?void 0:n.docs)===null||i===void 0?void 0:i.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(u=r.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    rhs: true
  }
}`},(c=(m=r.parameters)===null||m===void 0?void 0:m.docs)===null||c===void 0?void 0:c.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(p=l.parameters)===null||p===void 0?void 0:p.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowIndeterminate: true
  }
}`},(b=(v=l.parameters)===null||v===void 0?void 0:v.docs)===null||b===void 0?void 0:b.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(f=o.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(h=(g=o.parameters)===null||g===void 0?void 0:g.docs)===null||h===void 0?void 0:h.source)})});const w=Object.freeze(Object.defineProperty({__proto__:null,AllowIndeterminate:l,Disabled:o,Primary:a,RHS:r,default:x},Symbol.toStringTag,{value:"Module"}));export{l as A,w as C,o as D,a as P,r as R};
