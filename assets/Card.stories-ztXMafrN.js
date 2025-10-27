import{f as c,_ as n}from"./iframe-CEhHUQ6Y.js";var s,t,o,l,d,i;const p={component:c,argTypes:{default:{description:"This slot will be the card content."}}};var e={render:function(r){return{components:{Card:c},setup:function(){return{args:r}},template:`
        <Card class="w-fit p-xs">
          <h2 class="mb-xs">Welcome</h2>
          <p>This is a simple card example.</p>
        </Card>
        `}},args:{}},a={render:function(r){return{components:{Card:c},setup:function(){return{args:r}},template:`
        <Card class="w-fit">
            <div class="w-fit flex flex-col p-base gap-base">
                <h1 class="font-bold text-lg m-none">Form</h1>
                <Input label-value="Name" />
                <Button>Save</Button>
            </div>
        </Card>
        `}},args:{}};e.parameters=n(n({},e.parameters),{docs:n(n({},(s=e.parameters)===null||s===void 0?void 0:s.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      Card
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <Card class="w-fit p-xs">
          <h2 class="mb-xs">Welcome</h2>
          <p>This is a simple card example.</p>
        </Card>
        \`
  }),
  args: {}
}`},(o=(t=e.parameters)===null||t===void 0?void 0:t.docs)===null||o===void 0?void 0:o.source)})});a.parameters=n(n({},a.parameters),{docs:n(n({},(l=a.parameters)===null||l===void 0?void 0:l.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      Card
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <Card class="w-fit">
            <div class="w-fit flex flex-col p-base gap-base">
                <h1 class="font-bold text-lg m-none">Form</h1>
                <Input label-value="Name" />
                <Button>Save</Button>
            </div>
        </Card>
        \`
  }),
  args: {}
}`},(i=(d=a.parameters)===null||d===void 0?void 0:d.docs)===null||i===void 0?void 0:i.source)})});const m=Object.freeze(Object.defineProperty({__proto__:null,Form:a,Primary:e,default:p},Symbol.toStringTag,{value:"Module"}));export{m as C,a as F,e as P};
