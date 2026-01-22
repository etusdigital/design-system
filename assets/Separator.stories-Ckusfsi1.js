import{z as d,_ as r}from"./iframe-D9ZodyF1.js";var t,o,s,i,p,l;const c={component:d,argTypes:{position:{type:{name:"string"},control:"select",options:["left","center","right"],table:{defaultValue:{summary:"right"}}}}};var u={position:"right"},g=function(a){return{components:{Separator:d},setup:function(){return{args:a}},template:`
    <Separator :position="args.position">
      Separator
    </Separator>
  `}},e={render:g,args:u},n={render:function(a){return{components:{Separator:d},setup:function(){return{args:a}},template:`
      <div class="space-y-lg">
        <Separator position="left">
          Left
        </Separator>
        <Separator position="center">
          Center
        </Separator>
        <Separator position="right">
          Right
        </Separator>
      </div>
    `}},args:u};e.parameters=r(r({},e.parameters),{docs:r(r({},(t=e.parameters)===null||t===void 0?void 0:t.docs),{source:r({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(s=(o=e.parameters)===null||o===void 0?void 0:o.docs)===null||s===void 0?void 0:s.source)})});n.parameters=r(r({},n.parameters),{docs:r(r({},(i=n.parameters)===null||i===void 0?void 0:i.docs),{source:r({originalSource:`{
  render: (args: any) => ({
    components: {
      Separator
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="space-y-lg">
        <Separator position="left">
          Left
        </Separator>
        <Separator position="center">
          Center
        </Separator>
        <Separator position="right">
          Right
        </Separator>
      </div>
    \`
  }),
  args: defaultArgs
}`},(l=(p=n.parameters)===null||p===void 0?void 0:p.docs)===null||l===void 0?void 0:l.source)})});const m=Object.freeze(Object.defineProperty({__proto__:null,Positions:n,Primary:e,default:c},Symbol.toStringTag,{value:"Module"}));export{e as P,m as S,n as a};
