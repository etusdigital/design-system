import{i as v,_ as e}from"./iframe-Bcyu0myu.js";var s,n,l,d,t,i,u,p,c;const f={component:v,argTypes:{modelValue:{type:{name:"string"}},type:{type:{name:"string"},control:"select",options:["hexa","hsla","hwb","hsva","rgba"],table:{defaultValue:{summary:"hexa"}},description:"This property will be the color type."},noShadow:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"When noShadow property is true, the card will have no shadow."},showAlpha:{type:{name:"boolean"},table:{defaultValue:{summary:"true"}},description:"When true, the opacity/alpha slider is shown."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"When disabled is true, the color picker is non-interactive."}}};var m={modelValue:"",type:"hexa",noShadow:!1,showAlpha:!0,disabled:!1},h=function(g){return{components:{ColorPicker:v},setup:function(){return{args:g}},template:`
    <ColorPicker
      v-model="args.modelValue"
      :type="args.type"
      :no-shadow="args.noShadow"
      :show-alpha="args.showAlpha"
      :disabled="args.disabled"
    />
  `}},a={render:h,args:m},r={render:h,args:e(e({},m),{noShadow:!0})},o={render:h,args:e(e({},m),{disabled:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(s=a.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(l=(n=a.parameters)===null||n===void 0?void 0:n.docs)===null||l===void 0?void 0:l.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(d=r.parameters)===null||d===void 0?void 0:d.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    noShadow: true
  }
}`},(i=(t=r.parameters)===null||t===void 0?void 0:t.docs)===null||i===void 0?void 0:i.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(u=o.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(c=(p=o.parameters)===null||p===void 0?void 0:p.docs)===null||c===void 0?void 0:c.source)})});const y=Object.freeze(Object.defineProperty({__proto__:null,Disabled:o,NoShadow:r,Primary:a,default:f},Symbol.toStringTag,{value:"Module"}));export{y as C,o as D,r as N,a as P};
