import{B as s}from"./BStepOption-DK9w7oip.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const d={component:s,tags:["autodocs"],argTypes:{title:{description:"Título da opção do passo.",control:{type:"text"},table:{type:{summary:"string"}}},description:{description:"Descrição da opção do passo.",control:{type:"text"},table:{type:{summary:"string"}}},icon:{description:"Nome do ícone a ser exibido.",control:{type:"text"},table:{type:{summary:"string"}}},color:{description:"Cor do ícone e do título (ex: 'primary', 'success', ou um valor CSS de cor).",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"primary"}}},disabled:{description:"Desabilita a opção.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},isIconRound:{description:"Se verdadeiro, o ícone não será envolvido por um círculo com a cor do card.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},n={title:"Step Name",description:"Lorem ipsum dolor sit amet consectetur. Tortor ipsum ut massa interdum.",icon:"email",color:"",disabled:!1,isIconRound:!1},o={render:a=>({components:{BStepOption:s},setup(){return{args:a}},template:`
        <BStepOption
          class="max-w-[400px]"
          :title="args.title"
          :description="args.description"
          :icon="args.icon"
          :color="args.color"
          :disabled="args.disabled"
          :is-icon-round="args.isIconRound"
        />
      `}),args:n};var e,t,r;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BStepOption
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BStepOption
          class="max-w-[400px]"
          :title="args.title"
          :description="args.description"
          :icon="args.icon"
          :color="args.color"
          :disabled="args.disabled"
          :is-icon-round="args.isIconRound"
        />
      \`
  }),
  args: defaultArgs
}`,...(r=(t=o.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};const l=["Primary"];export{o as Primary,l as __namedExportsOrder,d as default};
