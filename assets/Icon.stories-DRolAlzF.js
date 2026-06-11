import{r as d,_ as e}from"./iframe-BWv3wzoQ.js";var a,s,o,t,i,l;const m={component:d,argTypes:{name:{type:{name:"string"},description:"This property will be the icon name."},size:{type:{name:"string"},description:"Controls the icon size using CSS font-size values."},filled:{type:{name:"boolean"},description:"Whether to use the filled variant."}}};var u={name:"sentiment_satisfied",size:"24px",filled:!1},c=function(p){return{components:{Icon:d},setup:function(){return{args:p}},template:'<Icon :name="args.name" :size="args.size" :filled="args.filled" />'}},r={render:c,args:u},n={render:c,args:e(e({},u),{filled:!0})};r.parameters=e(e({},r.parameters),{docs:e(e({},(a=r.parameters)===null||a===void 0?void 0:a.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(o=(s=r.parameters)===null||s===void 0?void 0:s.docs)===null||o===void 0?void 0:o.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(t=n.parameters)===null||t===void 0?void 0:t.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    filled: true
  }
}`},(l=(i=n.parameters)===null||i===void 0?void 0:i.docs)===null||l===void 0?void 0:l.source)})});const g=Object.freeze(Object.defineProperty({__proto__:null,Filled:n,Primary:r,default:m},Symbol.toStringTag,{value:"Module"}));export{n as F,g as I,r as P};
