import{_ as n}from"./BExpandableContainer-CbxCBpVW.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Container-I2pMHj_T.js";import"./OptionalModel-8moGuuLP.js";import"./Label-jj1xFjf_.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const p={component:n,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Used to know if the container is expanded."},labelValue:{type:{summary:"text"},description:"Will be the expandable container label"},absolute:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Makes the content dropdown have an absolute position."},disabled:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},isError:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Activate error mode."},errorMessage:{type:{summary:"text"},description:"This will be the error message."},infoMessage:{type:{summary:"text"},description:"This will be the info message."},required:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},closeOnBlur:{type:{summary:"boolean"},table:{defaultValue:{summary:!0}},description:"Closes the content box when focus moves outside the component."},alignRight:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Determine if the dropdown will be right-aligned. To work absolute needs to be true."},maxHeight:{type:{summary:"text"},table:{defaultValue:{summary:"36px"}},description:"Set the select max height."},minWidth:{type:{summary:"text"},table:{defaultValue:{summary:"unset"}},description:"Set the select min width."},secondary:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},hideArrow:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"Hide the arrow icon."},default:{description:"This slot will be displayed on the select area."},content:{description:"This slot will be displayed on the content area."}}},e={render:t=>({setup(){return{args:t}},template:`
      <BExpandableContainer 
          v-model="args.modelValue" 
          :labelValue="args.labelValue"
          :required="args.required"
          :error-message="args.errorMessage"
          :info-message="args.infoMessage"
          :is-error="args.isError"
          :absolute="args.absolute" 
          :disabled="args.disabled" 
          :close-on-blur="args.closeOnBlur" 
          :align-right="args.alignRight"
          :max-height="args.maxHeight"
          :min-width="args.minWidth"
          :secondary="args.secondary"
          :hide-arrow="args.hideArrow"
      >
          <BIcon name="sentiment_satisfied" size="22px" unfilled class="text-base shrink-0 h-[1em] flex items-center" />
          <span class="truncate">Select container example</span>

          <template #content>
              <div class="flex flex-col gap-xxs rounded-xxs overflow-hidden min-w-[20em]">
                  <div v-for="i in [1, 2, 3, 4]" :key="\`item-\${i}\`" class="flex items-center justify-center w-full cursor-pointer hover:bg-primary-surface-hover hover:text-primary-interaction-default p-xs pr-xxs">
                      Option {{ i }}
                  </div>
              </div>
          </template>
      </BExpandableContainer>
    `}),args:{modelValue:!1,labelValue:"label",absolute:!1,disabled:!1,isError:!1,errorMessage:"",infoMessage:"",required:!1,alignRight:!1,closeOnBlur:!0,maxHeight:"36px",minWidth:"unset",secondary:!1,hideArrow:!1}};var a,r,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
      <BExpandableContainer 
          v-model="args.modelValue" 
          :labelValue="args.labelValue"
          :required="args.required"
          :error-message="args.errorMessage"
          :info-message="args.infoMessage"
          :is-error="args.isError"
          :absolute="args.absolute" 
          :disabled="args.disabled" 
          :close-on-blur="args.closeOnBlur" 
          :align-right="args.alignRight"
          :max-height="args.maxHeight"
          :min-width="args.minWidth"
          :secondary="args.secondary"
          :hide-arrow="args.hideArrow"
      >
          <BIcon name="sentiment_satisfied" size="22px" unfilled class="text-base shrink-0 h-[1em] flex items-center" />
          <span class="truncate">Select container example</span>

          <template #content>
              <div class="flex flex-col gap-xxs rounded-xxs overflow-hidden min-w-[20em]">
                  <div v-for="i in [1, 2, 3, 4]" :key="\\\`item-\\\${i}\\\`" class="flex items-center justify-center w-full cursor-pointer hover:bg-primary-surface-hover hover:text-primary-interaction-default p-xs pr-xxs">
                      Option {{ i }}
                  </div>
              </div>
          </template>
      </BExpandableContainer>
    \`
  }),
  args: {
    modelValue: false,
    labelValue: "label",
    absolute: false,
    disabled: false,
    isError: false,
    errorMessage: "",
    infoMessage: "",
    required: false,
    alignRight: false,
    closeOnBlur: true,
    maxHeight: "36px",
    minWidth: "unset",
    secondary: false,
    hideArrow: false
  }
}`,...(s=(r=e.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const c=["Primary"];export{e as Primary,c as __namedExportsOrder,p as default};
