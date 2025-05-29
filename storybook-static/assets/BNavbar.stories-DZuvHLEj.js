import{B as o}from"./BNavbar-CwU2vogA.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const f={component:o,tags:["autodocs"],argTypes:{modelValue:{description:"Will be the array containing the value of the tags.",control:{type:"object"},table:{type:{summary:"any[]"}}},title:{description:"Will be the title of the navbar, can be used as a slot or as prop.",control:{type:"text"},table:{type:{summary:"string"}}},items:{description:"Array of object to be used as menu options. Props(label: string, value: string, icon: string, disabled: boolean, bottom: boolean, items: same instruction as items)",control:{type:"object"},table:{type:{summary:"Item[]"}}},profile:{description:"Object to be used as profile. Props(name: string, src: string)",control:{type:"object"},table:{type:{summary:"Profile"}}},logo:{description:"This slot is used to render the logo and title of the navbar.",table:{type:{summary:"slot"}}},default:{description:"This slot is used to render the default content of the navbar.",table:{type:{summary:"slot"}}},actions:{description:"This slot is used to render the actions of the navbar.",table:{type:{summary:"slot"}}}}},r={label:"Home",value:"home",icon:"home"},p={modelValue:[r],title:"Navbar",profile:{name:"John Doe"},items:[r,{label:"Publisher",value:"publisher",icon:"supervisor_account",items:[{label:"Group Account",value:"group-account",icon:"account_balance"}]},{label:"Errors",value:"errors",icon:"error",disabled:!0},{label:"Settings",value:"settings",icon:"settings",bottom:!0}]},d=a=>({components:{BNavbar:o},setup(){return{args:a}},template:`
    <BNavbar
      v-model="args.modelValue"
      :title="args.title"
      :items="args.items"
      :profile="args.profile"
    >
      <template #notifications>
        <div class="p-base">Slot: notifications</div>
      </template>
    </BNavbar>
    `}),e={render:d,args:p},t={render:a=>({components:{BNavbar:o},setup(){return{args:a}},template:`
      <BNavbar>
        <template #title>
          <div>Slot: Title</div>
        </template>
        <h4>Slot: default</h4>
        <template #actions>
          <div>Slot: actions</div>
        </template>
      </BNavbar>
      <BNavbar class="mt-xs">
        <template #logo>
          <div>Slot: logo</div>
        </template>
        <h4>Slot: default</h4>
        <template #actions>
          <div>Slot: actions</div>
        </template>
      </BNavbar>
      `}),args:p};var s,n,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`,...(l=(n=e.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var i,m,c;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BNavbar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BNavbar>
        <template #title>
          <div>Slot: Title</div>
        </template>
        <h4>Slot: default</h4>
        <template #actions>
          <div>Slot: actions</div>
        </template>
      </BNavbar>
      <BNavbar class="mt-xs">
        <template #logo>
          <div>Slot: logo</div>
        </template>
        <h4>Slot: default</h4>
        <template #actions>
          <div>Slot: actions</div>
        </template>
      </BNavbar>
      \`
  }),
  args: defaultArgs
}`,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};const h=["Primary","Slots"];export{e as Primary,t as Slots,h as __namedExportsOrder,f as default};
