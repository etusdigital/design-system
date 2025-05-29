import{B as r}from"./BSideMenu-BQ1gmwT6.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./index-BQ4pCYp0.js";import"./MenuOption-duL0VuYk.js";import"./Option-BBYBztsW.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const f={component:r,tags:["autodocs"],argTypes:{modelValue:{description:"Will name of the selected item.",control:{type:"object"},table:{type:{summary:"any"}}},items:{description:"Array of object to be used as menu options. Props(label: string, value: string, icon: string, path: string, disabled: boolean, bottom: boolean, items: Item[])",control:{type:"object"},table:{type:{summary:"StoryMenuItem[]"}}},parentPath:{description:"Path of the parent all items.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},getObject:{description:"If true, the selected value will be an object instead of value-key value.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}}}},a={label:"Home",value:"home",icon:"home",path:"/",items:[{label:"Publisher",value:"publisher",path:"/publisher",icon:"people",items:[{label:"Group Account",value:"group-account",path:"/group-account",icon:"account_balance"}]}]},c={modelValue:"home",getObject:!1,parentPath:"",items:[{label:"Home",value:"home",icon:"home",path:"/"},{label:"Publisher",value:"publisher",path:"/publisher",icon:"people",items:[{label:"Group Account",value:"group-account",path:"/group-account",icon:"account_balance"}]},{label:"Errors",value:"errors",path:"/errors",icon:"error",disabled:!0},{label:"Settings",value:"settings",path:"/settings",icon:"settings",bottom:!0}]},e={render:n=>({components:{BSideMenu:r},setup(){return{args:n}},template:`
    <div class="h-screen">
    <BSideMenu
      v-model="args.modelValue"
      :items="args.items"
      :get-object="args.getObject"
    />
    </div>
      `}),args:c},t={render:n=>({components:{BSideMenu:r},setup(){return{args:n}},template:`
    <div class="flex h-screen">
    <BMenu
      v-model="args.modelValue"
      :items="args.items"
      get-object
    />
    <BSideMenu
      :items="args.modelValue.items"
      :parent-path="args.modelValue.path"
      :get-object="args.getObject"
    />
    </div>
      `}),args:{...c,modelValue:a,items:[a,{label:"Errors",value:"errors",path:"/errors",icon:"error",disabled:!0},{label:"Settings",value:"settings",path:"/settings",icon:"settings",bottom:!0}]}};var s,o,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSideMenu
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <div class="h-screen">
    <BSideMenu
      v-model="args.modelValue"
      :items="args.items"
      :get-object="args.getObject"
    />
    </div>
      \`
  }),
  args: defaultArgs
}`,...(l=(o=e.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var i,u,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSideMenu
    },
    setup() {
      return {
        args
      };
    },
    template: \`
    <div class="flex h-screen">
    <BMenu
      v-model="args.modelValue"
      :items="args.items"
      get-object
    />
    <BSideMenu
      :items="args.modelValue.items"
      :parent-path="args.modelValue.path"
      :get-object="args.getObject"
    />
    </div>
      \`
  }),
  args: {
    ...defaultArgs,
    modelValue: menuModel,
    items: [menuModel, {
      label: "Errors",
      value: "errors",
      path: "/errors",
      icon: "error",
      disabled: true
    }, {
      label: "Settings",
      value: "settings",
      path: "/settings",
      icon: "settings",
      bottom: true
    }]
  }
}`,...(m=(u=t.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};const j=["Primary","WithMenu"];export{e as Primary,t as WithMenu,j as __namedExportsOrder,f as default};
