import{B as t}from"./BTab-BAREJeQN.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const O={component:t,tags:["autodocs"],argTypes:{modelValue:{description:"Aba atualmente selecionada (v-model).",control:{type:"object"},table:{type:{summary:"any"},defaultValue:{summary:"undefined"}}},items:{description:"Array de strings ou objetos para as abas. Objetos podem ter { label, value, icon }.",control:{type:"object"},table:{type:{summary:"string[] | Item[]"}}},isIcon:{description:"Se verdadeiro, exibe os ícones dos itens (se definidos) em vez dos labels.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},notCard:{description:"Se verdadeiro, remove o estilo de card/background que envolve as abas.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},o={modelValue:void 0,items:["Option 1","Option 2","Option 3","Option 4","Option 5"],isIcon:!1,notCard:!1},l=n=>({components:{BTab:t},setup(){return{args:n}},template:`
    <BTab
        class="w-fit"
        v-model="args.modelValue" 
        :items="args.items"
        :size="args.size"
        :is-icon="args.isIcon"
        :not-card="args.notCard"
    />
  `}),e={render:l,args:o},a={render:n=>({components:{BTab:t},setup(){return{args:n}},template:`
      <div class="flex flex-col gap-lg">
          <BTab
              class="w-fit"
              v-model="args.modelValue" 
              :items="args.items"
              :is-icon="args.isIcon"
              :not-card="args.notCard"
          />
          <BTab 
              v-model="args.modelValue" 
              :items="args.items"
              :is-icon="args.isIcon"
              :not-card="args.notCard"
          />
      </div>
    `}),args:o},s={render:l,args:{...o,isIcon:!0,items:["laptop","smartphone"]}},r={render:l,args:{...o,items:[{label:"Laptop",value:"laptop",icon:"laptop"},{label:"Smartphone",value:"smartphone",icon:"smartphone"}]}};var i,d,m;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var c,p,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BTab
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-lg">
          <BTab
              class="w-fit"
              v-model="args.modelValue" 
              :items="args.items"
              :is-icon="args.isIcon"
              :not-card="args.notCard"
          />
          <BTab 
              v-model="args.modelValue" 
              :items="args.items"
              :is-icon="args.isIcon"
              :not-card="args.notCard"
          />
      </div>
    \`
  }),
  args: defaultArgs
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,b,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isIcon: true,
    items: ["laptop", "smartphone"]
  }
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var y,v,I;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    items: [{
      label: "Laptop",
      value: "laptop",
      icon: "laptop"
    }, {
      label: "Smartphone",
      value: "smartphone",
      icon: "smartphone"
    }]
  }
}`,...(I=(v=r.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};const T=["Primary","Sizes","Icons","ObjectArray"];export{s as Icons,r as ObjectArray,e as Primary,a as Sizes,T as __namedExportsOrder,O as default};
