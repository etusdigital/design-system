import{B as i}from"./BTooltip-CocLkyuB.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const g={component:i,tags:["autodocs"],argTypes:{text:{description:"Texto exibido dentro do tooltip. Pode ser passado via prop ou slot padrão.",control:{type:"text"},table:{type:{summary:"string"}}},position:{description:"Posição do tooltip em relação ao elemento alvo.",control:"select",options:["top","bottom","left","right"],table:{type:{summary:"'top' | 'bottom' | 'left' | 'right'"},defaultValue:{summary:"right"}}}},args:{text:"Tooltip",position:"right"}},m={text:"Tooltip",position:"right"},t={render:e=>({components:{BTooltip:i},setup(){return{args:e}},template:`
      <div class="px-[5em] py-[1.5em]">
          <BTooltip :text="args.text" :position="args.position">
              <BInput />
          </BTooltip>
      </div>
    `}),args:m},o={render:e=>({components:{BTooltip:i},setup(){return{args:e}},template:`
      <div class="text-2xl flex gap-2 py-[.9em] px-[.5em]">
          <BTooltip :text="args.text" position="right">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="top">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="left">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="bottom">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
      </div>
    `}),args:m};var n,r,s;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BTooltip
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="px-[5em] py-[1.5em]">
          <BTooltip :text="args.text" :position="args.position">
              <BInput />
          </BTooltip>
      </div>
    \`
  }),
  args: defaultArgs
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var p,a,l;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BTooltip
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="text-2xl flex gap-2 py-[.9em] px-[.5em]">
          <BTooltip :text="args.text" position="right">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="top">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="left">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
          <BTooltip :text="args.text" position="bottom">
              <div class="h-fit w-fit flex items-center">
                  <BIcon name="error" />
              </div>
          </BTooltip>
      </div>
    \`
  }),
  args: defaultArgs
}`,...(l=(a=o.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const f=["Primary","Positions"];export{o as Positions,t as Primary,f as __namedExportsOrder,g as default};
