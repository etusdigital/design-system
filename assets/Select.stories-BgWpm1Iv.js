import{S as F,_ as e}from"./iframe-BiBfuTyl.js";var v,g,b,f,y,_,h,S,O,V,x,M,A,R,j,P,w,I,E,q,K,k,T,W,C,z,D,H,$,B;const J={component:F,argTypes:{modelValue:{type:{name:"other",value:"any"},description:'Will be an option from the "options" array at the selected index.'},labelValue:{type:{name:"string"},description:"Will be the select label."},options:{type:{name:"array",value:{name:"object",value:{}}},description:'Array of values to be used as options. Can also be an array of objects, in which case you should use the prop "labelKey" to specify which key to use as a label.'},icon:{type:{name:"string"}},expanded:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}}},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}}},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the selected value will be an object instead of value-key value."},multiple:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"If true, the selected value will be an array of the selected values."},secondary:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},searchable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},clearable:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},isError:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Activate error mode."},errorMessage:{type:{name:"string"},description:"Will be the error message."},infoMessage:{type:{name:"string"},description:"Will be the info message."},default:{description:"This slot will be displayed on the select area."},status:{description:"This slot will be status when a option is selected. Param: option (selected option)."},"clear-label":{description:"Will be clear button text."},option:{description:"This slot will be displayed as an option. Params: option and index."}}};var a={modelValue:null,options:["Option 1","Option 2","Option 3","Option 4","Option 5"],icon:"",expanded:!1,labelKey:"label",valueKey:"value",labelValue:"label",searchable:!1,clearable:!1,multiple:!1,getObject:!1,disabled:!1,required:!1,secondary:!1,isError:!1,errorMessage:"",infoMessage:""},G=`
    <Select 
        v-model="args.modelValue" 
        v-model:expanded="args.expanded" 
        :label-value="args.labelValue"
        :options="args.options" 
        :icon="args.icon" 
        :label-key="args.labelKey" 
        :value-key="args.valueKey"
        :required="args.required" 
        :searchable="args.searchable" 
        :clearable="args.clearable"
        :disabled="args.disabled"
        :multiple="args.multiple"
        :secondary="args.secondary"
        :is-error="args.isError"
        :error-message="args.errorMessage"
        :info-message="args.infoMessage"
        :get-object="args.getObject"
    >
        Placeholder
    </Select>
  `,r=function(m){return{components:{Select:F},setup:function(){return{args:m}},template:G}},l={render:r,args:a},n={render:r,args:e(e({},a),{disabled:!0})},s={render:r,args:e(e({},a),{required:!0})},o={render:r,args:e(e({},a),{searchable:!0})},t={render:r,args:e(e({},a),{multiple:!0,options:[{label:"Option 1",value:0},{label:"Option 2",value:1},{label:"Option 3",value:2},{label:"Option 4",value:3}]})},d={render:r,args:e(e({},a),{secondary:!0})},i={render:r,args:e(e({},a),{isError:!0,errorMessage:"Error message"})},u={render:r,args:e(e({},a),{infoMessage:"Info message"})},c={render:r,args:e(e({},a),{clearable:!0})},p={render:function(m){return{setup:function(){return{args:m}},template:`
      `.concat(G.replace("Placeholder",`Placeholder
          <template #option="{ option, index }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  {{ option }}
              </div>
          </template>
      </Select>`),`
    `)}},args:a};l.parameters=e(e({},l.parameters),{docs:e(e({},(v=l.parameters)===null||v===void 0?void 0:v.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(b=(g=l.parameters)===null||g===void 0?void 0:g.docs)===null||b===void 0?void 0:b.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(f=n.parameters)===null||f===void 0?void 0:f.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(_=(y=n.parameters)===null||y===void 0?void 0:y.docs)===null||_===void 0?void 0:_.source)})});s.parameters=e(e({},s.parameters),{docs:e(e({},(h=s.parameters)===null||h===void 0?void 0:h.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    required: true
  }
}`},(O=(S=s.parameters)===null||S===void 0?void 0:S.docs)===null||O===void 0?void 0:O.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(V=o.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    searchable: true
  }
}`},(M=(x=o.parameters)===null||x===void 0?void 0:x.docs)===null||M===void 0?void 0:M.source)})});t.parameters=e(e({},t.parameters),{docs:e(e({},(A=t.parameters)===null||A===void 0?void 0:A.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    multiple: true,
    options: [{
      label: "Option 1",
      value: 0
    }, {
      label: "Option 2",
      value: 1
    }, {
      label: "Option 3",
      value: 2
    }, {
      label: "Option 4",
      value: 3
    }]
  }
}`},(j=(R=t.parameters)===null||R===void 0?void 0:R.docs)===null||j===void 0?void 0:j.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(P=d.parameters)===null||P===void 0?void 0:P.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    secondary: true
  }
}`},(I=(w=d.parameters)===null||w===void 0?void 0:w.docs)===null||I===void 0?void 0:I.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(E=i.parameters)===null||E===void 0?void 0:E.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    isError: true,
    errorMessage: "Error message"
  }
}`},(K=(q=i.parameters)===null||q===void 0?void 0:q.docs)===null||K===void 0?void 0:K.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(k=u.parameters)===null||k===void 0?void 0:k.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    infoMessage: "Info message"
  }
}`},(W=(T=u.parameters)===null||T===void 0?void 0:T.docs)===null||W===void 0?void 0:W.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(C=c.parameters)===null||C===void 0?void 0:C.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    clearable: true
  }
}`},(D=(z=c.parameters)===null||z===void 0?void 0:z.docs)===null||D===void 0?void 0:D.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(H=p.parameters)===null||H===void 0?void 0:H.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    setup() {
      return {
        args
      };
    },
    template: \`
      \${defaultHtml.replace("Placeholder", \`Placeholder
          <template #option="{ option, index }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  {{ option }}
              </div>
          </template>
      </Select>\`)}
    \`
  }),
  args: defaultArgs
}`},(B=($=p.parameters)===null||$===void 0?void 0:$.docs)===null||B===void 0?void 0:B.source)})});const N=Object.freeze(Object.defineProperty({__proto__:null,Clearable:c,CustomOption:p,Disabled:n,InfoMessage:u,IsError:i,Multiple:t,Primary:l,Required:s,Searchable:o,Secondary:d,default:J},Symbol.toStringTag,{value:"Module"}));export{c as C,n as D,i as I,t as M,l as P,s as R,N as S,o as a,d as b,u as c,p as d};
