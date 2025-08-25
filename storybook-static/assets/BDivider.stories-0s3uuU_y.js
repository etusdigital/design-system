import{B as g}from"./BDivider-bOwaFFET.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const l={component:g,tags:["autodocs"],argTypes:{position:{description:"Posição da linha em relação ao conteúdo do slot.",control:"select",options:["left","both","right"],table:{type:{summary:"'left' | 'both' | 'right'"},defaultValue:{summary:"right"}}}}},p={position:"right"},r={render:i=>({setup(){return{args:i}},template:`
      <BDivider
          :position="args.position"
      >
        Divider
      </BDivider>
    `}),args:p},e={render:i=>({setup(){return{args:i}},template:`
      <BDivider
          position="left"
      >
        Left
      </BDivider>
      <BDivider
          position="both"
      >
        Both
      </BDivider>
      <BDivider
          position="right"
      >
        Right
      </BDivider>
    `}),args:p};var t,n,o;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
      <BDivider
          :position="args.position"
      >
        Divider
      </BDivider>
    \`
  }),
  args: defaultArgs
}`,...(o=(n=r.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var s,a,d;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
      <BDivider
          position="left"
      >
        Left
      </BDivider>
      <BDivider
          position="both"
      >
        Both
      </BDivider>
      <BDivider
          position="right"
      >
        Right
      </BDivider>
    \`
  }),
  args: defaultArgs
}`,...(d=(a=e.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};const B=["Primary","Positions"];export{e as Positions,r as Primary,B as __namedExportsOrder,l as default};
