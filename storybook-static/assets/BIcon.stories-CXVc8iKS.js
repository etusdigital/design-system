import{_ as a}from"./BIcon--gaP3tpf.js";import"./vue.esm-bundler-B3dae8Cn.js";const m={component:a,argTypes:{name:{description:"This property will be the icon name.",control:{type:"text"},table:{type:{summary:"string"}}},size:{description:"This property will be the icon size (e.g., '24px', '2rem').",control:{type:"text"},table:{type:{summary:"string"}}},filled:{description:"Determines if the icon should be rendered with a filled style.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},o={name:"sentiment_satisfied",size:"24px",filled:!1},e={render:n=>({components:{BIcon:a},setup:()=>({args:n}),template:'<BIcon :name="args.name" :size="args.size" :filled="args.filled" />'}),args:o};var r,s,t;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BIcon
    },
    setup: () => {
      return {
        args
      };
    },
    template: '<BIcon :name="args.name" :size="args.size" :filled="args.filled" />'
  }),
  args: defaultArgs
}`,...(t=(s=e.parameters)==null?void 0:s.docs)==null?void 0:t.source}}};const p=["Primary"];export{e as Primary,p as __namedExportsOrder,m as default};
