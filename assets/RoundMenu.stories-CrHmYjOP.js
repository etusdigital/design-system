import{y as t,_ as n}from"./iframe-D9ZodyF1.js";var a,i,e;const l={component:t,argTypes:{options:{type:{name:"array",value:{name:"object",value:{}}},table:{defaultValue:{summary:"[]"}},description:"This property will be options in menu. Props(label: string, icon: string, background: string, action: ()=>{void})"}}};var o={render:function(c){return{components:{RoundMenu:t},setup:function(){return{args:c}},template:`
        <div class="px-[3em] py-[4em]">
            <RoundMenu :options="args.options" />
        </div>
        `}},args:{options:[{icon:"email",label:"Send email",background:"#0057F4",action:function(){}},{icon:"stop",label:"Finish Automation",background:"#F03232",action:function(){}},{icon:"schedule",label:"Wait",background:"#5C5C5C",action:function(){}},{icon:"history",label:"Time condition",background:"#FF9654",action:function(){}},{icon:"add",label:"Conditional",background:"#4A004F",action:function(){}},{icon:"new_label",label:"Add tag",background:"#009BE4",action:function(){}},{icon:"label_off",label:"Remove tag",background:"#F06158",action:function(){}},{icon:"add_circle",label:"Trigger",background:"#7B61FF",action:function(){}},{icon:"call_split",label:"Split",background:"#FFC500",action:function(){}}]}};o.parameters=n(n({},o.parameters),{docs:n(n({},(a=o.parameters)===null||a===void 0?void 0:a.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      RoundMenu
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="px-[3em] py-[4em]">
            <RoundMenu :options="args.options" />
        </div>
        \`
  }),
  args: {
    options: [{
      icon: "email",
      label: "Send email",
      background: "#0057F4",
      action: () => {}
    }, {
      icon: "stop",
      label: "Finish Automation",
      background: "#F03232",
      action: () => {}
    }, {
      icon: "schedule",
      label: "Wait",
      background: "#5C5C5C",
      action: () => {}
    }, {
      icon: "history",
      label: "Time condition",
      background: "#FF9654",
      action: () => {}
    }, {
      icon: "add",
      label: "Conditional",
      background: "#4A004F",
      action: () => {}
    }, {
      icon: "new_label",
      label: "Add tag",
      background: "#009BE4",
      action: () => {}
    }, {
      icon: "label_off",
      label: "Remove tag",
      background: "#F06158",
      action: () => {}
    }, {
      icon: "add_circle",
      label: "Trigger",
      background: "#7B61FF",
      action: () => {}
    }, {
      icon: "call_split",
      label: "Split",
      background: "#FFC500",
      action: () => {}
    }]
  }
}`},(e=(i=o.parameters)===null||i===void 0?void 0:i.docs)===null||e===void 0?void 0:e.source)})});const u=Object.freeze(Object.defineProperty({__proto__:null,Primary:o,default:l},Symbol.toStringTag,{value:"Module"}));export{o as P,u as R};
