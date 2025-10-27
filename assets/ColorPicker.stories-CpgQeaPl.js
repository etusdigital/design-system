import{i,_ as e}from"./iframe-CEhHUQ6Y.js";var a,n,t,s,l,d;const m={component:i,argTypes:{modelValue:{type:{name:"string"}},type:{type:{name:"string"},control:"select",options:["hexa","hsla","hwb","hsva","rgba"],table:{defaultValue:{summary:"hexa"}},description:"This property will be the color type."},noShadow:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"When noShadow property is true, the card will have no shadow."}}};var u={modelValue:"",type:"hexa",noShadow:!1},c=function(p){return{components:{ColorPicker:i},setup:function(){return{args:p}},template:`
    <ColorPicker 
      v-model="args.modelValue" 
      :type="args.type" 
      :no-shadow="args.noShadow" 
    />
  `}},r={render:c,args:u},o={render:c,args:e(e({},u),{noShadow:!0})};r.parameters=e(e({},r.parameters),{docs:e(e({},(a=r.parameters)===null||a===void 0?void 0:a.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(t=(n=r.parameters)===null||n===void 0?void 0:n.docs)===null||t===void 0?void 0:t.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(s=o.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    noShadow: true
  }
}`},(d=(l=o.parameters)===null||l===void 0?void 0:l.docs)===null||d===void 0?void 0:d.source)})});const g=Object.freeze(Object.defineProperty({__proto__:null,NoShadow:o,Primary:r,default:m},Symbol.toStringTag,{value:"Module"}));export{g as C,o as N,r as P};
