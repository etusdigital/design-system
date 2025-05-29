import{_ as r}from"./BSlider-BX4Rm_lb.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Slider-D-QNEyNF.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const j={component:r,tags:["autodocs"],argTypes:{modelValue:{description:"Valor(es) do slider (v-model). Array de números entre 0 e 1 (ou 0 e max).",control:{type:"object"},table:{type:{summary:"number[]"},defaultValue:{summary:"[0]"}}},size:{description:"Tamanho do slider.",control:"select",options:["small","medium","large"],table:{type:{summary:"'small' | 'medium' | 'large'"},defaultValue:{summary:"medium"}}},max:{description:"Valor máximo da escala do slider. Se definido, modelValue será relativo a este max.",control:{type:"number"},table:{type:{summary:"number"},defaultValue:{summary:"0 (escala 0-1)"}}},unit:{description:"Unidade a ser exibida no tooltip (ex: '%', 'px').",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:""}}},color:{description:"Cor principal do slider (ex: valor CSS de cor).",control:{type:"color"},table:{type:{summary:"string"},defaultValue:{summary:"(cor primária do tema)"}}},showTooltip:{description:"Exibe um tooltip com o valor atual acima (ou à direita) do cursor.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},vertical:{description:"Renderiza o slider na vertical. Requer um container pai com altura definida.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{description:"Desabilita a interação com o slider.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},fillColors:{description:"Array de cores para preencher segmentos da barra (se isRange=true e houver múltiplos cursores).",control:{type:"object"},table:{type:{summary:"string[]"},defaultValue:{summary:"[]"}}},steps:{description:"Array de posições (0-1) para marcadores de passo. O cursor irá 'travar' nesses passos.",control:{type:"object"},table:{type:{summary:"number[]"},defaultValue:{summary:"[]"}}},neutralBackground:{description:"Se verdadeiro, usa um fundo neutro para a barra do slider em vez de uma cor de highlight do tema.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}}}},a={modelValue:0,size:"medium",max:0,unit:"",color:"",showTooltip:!1,disabled:!1,vertical:!1,fillColors:[],steps:[],neutralBackground:!1},d=`
<div :class="{'h-[15em]': args.vertical }">
  <BSlider
    v-model="args.modelValue"
    :size="args.size"
    :show-tooltip="args.showTooltip"
    :disabled="args.disabled"
    :vertical="args.vertical"
    :max="args.max"
    :unit="args.unit"
    :color="args.color"
    :fill-colors="args.fillColors"
    :steps="args.steps"
    :neutral-background="args.neutralBackground"
  />
</div>`,z=`
<BSlider
  v-model="args.modelValue"
  size="small"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
<BSlider
  v-model="args.modelValue"
  size="medium"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
<BSlider
  v-model="args.modelValue"
  size="large"
  :show-tooltip="args.showTooltip"
  :disabled="args.disabled"
  :vertical="args.vertical"
  :max="args.max"
  :unit="args.unit"
  :color="args.color"
  :fill-colors="args.fillColors"
  :steps="args.steps"
  :neutral-background="args.neutralBackground"
/>
`,s={render:e=>({components:{BSlider:r},setup(){return{args:e}},template:d}),args:a},o={render:e=>({components:{BSlider:r},setup(){return{args:e}},template:d}),args:{...a,neutralBackground:!0}},t={render:e=>({components:{BSlider:r},setup(){return{args:e}},template:`
      <div class="flex flex-col gap-base">
        ${z}
      </div>
    `}),args:a},l={render:e=>({components:{BSlider:r},setup(){return{args:e}},template:`
      <div class="h-[15em] flex gap-base">
        ${z}
      </div>
    `}),args:{...a,vertical:!0}},n={render:e=>({components:{BSlider:r},setup(){return{args:e}},template:d}),args:{...a,fillColors:["#00CEFC","#50358A","#FF9654"]}},i={render:e=>({components:{BSlider:r},setup(){return{args:e}},template:d}),args:{...a,steps:[0,.25,.5,.75,1]}};var m,u,c;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSlider
    },
    setup() {
      return {
        args
      };
    },
    template: singleTemplate
  }),
  args: defaultArgs
}`,...(c=(u=s.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var p,g,y;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSlider
    },
    setup() {
      return {
        args
      };
    },
    template: singleTemplate
  }),
  args: {
    ...defaultArgs,
    neutralBackground: true
  }
}`,...(y=(g=o.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var f,b,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSlider
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex flex-col gap-base">
        \${defaultTemplate}
      </div>
    \`
  }),
  args: defaultArgs
}`,...(v=(b=t.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var S,x,B;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSlider
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="h-[15em] flex gap-base">
        \${defaultTemplate}
      </div>
    \`
  }),
  args: {
    ...defaultArgs,
    vertical: true
  }
}`,...(B=(x=l.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};var V,h,C;n.parameters={...n.parameters,docs:{...(V=n.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSlider
    },
    setup() {
      return {
        args
      };
    },
    template: singleTemplate
  }),
  args: {
    ...defaultArgs,
    fillColors: ["#00CEFC", "#50358A", "#FF9654"]
  }
}`,...(C=(h=n.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};var T,k,A;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BSlider
    },
    setup() {
      return {
        args
      };
    },
    template: singleTemplate
  }),
  args: {
    ...defaultArgs,
    steps: [0, 0.25, 0.5, 0.75, 1]
  }
}`,...(A=(k=i.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};const R=["Primary","NeutralBackground","Sizes","Vertical","FillColors","Steps"];export{n as FillColors,o as NeutralBackground,s as Primary,t as Sizes,i as Steps,l as Vertical,R as __namedExportsOrder,j as default};
