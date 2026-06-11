import{k as t,_ as e}from"./iframe-DWFYPzYg.js";var l,a,r;const s={component:t,argTypes:{vertical:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}}}}};var n={render:function(o){return{components:{Connector:t},setup:function(){return{args:o}},template:`<Connector v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" class="items-center">
        <Card class="p-base">
          <Connector>
              <Input label-value="label" placeholder="Type here" />
              <Select
                  label-value="label"
                  :options="[
                      { label: 'Option 1', value: 0 },
                      { label: 'Option 2', value: 1 },
                      { label: 'Option 3', value: 2 },
                      { label: 'Option 4', value: 3 },
                      { label: 'Option 5', value: 4 },
                  ]"
              >
                  Select
              </Select>
              <Input label-value="label" placeholder="Type here" />
          </Connector>
        </Card>
        <Button variant="success" size="small" round />
      </Connector>`}},args:{vertical:!0}};n.parameters=e(e({},n.parameters),{docs:e(e({},(l=n.parameters)===null||l===void 0?void 0:l.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Connector
    },
    setup() {
      return {
        args
      };
    },
    template: \`<Connector v-model="args.modelValue" :vertical="args.vertical" :disabled="args.disabled" class="items-center">
        <Card class="p-base">
          <Connector>
              <Input label-value="label" placeholder="Type here" />
              <Select
                  label-value="label"
                  :options="[
                      { label: 'Option 1', value: 0 },
                      { label: 'Option 2', value: 1 },
                      { label: 'Option 3', value: 2 },
                      { label: 'Option 4', value: 3 },
                      { label: 'Option 5', value: 4 },
                  ]"
              >
                  Select
              </Select>
              <Input label-value="label" placeholder="Type here" />
          </Connector>
        </Card>
        <Button variant="success" size="small" round />
      </Connector>\`
  }),
  args: {
    vertical: true
  }
}`},(r=(a=n.parameters)===null||a===void 0?void 0:a.docs)===null||r===void 0?void 0:r.source)})});const u=Object.freeze(Object.defineProperty({__proto__:null,Primary:n,default:s},Symbol.toStringTag,{value:"Module"}));export{u as C,n as P};
