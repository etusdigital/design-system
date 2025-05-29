import{_ as O}from"./BSmartSelect-CWug6wU8.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./OptionalModel-8moGuuLP.js";const M={component:O,tags:["autodocs"],argTypes:{modelValue:{description:"Valor(es) selecionado(s) (v-model). Pode ser any ou any[].",control:{type:"object"},table:{type:{summary:"any | any[]"}}},labelValue:{description:"Label do campo.",control:{type:"text"},table:{type:{summary:"string"}}},items:{description:"Array de strings ou objetos para as opções. Objetos devem ter chaves correspondentes a 'labelKey' e 'valueKey'.",control:{type:"object"},table:{type:{summary:"string[] | any[]"}}},icon:{description:"Ícone a ser exibido ao lado do label.",control:{type:"text"},table:{type:{summary:"string"}}},expanded:{description:"Controla o estado expandido do dropdown (v-model:expanded).",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},labelKey:{description:"Chave do objeto item a ser usada como label.",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"label"}}},valueKey:{description:"Chave do objeto item a ser usada como valor.",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:"value"}}},getObject:{description:"Se verdadeiro, o modelValue será o objeto item inteiro, não apenas o valor da 'valueKey'.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},isMultiple:{description:"Permite múltiplas seleções. modelValue será um array.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{description:"Desabilita o componente.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},searchable:{description:"Habilita a funcionalidade de busca dentro do dropdown.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},clearable:{description:"Mostra um botão para limpar a seleção.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},isError:{description:"Ativa o modo de erro visualmente.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},errorMessage:{description:"Mensagem de erro a ser exibida.",control:{type:"text"},table:{type:{summary:"string"}}},infoMessage:{description:"Mensagem informativa (ex: tooltip no label).",control:{type:"text"},table:{type:{summary:"string"}}},default:{description:"Slot para o conteúdo exibido no campo de seleção antes de abrir o dropdown.",table:{type:{summary:"VNode | string"}}},status:{description:"Slot para exibir um status ou ícone adicional dentro do campo de seleção. Props: item (item selecionado).",table:{type:{summary:"VNode | string"}}},"clear-text":{description:"Slot para o texto do botão 'Limpar' (se 'clearable' for true).",table:{type:{summary:"VNode | string"}}},item:{description:"Slot para customizar a renderização de cada item na lista do dropdown. Props: item, index.",table:{type:{summary:"VNode | string"}}}}},t={modelValue:null,items:["Option 1","Option 2","Option 3","Option 4","Option 5"],icon:"",expanded:!1,labelKey:"label",valueKey:"value",labelValue:"label",searchable:!1,clearable:!1,isMultiple:!1,getObject:!1,disabled:!1,required:!1,isError:!1,errorMessage:"",infoMessage:"",absolute:!1},o=s=>({setup(){return{args:s}},template:`
    <BSmartSelect 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :labelValue="args.labelValue"
        :items="args.items" 
        :icon="args.icon" 
        :absolute="args.absolute" 
        :label-key="args.labelKey" 
        :value-key="args.valueKey"
        :required="args.required" 
        :searchable="args.searchable" 
        :clearable="args.clearable"
        :disabled="args.disabled"
        :is-multiple="args.isMultiple"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :get-object="args.getObject"
    >
        Placeholder
    </BSmartSelect>
    <span class="block mt-[1em]">Selected: {{ (typeof args.modelValue == 'object') ? JSON.stringify(args.modelValue) : args.modelValue }}</span>
  `}),e={render:o,args:t},a={render:o,args:{...t,getObject:!0,items:[{label:"Option 1",value:0},{label:"Option 2",value:1},{label:"Option 3",value:2},{label:"Option 4",value:3}]}},r={render:o,args:{...t,isMultiple:!0,items:[{label:"Option 1",value:0},{label:"Option 2",value:1},{label:"Option 3",value:2},{label:"Option 4",value:3}]}},l={render:s=>({setup(){return{args:s}},template:`
      <BSmartSelect
          v-model="args.modelValue" 
          v-model:expanded="args.expanded" 
          :labelValue="args.labelValue"
          :items="args.items" 
          :icon="args.icon" 
          :absolute="args.absolute" 
          :label-key="args.labelKey" 
          :value-key="args.valueKey"
          :required="args.required" 
          :searchable="args.searchable" 
          :clearable="args.clearable"
          :disabled="args.disabled"
          :is-multiple="args.isMultiple"
          :is-error="args.isError"
          :error-message="args.errorMessage"
          :info-message="args.infoMessage"
          :get-object="args.getObject"
      >
          Placeholder
          <template #item="{ item, index }">
              <div class="flex items-center gap-2">
                  <BIcon name="account_circle" />
                  {{ item }}
              </div>
          </template>
      </BSmartSelect>
    `}),args:t};var n,i,d;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`,...(d=(i=e.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var m,u,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    getObject: true,
    items: [{
      label: "Option 1",
      value: 0
    }, {
      label: "Option 2",
      value: 1
    }, {
      label: "Option 3",
      value: 2
    }, {
      label: "Option 4",
      value: 3
    }]
  }
}`,...(p=(u=a.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var c,b,g;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isMultiple: true,
    items: [{
      label: "Option 1",
      value: 0
    }, {
      label: "Option 2",
      value: 1
    }, {
      label: "Option 3",
      value: 2
    }, {
      label: "Option 4",
      value: 3
    }]
  }
}`,...(g=(b=r.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var y,f,v;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
      <BSmartSelect
          v-model="args.modelValue" 
          v-model:expanded="args.expanded" 
          :labelValue="args.labelValue"
          :items="args.items" 
          :icon="args.icon" 
          :absolute="args.absolute" 
          :label-key="args.labelKey" 
          :value-key="args.valueKey"
          :required="args.required" 
          :searchable="args.searchable" 
          :clearable="args.clearable"
          :disabled="args.disabled"
          :is-multiple="args.isMultiple"
          :is-error="args.isError"
          :error-message="args.errorMessage"
          :info-message="args.infoMessage"
          :get-object="args.getObject"
      >
          Placeholder
          <template #item="{ item, index }">
              <div class="flex items-center gap-2">
                  <BIcon name="account_circle" />
                  {{ item }}
              </div>
          </template>
      </BSmartSelect>
    \`
  }),
  args: defaultArgs
}`,...(v=(f=l.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const j=["Primary","ObjectArray","Multiple","CustomItem"];export{l as CustomItem,r as Multiple,a as ObjectArray,e as Primary,j as __namedExportsOrder,M as default};
