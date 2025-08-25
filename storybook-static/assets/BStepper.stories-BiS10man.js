import{B as s}from"./BStepper-DE51vzPj.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const V={component:s,tags:["autodocs"],argTypes:{modelValue:{description:"O valor do passo atual (v-model).",control:{type:"object"},table:{type:{summary:"any"}}},items:{description:"Array de strings ou objetos para os passos. Objetos podem ter { label, value, icon }.",control:{type:"object"},table:{type:{summary:"string[] | { label: string, value?: string, icon?: string }[]"}}},size:{description:"Tamanho do stepper.",control:"select",options:["medium","large"],table:{type:{summary:"'medium' | 'large'"},defaultValue:{summary:"medium"}}},disabled:{description:"Desabilita a interação com os passos.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},allowedSkip:{description:"Permite pular passos (clicar em um passo futuro sem ter passado pelos intermediários).",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},background:{description:"Cor de fundo do stepper (valor CSS string).",control:{type:"color"},table:{type:{summary:"string | undefined"},defaultValue:{summary:"var(--neutral-background-default)"}}},version:{description:"Versão do estilo do stepper.",control:"select",options:[1,2],table:{type:{summary:"1 | 2"},defaultValue:{summary:"1"}}},onChangeStep:{description:"Evento emitido quando um passo é alterado. Payload: (item: any, index: number)",table:{category:"events",type:{summary:"(item: any, index: number) => void"}}}}},t={modelValue:"Option1",items:["Option1","Option2","Option3"],size:"medium",disabled:!1,allowedSkip:!1,version:1,background:"#FFFFFF",onChangeStep:(e,k)=>{console.log("changeStep event:",e,k)}},a={render:e=>({components:{BStepper:s},setup(){return{args:e}},template:`
      <BStepper
        v-model="args.modelValue"
        :items="args.items"
        :size="args.size"
        :disabled="args.disabled"
        :allowed-skip="args.allowedSkip"
        :background="args.background"
        :version="args.version"
        @change-step="args.onChangeStep"
      />
    `}),args:t},n={render:e=>({components:{BStepper:s},setup(){return{args:e}},template:`
      <div class="flex flex-col gap-5">
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            size="medium"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            :version="args.version"
            @change-step="args.onChangeStep"
          />
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            size="large"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            :version="args.version"
            @change-step="args.onChangeStep"
          />
      </div>
    `}),args:t},r={render:e=>({components:{BStepper:s},setup(){return{args:e}},template:`
      <div class="flex flex-col gap-5">
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            :size="args.size"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            version="1"
            @change-step="args.onChangeStep"
          />
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            :size="args.size"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            version="2"
            @change-step="args.onChangeStep"
          />
      </div>
    `}),args:t},o={render:e=>({components:{BStepper:s},setup(){return{args:e}},template:`
      <BStepper
        v-model="args.modelValue"
        :items="args.items"
        size="medium"
        :disabled="args.disabled"
        :allowed-skip="args.allowedSkip"
        version="2"
        @change-step="args.onChangeStep"
      />
    `}),args:{...t,items:[{label:"Option 1",icon:"labs"},{label:"Option 2",icon:"labs"},{label:"Option 3",icon:"labs"}]}};var l,i,d;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BStepper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BStepper
        v-model="args.modelValue"
        :items="args.items"
        :size="args.size"
        :disabled="args.disabled"
        :allowed-skip="args.allowedSkip"
        :background="args.background"
        :version="args.version"
        @change-step="args.onChangeStep"
      />
    \`
  }),
  args: defaultArgs
}`,...(d=(i=a.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var p,g,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BStepper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-5">
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            size="medium"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            :version="args.version"
            @change-step="args.onChangeStep"
          />
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            size="large"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            :version="args.version"
            @change-step="args.onChangeStep"
          />
      </div>
    \`
  }),
  args: defaultArgs
}`,...(m=(g=n.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var u,c,b;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BStepper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-5">
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            :size="args.size"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            version="1"
            @change-step="args.onChangeStep"
          />
          <BStepper
            v-model="args.modelValue"
            :items="args.items"
            :size="args.size"
            :disabled="args.disabled"
            :allowed-skip="args.allowedSkip"
            version="2"
            @change-step="args.onChangeStep"
          />
      </div>
    \`
  }),
  args: defaultArgs
}`,...(b=(c=r.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};var S,v,y;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BStepper
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BStepper
        v-model="args.modelValue"
        :items="args.items"
        size="medium"
        :disabled="args.disabled"
        :allowed-skip="args.allowedSkip"
        version="2"
        @change-step="args.onChangeStep"
      />
    \`
  }),
  args: {
    ...defaultArgs,
    items: [{
      label: "Option 1",
      icon: "labs"
    }, {
      label: "Option 2",
      icon: "labs"
    }, {
      label: "Option 3",
      icon: "labs"
    }]
  }
}`,...(y=(v=o.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const B=["Primary","Sizes","Versions","ObjectArray"];export{o as ObjectArray,a as Primary,n as Sizes,r as Versions,B as __namedExportsOrder,V as default};
