import{a0 as b,_ as e}from"./iframe-1aJ3cS75.js";var r,t,n,s,i,d,u,c,p;const f={component:b,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will be the selected current value."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Will be the options."},labelKey:{type:{name:"string"},description:"Will be the label key."},valueKey:{type:{name:"string"},description:"Will be the value key."},getObject:{type:{name:"boolean"},description:"Will be the get object."},disabled:{type:{name:"boolean"},description:"Will be the disabled."},multiple:{type:{name:"boolean"},description:"Will be the multiple."}}};var m={modelValue:void 0,options:[{label:"Documents",value:"documents",icon:"inbox",options:[{label:"Work",value:"work",icon:"settings",options:[{label:"Settings.txt",value:"settings.txt",icon:"draft"},{label:"Code.js",value:"code.js",icon:"draft"}]},{label:"Personal",value:"personal",icon:"person",options:[{label:"Account.txt",value:"account.txt",icon:"draft"}]}]},{label:"Downloads",value:"downloads",icon:"download",options:[{label:"Image.jpg",value:"image.jpg",icon:"draft"}]},{label:"Music",value:"music",icon:"queue_music",options:[{label:"Music.mp3",value:"music.mp3",icon:"music_note"}]}],labelKey:"label",valueKey:"value",getObject:!1,multiple:!1,disabled:!1},v=function(g){return{components:{Tree:b},setup:function(){return{args:g}},template:`
    <Tree
      v-model="args.modelValue"
      :options="args.options" 
      :label-key="args.labelKey" 
      :value-key="args.valueKey" 
      :get-object="args.getObject" 
      :multiple="args.multiple" 
      :disabled="args.disabled"
    />
  `}},a={render:v,args:m},l={render:v,args:e(e({},m),{multiple:!0})},o={render:v,args:e(e({},m),{disabled:!0})};a.parameters=e(e({},a.parameters),{docs:e(e({},(r=a.parameters)===null||r===void 0?void 0:r.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(n=(t=a.parameters)===null||t===void 0?void 0:t.docs)===null||n===void 0?void 0:n.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(s=l.parameters)===null||s===void 0?void 0:s.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    multiple: true
  }
}`},(d=(i=l.parameters)===null||i===void 0?void 0:i.docs)===null||d===void 0?void 0:d.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(u=o.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(p=(c=o.parameters)===null||c===void 0?void 0:c.docs)===null||p===void 0?void 0:p.source)})});const _=Object.freeze(Object.defineProperty({__proto__:null,Disabled:o,Multiple:l,Primary:a,default:f},Symbol.toStringTag,{value:"Module"}));export{o as D,l as M,a as P,_ as T};
