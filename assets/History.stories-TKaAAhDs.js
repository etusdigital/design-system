import{H as t,_ as n}from"./iframe-1aJ3cS75.js";var f,y,v,b,x,h,_,H,w,I,R,S,P,D,j,A,T,O,k,V,$,M,U,z;const C={component:t,argTypes:{modelValue:{type:{name:"other",value:"any"},description:'Will be an option from the "options" array at the selected index.'},options:{type:{name:"array",value:{name:"object",value:{}}},description:"This property will be the historic options."},position:{type:{name:"string"},control:"select",options:["top","bottom","left","right"],table:{defaultValue:{summary:"right"}},description:"This is the historic position."},type:{type:{name:"string"},control:"select",options:["primary","info","success","warning","danger","neutral"],table:{defaultValue:{summary:"info"}},description:"This is historic type, only if the option doesn't have a type property."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Don't allow user to change the select option."},option:{description:"This slot will be displayed for each option passed. Params: option, index and active"}}};var m=[{label:"Person 1",date:new Date,type:"primary",icon:"schedule",notRoundIcon:"check",isIconRound:!0},{label:"Person 2",date:new Date,type:"info",icon:"schedule",notRoundIcon:"info_i",isIconRound:!0},{label:"Person 3",date:new Date,type:"success",icon:"check_circle",notRoundIcon:"check",isIconRound:!0},{label:"Person 4",date:new Date,type:"warning",icon:"error",notRoundIcon:"exclamation",isIconRound:!0},{label:"Person 5",date:new Date,type:"danger",icon:"cancel",notRoundIcon:"close",isIconRound:!0},{label:"Person 6",date:new Date,type:"neutral",icon:"check_circle",notRoundIcon:"check",isIconRound:!0}],o={modelValue:null,options:m.map(function(e){return n(n({},e),{type:void 0,icon:void 0})}),position:"right",type:"primary",disabled:!1},r=`
  <History
      v-model="args.modelValue"
      :options="args.options"
      :position="args.position"
      :type="args.type"
      :disabled="args.disabled"
  >
      <template #option="{ option, index, active }">
          <p
              class="text-sm mb-[10px] hover:underline"
              :class="{
                  'font-bold': active, 
                  'text-primary-interaction-default': (option.type || args.type) == 'primary', 
                  'text-informative-interaction-default': (option.type || args.type) == 'info', 
                  'text-success-interaction-default': (option.type || args.type) == 'success', 
                  'text-warning-interaction-default': (option.type || args.type) == 'warning', 
                  'text-danger-interaction-default': (option.type || args.type) == 'danger',
                  'text-neutral-interaction-default': (option.type || args.type) == 'neutral',
              }"
          >
              <span
                  class="text-neutral-foreground-negative py-[3px] px-[6px] mt-[5px] rounded-[20px] text-xs font-normal mr-[.6em]"
                  :class="{
                      'font-bold': active, 
                      'bg-primary-interaction-default': (option.type || args.type) == 'primary', 
                      'bg-informative-interaction-default': (option.type || args.type) == 'info', 
                      'bg-success-interaction-default': (option.type || args.type) == 'success', 
                      'bg-warning-interaction-default': (option.type || args.type) == 'warning', 
                      'bg-danger-interaction-default': (option.type || args.type) == 'danger',
                      'bg-neutral-interaction-default': (option.type || args.type) == 'neutral',
                  }"
                  v-if="index == 0"
              >
                  Current
              </span>
              {{ 
                  option.date.toLocaleDateString(
                      'en-US',
                      index == 0 ?
                      { day: '2-digit', month: 'long', year: 'numeric' } :
                      { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }
                  ) 
              }}
          </p>
          <div class="flex items-center justify-start mt-[16px] mb-[5px]">
              <div class="w-[20px] h-[20px] rounded-[50%] bg-neutral-foreground-disabled" />
              <p class="text-sm text-neutral-foreground-low ml-sm" :class="{'text-neutral-foreground-high': active }">{{ option.label }}</p>
          </div>
      </template>
  </History>
`,q=function(e){return{components:{History:t},setup:function(){return{args:e}},template:r}},a={render:q,args:o},s={render:function(e){return{components:{History:t},setup:function(){return{args:e}},template:`
        <div class="flex flex-col gap-xxs">
            `.concat(["top","bottom","left","right"].map(function(g){return r.replace(/args\.position/g,"'".concat(g,"'"))}).join(""),`
        </div>
        `)}},args:o},i={render:function(e){return{components:{History:t},setup:function(){return{args:e}},template:`
        <div class="flex gap-xxs">
            `.concat(["primary","info","success","warning","danger","neutral"].map(function(g){return r.replace(/args\.type/g,"'".concat(g,"'"))}).join(""),`
        </div>
        `)}},args:o},l={render:q,args:n(n({},o),{disabled:!0})},d={render:function(e){return{components:{History:t},setup:function(){return{args:e}},template:r}},args:n(n({},o),{disabled:!0,options:m.map(function(e){return n(n({},e),{icon:void 0})})})},p={render:function(e){return{components:{History:t},setup:function(){return{args:e}},template:r}},args:n(n({},o),{disabled:!0,options:m.map(function(e){return n(n({},e),{isIconRound:!1,icon:e.notRoundIcon})})})},u={render:function(e){return{components:{History:t},setup:function(){return{args:e}},template:r}},args:n(n({},o),{disabled:!0,options:m})},c={render:function(e){return{components:{History:t},setup:function(){return{args:e}},template:r}},args:n(n({},o),{disabled:!0,options:m.map(function(e){return n(n({},e),{unfilled:!0})})})};a.parameters=n(n({},a.parameters),{docs:n(n({},(f=a.parameters)===null||f===void 0?void 0:f.docs),{source:n({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(v=(y=a.parameters)===null||y===void 0?void 0:y.docs)===null||v===void 0?void 0:v.source)})});s.parameters=n(n({},s.parameters),{docs:n(n({},(b=s.parameters)===null||b===void 0?void 0:b.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      History
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="flex flex-col gap-xxs">
            \${["top", "bottom", "left", "right"].map(position => {
      return defaultHtml.replace(/args\\.position/g, \`'\${position}'\`);
    }).join("")}
        </div>
        \`
  }),
  args: defaultArgs
}`},(h=(x=s.parameters)===null||x===void 0?void 0:x.docs)===null||h===void 0?void 0:h.source)})});i.parameters=n(n({},i.parameters),{docs:n(n({},(_=i.parameters)===null||_===void 0?void 0:_.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      History
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <div class="flex gap-xxs">
            \${["primary", "info", "success", "warning", "danger", "neutral"].map(type => {
      return defaultHtml.replace(/args\\.type/g, \`'\${type}'\`);
    }).join("")}
        </div>
        \`
  }),
  args: defaultArgs
}`},(w=(H=i.parameters)===null||H===void 0?void 0:H.docs)===null||w===void 0?void 0:w.source)})});l.parameters=n(n({},l.parameters),{docs:n(n({},(I=l.parameters)===null||I===void 0?void 0:I.docs),{source:n({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(S=(R=l.parameters)===null||R===void 0?void 0:R.docs)===null||S===void 0?void 0:S.source)})});d.parameters=n(n({},d.parameters),{docs:n(n({},(P=d.parameters)===null||P===void 0?void 0:P.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      History
    },
    setup() {
      return {
        args
      };
    },
    template: defaultHtml
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    options: defaultOptions.map(option => ({
      ...option,
      icon: undefined
    }))
  }
}`},(j=(D=d.parameters)===null||D===void 0?void 0:D.docs)===null||j===void 0?void 0:j.source)})});p.parameters=n(n({},p.parameters),{docs:n(n({},(A=p.parameters)===null||A===void 0?void 0:A.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      History
    },
    setup() {
      return {
        args
      };
    },
    template: defaultHtml
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    options: defaultOptions.map(option => ({
      ...option,
      isIconRound: false,
      icon: option.notRoundIcon
    }))
  }
}`},(O=(T=p.parameters)===null||T===void 0?void 0:T.docs)===null||O===void 0?void 0:O.source)})});u.parameters=n(n({},u.parameters),{docs:n(n({},(k=u.parameters)===null||k===void 0?void 0:k.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      History
    },
    setup() {
      return {
        args
      };
    },
    template: defaultHtml
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    options: defaultOptions
  }
}`},($=(V=u.parameters)===null||V===void 0?void 0:V.docs)===null||$===void 0?void 0:$.source)})});c.parameters=n(n({},c.parameters),{docs:n(n({},(M=c.parameters)===null||M===void 0?void 0:M.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      History
    },
    setup() {
      return {
        args
      };
    },
    template: defaultHtml
  }),
  args: {
    ...defaultArgs,
    disabled: true,
    options: defaultOptions.map(option => ({
      ...option,
      unfilled: true
    }))
  }
}`},(z=(U=c.parameters)===null||U===void 0?void 0:U.docs)===null||z===void 0?void 0:z.source)})});const W=Object.freeze(Object.defineProperty({__proto__:null,Disabled:l,Icons:p,IsIconRound:u,MultiType:d,Positions:s,Primary:a,Types:i,Unfilled:c,default:C},Symbol.toStringTag,{value:"Module"}));export{l as D,W as H,p as I,d as M,a as P,i as T,c as U,u as a,s as b};
