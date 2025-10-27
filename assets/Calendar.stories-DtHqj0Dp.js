import{C as W,_ as e}from"./iframe-CEhHUQ6Y.js";var i,m,c,p,v,g,f,_,y,b,D,C,S,h,R,V,w,x,A,M,P;const B={component:W,argTypes:{modelValue:{type:{name:"other",value:"Date | Date[] | Date[][] | undefined"},table:{defaultValue:{summary:"undefined"}},description:"Will be the current date or period."},lang:{type:{name:"string"},table:{defaultValue:{summary:"en-US"}},description:"Will be the date input language."},type:{type:{name:"string"},control:{type:"select"},options:["date","period","compare"],table:{defaultValue:{summary:"date"}},description:"Selection mode: single date, date range, or comparison mode."},doubleCalendar:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Shows two calendar months side by side."},minDate:{type:{name:"other",value:"Date | undefined"},table:{defaultValue:{summary:"null"}},description:"Will be the oldest date the user can select."},maxDate:{type:{name:"other",value:"Date | undefined"},table:{defaultValue:{summary:"null"}},description:"Will be the newest date the user can select."}}};var a={modelValue:void 0,lang:"en-US",type:"date",doubleCalendar:!1,minDate:void 0,maxDate:void 0},r=function(j){return{components:{Calendar:W},setup:function(){return{args:j}},template:`
    <Calendar 
      v-model="args.modelValue" 
      :lang="args.lang" 
      :type="args.type" 
      :double-calendar="args.doubleCalendar" 
      :min-date="args.minDate" 
      :max-date="args.maxDate"
    />
    `}},n={render:r,args:a},d={render:r,args:e(e({},a),{lang:"pt-BR"})},o={render:r,args:e(e({},a),{type:"period"})},t={render:r,args:e(e({},a),{type:"compare"})},l={render:r,args:e(e({},a),{doubleCalendar:!0})},s={render:r,args:e(e({},a),{minDate:new Date})},u={render:r,args:e(e({},a),{maxDate:new Date})};n.parameters=e(e({},n.parameters),{docs:e(e({},(i=n.parameters)===null||i===void 0?void 0:i.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(c=(m=n.parameters)===null||m===void 0?void 0:m.docs)===null||c===void 0?void 0:c.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(p=d.parameters)===null||p===void 0?void 0:p.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    lang: "pt-BR"
  }
}`},(g=(v=d.parameters)===null||v===void 0?void 0:v.docs)===null||g===void 0?void 0:g.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(f=o.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    type: "period" as const
  }
}`},(y=(_=o.parameters)===null||_===void 0?void 0:_.docs)===null||y===void 0?void 0:y.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(b=t.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    type: "compare"
  }
}`},(C=(D=t.parameters)===null||D===void 0?void 0:D.docs)===null||C===void 0?void 0:C.source)})});l.parameters=e(e({},l.parameters),{docs:e(e({},(S=l.parameters)===null||S===void 0?void 0:S.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    doubleCalendar: true
  }
}`},(R=(h=l.parameters)===null||h===void 0?void 0:h.docs)===null||R===void 0?void 0:R.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(V=s.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    minDate: new Date()
  }
}`},(x=(w=s.parameters)===null||w===void 0?void 0:w.docs)===null||x===void 0?void 0:x.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(A=u.parameters)===null||A===void 0?void 0:A.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxDate: new Date()
  }
}`},(P=(M=u.parameters)===null||M===void 0?void 0:M.docs)===null||P===void 0?void 0:P.source)})});const O=Object.freeze(Object.defineProperty({__proto__:null,Compare:t,DoubleCalendar:l,Lang:d,MaxDate:u,MinDate:s,Period:o,Primary:n,default:B},Symbol.toStringTag,{value:"Module"}));export{O as C,l as D,d as L,s as M,n as P,o as a,t as b,u as c};
