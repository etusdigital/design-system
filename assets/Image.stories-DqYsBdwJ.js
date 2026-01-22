import{a4 as l,_ as e}from"./iframe-D9ZodyF1.js";const p=""+new URL("banner-DtzB6Oss.jpg",import.meta.url).href;var n,t,i,o,s,d;const u={component:l,argTypes:{src:{type:{name:"string"},description:"Image source URL"},alt:{type:{name:"string"},description:"Alternative text for the image"},width:{type:{name:"other",value:"string | number"},description:"Width of the image"},height:{type:{name:"other",value:"string | number"},description:"Height of the image"},icon:{type:{name:"string"},description:"Icon name"},preview:{type:{name:"boolean"},control:"boolean",description:"Enable image preview with zoom and rotation controls",table:{defaultValue:{summary:"false"}}}}};var g={src:p,alt:"Sample image",width:"250",icon:"visibility",preview:!1},m=function(c){return{components:{Image:l},setup:function(){return{args:c}},template:`
      <Image
        :src="args.src"
        :alt="args.alt"
        :width="args.width"
        :height="args.height"
        :icon="args.icon"
        :preview="args.preview"
      />
    `}},r={render:m,args:g},a={render:m,args:e(e({},g),{preview:!0})};r.parameters=e(e({},r.parameters),{docs:e(e({},(n=r.parameters)===null||n===void 0?void 0:n.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(i=(t=r.parameters)===null||t===void 0?void 0:t.docs)===null||i===void 0?void 0:i.source)})});a.parameters=e(e({},a.parameters),{docs:e(e({},(o=a.parameters)===null||o===void 0?void 0:o.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    preview: true
  }
}`},(d=(s=a.parameters)===null||s===void 0?void 0:s.docs)===null||d===void 0?void 0:d.source)})});const f=Object.freeze(Object.defineProperty({__proto__:null,Preview:a,Primary:r,default:u},Symbol.toStringTag,{value:"Module"}));export{f as I,r as P,a};
