import{B as g}from"./BButton-CbVrYdRz.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./BSpinner-ospMqXTg.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const I={component:g,tags:["autodocs"],argTypes:{type:{type:{summary:"text"},control:"select",options:["button","reset","submit"],table:{defaultValue:{summary:"button"}}},color:{type:{summary:"text"},control:"select",options:["primary","info","success","warning","danger","neutral"],table:{defaultValue:{summary:"primary"}}},variant:{type:{summary:"text"},control:"select",options:["primary","secondary","ghost"],table:{defaultValue:{summary:"primary"}}},size:{type:{summary:"text"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"medium"}}},disabled:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}},description:`Disables the underlying button's HTML element and sets the CSS property "cursor-events" to "none".`},loading:{type:{summary:"boolean"},table:{category:"Loading state",defaultValue:{summary:!1}},description:`If true, shows a spinner instead of the default slot's contents and disables cursor events. If "progress" is anything other than 0, this is implicitly true, so there's no need to use both. Keep in mind that although the content is hidden, it is still rendered so that the button doesn't shrink.`},progress:{type:{summary:"number"},control:{type:"range",min:0,max:1,step:1e-4},table:{category:"Loading state",defaultValue:{summary:0}},description:"The current progress of the loading state."},default:{description:"This slot will be content inside the button. It will not be shown if isLoading is true."}}},r={type:"button",color:"primary",variant:"primary",size:"medium",disabled:!1,loading:!1,progress:0},l=s=>({components:{BButton:g},setup(){return{args:s}},template:'<div class="flex gap-3"><BButton :type="args.type" color="primary" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Primary</BButton><BButton :type="args.type" color="info" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Informative</BButton><BButton :type="args.type" color="success" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Success</BButton><BButton :type="args.type" color="warning" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Warning</BButton><BButton :type="args.type" color="danger" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Danger</BButton><BButton :type="args.type" color="neutral" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Neutral</BButton></div>'}),a={render:s=>({components:{BButton:g},setup(){return{args:s}},template:'<BButton id="test-button" :type="args.type" :color="args.color" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Test button</BButton>'}),args:r},e={render:l,args:{...r}},t={render:l,args:{...r,variant:"secondary"}},o={render:l,args:{...r,variant:"ghost"}},n={render:l,args:{...r,progress:.32}},i={render:s=>({components:{BButton:g},setup(){return{args:s}},template:`
      <div class="flex gap-xs">
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="small" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Small</BButton>
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="medium" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Medium</BButton>
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="large" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Large</BButton>
      </div>
    `}),args:r};var d,c,p;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<BButton id="test-button" :type="args.type" :color="args.color" :variant="args.variant" :size="args.size" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Test button</BButton>'
  }),
  args: defaultArgs
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,m,y;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs
  }
}`,...(y=(m=e.parameters)==null?void 0:m.docs)==null?void 0:y.source}}};var B,b,f;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: "secondary"
  }
}`,...(f=(b=t.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var v,h,k;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: "ghost"
  }
}`,...(k=(h=o.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var z,S,x;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    progress: 0.32
  }
}`,...(x=(S=n.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var L,A,V;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="small" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Small</BButton>
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="medium" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Medium</BButton>
        <BButton class="h-fit" :type="args.type" :color="args.color" :variant="args.variant" size="large" :disabled="args.disabled" @click="args.click" :loading="args.loading" :progress="args.progress">Large</BButton>
      </div>
    \`
  }),
  args: defaultArgs
}`,...(V=(A=i.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};const C=["Primary","Colors","Secondary","Ghost","LoadingWithProgress","Size"];export{e as Colors,o as Ghost,n as LoadingWithProgress,a as Primary,t as Secondary,i as Size,C as __namedExportsOrder,I as default};
