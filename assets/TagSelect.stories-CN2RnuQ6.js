import{X as w,_ as e}from"./iframe-BB_wyZkI.js";var i,u,p,c,m,g,b,v,f,y,h,_,S,T,M,V,A,R;const q={component:w,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will be the array containing the value of the tags."},labelValue:{type:{name:"string"},description:"Will be the input label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.'},icon:{type:{name:"string"}},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},buttonLabel:{type:{name:"string"},table:{defaultValue:{summary:"Add"}},description:"This property will be the add button text."},"search-label":{description:"This slot will be placeholder for the search input."},"no-options-found":{description:"This slot will be displayed when the search results in no options."},"empty-state":{description:"This slot will be displayed if options is an empty array."},option:{description:"This slot will be displayed as an option. Params: option and index."},default:{description:"Custom trigger element to replace the default tag select button."}}};var r={modelValue:void 0,expanded:!1,options:[],labelValue:"label",labelKey:"label",buttonLabel:"Add",required:!1,errorMessage:"",infoMessage:"",icon:"",isError:!1,disabled:!1},a=function(E){return{components:{TagSelect:w},setup:function(){return{args:E}},template:`
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
    `}},s={render:a,args:e({},r)},o={render:a,args:e(e({},r),{icon:"search"})},n={render:a,args:e(e({},r),{disabled:!0})},l={render:a,args:e(e({},r),{required:!0})},t={render:a,args:e(e({},r),{isError:!0,errorMessage:"Error message"})},d={render:a,args:e(e({},r),{infoMessage:"Info message"})};s.parameters=e(e({},s.parameters),{docs:e(e({},(i=s.parameters)===null||i===void 0?void 0:i.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs
  }
}`},(p=(u=s.parameters)===null||u===void 0?void 0:u.docs)===null||p===void 0?void 0:p.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(c=o.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "search"
  }
}`},(g=(m=o.parameters)===null||m===void 0?void 0:m.docs)===null||g===void 0?void 0:g.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(b=n.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(f=(v=n.parameters)===null||v===void 0?void 0:v.docs)===null||f===void 0?void 0:f.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(y=l.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(_=(h=l.parameters)===null||h===void 0?void 0:h.docs)===null||_===void 0?void 0:_.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(S=t.parameters)===null||S===void 0?void 0:S.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(M=(T=t.parameters)===null||T===void 0?void 0:T.docs)===null||M===void 0?void 0:M.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(V=d.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(R=(A=d.parameters)===null||A===void 0?void 0:A.docs)===null||R===void 0?void 0:R.source)})});const I=Object.freeze(Object.defineProperty({__proto__:null,Disabled:n,Icon:o,InfoMessage:d,IsError:t,Primary:s,Required:l,default:q},Symbol.toStringTag,{value:"Module"}));export{n as D,o as I,s as P,l as R,I as T,t as a,d as b};
