import{Z as k,_ as e}from"./iframe-LJwCixq7.js";var c,p,g,m,b,v,f,h,y,_,S,T,V,w,A,R,M,j,K,x,E,P,q,I;const W={component:k,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"Will be the array containing the value of the tags."},labelValue:{type:{name:"string"},description:"Will be the input label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.'},icon:{type:{name:"string"}},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}},description:"Key used to identify object options (falls back to labelKey when an option has no value)."},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"When true the model holds the whole option object; when false it holds the option value (valueKey)."},searchable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Shows a search input that filters the options."},creatable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Lets the user add the typed text as a new option (Enter, Tab or the add button)."},placeholder:{type:{name:"string"},table:{defaultValue:{summary:"Search"}},description:"Placeholder of the search input. The #search-label slot overrides it."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},buttonLabel:{type:{name:"string"},table:{defaultValue:{summary:"Add"}},description:"This property will be the add button text."},"search-label":{description:"This slot will be placeholder for the search input."},"no-options-found":{description:"This slot will be displayed when the search results in no options."},"empty-state":{description:"This slot will be displayed if options is an empty array."},option:{description:"This slot will be displayed as an option. Params: option and index."},default:{description:"Custom trigger element to replace the default tag select button."}}};var a={modelValue:void 0,expanded:!1,options:["Vue","React","Svelte","Angular"],labelValue:"label",labelKey:"label",valueKey:"value",getObject:!1,searchable:!1,creatable:!1,placeholder:"Search",buttonLabel:"Add",required:!1,errorMessage:"",infoMessage:"",icon:"",isError:!1,disabled:!1},r=function(O){return{components:{TagSelect:k},setup:function(){return{args:O}},template:`
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
        :value-key="args.valueKey"
        :get-object="args.getObject"
        :searchable="args.searchable"
        :creatable="args.creatable"
        :placeholder="args.placeholder"
        :button-label="args.buttonLabel"
    >
        <template #no-options-found>
            No result found
        </template>
        <template #empty-state>
            No tags created yet
        </template>
    </TagSelect>
    `}},s={render:r,args:e({},a)},l={render:r,args:e(e({},a),{icon:"search"})},o={render:r,args:e(e({},a),{disabled:!0})},t={render:r,args:e(e({},a),{required:!0})},n={render:r,args:e(e({},a),{isError:!0,errorMessage:"Error message"})},d={render:r,args:e(e({},a),{infoMessage:"Info message"})},i={render:r,args:e(e({},a),{options:[],searchable:!0,creatable:!0})},u={render:r,args:e(e({},a),{searchable:!0,placeholder:"Filter countries",options:[{label:"Brazil",value:"BR"},{label:"Portugal",value:"PT"},{label:"United States",value:"US"}]})};s.parameters=e(e({},s.parameters),{docs:e(e({},(c=s.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs
  }
}`},(g=(p=s.parameters)===null||p===void 0?void 0:p.docs)===null||g===void 0?void 0:g.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(m=l.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    icon: "search"
  }
}`},(v=(b=l.parameters)===null||b===void 0?void 0:b.docs)===null||v===void 0?void 0:v.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(f=o.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(y=(h=o.parameters)===null||h===void 0?void 0:h.docs)===null||y===void 0?void 0:y.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(_=t.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(T=(S=t.parameters)===null||S===void 0?void 0:S.docs)===null||T===void 0?void 0:T.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(V=n.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(A=(w=n.parameters)===null||w===void 0?void 0:w.docs)===null||A===void 0?void 0:A.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(R=d.parameters)===null||R===void 0?void 0:R.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(j=(M=d.parameters)===null||M===void 0?void 0:M.docs)===null||j===void 0?void 0:j.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(K=i.parameters)===null||K===void 0?void 0:K.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    options: [],
    searchable: true,
    creatable: true
  }
}`},(E=(x=i.parameters)===null||x===void 0?void 0:x.docs)===null||E===void 0?void 0:E.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(P=u.parameters)===null||P===void 0?void 0:P.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true,
    placeholder: "Filter countries",
    options: [{
      label: "Brazil",
      value: "BR"
    }, {
      label: "Portugal",
      value: "PT"
    }, {
      label: "United States",
      value: "US"
    }]
  }
}`},(I=(q=u.parameters)===null||q===void 0?void 0:q.docs)===null||I===void 0?void 0:I.source)})});const B=Object.freeze(Object.defineProperty({__proto__:null,Creatable:i,Disabled:o,Icon:l,InfoMessage:d,IsError:n,Primary:s,Required:t,Searchable:u,default:W},Symbol.toStringTag,{value:"Module"}));export{i as C,o as D,l as I,s as P,t as R,u as S,B as T,n as a,d as b};
