import{D as J,_ as e,l as t}from"./iframe-B3vSbWMU.js";var g,f,y,b,h,_,D,V,w,A,S,x,R,T,C,M,P,k,q,E,W,L,j,I,z,B,H,O,U,F,Y,$,G;const N={component:J,argTypes:{modelValue:{type:{name:"other",value:"Date | Date[] | Date[][] | undefined"},table:{defaultValue:{summary:"undefined"}},description:"Will be the current date or period."},labelValue:{type:{name:"string"},description:"Will be the date comparator label."},lang:{type:{name:"string"},table:{defaultValue:{summary:"en-US"}},description:"Will be the date input language."},type:{type:{name:"string"},control:{type:"select"},options:["date","period","compare"],table:{defaultValue:{summary:"date"}},description:"Selection mode: single date, date range, or comparison mode."},allowChangeType:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Will determine if the user can change the type of the date input."},minDate:{type:{name:"other",value:"Date | undefined"},table:{defaultValue:{summary:"undefined"}},description:"Will be the oldest date the user can select."},maxDate:{type:{name:"other",value:"Date | undefined"},table:{defaultValue:{summary:"undefined"}},description:"Will be the newest date the user can select."},options:{type:{name:"array",value:{name:"object",value:{}}},description:"Will the predetermined options."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},required:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},hideActions:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Hides the default Clear and Apply buttons."},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},separator:{type:{name:"string"},description:"If two period are selected, this property will separate them."},default:{description:"This slot will be displayed on the select area."},"compare-label":{description:"This slot will be the checkbox text."},"clear-label":{description:"This slot will be the clear button text."},"apply-label":{description:"This slot will be the apply button text."},actions:{description:"Slot to replace the actions area."}}};var a={modelValue:void 0,labelValue:"label",lang:"en-US",type:"date",allowChangeType:!1,minDate:void 0,maxDate:void 0,disabled:!1,required:!1,hideActions:!1,isError:!1,errorMessage:"",expanded:!1,separator:"",options:[{selected:!0,value:"today",label:"Today",calculate:function(){return t("today")}},{value:"yesterday",label:"Yesterday",calculate:function(){return t("yesterday")}},{value:"last7",label:"Last 7 days",calculate:function(){return t("last7")}},{value:"last15",label:"Last 15 days",calculate:function(){return t("last15")}},{value:"last30",label:"Last 30 days",calculate:function(){return t("last30")}},{value:"lastMonth",label:"Last month",calculate:function(){return t("lastMonth")}}]},Q=`
    <div class="flex w-full">
      <DatePicker
          v-model="args.modelValue"
          v-model:expanded="args.expanded"
          v-model:type="args.type"
          :label-value="args.labelValue"
          :lang="args.lang"
          :allow-change-type="args.allowChangeType"
          :min-date="args.minDate"
          :max-date="args.maxDate"
          :options="args.options"
          :disabled="args.disabled"
          :required="args.required"
          :hide-actions="args.hideActions"
          :is-error="args.isError"
          :error-message="args.errorMessage"
          :separator="args.separator"
      >
          Date Filter
          <template #clear-label>
              Clear
          </template>
          <template #apply-label>
              Apply
          </template>
          <template #compare-label>
              Compare two periods
          </template>
      </DatePicker>
    </div>
  `,r=function(K){return{components:{DatePicker:J},setup:function(){return{args:K}},template:Q}},l={render:r,args:a},n={render:r,args:e(e({},a),{lang:"pt-BR",separator:"e"})},o={render:r,args:e(e({},a),{allowChangeType:!0,modelValue:[],type:"period"})},s={render:r,args:e(e({},a),{modelValue:[],type:"period"})},d={render:r,args:e(e({},a),{modelValue:[],type:"compare"})},i={render:r,args:e(e({},a),{minDate:new Date})},u={render:r,args:e(e({},a),{maxDate:new Date})},p={render:r,args:e(e({},a),{disabled:!0})},c={render:r,args:e(e({},a),{required:!0})},m={render:r,args:e(e({},a),{isError:!0,errorMessage:"Error message"})},v={render:r,args:e(e({},a),{modelValue:[[],[]],type:"compare",separator:"separator"})};l.parameters=e(e({},l.parameters),{docs:e(e({},(g=l.parameters)===null||g===void 0?void 0:g.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(y=(f=l.parameters)===null||f===void 0?void 0:f.docs)===null||y===void 0?void 0:y.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(b=n.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    lang: "pt-BR",
    separator: "e"
  }
}`},(_=(h=n.parameters)===null||h===void 0?void 0:h.docs)===null||_===void 0?void 0:_.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(D=o.parameters)===null||D===void 0?void 0:D.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    allowChangeType: true,
    modelValue: [],
    type: "period"
  }
}`},(w=(V=o.parameters)===null||V===void 0?void 0:V.docs)===null||w===void 0?void 0:w.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(A=s.parameters)===null||A===void 0?void 0:A.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [],
    type: "period"
  }
}`},(x=(S=s.parameters)===null||S===void 0?void 0:S.docs)===null||x===void 0?void 0:x.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(R=d.parameters)===null||R===void 0?void 0:R.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [],
    type: "compare"
  }
}`},(C=(T=d.parameters)===null||T===void 0?void 0:T.docs)===null||C===void 0?void 0:C.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(M=i.parameters)===null||M===void 0?void 0:M.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    minDate: new Date()
  }
}`},(k=(P=i.parameters)===null||P===void 0?void 0:P.docs)===null||k===void 0?void 0:k.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(q=u.parameters)===null||q===void 0?void 0:q.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    maxDate: new Date()
  }
}`},(W=(E=u.parameters)===null||E===void 0?void 0:E.docs)===null||W===void 0?void 0:W.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(L=p.parameters)===null||L===void 0?void 0:L.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(I=(j=p.parameters)===null||j===void 0?void 0:j.docs)===null||I===void 0?void 0:I.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(z=c.parameters)===null||z===void 0?void 0:z.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(H=(B=c.parameters)===null||B===void 0?void 0:B.docs)===null||H===void 0?void 0:H.source)})});m.parameters=e(e({},m.parameters),{docs:e(e({},(O=m.parameters)===null||O===void 0?void 0:O.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(F=(U=m.parameters)===null||U===void 0?void 0:U.docs)===null||F===void 0?void 0:F.source)})});v.parameters=e(e({},v.parameters),{docs:e(e({},(Y=v.parameters)===null||Y===void 0?void 0:Y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    modelValue: [[], []],
    type: "compare",
    separator: "separator"
  }
}`},(G=($=v.parameters)===null||$===void 0?void 0:$.docs)===null||G===void 0?void 0:G.source)})});const Z=Object.freeze(Object.defineProperty({__proto__:null,AllowChangeType:o,Compare:d,Disabled:p,IsError:m,Lang:n,MaxDate:u,MinDate:i,Period:s,Primary:l,Required:c,Separator:v,default:N},Symbol.toStringTag,{value:"Module"}));export{o as A,d as C,Z as D,m as I,n as L,i as M,l as P,c as R,v as S,s as a,u as b,p as c};
