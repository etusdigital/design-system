import{u as h,_ as e}from"./iframe-CjRVAs2g.js";var r,s,u,c,p,d,m,g,f,v,y,b;const _={component:h,argTypes:{modelValue:{type:{name:"other",value:"any"},description:"This will be the selected account."},name:{type:{name:"string"},description:"This property will be the main user name."},picture:{type:{name:"string"},table:{defaultValue:{summary:"person-circle"}},description:"This property will be shown when viewing more user information."},options:{type:{name:"array",value:{name:"object",value:{}}},table:{defaultValue:{summary:"[]"}},description:"If the user have multiple account pass them here."},labelKey:{type:{name:"string"},table:{defaultValue:{summary:"label"}},description:"This the key to get account name in accounts array."},valueKey:{type:{name:"string"},table:{defaultValue:{summary:"value"}},description:"This the key to get account value in accounts array."},disabled:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},absolute:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Makes the content dropdown have an absolute position."},getObject:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}},"logout-label":{table:{defaultValue:{summary:"Logout"}},description:"This slot is the logout button text and function that execute when this it's clicked."},"edit-label":{table:{defaultValue:{summary:"Edit Profile"}},description:"This slot is the edit profile button text and function that execute when this it's clicked."},"edit-option":{table:{defaultValue:{summary:"Edit Account"}},description:"This slot is the edit account button text and function that execute when this it's clicked."},option:{description:"This slot will be displayed as an account option. Params: option, index and active."},"privacy-policy":{table:{defaultValue:{summary:"Privacy Policy"}},description:"This slot is the privacy policy text."},"terms-of-use":{table:{defaultValue:{summary:"Terms of Use"}},description:"This slot is the terms of use text."}}};var l={modelValue:"personal-account",name:"John Doe",picture:void 0,absolute:!1,disabled:!1,getObject:!1,options:[{label:"Personal Account",value:"personal-account"},{label:"Work Account",value:"work-account"},{label:"Project Alpha",value:"project-alpha"},{label:"Project Beta",value:"project-beta"},{label:"Development Team",value:"dev-team"}],labelKey:"label",valueKey:"value",logout:function(){},edit:function(){},editOption:function(){},privacyPolicyFunction:function(){},termsOfUseFucntion:function(){}},P=function(i){return{components:{Profile:h},setup:function(){return{args:i}},template:`
    <Profile
      v-model="args.modelValue"
      :name="args.name"
      :picture="args.picture"
      :options="args.options"
      :label-key="args.labelKey"
      :value-key="args.valueKey"
      :absolute="args.absolute"
      :disabled="args.disabled"
      :get-object="args.getObject"
      @logout="args.logout"
      @edit="args.edit"
      @edit-option="args.editOption"
      @privacy-policy-function="args.privacyPolicyFunction"
      @terms-of-use-fucntion="args.termsOfUseFucntion"
    >
      <template #edit-slot>
          Edit profile
      </template>
      <template #edit-option>
          Edit account
      </template>
      <template #logout-slot>
          Logout
      </template>
      <template #privacy-policy>
          Privacy Policy
      </template>
      <template #terms-of-use>
          Terms Of Use
      </template>
    </Profile>
  `}},t={render:P,args:l},a={render:P,args:e(e({},l),{absolute:!0})},n={render:P,args:e(e({},l),{disabled:!0})},o={render:function(i){return{components:{Profile:h},setup:function(){return{args:i}},template:`
      <Profile
          v-model="args.modelValue"
          :name="args.name"
          :picture="args.picture"
          :options="args.options"
          :label-key="args.labelKey"
          :value-key="args.valueKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          :get-object="args.getObject"
          @logout="args.logout"
          @edit="args.edit"
          @edit-option="args.editOption"
          @privacy-policy-function="args.privacyPolicyFunction"
          @terms-of-use-fucntion="args.termsOfUseFucntion"
      >
          <template #edit-slot>
              Edit profile
          </template>
          <template #edit-option>
              Edit account
          </template>
          <template #logout-slot>
              Logout
          </template>
          <template #privacy-policy>
              Privacy Policy
          </template>
          <template #terms-of-use>
              Terms Of Use
          </template>
          <template #option="{ option, index, active }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  <span :class="{'underline': active }">{{ option.label }}</span>
              </div>
          </template>
      </Profile>
    `}},args:l};t.parameters=e(e({},t.parameters),{docs:e(e({},(r=t.parameters)===null||r===void 0?void 0:r.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: defaultArgs
}`},(u=(s=t.parameters)===null||s===void 0?void 0:s.docs)===null||u===void 0?void 0:u.source)})});a.parameters=e(e({},a.parameters),{docs:e(e({},(c=a.parameters)===null||c===void 0?void 0:c.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    absolute: true
  }
}`},(d=(p=a.parameters)===null||p===void 0?void 0:p.docs)===null||d===void 0?void 0:d.source)})});n.parameters=e(e({},n.parameters),{docs:e(e({},(m=n.parameters)===null||m===void 0?void 0:m.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    disabled: true
  }
}`},(f=(g=n.parameters)===null||g===void 0?void 0:g.docs)===null||f===void 0?void 0:f.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(v=o.parameters)===null||v===void 0?void 0:v.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Profile
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Profile
          v-model="args.modelValue"
          :name="args.name"
          :picture="args.picture"
          :options="args.options"
          :label-key="args.labelKey"
          :value-key="args.valueKey"
          :absolute="args.absolute"
          :disabled="args.disabled"
          :get-object="args.getObject"
          @logout="args.logout"
          @edit="args.edit"
          @edit-option="args.editOption"
          @privacy-policy-function="args.privacyPolicyFunction"
          @terms-of-use-fucntion="args.termsOfUseFucntion"
      >
          <template #edit-slot>
              Edit profile
          </template>
          <template #edit-option>
              Edit account
          </template>
          <template #logout-slot>
              Logout
          </template>
          <template #privacy-policy>
              Privacy Policy
          </template>
          <template #terms-of-use>
              Terms Of Use
          </template>
          <template #option="{ option, index, active }">
              <div class="flex items-center gap-xs">
                  <Icon name="account_circle" />
                  <span :class="{'underline': active }">{{ option.label }}</span>
              </div>
          </template>
      </Profile>
    \`
  }),
  args: defaultArgs
}`},(b=(y=o.parameters)===null||y===void 0?void 0:y.docs)===null||b===void 0?void 0:b.source)})});const T=Object.freeze(Object.defineProperty({__proto__:null,Absolute:a,Disabled:n,Options:o,Primary:t,default:_},Symbol.toStringTag,{value:"Module"}));export{a as A,n as D,o as O,T as P,t as a};
