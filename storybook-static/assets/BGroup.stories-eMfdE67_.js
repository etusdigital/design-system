import{B as a}from"./BGroup-Dw8r_feT.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const V={component:a,argTypes:{modelValue:{type:{summary:"any"},table:{defaultValue:{summary:null}}},vertical:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},disabled:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}}}},l={render:e=>({components:{BGroup:a},setup(){return{args:e}},template:`<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">
<BRadio :group-value="1">First</BRadio>
<BRadio :group-value="2">Second</BRadio>
<BRadio :group-value="3">Third</BRadio>
</BGroup>
<div style="margin-top: 1.5em">Selected: {{ args.modelValue }}</div>`}),args:{modelValue:"1",vertical:!1,disabled:!1}},r={render:e=>({components:{BGroup:a},setup(){return{args:e}},template:`<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">
<BRadioButton :group-value="1">First</BRadioButton>
<BRadioButton :group-value="2">Second</BRadioButton>
<BRadioButton :group-value="3">Third</BRadioButton>
</BGroup>
<div style="margin-top: 1.5em">Selected: {{ args.modelValue }}</div>`}),args:{modelValue:"null",vertical:!1,disabled:!1}},o={render:e=>({components:{BGroup:a},setup(){return{args:e}},template:`<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">
<BRadioButton :group-value="1" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px]" /></BRadioButton>
<BRadioButton :group-value="2" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[4px]" /></BRadioButton>
<BRadioButton :group-value="3" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[50%]" /></BRadioButton>
</BGroup>
<div style="margin-top: 1.5em">Selected: {{ args.modelValue }}</div>`}),args:{modelValue:"null",vertical:!1,disabled:!1}},t={render:e=>({components:{BGroup:a},setup(){return{args:e}},template:`<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" class="items-center">
<BCard class="p-[1em]">
                <BGroup>
                    <BInput label-value="label" min-height="3em" placeholder="Type here" />
                    <BSelect
                        label-value="label"
                        :items="[
                            { label: 'Option 1', something: 0, selected: false },
                            { label: 'Option 2', something: 1, selected: true },
                            { label: 'Option 3', something: 2, selected: false },
                            { label: 'Option 4', something: 3, selected: false },
                            { label: 'Option 5', something: 4, selected: false },
                        ]"
                    >
                        Select
                    </BSelect>
                    <BInput label-value="label" min-height="3em" placeholder="Type here" />
                </BGroup>
            </BCard>
<BRoundButton variant="positive" />
</BGroup>`}),args:{modelValue:"null",vertical:!0,disabled:!1}};var s,d,i;l.parameters={...l.parameters,docs:{...(s=l.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BGroup
    },
    setup() {
      return {
        args
      };
    },
    template: '<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' + '\\n<BRadio :group-value="1">First</BRadio>' + '\\n<BRadio :group-value="2">Second</BRadio>' + '\\n<BRadio :group-value="3">Third</BRadio>' + "\\n</BGroup>" + '\\n<div style="margin-top: 1.5em">Selected: {{ args.modelValue }}</div>'
  }),
  args: {
    modelValue: "1",
    vertical: false,
    disabled: false
  }
}`,...(i=(d=l.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var u,n,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BGroup
    },
    setup() {
      return {
        args
      };
    },
    template: '<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' + '\\n<BRadioButton :group-value="1">First</BRadioButton>' + '\\n<BRadioButton :group-value="2">Second</BRadioButton>' + '\\n<BRadioButton :group-value="3">Third</BRadioButton>' + "\\n</BGroup>" + '\\n<div style="margin-top: 1.5em">Selected: {{ args.modelValue }}</div>'
  }),
  args: {
    modelValue: "null",
    vertical: false,
    disabled: false
  }
}`,...(p=(n=r.parameters)==null?void 0:n.docs)==null?void 0:p.source}}};var m,B,c;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BGroup
    },
    setup() {
      return {
        args
      };
    },
    template: '<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled">' + '\\n<BRadioButton :group-value="1" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px]" /></BRadioButton>' + '\\n<BRadioButton :group-value="2" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[4px]" /></BRadioButton>' + '\\n<BRadioButton :group-value="3" :is-div="true"><div class="border-[.1em] h-[20px] w-[20px] rounded-[50%]" /></BRadioButton>' + "\\n</BGroup>" + '\\n<div style="margin-top: 1.5em">Selected: {{ args.modelValue }}</div>'
  }),
  args: {
    modelValue: "null",
    vertical: false,
    disabled: false
  }
}`,...(c=(B=o.parameters)==null?void 0:B.docs)==null?void 0:c.source}}};var g,v,b;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BGroup
    },
    setup() {
      return {
        args
      };
    },
    template: '<BGroup v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" class="items-center">' + \`\\n<BCard class="p-[1em]">
                <BGroup>
                    <BInput label-value="label" min-height="3em" placeholder="Type here" />
                    <BSelect
                        label-value="label"
                        :items="[
                            { label: 'Option 1', something: 0, selected: false },
                            { label: 'Option 2', something: 1, selected: true },
                            { label: 'Option 3', something: 2, selected: false },
                            { label: 'Option 4', something: 3, selected: false },
                            { label: 'Option 5', something: 4, selected: false },
                        ]"
                    >
                        Select
                    </BSelect>
                    <BInput label-value="label" min-height="3em" placeholder="Type here" />
                </BGroup>
            </BCard>\` + \`\\n<BRoundButton variant="positive" />\` + "\\n</BGroup>"
  }),
  args: {
    modelValue: "null",
    vertical: true,
    disabled: false
  }
}`,...(b=(v=t.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const y=["BRadio","BRadioButton","BRadioDiv","BConector"];export{t as BConector,l as BRadio,r as BRadioButton,o as BRadioDiv,y as __namedExportsOrder,V as default};
