import{_ as r}from"./BRangeSlider-BzD0Et5f.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./Slider-D-QNEyNF.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const $={component:r,tags:["autodocs"],argTypes:{modelValue:{description:`This property will be an array with the slider fill percentage or the equivalent number in "max" scale based in each thumb. Max: 1 and Min: 0, if max isn't specified.`,control:{type:"object"},table:{type:{summary:"number[]"},defaultValue:{summary:"[0, 0]"}}},size:{description:"Tamanho do slider.",control:"select",options:["small","medium","large"],table:{type:{summary:"'small' | 'medium' | 'large'"},defaultValue:{summary:"medium"}}},max:{description:"If the max is specified, the modelValue will be multiply by it.",control:{type:"number"},table:{type:{summary:"number"}}},unit:{description:"This property will be the unit shown in tooltip with the modelValue.",control:{type:"text"},table:{type:{summary:"string"}}},color:{description:"This property will be the slider color, if it's not set, the color will be the default one.",control:{type:"color"},table:{type:{summary:"string"}}},showTooltip:{description:"When this property is true, a tooltip showing the modelValue will appear in the slider thumb top or right.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},vertical:{description:"The vertical property requires a external div with a specified height.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},disabled:{description:"Desabilita a interação.",control:{type:"boolean"},table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},fillColors:{description:"When this property is settled, the fill area will be divided between the passed colors.",control:{type:"object"},table:{type:{summary:"string[]"}}},steps:{description:"When this property is settled, marks will be place in the passed positions (Scale: 0-1) and modelValue can only have the passed values.",control:{type:"object"},table:{type:{summary:"number[]"}}},neutralBackground:{description:"When this property is true, the slider will have a neutral background.",control:{type:"boolean"},table:{type:{summary:"boolean"}}}}},a={modelValue:[0,0],size:"medium",max:0,unit:"",color:"",showTooltip:!1,disabled:!1,vertical:!1,fillColors:[],steps:[],neutralBackground:!1},p=`
<div :class="{'h-[15em]': args.vertical }">
  <BRangeSlider
    v-model="args.modelValue"
    :size="args.size"
    :show-tooltip="args.showTooltip"
    :disabled="args.disabled"
    :vertical="args.vertical"
    :max="args.max"
    :unit="args.unit"
    :color="args.color"
    :fillColors="args.fillColors"
    :steps="args.steps"
    :neutral-background="args.neutralBackground"
  />
</div>`,C=`
<BRangeSlider
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
<BRangeSlider
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
<BRangeSlider
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
`,s={render:e=>({components:{BRangeSlider:r},setup(){return{args:e}},template:p}),args:a},t={render:e=>({components:{BRangeSlider:r},setup(){return{args:e}},template:p}),args:{...a,neutralBackground:!0}},l={render:e=>({components:{BRangeSlider:r},setup(){return{args:e}},template:`
      <div class="flex flex-col gap-base">
          ${C}
      </div>
    `}),args:a},n={render:e=>({components:{BRangeSlider:r},setup(){return{args:e}},template:`
      <div class="h-[15em] flex gap-base">
        ${C}
      </div>
    `}),args:{...a,vertical:!0}},o={render:e=>({components:{BRangeSlider:r},setup(){return{args:e}},template:p}),args:{...a,fillColors:["#00CEFC","#50358A","#FF9654"]}},i={render:e=>({components:{BRangeSlider:r},setup(){return{args:e}},template:p}),args:{...a,steps:[0,.25,.5,.75,1]}};var d,u,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRangeSlider
    },
    setup() {
      return {
        args
      };
    },
    template: singleTemplate
  }),
  args: defaultArgs
}`,...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var c,g,b;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRangeSlider
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
}`,...(b=(g=t.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var y,h,f;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRangeSlider
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
}`,...(f=(h=l.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var v,S,B;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRangeSlider
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
}`,...(B=(S=n.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var w,x,T;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRangeSlider
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
}`,...(T=(x=o.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var V,k,R;i.parameters={...i.parameters,docs:{...(V=i.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRangeSlider
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
}`,...(R=(k=i.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};const j=["Primary","NeutralBackground","Sizes","Vertical","FillColors","Steps"];export{o as FillColors,t as NeutralBackground,s as Primary,l as Sizes,i as Steps,n as Vertical,j as __namedExportsOrder,$ as default};
