import{B as l}from"./BRoundButton-DeqXdxWo.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./index-BQ4pCYp0.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const V={component:l,tags:["autodocs"],argTypes:{type:{description:"Tipo do botão HTML.",control:"select",options:["button","reset","submit"],table:{type:{summary:"'button' | 'reset' | 'submit'"},defaultValue:{summary:"button"}}},color:{description:"Cor temática do botão.",control:"select",options:["primary","info","success","warning","danger","neutral"],table:{type:{summary:"'primary' | 'info' | 'success' | 'warning' | 'danger' | 'neutral'"},defaultValue:{summary:"primary"}}},text:{description:"It will be the value the button will show when it's hovered.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},icon:{description:"This property will be the button icon.",control:{type:"text"},table:{type:{summary:"string | undefined"},defaultValue:{summary:"plus"}}},background:{description:"This property will be the button background background, if it's not set, the background will respect the color background.",control:{type:"text"},table:{type:{summary:"string | undefined"}}},size:{description:"Tamanho do botão.",control:"select",options:["small","medium","large"],table:{type:{summary:"'small' | 'medium' | 'large'"},defaultValue:{summary:"small"}}},variant:{description:"Variante de estilo do botão.",control:"select",options:["default","secondary","plain","reverse"],table:{type:{summary:"'default' | 'secondary' | 'plain' | 'reverse'"},defaultValue:{summary:"default"}}},disabled:{description:`Disables the underlying button's HTML element and sets the CSS property "cursor-events" to "none".`,control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}},alwaysOpen:{description:"When this prop is true, the text will always be shown.",control:{type:"boolean"},table:{type:{summary:"boolean | undefined"},defaultValue:{summary:"false"}}}}},e={type:"button",color:"primary",text:"Create",size:"small",variant:"default",background:"",icon:"",disabled:!1,alwaysOpen:!1},i=a=>({components:{BRoundButton:l},setup(){return{args:a}},template:'<div class="flex gap-sm"><BRoundButton :type="args.type" text="Primary" color="primary" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" /><BRoundButton :type="args.type" text="Info" color="info" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" /><BRoundButton :type="args.type" text="Success" color="success" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" /><BRoundButton :type="args.type" text="Warning" color="warning" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" /><BRoundButton :type="args.type" text="Danger" color="danger" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" /><BRoundButton :type="args.type" text="Neutral" color="neutral" :size="args.size" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click" /></div>'}),r={render:a=>({components:{BRoundButton:l},setup(){return{args:a}},template:`
      <BRoundButton 
          id="test-button"
          :type="args.type"
          :text="args.text"
          :icon="args.icon"
          :background="args.background"
          :color="args.color"
          :size="args.size"
          :variant="args.variant"
          :disabled="args.disabled"
          :always-open="args.alwaysOpen"
          @click="args.click"
      />
    `}),args:e},t={render:i,args:{...e,variant:"secondary"}},s={render:i,args:{...e,variant:"plain"}},n={render:i,args:{...e,variant:"reverse"}},o={render:a=>({components:{BRoundButton:l},setup(){return{args:a}},template:'<div class="flex gap-3"><BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="small" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton><BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="medium" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton><BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="large" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton></div>'}),args:{...e}};var d,c,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRoundButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <BRoundButton 
          id="test-button"
          :type="args.type"
          :text="args.text"
          :icon="args.icon"
          :background="args.background"
          :color="args.color"
          :size="args.size"
          :variant="args.variant"
          :disabled="args.disabled"
          :always-open="args.alwaysOpen"
          @click="args.click"
      />
    \`
  }),
  args: defaultArgs
}`,...(u=(c=r.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var g,p,y;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: "secondary"
  }
}`,...(y=(p=t.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};var b,m,k;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: "plain"
  }
}`,...(k=(m=s.parameters)==null?void 0:m.docs)==null?void 0:k.source}}};var v,B,w;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    variant: "reverse"
  }
}`,...(w=(B=n.parameters)==null?void 0:B.docs)==null?void 0:w.source}}};var f,x,R;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRoundButton
    },
    setup() {
      return {
        args
      };
    },
    template: '<div class="flex gap-3">' + '<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="small" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' + '<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="medium" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' + '<BRoundButton id="test-button" :type="args.type" :text="args.text" :color="args.color" size="large" :background="args.background" :variant="args.variant" :disabled="args.disabled" :always-open="args.alwaysOpen" @click="args.click"></BRoundButton>' + "</div>"
  }),
  args: {
    ...defaultArgs
  }
}`,...(R=(x=o.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};const T=["Primary","Secondary","Plain","Reverse","Sizes"];export{s as Plain,r as Primary,n as Reverse,t as Secondary,o as Sizes,T as __namedExportsOrder,V as default};
