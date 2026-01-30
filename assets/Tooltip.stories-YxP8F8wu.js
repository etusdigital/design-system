import{$ as a,_ as o}from"./iframe-1aJ3cS75.js";var r,i,s,p,u,c,d,m,g;const T={component:a,argTypes:{labelValue:{type:{name:"string"},description:"This is the text showed inside the tooltip."},position:{type:{name:"string"},control:"select",options:["top","bottom","left","right"],table:{defaultValue:{summary:"right"}},description:"This is the position tooltip will be placed."},label:{description:"Slot to show the tooltip text."}}};var v={labelValue:"Tooltip",position:"right"},b=function(e){return{components:{Tooltip:a},setup:function(){return{args:e}},template:`
    <Tooltip :label-value="args.labelValue" :position="args.position">
      <Button>Hover me</Button>
    </Tooltip>
  `}},n={render:b,args:v},t={render:function(e){return{components:{Tooltip:a},setup:function(){return{args:e}},template:`
      <div class="flex gap-sm">
          <Tooltip :label-value="args.labelValue" position="right">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="top">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="left">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="bottom">
              <Icon name="error" />
          </Tooltip>
      </div>
    `}},args:v},l={render:function(e){return{components:{Tooltip:a},setup:function(){return{args:e}},template:`
      <Tooltip :position="args.position">
        <Button>Rich tooltip</Button>
        <template #label>
          <div class="flex items-center gap-xs">
            <Icon name="info" />
            <span>Rich content here</span>
          </div>
        </template>
      </Tooltip>
    `}},args:o({},v)};n.parameters=o(o({},n.parameters),{docs:o(o({},(r=n.parameters)===null||r===void 0?void 0:r.docs),{source:o({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(s=(i=n.parameters)===null||i===void 0?void 0:i.docs)===null||s===void 0?void 0:s.source)})});t.parameters=o(o({},t.parameters),{docs:o(o({},(p=t.parameters)===null||p===void 0?void 0:p.docs),{source:o({originalSource:`{
  render: (args: any) => ({
    components: {
      Tooltip
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-sm">
          <Tooltip :label-value="args.labelValue" position="right">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="top">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="left">
              <Icon name="error" />
          </Tooltip>
          <Tooltip :label-value="args.labelValue" position="bottom">
              <Icon name="error" />
          </Tooltip>
      </div>
    \`
  }),
  args: defaultArgs
}`},(c=(u=t.parameters)===null||u===void 0?void 0:u.docs)===null||c===void 0?void 0:c.source)})});l.parameters=o(o({},l.parameters),{docs:o(o({},(d=l.parameters)===null||d===void 0?void 0:d.docs),{source:o({originalSource:`{
  render: (args: any) => ({
    components: {
      Tooltip
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Tooltip :position="args.position">
        <Button>Rich tooltip</Button>
        <template #label>
          <div class="flex items-center gap-xs">
            <Icon name="info" />
            <span>Rich content here</span>
          </div>
        </template>
      </Tooltip>
    \`
  }),
  args: {
    ...defaultArgs
  }
}`},(g=(m=l.parameters)===null||m===void 0?void 0:m.docs)===null||g===void 0?void 0:g.source)})});const h=Object.freeze(Object.defineProperty({__proto__:null,Label:l,Positions:t,Primary:n,default:T},Symbol.toStringTag,{value:"Module"}));export{l as L,n as P,h as T,t as a};
