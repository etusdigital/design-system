import{M as t,_ as e}from"./iframe-oiXQscte.js";var y,h,b,T,w,_,x,M,z,C,S,j,A,$,V,I,P,B,R,H,W,O,k,D,J,L,N,Y,q,E;const F={component:t,argTypes:{title:{type:{name:"string"},description:"This prop will be the card title."},value:{type:{name:"other",value:"string | number"},description:"This prop will be the card value."},description:{type:{name:"other",value:"string | number"},description:"This prop will be the card description."},icon:{type:{name:"string"},description:"This prop will be the card icon."},type:{type:{name:"string"},control:"select",options:["default","secondary","dashed"],table:{defaultValue:{summary:"default"}},description:"This property will be select container color."},size:{type:{name:"string"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"medium"}}},color:{type:{name:"string"},control:"select",options:["primary","info","success","warning","danger","neutral"],table:{defaultValue:{summary:"neutral"}},description:"This prop will be the value color, if the type is card."},infoMessage:{type:{name:"string"},description:"This prop will be the card info message."},infoType:{type:{name:"string"},control:"select",options:["primary","info","success","warning","danger","neutral"],table:{defaultValue:{summary:"neutral"}},description:"This prop will be the info icon or text color. Works with default and card types"},tooltipMinWidth:{type:{name:"string"},table:{defaultValue:{summary:"none"}},description:"This property will be info tooltip min-width."},loading:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"This prop will determine if the card is loading."},noTooltip:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"This prop will determine if the info message won't be shown inside a tooltip."},boldTitle:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"This prop will determine if the title will be bold."},default:{description:"This slot will be shown below the card informations."},"title-slot":{description:"This slot will be replace the title."},"value-slot":{description:"This slot will be replace the value."},"description-slot":{description:"This slot will be replace the description."},content:{description:"This slot will be replace the value and the description."},info:{description:"This slot will be shown next to the title."}}};var r={title:"Open",value:"50%",description:"100.000.000",icon:"drafts",color:"neutral",infoMessage:"",infoType:"neutral",tooltipMinWidth:"none",type:"default",size:"medium",loading:!1,noTooltip:!1,boldTitle:!1},f=`
  <MetricCard
    class="w-fit h-fit"
    :title="args.title"
    :value="args.value"
    :description="args.description"
    :icon="args.icon"
    :color="args.color"
    :type="args.type"
    :size="args.size"
    :info-message="args.infoMessage"
    :info-type="args.infoType"
    :tooltip-min-width="args.tooltipMinWidth"
    :loading="args.loading"
    :no-tooltip="args.noTooltip"
    :bold-title="args.boldTitle"
  />
`,v=function(n){return{components:{MetricCard:t},setup:function(){return{args:n}},template:f}},s={render:v,args:r},o={render:function(n){return{components:{MetricCard:t},setup:function(){return{args:n}},template:`
        <div class="flex gap-4">
          `.concat(["default","secondary","dashed"].map(function(a){return f.replace(/args\.type/g,"'".concat(a,"'"))}).join(""),`
        </div>
      `)}},args:r},i={render:function(n){return{components:{MetricCard:t},setup:function(){return{args:n}},template:`
        <div class="flex gap-4">
          `.concat(["primary","info","success","warning","danger","neutral"].map(function(a){return f.replace(/args\.color/g,"'".concat(a,"'"))}).join(""),`
        </div>
      `)}},args:r},l={render:function(n){return{components:{MetricCard:t},setup:function(){return{args:n}},template:`
        <div class="flex gap-4">
          `.concat(["small","medium","large"].map(function(a){return f.replace(/args\.size/g,"'".concat(a,"'"))}).join(""),`
        </div>
      `)}},args:r},d={render:v,args:e(e({},r),{infoMessage:"30%"})},c={render:function(n){return{components:{MetricCard:t},setup:function(){return{args:n}},template:`
        <div class="flex gap-4">
          `.concat(["primary","info","success","warning","danger","neutral"].map(function(a){return f.replace(/args\.infoType/g,"'".concat(a,"'"))}).join(""),`
        </div>
      `)}},args:e(e({},r),{infoMessage:"30%"})},p={render:v,args:e(e({},r),{loading:!0})},u={render:v,args:e(e({},r),{infoMessage:"30%",noTooltip:!0})},m={render:v,args:e(e({},r),{boldTitle:!0})},g={render:function(n){return{components:{MetricCard:t},setup:function(){return{args:n}},template:`
        <MetricCard
          class="w-fit"
          title="Your June recipe"
          value="$100,000.00"
          color="var(--primary-foreground-low)"
          type="secondary"
          size="large"
          bold-title
        >
          <template #description-slot>
            <div class="flex items-center h-full pt-xs">
              <Tooltip text="info">
                <Icon name="info" size="var(--spacing-lg)" class="text-neutral-interaction-default" />
              </Tooltip>
            </div>
          </template>
          <div class="flex flex-col gap-sm mt-sm">
            <div class="flex items-center gap-xs text-neutral-foreground-high">
                <Icon name="calendar_month" size="var(--spacing-base)" />
                <p class="text-sm">Payment will be made by 04/30/2024</p>
            </div>
            <div class="flex gap-xs self-end">
              <Tag text="Processing payment" size="small" />
              <Button variant="secondary" size="small">
                View Details
              </Button>
            </div>
          </div>
        </MetricCard>
      `}},args:r};s.parameters=e(e({},s.parameters),{docs:e(e({},(y=s.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(b=(h=s.parameters)===null||h===void 0?void 0:h.docs)===null||b===void 0?void 0:b.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(T=o.parameters)===null||T===void 0?void 0:T.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      MetricCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="flex gap-4">
          \${["default", "secondary", "dashed"].map(type => {
      return defaultHtml.replace(/args\\.type/g, \`'\${type}'\`);
    }).join("")}
        </div>
      \`
  }),
  args: defaultArgs
}`},(_=(w=o.parameters)===null||w===void 0?void 0:w.docs)===null||_===void 0?void 0:_.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(x=i.parameters)===null||x===void 0?void 0:x.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      MetricCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="flex gap-4">
          \${["primary", "info", "success", "warning", "danger", "neutral"].map(color => {
      return defaultHtml.replace(/args\\.color/g, \`'\${color}'\`);
    }).join("")}
        </div>
      \`
  }),
  args: defaultArgs
}`},(z=(M=i.parameters)===null||M===void 0?void 0:M.docs)===null||z===void 0?void 0:z.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(C=l.parameters)===null||C===void 0?void 0:C.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      MetricCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="flex gap-4">
          \${["small", "medium", "large"].map(size => {
      return defaultHtml.replace(/args\\.size/g, \`'\${size}'\`);
    }).join("")}
        </div>
      \`
  }),
  args: defaultArgs
}`},(j=(S=l.parameters)===null||S===void 0?void 0:S.docs)===null||j===void 0?void 0:j.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(A=d.parameters)===null||A===void 0?void 0:A.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "30%"
  }
}`},(V=($=d.parameters)===null||$===void 0?void 0:$.docs)===null||V===void 0?void 0:V.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(I=c.parameters)===null||I===void 0?void 0:I.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      MetricCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="flex gap-4">
          \${["primary", "info", "success", "warning", "danger", "neutral"].map(type => {
      return defaultHtml.replace(/args\\.infoType/g, \`'\${type}'\`);
    }).join("")}
        </div>
      \`
  }),
  args: {
    ...defaultArgs,
    infoMessage: "30%"
  }
}`},(B=(P=c.parameters)===null||P===void 0?void 0:P.docs)===null||B===void 0?void 0:B.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(R=p.parameters)===null||R===void 0?void 0:R.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true
  }
}`},(W=(H=p.parameters)===null||H===void 0?void 0:H.docs)===null||W===void 0?void 0:W.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(O=u.parameters)===null||O===void 0?void 0:O.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "30%",
    noTooltip: true
  }
}`},(D=(k=u.parameters)===null||k===void 0?void 0:k.docs)===null||D===void 0?void 0:D.source)})});m.parameters=e(e({},m.parameters),{docs:e(e({},(J=m.parameters)===null||J===void 0?void 0:J.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    boldTitle: true
  }
}`},(N=(L=m.parameters)===null||L===void 0?void 0:L.docs)===null||N===void 0?void 0:N.source)})});g.parameters=e(e({},g.parameters),{docs:e(e({},(Y=g.parameters)===null||Y===void 0?void 0:Y.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      MetricCard
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <MetricCard
          class="w-fit"
          title="Your June recipe"
          value="$100,000.00"
          color="var(--primary-foreground-low)"
          type="secondary"
          size="large"
          bold-title
        >
          <template #description-slot>
            <div class="flex items-center h-full pt-xs">
              <Tooltip text="info">
                <Icon name="info" size="var(--spacing-lg)" class="text-neutral-interaction-default" />
              </Tooltip>
            </div>
          </template>
          <div class="flex flex-col gap-sm mt-sm">
            <div class="flex items-center gap-xs text-neutral-foreground-high">
                <Icon name="calendar_month" size="var(--spacing-base)" />
                <p class="text-sm">Payment will be made by 04/30/2024</p>
            </div>
            <div class="flex gap-xs self-end">
              <Tag text="Processing payment" size="small" />
              <Button variant="secondary" size="small">
                View Details
              </Button>
            </div>
          </div>
        </MetricCard>
      \`
  }),
  args: defaultArgs
}`},(E=(q=g.parameters)===null||q===void 0?void 0:q.docs)===null||E===void 0?void 0:E.source)})});const K=Object.freeze(Object.defineProperty({__proto__:null,BoldTitle:m,Colors:i,InfoMessage:d,InfoTypes:c,Loading:p,NoTooltip:u,Primary:s,Sizes:l,Slots:g,Types:o,default:F},Symbol.toStringTag,{value:"Module"}));export{m as B,i as C,d as I,p as L,K as M,u as N,s as P,l as S,o as T,c as a,g as b};
