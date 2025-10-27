import{c as P,_ as e}from"./iframe-CEhHUQ6Y.js";var p,g,m,c,v,b,f,_,y,h,A,M,x,V,q,E,C,R,S,O,I;const W={component:P,argTypes:{modelValue:{type:{name:"string"},description:"Will be the input current value."},expanded:{type:{name:"boolean"},description:"Will be the input current value."},labelValue:{type:{name:"string"},description:"Will be the select label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Array of values to be used as options."},placeholder:{type:{name:"string"}},required:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Makes the select container required."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},absolute:{type:{name:"boolean"},table:{defaultValue:{summary:"true"}}},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},option:{description:"This slot will be displayed as an option. Params: option and index."}}};var r={modelValue:void 0,expanded:!1,options:["Option 1","Option 2","Option 3","Option 4","Option 5"],labelValue:"label",placeholder:"Placeholder",disabled:!1,required:!1,absolute:!1,isError:!1,errorMessage:"",infoMessage:""},a=function(u){return{setup:function(){return{args:u}},template:`
  <AutoComplete 
      v-model="args.modelValue" 
      v-model:expanded="args.expanded"
      :label-value="args.labelValue"
      :placeholder="args.placeholder"
      :options="args.options"
      :absolute="args.absolute" 
      :required="args.required" 
      :disabled="args.disabled"
      :is-error="args.isError"
      :error-message="args.errorMessage"
      :info-message="args.infoMessage"
  />`}},s={render:a,args:r},o={render:a,args:e(e({},r),{absolute:!0})},n={render:a,args:e(e({},r),{required:!0})},l={render:a,args:e(e({},r),{disabled:!0})},t={render:a,args:e(e({},r),{isError:!0,errorMessage:"Error message"})},d={render:a,args:e(e({},r),{infoMessage:"Info message"})},i={render:function(u){return{setup:function(){return{args:u}},template:`
    <AutoComplete
      v-model="args.modelValue" 
      v-model:expanded="args.expanded"
      :label-value="args.labelValue"
      :placeholder="args.placeholder"
      :options="args.options"
      :absolute="args.absolute" 
      :required="args.required" 
      :disabled="args.disabled"
      :is-error="args.isError"
      :error-message="args.errorMessage"
      :info-message="args.infoMessage"
    >
      <template #option="{ option, index }">
        <Icon name="account_circle" size="1rem" class="shrink-0 h-[1em] flex items-center" /> {{ option }}
      </template>
    </AutoComplete>`}},args:r};s.parameters=e(e({},s.parameters),{docs:e(e({},(p=s.parameters)===null||p===void 0?void 0:p.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(m=(g=s.parameters)===null||g===void 0?void 0:g.docs)===null||m===void 0?void 0:m.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(c=o.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true
  }
}`},(b=(v=o.parameters)===null||v===void 0?void 0:v.docs)===null||b===void 0?void 0:b.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(f=n.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(y=(_=n.parameters)===null||_===void 0?void 0:_.docs)===null||y===void 0?void 0:y.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(h=l.parameters)===null||h===void 0?void 0:h.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(M=(A=l.parameters)===null||A===void 0?void 0:A.docs)===null||M===void 0?void 0:M.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(x=t.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(q=(V=t.parameters)===null||V===void 0?void 0:V.docs)===null||q===void 0?void 0:q.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(E=d.parameters)===null||E===void 0?void 0:E.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(R=(C=d.parameters)===null||C===void 0?void 0:C.docs)===null||R===void 0?void 0:R.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(S=i.parameters)===null||S===void 0?void 0:S.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
    <AutoComplete
      v-model="args.modelValue" 
      v-model:expanded="args.expanded"
      :label-value="args.labelValue"
      :placeholder="args.placeholder"
      :options="args.options"
      :absolute="args.absolute" 
      :required="args.required" 
      :disabled="args.disabled"
      :is-error="args.isError"
      :error-message="args.errorMessage"
      :info-message="args.infoMessage"
    >
      <template #option="{ option, index }">
        <Icon name="account_circle" size="1rem" class="shrink-0 h-[1em] flex items-center" /> {{ option }}
      </template>
    </AutoComplete>\`
  }),
  args: defaultArgs
}`},(I=(O=i.parameters)===null||O===void 0?void 0:O.docs)===null||I===void 0?void 0:I.source)})});const k=Object.freeze(Object.defineProperty({__proto__:null,Absolute:o,CustomOption:i,Disabled:l,InfoMessage:d,IsError:t,Primary:s,Required:n,default:W},Symbol.toStringTag,{value:"Module"}));export{k as A,i as C,l as D,t as I,s as P,n as R,o as a,d as b};
