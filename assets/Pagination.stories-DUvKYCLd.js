import{v as i,_ as e}from"./iframe-LJwCixq7.js";var n,l,o,s,t,d;const p={component:i,argTypes:{modelValue:{type:{name:"number"},table:{defaultValue:{summary:"1"}},description:"This property will be the selected page."},length:{type:{name:"number"},table:{defaultValue:{summary:"1"}},description:"This property will be the number of pages."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Disables all page navigation."}}};var u={modelValue:1,length:10,disabled:!1},m=function(g){return{components:{Pagination:i},setup:function(){return{args:g}},template:`
    <Pagination 
      v-model="args.modelValue"
      :length="args.length"
      :disabled="args.disabled"
    />
  `}},a={render:m,args:u},r={render:m,args:e(e({},u),{modelValue:5,disabled:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(n=a.parameters)===null||n===void 0?void 0:n.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(o=(l=a.parameters)===null||l===void 0?void 0:l.docs)===null||o===void 0?void 0:o.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(s=r.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: 5,
    disabled: true
  }
}`},(d=(t=r.parameters)===null||t===void 0?void 0:t.docs)===null||d===void 0?void 0:d.source)})});const b=Object.freeze(Object.defineProperty({__proto__:null,Disabled:r,Primary:a,default:p},Symbol.toStringTag,{value:"Module"}));export{r as D,b as P,a};
