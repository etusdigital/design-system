import{a3 as n,_ as e}from"./iframe-CEhHUQ6Y.js";const l=""+new URL("banner-DtzB6Oss.jpg",import.meta.url).href;var a,s,t;const i={component:n,argTypes:{modelValue:{type:{name:"other",value:"File"},description:"This property will be the file to crop."},src:{type:{name:"other",value:"File"},description:"This property will be the image to crop."},width:{type:{name:"string"},table:{defaultValue:{summary:"360px"}},description:"This property will be the component width."},height:{type:{name:"string"},table:{defaultValue:{summary:"200px"}},description:"This property will be the component height."}}};var p={modelValue:void 0,src:l,width:"360px",height:"200px"},r={render:function(o){return{components:{Crop:n},setup:function(){return{args:o}},template:`
      <Crop
          v-model="args.modelValue"
          :src="args.src"
          :width="args.width"
          :height="args.height"
      />
      <span class="block mt-sm">Model value (it can have a delay):</span>
      <img class="mt-sm border-xxs border-black border-solid" :src="args.modelValue" />`}},args:p};r.parameters=e(e({},r.parameters),{docs:e(e({},(a=r.parameters)===null||a===void 0?void 0:a.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Crop
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Crop
          v-model="args.modelValue"
          :src="args.src"
          :width="args.width"
          :height="args.height"
      />
      <span class="block mt-sm">Model value (it can have a delay):</span>
      <img class="mt-sm border-xxs border-black border-solid" :src="args.modelValue" />\`
  }),
  args: defaultArgs
}`},(t=(s=r.parameters)===null||s===void 0?void 0:s.docs)===null||t===void 0?void 0:t.source)})});const m=Object.freeze(Object.defineProperty({__proto__:null,Primary:r,default:i},Symbol.toStringTag,{value:"Module"}));export{m as C,r as P};
