import{_ as n}from"./BDate-9-5pSNvi.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Calendar-B0nci8mL.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./OptionalModel-8moGuuLP.js";const c={component:n,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"Date | Date[] | null"},table:{defaultValue:{summary:null}},description:"Will be the current date or period."},lang:{type:{summary:"text"},table:{defaultValue:{summary:"en-US"}},description:"Will be the date input language."},isPeriod:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Will determine if the user can select 2 dates."},maxInit:{type:{summary:"Date"},table:{defaultValue:{summary:null}},description:"Will be the oldest date the user can select."},maxEnd:{type:{summary:"Date"},table:{defaultValue:{summary:null}},description:"Will be the newest date the user can select."}}},l={modelValue:null,lang:"en-US",isPeriod:!1,maxInit:void 0,maxEnd:void 0},e={render:s=>({components:{BDate:n},setup(){return{args:s}},template:`
      <BDate 
        v-model="args.modelValue" 
        :lang="args.lang" 
        :is-period="args.isPeriod" 
        :max-init="args.maxInit" 
        :max-end="args.maxEnd"
      />
      `}),args:l};var a,t,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BDate
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BDate 
        v-model="args.modelValue" 
        :lang="args.lang" 
        :is-period="args.isPeriod" 
        :max-init="args.maxInit" 
        :max-end="args.maxEnd"
      />
      \`
  }),
  args: defaultArgs
}`,...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};const g=["Primary"];export{e as Primary,g as __namedExportsOrder,c as default};
