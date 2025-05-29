import{_ as s}from"./BDateFilter-B1sjN-x4.js";import{c as e}from"./index-BQ4pCYp0.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Option-BBYBztsW.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const c={component:s,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"Date[] | any[]"},table:{defaultValue:{summary:"[]"}},description:"Will be the current date or period."},labelValue:{type:{summary:"text"},description:"Will be the date filter label"},lang:{type:{summary:"text"},table:{defaultValue:{summary:"en-US"}},description:"Will be the date input language."},maxInit:{type:{summary:"Date"},table:{defaultValue:{summary:null}},description:"Will be the oldest date the user can select."},maxEnd:{type:{summary:"Date"},table:{defaultValue:{summary:null}},description:"Will be the newest date the user can select."},options:{type:{summary:"array"},description:"Will the predetermined options."},absolute:{type:{summary:"boolean"},table:{defaultValue:{summary:!0}},description:"Makes the content dropdown have an absolute position."},disabled:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},isError:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Activate error mode."},errorMessage:{type:{summary:"text"},description:"Will be the error message."},apply:{description:"This function will be called when the apply button is clicked."},default:{description:"This slot will be displayed on the select area."},"clear-text":{description:"This slot will be the clear button text."},"apply-text":{description:"This slot will be the apply button text."},actions:{description:"Slot to replace the actions area."}}},o={modelValue:[],labelValue:"label",lang:"en-US",maxInit:void 0,maxEnd:void 0,disabled:!1,required:!1,isError:!1,errorMessage:"",absolute:!1,options:[{label:"Today",value:"today",selected:!0,calculate:()=>e("today")},{label:"Yesterday",value:"yesterday",calculate:()=>e("yesterday")},{label:"Last 7 days",value:"last7",calculate:()=>e("last7")},{label:"Last 15 days",value:"last15",calculate:()=>e("last15")},{label:"Last 30 days",value:"last30",calculate:()=>e("last30")},{label:"Last month",value:"lastMonth",calculate:()=>e("lastMonth")}]},a={render:n=>({components:{BDateFilter:s},setup(){return{args:n}},template:`
            <BDateFilter
                v-model="args.modelValue"
                :labelValue="args.labelValue"
                :lang="args.lang"
                :max-init="args.maxInit"
                :max-end="args.maxEnd"
                :options="args.options"
                :absolute="args.absolute"
                :disabled="args.disabled"
                :required="args.required"
                :is-error="args.isError"
                :error-message="args.errorMessage"
            >
                Date Filter
                <template #clear-text>
                    Clear
                </template>
            </BDateFilter>
        `}),args:o};var t,r,l;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BDateFilter
    },
    setup() {
      return {
        args
      };
    },
    template: \`
            <BDateFilter
                v-model="args.modelValue"
                :labelValue="args.labelValue"
                :lang="args.lang"
                :max-init="args.maxInit"
                :max-end="args.maxEnd"
                :options="args.options"
                :absolute="args.absolute"
                :disabled="args.disabled"
                :required="args.required"
                :is-error="args.isError"
                :error-message="args.errorMessage"
            >
                Date Filter
                <template #clear-text>
                    Clear
                </template>
            </BDateFilter>
        \`
  }),
  args: defaultArgs
}`,...(l=(r=a.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const b=["Primary"];export{a as Primary,b as __namedExportsOrder,c as default};
