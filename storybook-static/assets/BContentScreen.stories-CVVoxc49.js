import{B as o}from"./BContentScreen-Cllw2I85.js";import"./vue.esm-bundler-B3dae8Cn.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const f={component:o,argTypes:{progression:{type:{summary:"number"},table:{defaultValue:{summary:0}},description:"Thil will be the current step the user is on. If the steps is not defined, it will be the progress bar fill percentage in 0 to 1 scale."},steps:{type:{summary:"number"},table:{defaultValue:{summary:0}},description:"Thil will be the amount of steps used to calculate the loading percentage."},isImgRight:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},isAnimatedLogo:{type:{summary:"boolean"},table:{defaultValue:{summary:!1}}},"bg-logo":{description:"This slot is meant to change the content on the left side"},"bg-logo-text":{description:"This slot is meant to change the text on left side"},default:{description:"This slot is meant to change the content on the right side"},logo:{description:"This slot is meant to change the logo on the right side"},"progress-bar":{description:"This slot is meant to change the progress bar on the right side"},card:{description:"This slot is meant to change the card on the right side"},"card-content":{description:"This slot is meant to change the card content on the right side"},actions:{description:"This slot is meant to change the actions on the right side"}}},r={progression:0,steps:0,isImgRight:!1,isAnimatedLogo:!1},t={render:e=>({components:{BContentScreen:o},setup(){return{args:e}},template:`
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <template #card-content>
                <div class="w-full p-base">
                    <h3 class="font-bold mb-xs">Title</h3>
                    <BInput placeholder="Type here" />
                </div>
            </template>
            <template #actions>
                <div class="w-full flex justify-between items-center">
                    <a class="font-bold text-[12px] cursor-pointer hover:no-underline">
                        Previous
                    </a>
                    <BButton>
                        Next
                    </BButton>
                </div>
            </template>
        </BContentScreen>
        `}),args:r},s={render:e=>({components:{BContentScreen:o},setup(){return{args:e}},template:`
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <template #bg-logo-text>
                <div>slot: bg-logo-text</div>
            </template>
            <template #card>
                <div>slot: card</div>
            </template>
            <template #logo>
                <div>slot: logo</div>
            </template>
            <template #progress-bar>
                <div>slot: progress-bar</div>
            </template>
            <template #actions>
                <div>slot: actions</div>
            </template>
        </BContentScreen>
        `}),args:r},n={render:e=>({components:{BContentScreen:o},setup(){return{args:e}},template:`
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <div>slot: default</div>
            <template #bg-logo>
                <div>slot: bg-logo</div>
            </template>
        </BContentScreen>
        `}),args:r};var a,i,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BContentScreen
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <template #card-content>
                <div class="w-full p-base">
                    <h3 class="font-bold mb-xs">Title</h3>
                    <BInput placeholder="Type here" />
                </div>
            </template>
            <template #actions>
                <div class="w-full flex justify-between items-center">
                    <a class="font-bold text-[12px] cursor-pointer hover:no-underline">
                        Previous
                    </a>
                    <BButton>
                        Next
                    </BButton>
                </div>
            </template>
        </BContentScreen>
        \`
  }),
  args: defArgs
}`,...(l=(i=t.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var g,p,m;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BContentScreen
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <template #bg-logo-text>
                <div>slot: bg-logo-text</div>
            </template>
            <template #card>
                <div>slot: card</div>
            </template>
            <template #logo>
                <div>slot: logo</div>
            </template>
            <template #progress-bar>
                <div>slot: progress-bar</div>
            </template>
            <template #actions>
                <div>slot: actions</div>
            </template>
        </BContentScreen>
        \`
  }),
  args: defArgs
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,c,h;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: (args: any) => ({
    components: {
      BContentScreen
    },
    setup() {
      return {
        args
      };
    },
    template: \`
        <BContentScreen :progression="args.progression" :steps="args.steps" :is-img-right="args.isImgRight" :is-animated-logo="args.isAnimatedLogo">
            <div>slot: default</div>
            <template #bg-logo>
                <div>slot: bg-logo</div>
            </template>
        </BContentScreen>
        \`
  }),
  args: defArgs
}`,...(h=(c=n.parameters)==null?void 0:c.docs)==null?void 0:h.source}}};const B=["Primary","Slots","Slots2"];export{t as Primary,s as Slots,n as Slots2,B as __namedExportsOrder,f as default};
