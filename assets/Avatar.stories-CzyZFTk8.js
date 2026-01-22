import{a1 as t,_ as n}from"./iframe-oiXQscte.js";const f=""+new URL("photo-gr0zpTkO.svg",import.meta.url).href;var o,i,l,m,c,g,d,u,v;const z={component:t,argTypes:{name:{type:{name:"string"},description:"Will be the avatar name."},src:{type:{name:"string"},description:"Will be the avatar image. SVG images are recommended."},alt:{type:{name:"string"},description:"Will be the avatar image alt."},size:{type:{name:"string"},control:"select",options:["small","medium","large"],table:{defaultValue:{summary:"large"}}}}};var p={name:"John Doe",src:f,alt:"Avatar",size:"medium"},r={render:function(a){return{components:{Avatar:t},setup:function(){return{args:a}},template:`
      <Avatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    `}},args:p},e={render:function(a){return{components:{Avatar:t},setup:function(){return{args:a}},template:`
      <Avatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    `}},args:n(n({},p),{src:void 0})},s={render:function(a){return{components:{Avatar:t},setup:function(){return{args:a}},template:`
      <div class="flex gap-xs">
        <Avatar
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :name="args.name"
          :src="args.src"
          :alt="args.alt"
          :size="size"
        />
      </div>
    `}},args:n(n({},p),{src:void 0})};r.parameters=n(n({},r.parameters),{docs:n(n({},(o=r.parameters)===null||o===void 0?void 0:o.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      Avatar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Avatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    \`
  }),
  args: defaultArgs
}`},(l=(i=r.parameters)===null||i===void 0?void 0:i.docs)===null||l===void 0?void 0:l.source)})});e.parameters=n(n({},e.parameters),{docs:n(n({},(m=e.parameters)===null||m===void 0?void 0:m.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      Avatar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Avatar
        :name="args.name"
        :src="args.src"
        :alt="args.alt"
        :size="args.size"
      />
    \`
  }),
  args: {
    ...defaultArgs,
    src: undefined
  }
}`},(g=(c=e.parameters)===null||c===void 0?void 0:c.docs)===null||g===void 0?void 0:g.source)})});s.parameters=n(n({},s.parameters),{docs:n(n({},(d=s.parameters)===null||d===void 0?void 0:d.docs),{source:n({originalSource:`{
  render: (args: any) => ({
    components: {
      Avatar
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <div class="flex gap-xs">
        <Avatar
          v-for="size in ['small', 'medium', 'large']"
          :key="size"
          :name="args.name"
          :src="args.src"
          :alt="args.alt"
          :size="size"
        />
      </div>
    \`
  }),
  args: {
    ...defaultArgs,
    src: undefined
  }
}`},(v=(u=s.parameters)===null||u===void 0?void 0:u.docs)===null||v===void 0?void 0:v.source)})});const _=Object.freeze(Object.defineProperty({__proto__:null,Primary:r,Sizes:s,default:z,noSrc:e},Symbol.toStringTag,{value:"Module"}));export{_ as A,r as P,s as S,e as n};
