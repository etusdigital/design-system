import{c as O,_ as e}from"./iframe-BByBBolI.js";var u,p,g,m,c,v,f,b,_,h,y,A,M,x,q,V,C,E;const R={component:O,argTypes:{modelValue:{type:{name:"string"},description:"Will be the input current value."},expanded:{type:{name:"boolean"},description:"Will be the input current value."},labelValue:{type:{name:"string"},description:"Will be the select label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Array of values to be used as options."},placeholder:{type:{name:"string"}},required:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Makes the select container required."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},option:{description:"This slot will be displayed as an option. Params: option and index."}}};var r={modelValue:void 0,expanded:!1,options:["Option 1","Option 2","Option 3","Option 4","Option 5"],labelValue:"label",placeholder:"Placeholder",disabled:!1,required:!1,isError:!1,errorMessage:"",infoMessage:""},t=function(i){return{setup:function(){return{args:i}},template:`
  <AutoComplete 
      v-model="args.modelValue" 
      v-model:expanded="args.expanded"
      :label-value="args.labelValue"
      :placeholder="args.placeholder"
      :options="args.options"
      :required="args.required" 
      :disabled="args.disabled"
      :is-error="args.isError"
      :error-message="args.errorMessage"
      :info-message="args.infoMessage"
  />`}},a={render:t,args:r},s={render:t,args:e(e({},r),{required:!0})},o={render:t,args:e(e({},r),{disabled:!0})},n={render:t,args:e(e({},r),{isError:!0,errorMessage:"Error message"})},l={render:t,args:e(e({},r),{infoMessage:"Info message"})},d={render:function(i){return{setup:function(){return{args:i}},template:`
    <AutoComplete
      v-model="args.modelValue" 
      v-model:expanded="args.expanded"
      :label-value="args.labelValue"
      :placeholder="args.placeholder"
      :options="args.options"
      :required="args.required" 
      :disabled="args.disabled"
      :is-error="args.isError"
      :error-message="args.errorMessage"
      :info-message="args.infoMessage"
    >
      <template #option="{ option, index }">
        <Icon name="account_circle" size="1rem" class="shrink-0 h-[1em] flex items-center" /> {{ option }}
      </template>
    </AutoComplete>`}},args:r};a.parameters=e(e({},a.parameters),{docs:e(e({},(u=a.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(g=(p=a.parameters)===null||p===void 0?void 0:p.docs)===null||g===void 0?void 0:g.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(m=s.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(v=(c=s.parameters)===null||c===void 0?void 0:c.docs)===null||v===void 0?void 0:v.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(f=o.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(_=(b=o.parameters)===null||b===void 0?void 0:b.docs)===null||_===void 0?void 0:_.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(h=n.parameters)===null||h===void 0?void 0:h.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(A=(y=n.parameters)===null||y===void 0?void 0:y.docs)===null||A===void 0?void 0:A.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(M=l.parameters)===null||M===void 0?void 0:M.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(q=(x=l.parameters)===null||x===void 0?void 0:x.docs)===null||q===void 0?void 0:q.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(V=d.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
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
}`},(E=(C=d.parameters)===null||C===void 0?void 0:C.docs)===null||E===void 0?void 0:E.source)})});const I=Object.freeze(Object.defineProperty({__proto__:null,CustomOption:d,Disabled:o,InfoMessage:l,IsError:n,Primary:a,Required:s,default:R},Symbol.toStringTag,{value:"Module"}));export{I as A,d as C,o as D,n as I,a as P,s as R,l as a};
