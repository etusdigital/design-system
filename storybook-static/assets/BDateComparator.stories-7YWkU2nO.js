import{_ as o}from"./BDateComparator-CjlRaBCx.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Calendar-B0nci8mL.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./OptionalModel-8moGuuLP.js";const c={component:o,tags:["autodocs"],argTypes:{modelValue:{description:"Data ou período(s) selecionado(s) (v-model). Pode ser Date[], Date[][] ou null.",control:{type:"object"},table:{type:{summary:"Date[] | Date[][] | null"},defaultValue:{summary:"null"}}},lang:{description:"Idioma para formatação de datas (ex: 'en-US', 'pt-BR').",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"en-US"}}},isCompare:{description:"Habilita a seleção de dois períodos para comparação.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},maxInit:{description:"Data inicial máxima permitida para seleção no primeiro calendário.",control:{type:"date"},table:{type:{summary:"Date"},defaultValue:{summary:"null"}}},maxEnd:{description:"Data final máxima permitida para seleção no segundo calendário (se isCompare).",control:{type:"date"},table:{type:{summary:"Date"},defaultValue:{summary:"null"}}}}},n={modelValue:null,lang:"en-US",isCompare:!1,maxInit:void 0,maxEnd:void 0},a={render:m=>({components:{BDateComparator:o},setup(){return{args:m}},template:`
      <BDateComparator v-model="args.modelValue" :lang="args.lang" :is-compare="args.isCompare" :max-init="args.maxInit" :max-end="args.maxEnd" />
    `}),args:n};var e,r,t;a.parameters={...a.parameters,docs:{...(e=a.parameters)==null?void 0:e.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BDateComparator
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BDateComparator v-model="args.modelValue" :lang="args.lang" :is-compare="args.isCompare" :max-init="args.maxInit" :max-end="args.maxEnd" />
    \`
  }),
  args: defaultArgs
}`,...(t=(r=a.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};const g=["Primary"];export{a as Primary,g as __namedExportsOrder,c as default};
