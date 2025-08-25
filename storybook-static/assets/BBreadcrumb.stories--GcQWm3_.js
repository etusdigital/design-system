import{B as u}from"./BBreadcrumb-BhjkHv1V.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./Option-BBYBztsW.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./index-BQ4pCYp0.js";const v={component:u,tags:["autodocs"],argTypes:{modelValue:{type:{summary:"any"},description:"This property will be the selected item."},items:{type:{summary:"array"},description:"This property will be the number of pages."},labelKey:{type:{summary:"string"},table:{defaultValue:{summary:"label"}},description:"This property will be the key of the label."},valueKey:{type:{summary:"string"},table:{defaultValue:{summary:"value"}},description:"This property will be the key of the value."},getObject:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:"If true, the selected value will be an object instead of value-key value."}}},n={modelValue:"Home",items:["Home","Dashboard","Profile","Settings"],labelKey:"label",valueKey:"value",getObject:!1},d=i=>({components:{BBreadcrumb:u},setup(){return{args:i}},template:`
    <BBreadcrumb 
      v-model="args.modelValue"
      :items="args.items"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :get-object="args.getObject"
    />
  `}),e={render:d,args:n},a={render:d,args:{...n,modelValue:1,getObject:!0,items:[{label:"Home",value:1},{label:"Dashboard",value:2},{label:"Profile",value:3}]}};var r,t,l;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`,...(l=(t=e.parameters)==null?void 0:t.docs)==null?void 0:l.source}}};var s,o,m;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: 1,
    getObject: true,
    items: [{
      label: "Home",
      value: 1
    }, {
      label: "Dashboard",
      value: 2
    }, {
      label: "Profile",
      value: 3
    }]
  }
}`,...(m=(o=a.parameters)==null?void 0:o.docs)==null?void 0:m.source}}};const h=["Primary","ObjectArray"];export{a as ObjectArray,e as Primary,h as __namedExportsOrder,v as default};
