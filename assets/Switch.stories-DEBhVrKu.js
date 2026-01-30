import{Q as f,_ as e}from"./iframe-1aJ3cS75.js";var d,n,t,l,o,i,u,c,m;const b={component:f,argTypes:{modelValue:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},rhs:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Puts the button on the right-hand side."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},default:{description:"This slot will be displayed next to the switch button."}}};var p={modelValue:!1,rhs:!1,disabled:!1},v=function(g){return{components:{Switch:f},setup:function(){return{args:g}},template:`
    <Switch
      v-model="args.modelValue"
      :id="args.id"
      :name="args.name"
      :disabled="args.disabled"
      :rhs="args.rhs"
    >
      Switch Label
    </Switch>
  `}},a={render:v,args:p},r={render:v,args:e(e({},p),{rhs:!0})},s={render:v,args:e(e({},p),{disabled:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(d=a.parameters)===null||d===void 0?void 0:d.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(t=(n=a.parameters)===null||n===void 0?void 0:n.docs)===null||t===void 0?void 0:t.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(l=r.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    rhs: true
  }
}`},(i=(o=r.parameters)===null||o===void 0?void 0:o.docs)===null||i===void 0?void 0:i.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(u=s.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(m=(c=s.parameters)===null||c===void 0?void 0:c.docs)===null||m===void 0?void 0:m.source)})});const _=Object.freeze(Object.defineProperty({__proto__:null,Disabled:s,Primary:a,RHS:r,default:b},Symbol.toStringTag,{value:"Module"}));export{s as D,a as P,r as R,_ as S};
