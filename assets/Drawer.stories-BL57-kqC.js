import{n as g,_ as e}from"./iframe-DjHBvzoa.js";var n,s,l,i,d,u,c,p,m;const x={component:g,argTypes:{modelValue:{control:{type:"boolean"},description:"Determine if the dialog is displayed or not."},size:{control:{type:"text"},table:{defaultValue:{summary:"fit-content"}},description:"Determine the drawer size (width for left/right positions, height for top/bottom positions)."},noOutsideClose:{control:{type:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the dialog will not close when the user click outside it."},position:{control:{type:"select"},options:["top","bottom","left","right"],table:{defaultValue:{summary:"right"}},description:"Position where the drawer will slide from."},zIndex:{type:{name:"number"},table:{defaultValue:{summary:"1002"}},description:"Determine the z-index of the drawer and its overlay (backdrop)."},default:{description:"This slot will be the dialog content."}}};var f={modelValue:!1,size:"40%",noOutsideClose:!1,position:"right",zIndex:1002},w=`
  <Button  @click="args.modelValue = !args.modelValue">Show Drawer</Button>
  <Drawer
        v-model="args.modelValue"
        :size="args.size"
        :no-outside-close="args.noOutsideClose"
        :position="args.position"
        :z-index="args.zIndex"
        aria-labelledby="drawer-title"
  >
      <div class="flex flex-col justify-between h-full p-xl">
          <div class="flex flex-col gap-sm">
            <h2 id="drawer-title" class="font-bold text-lg">Drawer</h2>
            <p class="text-sm text-neutral-foreground-low">Lorem ipsum dolor sit amet consectetur. Ultricies urna mattis purus maecenas amet hac viverra id feugiat. Et dui maecenas at dui. Sagittis phasellus a massa praesent ultricies.</p>
          </div>
          <div class="flex justify-end w-full gap-xs">
              <Button variant="plain" @click="args.modelValue = false">Cancel</Button>
              <Button>Save</Button>
          </div>
      </div>
  </Drawer>
  `,h=function(a){return{components:{Drawer:g},setup:function(){return{args:a}},template:w}},t={render:h,args:f},o={render:h,args:e(e({},f),{noOutsideClose:!0})},r={render:function(a){return{components:{Drawer:g},setup:function(){return{args:a}},template:`<div class="flex gap-xxs">
    `.concat(["left","right","top","bottom"].map(function(v){return`<Button  @click="() => { args.position = '`.concat(v,`'; args.modelValue = !args.modelValue }">Show `).concat(v," Drawer</Button>")}).join(""),`</div>
    `).concat(w.replace(/<Button  @click="args\.modelValue = !args\.modelValue">Show Drawer<\/Button>/g,""))}},args:e(e({},f),{position:"left"})};t.parameters=e(e({},t.parameters),{docs:e(e({},(n=t.parameters)===null||n===void 0?void 0:n.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(l=(s=t.parameters)===null||s===void 0?void 0:s.docs)===null||l===void 0?void 0:l.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(i=o.parameters)===null||i===void 0?void 0:i.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    noOutsideClose: true
  }
}`},(u=(d=o.parameters)===null||d===void 0?void 0:d.docs)===null||u===void 0?void 0:u.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(c=r.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Drawer
    },
    setup() {
      return {
        args
      };
    },
    template: \`<div class="flex gap-xxs">
    \${["left", "right", "top", "bottom"].map(position => {
      return \`<Button  @click="() => { args.position = '\${position}'; args.modelValue = !args.modelValue }">Show \${position} Drawer</Button>\`;
    }).join("")}</div>
    \${defaultHtml.replace(/<Button  @click="args\\.modelValue = !args\\.modelValue">Show Drawer<\\/Button>/g, "")}\`
  }),
  args: {
    ...defaultArgs,
    position: "left"
  }
}`},(m=(p=r.parameters)===null||p===void 0?void 0:p.docs)===null||m===void 0?void 0:m.source)})});const y=Object.freeze(Object.defineProperty({__proto__:null,NoOutsideClose:o,Positions:r,Primary:t,default:x},Symbol.toStringTag,{value:"Module"}));export{y as D,o as N,t as P,r as a};
