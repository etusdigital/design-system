import{W as I,_ as e}from"./iframe-1aJ3cS75.js";var u,p,c,m,g,v,b,f,y,h,_,S,A,T,M,V,R,w,E,q,x;const W={component:I,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will be the array containing the value of the tags."},labelValue:{type:{name:"string"},description:"Will be the input label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.'},icon:{type:{name:"string"}},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},buttonLabel:{type:{name:"string"},table:{defaultValue:{summary:"Add"}},description:"This property will be the add button text."},"search-label":{description:"This slot will be placeholder for the search input."},"no-options-found":{description:"This slot will be displayed when the search results in no options."},"empty-state":{description:"This slot will be displayed if options is an empty array."},option:{description:"This slot will be displayed as an option. Params: option and index."}}};var r={modelValue:void 0,expanded:!1,options:[],labelValue:"label",labelKey:"label",buttonLabel:"Add",required:!1,errorMessage:"",infoMessage:"",icon:"",isError:!1,disabled:!1,absolute:!1},a=function(j){return{components:{TagSelect:I},setup:function(){return{args:j}},template:`
    <TagSelect
        v-model="args.modelValue"
        :v-model:expanded="args.expanded"
        :options="args.options"
        :labelValue="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :icon="args.icon"
        :required="args.required"
        :label-key="args.labelKey"
        :absolute="args.absolute"
    >
        <template #search-label>
            Search
        </template>
        <template #no-options-found>
            No result found
        </template>
        <template #empty-state>
            No tags created yet
        </template>
    </TagSelect>
    `}},s={render:a,args:e({},r)},o={render:a,args:e(e({},r),{icon:"search"})},n={render:a,args:e(e({},r),{absolute:!0})},l={render:a,args:e(e({},r),{disabled:!0})},t={render:a,args:e(e({},r),{required:!0})},d={render:a,args:e(e({},r),{isError:!0,errorMessage:"Error message"})},i={render:a,args:e(e({},r),{infoMessage:"Info message"})};s.parameters=e(e({},s.parameters),{docs:e(e({},(u=s.parameters)===null||u===void 0?void 0:u.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs
  }
}`},(c=(p=s.parameters)===null||p===void 0?void 0:p.docs)===null||c===void 0?void 0:c.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(m=o.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "search"
  }
}`},(v=(g=o.parameters)===null||g===void 0?void 0:g.docs)===null||v===void 0?void 0:v.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(b=n.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true
  }
}`},(y=(f=n.parameters)===null||f===void 0?void 0:f.docs)===null||y===void 0?void 0:y.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(h=l.parameters)===null||h===void 0?void 0:h.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(S=(_=l.parameters)===null||_===void 0?void 0:_.docs)===null||S===void 0?void 0:S.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(A=t.parameters)===null||A===void 0?void 0:A.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(M=(T=t.parameters)===null||T===void 0?void 0:T.docs)===null||M===void 0?void 0:M.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(V=d.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(w=(R=d.parameters)===null||R===void 0?void 0:R.docs)===null||w===void 0?void 0:w.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(E=i.parameters)===null||E===void 0?void 0:E.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(x=(q=i.parameters)===null||q===void 0?void 0:q.docs)===null||x===void 0?void 0:x.source)})});const P=Object.freeze(Object.defineProperty({__proto__:null,Absolute:n,Disabled:l,Icon:o,InfoMessage:i,IsError:d,Primary:s,Required:t,default:W},Symbol.toStringTag,{value:"Module"}));export{n as A,l as D,o as I,s as P,t as R,P as T,d as a,i as b};
