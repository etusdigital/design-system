import{B as b}from"./BTagSelect-DwkUe17o.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";import"./SelectContent-7yYIGyTY.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./Option-BBYBztsW.js";import"./index-BQ4pCYp0.js";const S={component:b,tags:["autodocs"],argTypes:{modelValue:{description:"Array contendo os valores das tags selecionadas (v-model).",control:{type:"object"},table:{type:{summary:"any[]"}}},labelValue:{description:"Label do campo.",control:{type:"text"},table:{type:{summary:"string"}}},items:{description:"Array de strings ou objetos para as opções. Objetos devem ter uma chave correspondente a 'labelKey'.",control:{type:"object"},table:{type:{summary:"string[] | any[]"}}},icon:{description:"Ícone a ser exibido ao lado do label.",control:{type:"text"},table:{type:{summary:"string"}}},expanded:{description:"Controla o estado expandido do dropdown (v-model:expanded).",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},labelKey:{description:"Chave a ser usada como label quando 'items' é um array de objetos.",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"label"}}},disabled:{description:"Desabilita o componente.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},isError:{description:"Ativa o modo de erro visualmente.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},errorMessage:{description:"Mensagem de erro a ser exibida.",control:{type:"text"},table:{type:{summary:"string"}}},infoMessage:{description:"Mensagem informativa (ex: tooltip no label).",control:{type:"text"},table:{type:{summary:"string"}}},buttonText:{description:"Texto do botão de adicionar (se aplicável).",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"Add"}}},"search-text":{description:"Slot para o placeholder do input de busca.",table:{type:{summary:"VNode | string"}}},"no-items-found":{description:"Slot exibido quando a busca não retorna itens.",table:{type:{summary:"VNode | string"}}},"no-items":{description:"Slot exibido se o array 'items' estiver vazio.",table:{type:{summary:"VNode | string"}}},item:{description:"Slot para customizar a renderização de cada item na lista. Props: item, index.",table:{type:{summary:"VNode | string"}}}}},t={modelValue:void 0,expanded:!1,items:[],labelValue:"label",labelKey:"label",buttonText:"Add",required:!1,errorMessage:"",infoMessage:"",icon:"",isError:!1,disabled:!1,absolute:!1},o=g=>({components:{BTagSelect:b},setup(){return{args:g}},template:`
    <BTagSelect
        v-model="args.modelValue"
        :v-model:expanded="args.expanded"
        :items="args.items"
        :labelValue="args.labelValue"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :is-error="args.isError"
        :disabled="args.disabled"
        :icon="args.icon"
        :required="args.required"
        :label-key="args.labelKey"
        :absolute="args.absolute"
    >
        <template #search-text>
            Search
        </template>
        <template #no-items-found>
            No result found.
        </template>
        <template #no-items>
            No tags created yet.
        </template>
    </BTagSelect>
    `}),e={render:o,args:{...t}},a={render:o,args:{...t,isError:!0,errorMessage:"Error message"}},r={render:o,args:{...t,items:[{label:"Option 1",something:0},{label:"Option 2",something:1},{label:"Option 3",something:2},{label:"Option 4",something:3},{label:"Option 5",something:4}]}};var s,n,l;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs
  }
}`,...(l=(n=e.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var i,d,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var p,c,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    items: [{
      label: "Option 1",
      something: 0
    }, {
      label: "Option 2",
      something: 1
    }, {
      label: "Option 3",
      something: 2
    }, {
      label: "Option 4",
      something: 3
    }, {
      label: "Option 5",
      something: 4
    }]
  }
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const A=["Primary","Error","ObjectArray"];export{a as Error,r as ObjectArray,e as Primary,A as __namedExportsOrder,S as default};
