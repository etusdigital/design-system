import{aT as s,_ as e}from"./iframe-CtDmrYwJ.js";const l=""+new URL("banner-DtzB6Oss.jpg",import.meta.url).href;var a,t,n;const i={component:s,argTypes:{modelValue:{type:{name:"other",value:"File"},description:"This property will be the file to crop."},src:{type:{name:"other",value:"File"},description:"This property will be the image to crop."},width:{type:{name:"string"},table:{defaultValue:{summary:"360px"}},description:"This property will be the component width."},height:{type:{name:"string"},table:{defaultValue:{summary:"200px"}},description:"This property will be the component height."}}};var p={modelValue:void 0,src:l,width:"360px",height:"200px"},r={render:function(o){return{components:{Crop:s},setup:function(){return{args:o}},template:`
      <Crop
          v-model="args.modelValue"
          :src="args.src"
          :width="args.width"
          :height="args.height"
      />
      <span class="block mt-sm">Model value (it can have a delay):</span>
      <img class="mt-sm border-xxs border-neutral-background-negative border-solid" :src="args.modelValue" />`}},args:p};r.parameters=e(e({},r.parameters),{docs:e(e({},(a=r.parameters)===null||a===void 0?void 0:a.docs),{source:e({originalSource:`{
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
      <img class="mt-sm border-xxs border-neutral-background-negative border-solid" :src="args.modelValue" />\`
  }),
  args: defaultArgs
}`},(n=(t=r.parameters)===null||t===void 0?void 0:t.docs)===null||n===void 0?void 0:n.source)})});const m=Object.freeze(Object.defineProperty({__proto__:null,Primary:r,default:i},Symbol.toStringTag,{value:"Module"}));export{m as C,r as P};
