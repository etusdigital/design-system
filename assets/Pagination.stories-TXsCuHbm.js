import{t as o,_ as e}from"./iframe-D9ZodyF1.js";var r,n,t;const s={component:o,argTypes:{modelValue:{type:{name:"number"},table:{defaultValue:{summary:"1"}},description:"This property will be the selected page."},length:{type:{name:"number"},table:{defaultValue:{summary:"1"}},description:"This property will be the number of pages."}}};var i={modelValue:1,length:10},u=function(l){return{components:{Pagination:o},setup:function(){return{args:l}},template:`
    <Pagination 
      v-model="args.modelValue"
      :length="args.length"
    />
  `}},a={render:u,args:i};a.parameters=e(e({},a.parameters),{docs:e(e({},(r=a.parameters)===null||r===void 0?void 0:r.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(t=(n=a.parameters)===null||n===void 0?void 0:n.docs)===null||t===void 0?void 0:t.source)})});const m=Object.freeze(Object.defineProperty({__proto__:null,Primary:a,default:s},Symbol.toStringTag,{value:"Module"}));export{m as P,a};
