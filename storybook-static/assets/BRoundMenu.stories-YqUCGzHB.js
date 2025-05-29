import{B as i}from"./BRoundMenu-CWSAWUPT.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const s={component:i,tags:["autodocs"],argTypes:{items:{description:"This property will be items in menu. Props(text: string, icon: string, background: string, action: ()=>{void})",control:{type:"object"},table:{type:{summary:"Item[]"},defaultValue:{summary:"[]"}}}}},n={render:a=>({components:{BRoundMenu:i},setup(){return{args:a}},template:`
        <div class="px-[3em] py-[4em]">
            <BRoundMenu :items="args.items" />
        </div>
        `}),args:{items:[{icon:"email",text:"Send email",background:"#0057F4",action:()=>{}},{icon:"stop",text:"Finish Automation",background:"#F03232",action:()=>{}},{icon:"schedule",text:"Wait",background:"#5C5C5C",action:()=>{}},{icon:"history",text:"Time condition",background:"#FF9654",action:()=>{}},{icon:"add",text:"Conditional",background:"#4A004F",action:()=>{}},{icon:"new_label",text:"Add tag",background:"#009BE4",action:()=>{}},{icon:"label_off",text:"Remove tag",background:"#F06158",action:()=>{}},{icon:"add_circle",text:"Trigger",background:"#7B61FF",action:()=>{}},{icon:"call_split",text:"Split",background:"#FFC500",action:()=>{}}]}};var t,o,e;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BRoundMenu
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="px-[3em] py-[4em]">
            <BRoundMenu :items="args.items" />
        </div>
        \`
  }),
  args: {
    items: [{
      icon: "email",
      text: "Send email",
      background: "#0057F4",
      action: () => {}
    }, {
      icon: "stop",
      text: "Finish Automation",
      background: "#F03232",
      action: () => {}
    }, {
      icon: "schedule",
      text: "Wait",
      background: "#5C5C5C",
      action: () => {}
    }, {
      icon: "history",
      text: "Time condition",
      background: "#FF9654",
      action: () => {}
    }, {
      icon: "add",
      text: "Conditional",
      background: "#4A004F",
      action: () => {}
    }, {
      icon: "new_label",
      text: "Add tag",
      background: "#009BE4",
      action: () => {}
    }, {
      icon: "label_off",
      text: "Remove tag",
      background: "#F06158",
      action: () => {}
    }, {
      icon: "add_circle",
      text: "Trigger",
      background: "#7B61FF",
      action: () => {}
    }, {
      icon: "call_split",
      text: "Split",
      background: "#FFC500",
      action: () => {}
    }]
  }
}`,...(e=(o=n.parameters)==null?void 0:o.docs)==null?void 0:e.source}}};const u=["Primary"];export{n as Primary,u as __namedExportsOrder,s as default};
