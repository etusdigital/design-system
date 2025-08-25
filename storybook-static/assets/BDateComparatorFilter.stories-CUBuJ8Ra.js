import{_ as o}from"./BDateComparatorFilter-B4e5W3rz.js";import{c as e}from"./index-BQ4pCYp0.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Option-BBYBztsW.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const c={component:o,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"Date[] | Date[][] | null"},table:{defaultValue:{summary:null}},description:"Will be the current date or period."},labelValue:{type:{summary:"text"},description:"Will be the date comparator label."},lang:{type:{summary:"text"},table:{defaultValue:{summary:"en-US"}},description:"Will be the date input language."},isCompare:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Will determine if the user can select 2 period."},maxInit:{type:{summary:"Date"},table:{defaultValue:{summary:null}},description:"Will be the oldest date the user can select."},maxEnd:{type:{summary:"Date"},table:{defaultValue:{summary:null}},description:"Will be the newest date the user can select."},options:{type:{summary:"array"},description:"Will the predetermined options."},absolute:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Makes the content dropdown have an absolute position."},disabled:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},required:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},isError:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Activate error mode."},errorMessage:{type:{summary:"text"},description:"Will be the error message."},expanded:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},alignRight:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Determine if the dropdown will be right-aligned. To work absolute needs to be true."},separator:{type:{summary:"text"},description:"If two period are selected, this property will separate them."},default:{description:"This slot will be displayed on the select area."},apply:{description:"This function will be called when the apply button is clicked."},"compare-text":{description:"This slot will be the checkbox text."},"clear-text":{description:"This slot will be the clear button text."},"apply-text":{description:"This slot will be the apply button text."},actions:{description:"Slot to replace the actions area."}}},n={modelValue:null,labelValue:"label",lang:"en-US",isCompare:!1,maxInit:void 0,maxEnd:void 0,disabled:!1,required:!1,isError:!1,errorMessage:"",absolute:!1,expanded:!1,alignRight:!1,separator:"",options:[{selected:!0,value:"today",label:"Today",calculate:()=>e("today")},{value:"yesterday",label:"Yesterday",calculate:()=>e("yesterday")},{value:"last7",label:"Last 7 days",calculate:()=>e("last7")},{value:"last15",label:"Last 15 days",calculate:()=>e("last15")},{value:"last30",label:"Last 30 days",calculate:()=>e("last30")},{value:"lastMonth",label:"Last month",calculate:()=>e("lastMonth")}]},a={render:s=>({setup(){return{args:s}},template:`
            <BDateComparatorFilter
                v-model="args.modelValue"
                v-model:expanded="args.expanded"
                :labelValue="args.labelValue"
                :lang="args.lang"
                :is-compare="args.isCompare"
                :max-init="args.maxInit"
                :max-end="args.maxEnd"
                :options="args.options"
                :disabled="args.disabled"
                :required="args.required"
                :is-error="args.isError"
                :error-message="args.errorMessage"
                :absolute="args.absolute"
                :separator="args.separator"
                :align-right="args.alignRight"
            >
                Date Filter
                <template #clear-text>
                    Clear
                </template>
                <template #compare-text>
                    Compare two periods
                </template>
            </BDateComparatorFilter>
        `}),args:n};var t,r,l;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
            <BDateComparatorFilter
                v-model="args.modelValue"
                v-model:expanded="args.expanded"
                :labelValue="args.labelValue"
                :lang="args.lang"
                :is-compare="args.isCompare"
                :max-init="args.maxInit"
                :max-end="args.maxEnd"
                :options="args.options"
                :disabled="args.disabled"
                :required="args.required"
                :is-error="args.isError"
                :error-message="args.errorMessage"
                :absolute="args.absolute"
                :separator="args.separator"
                :align-right="args.alignRight"
            >
                Date Filter
                <template #clear-text>
                    Clear
                </template>
                <template #compare-text>
                    Compare two periods
                </template>
            </BDateComparatorFilter>
        \`
  }),
  args: defaultArgs
}`,...(l=(r=a.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const g=["Primary"];export{a as Primary,g as __namedExportsOrder,c as default};
