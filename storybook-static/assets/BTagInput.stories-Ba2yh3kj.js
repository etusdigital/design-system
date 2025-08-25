import{B as x}from"./BTagInput-rXVuC_x3.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./index-BQ4pCYp0.js";import"./Label-jj1xFjf_.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const h={component:x,tags:["autodocs"],argTypes:{modelValue:{description:"Array contendo os valores das tags (v-model).",control:{type:"object"},table:{type:{summary:"string[] | any[]"},defaultValue:{summary:"[]"}}},labelValue:{description:"Label do input.",control:{type:"text"},table:{type:{summary:"string"}}},errorMessage:{description:"Mensagem de erro a ser exibida.",control:{type:"text"},table:{type:{summary:"string"}}},infoMessage:{description:"Mensagem informativa (geralmente para tooltips no label).",control:{type:"text"},table:{type:{summary:"string"}}},placeholder:{description:"Placeholder do campo de input para nova tag.",control:{type:"text"},table:{type:{summary:"string"}}},isError:{description:"Ativa o modo de erro visualmente.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},allowDuplicate:{description:"Permite ou não a inserção de tags duplicadas.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},max:{description:"Número máximo de tags permitidas.",control:{type:"number"},table:{type:{summary:"number"}}},required:{description:"Indica se o campo é obrigatório (visual).",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{description:"Desabilita o componente.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},mask:{description:"Máscara a ser aplicada no input de novas tags.",control:"select",options:["cpf","cnpj","cep","domain","url","email",void 0],table:{type:{summary:"'cpf' | 'cnpj' | 'cep' | 'domain' | 'url' | 'email' | undefined"},defaultValue:{summary:"undefined"}}},"info-text":{description:"Slot para texto informativo abaixo do input.",table:{type:{summary:"VNode | string"}}}}},o={modelValue:void 0,labelValue:"label",errorMessage:"",infoMessage:"",placeholder:"",isError:!1,required:!1,allowDuplicate:!1,max:void 0,disabled:!1,mask:void 0},s=v=>({components:{BTagInput:x},setup(){return{args:v}},template:`
    <BTagInput
        v-model="args.modelValue"
        :label-value="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :allow-duplicate="args.allowDuplicate"
        :max="args.max"
        :required="args.required"
        :placeholder="args.placeholder"
        :mask="args.mask"
    >
        <template #info-text>
            Press enter to add a new tag
        </template>
    </BTagInput>

    `}),e={render:s,args:{...o}},a={render:s,args:{...o,max:10}},r={render:s,args:{...o,isError:!0,errorMessage:"Error message"}},t={render:s,args:{...o,modelValue:["tag 1","tag 2","tag 3","tag 4","tag 5"]}};var l,n,d;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs
  }
}`,...(d=(n=e.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var i,m,p;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    max: 10
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,c,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`,...(g=(c=r.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var y,b,f;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5"]
  }
}`,...(f=(b=t.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const w=["Primary","Max","Error","TagList"];export{r as Error,a as Max,e as Primary,t as TagList,w as __namedExportsOrder,h as default};
