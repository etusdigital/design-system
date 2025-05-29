import{B as a}from"./BTag-C0hghhaq.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const h={component:a,tags:["autodocs"],argTypes:{text:{description:"Texto exibido dentro da tag. Também pode ser passado via slot padrão.",control:{type:"text"},table:{type:{summary:"string"}}},color:{description:"Cor da tag.",control:"select",options:["primary","informative","success","warning","danger","neutral"],table:{type:{summary:"'primary' | 'informative' | 'success' | 'warning' | 'danger' | 'neutral'"},defaultValue:{summary:"primary"}}},size:{description:"Tamanho da tag.",control:"select",options:["small","medium","large"],table:{type:{summary:"'small' | 'medium' | 'large'"},defaultValue:{summary:"medium"}}},type:{description:"Variação de estilo da tag.",control:"select",options:["default","secondary","heavy"],table:{type:{summary:"'default' | 'secondary' | 'heavy'"},defaultValue:{summary:"default"}}},loading:{description:"Exibe um spinner de loading na tag.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},icon:{description:"Nome do ícone a ser exibido (geralmente à esquerda).",control:{type:"text"},table:{type:{summary:"string"}}},isAppendedIcon:{description:"Se verdadeiro, o ícone (definido na prop 'icon') será exibido à direita.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},closeable:{description:"Se verdadeiro, exibe um ícone de fechar à direita e emite o evento 'close' ao ser clicado.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},default:{description:"Slot padrão para o conteúdo da tag (alternativa à prop 'text').",table:{type:{summary:"VNode | string"}}}}},n={text:"Tag component",color:"primary",size:"medium",type:"default",loading:!1,icon:"star",isAppendedIcon:!1,closeable:!1},f=`
<div class="flex gap-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" />
</div>
<div class="flex gap-2 mt-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" type="secondary" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" type="secondary" />
</div>
<div class="flex gap-2 mt-2">
    <BTag :text="args.text" color="primary" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="info" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="success" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="warning" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="danger" :size="args.size" :loading="args.loading" type="heavy" />
    <BTag :text="args.text" color="neutral" :size="args.size" :loading="args.loading" type="heavy" />
</div>
`,r={render:e=>({components:{BTag:a},setup(){return{args:e}},template:`
      <BTag
        :text="args.text"
        :color="args.color"
        :size="args.size"
        :loading="args.loading"
        :type="args.type"
        :icon="args.icon"
        :is-appended-icon="args.isAppendedIcon"
        :closeable="args.closeable"
      >
        Tag Component
      </BTag>
    `}),args:n},s={render:e=>({components:{BTag:a},setup(){return{args:e}},template:f}),args:n},o={render:e=>({components:{BTag:a},setup(){return{args:e}},template:f}),args:{...n,loading:!0}},t={render:e=>({components:{BTag:a},setup(){return{args:e}},template:`
      <div class="flex gap-2">
          <BTag :text="args.text" :color="args.color" size="small" :loading="args.loading" />
          <BTag :text="args.text" :color="args.color" size="medium" :loading="args.loading" />
          <BTag :text="args.text" :color="args.color" size="large" :loading="args.loading" />
      </div>
    `}),args:n};var g,i,l;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BTag
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BTag
        :text="args.text"
        :color="args.color"
        :size="args.size"
        :loading="args.loading"
        :type="args.type"
        :icon="args.icon"
        :is-appended-icon="args.isAppendedIcon"
        :closeable="args.closeable"
      >
        Tag Component
      </BTag>
    \`
  }),
  args: defaultArgs
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,c,p;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BTag
    },
    setup() {
      return {
        args
      };
    },
    template: defaultTemplate
  }),
  args: defaultArgs
}`,...(p=(c=s.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,u,y;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BTag
    },
    setup() {
      return {
        args
      };
    },
    template: defaultTemplate
  }),
  args: {
    ...defaultArgs,
    loading: true
  }
}`,...(y=(u=o.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var x,z,T;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BTag
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-2">
          <BTag :text="args.text" :color="args.color" size="small" :loading="args.loading" />
          <BTag :text="args.text" :color="args.color" size="medium" :loading="args.loading" />
          <BTag :text="args.text" :color="args.color" size="large" :loading="args.loading" />
      </div>
    \`
  }),
  args: defaultArgs
}`,...(T=(z=t.parameters)==null?void 0:z.docs)==null?void 0:T.source}}};const A=["Primary","Colors","Loading","Sizes"];export{s as Colors,o as Loading,r as Primary,t as Sizes,A as __namedExportsOrder,h as default};
