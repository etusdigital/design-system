import{U as t,_ as e}from"./iframe-D9ZodyF1.js";var b,x,S,y,T,w,_,A,P,I,k,F,z,M,B,D,H,C,O,j,G,V,L,E,R,J,N,q,W,U,$,K,Q,X,Y,Z,ee,ae,ne;const le={component:t,argTypes:{columns:{type:{name:"array",value:{name:"object",value:{}}},description:"This property will be the table header."},items:{type:{name:"array",value:{name:"object",value:{}}},description:"This property will be selected page items displayed in the table."},sortOptions:{type:{name:"object",value:{}},description:"This property will be the sort settings."},page:{type:{name:"number"},table:{defaultValue:{summary:"1"}},description:"This property will be the current page."},itemsPerPage:{type:{name:"number"},table:{defaultValue:{summary:"10"}},description:"This property will be the number of items in 1 page."},loading:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine the data is loading."},enableSelection:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the user can select all items."},enableAggregation:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the table has a space for aggregations."},isHeaderFixed:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the table header will be fixed and if the table will have y scroll."},hasHover:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"When hasHover property is true, the row will have a hover effect."},hideFooter:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the default footer is shown."},noShadow:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"When noShadow property is true, the card will have no shadow."},numberOfItems:{type:{name:"number"},table:{defaultValue:{summary:"0"}},description:"This property will be the total of items in general."},renderPaginationInBackEnd:{type:{name:"boolean"},table:{defaultValue:{summary:"false"}},description:"Determine if the pagination is redened in back-end."},actions:{description:"This slot will be displayed on each row. Params: item and index."},select:{description:"This slot will be status text when a item is selected. Params: item and index."},aggregation:{description:"This slot will be status text when a item have aggregation. Params: item and index."},childs:{description:"This slot will be a child of each row. It will be sorted together with it's parent. Params: item and index."},"empty-state":{description:"This slot will appear when items is an empty array."},footer:{description:"This slot will be table footer."},"items-per-page":{table:{defaultValue:{summary:"Items per page"}},description:"This slot will be the text next to select on table footer."},"showing-page":{description:"This slot will be the text in the end of table footer. Params: max(number of the last of this page) and total(total items on the table)."}}};var te=[{name:"Joanna",age:43,memberShip:"Platinum",selected:!1,childs:[{name:"José",age:2,selected:!1}]},{name:"Jhonny",age:23,memberShip:"Gold",selected:!1,childs:[]},{name:"Jeffry",age:55,memberShip:"Bronze",selected:!1,childs:[{name:"Clara",age:5,selected:!1}]},{name:"Leon",age:76,memberShip:"Silver",selected:!1,childs:[{name:"Maria",age:40,selected:!1},{name:"Cristina",age:45,selected:!1}]},{name:"Luana",age:33,memberShip:"Diamont",selected:!1},{name:"Carlos",age:34,memberShip:"Silver",selected:!1,childs:[{name:"Carlos",age:11,selected:!1},{name:"Carol",age:6,selected:!1},{name:"Mariana",age:1,selected:!1}]},{name:"Jake",age:23,memberShip:"Gold",selected:!1},{name:"Linda",age:19,memberShip:"Bronze",selected:!1},{name:"Carol",age:80,memberShip:"Diamont",selected:!1,childs:[{name:"Cristiano",age:38,selected:!1}]},{name:"Atena",age:55,memberShip:"Diamont",selected:!1},{name:"Leandra",age:19,memberShip:"Bronze",selected:!1},{name:"Davi",age:19,memberShip:"Bronze",selected:!1},{name:"Matheus",age:37,memberShip:"Platinum",selected:!1,childs:[{name:"Lucas",age:1,selected:!1}]},{name:"Rafael",age:39,memberShip:"Diamont",selected:!1},{name:"Fernando",age:36,memberShip:"Diamont",selected:!1,childs:[{name:"Ana",age:16,selected:!1},{name:"Marina",age:12,selected:!1}]},{name:"Flávia",age:30,memberShip:"Gold",selected:!1},{name:"Taís",age:75,memberShip:"Silver",selected:!1,childs:[{name:"Austin",age:66,selected:!1},{name:"Gertrudes",age:45,selected:!1}]},{name:"Nilta",age:79,memberShip:"Gold",selected:!1,childs:[{name:"Irã",age:56,selected:!1},{name:"Ana Izabel",age:55,selected:!1},{name:"Marcelo",age:54,selected:!1},{name:"Danielle",age:51,selected:!1}]},{name:"Eduardo",age:18,memberShip:"Bronze",selected:!1},{name:"Melissa",age:33,memberShip:"Silver",selected:!1},{name:"Lucca",age:66,memberShip:"Platinum",selected:!1,childs:[{name:"Nilce",age:22,selected:!1},{name:"Luiz",age:25,selected:!1}]},{name:"Jéssica",age:22,memberShip:"Platinum",selected:!1},{name:"Marcelo",age:56,memberShip:"Gold",selected:!1,childs:[{name:"Emerson",age:13,selected:!1},{name:"Anne",age:8,selected:!1}]},{name:"Fernanda",age:45,memberShip:"Silver",selected:!1,childs:[{name:"Eduardo",age:12,selected:!1},{name:"Daniel",age:8,selected:!1}]},{name:"Milena",age:24,memberShip:"Bronze",selected:!1},{name:"Carla",age:77,memberShip:"Gold",selected:!1,childs:[{name:"Camilla",age:34,selected:!1},{name:"Márcio",age:25,selected:!1}]},{name:"Danilo",age:82,memberShip:"Diamont",selected:!1,childs:[{name:"Valentina",age:45,selected:!1},{name:"Enzo",age:44,selected:!1},{name:"Luiz",age:43,selected:!1}]},{name:"Thiago",age:33,memberShip:"Bronze",selected:!1,childs:[{name:"Alice",age:3,selected:!1}]},{name:"Elizabeth",age:100,memberShip:"Platinum",selected:!1},{name:"Miranda",age:33,memberShip:"Gold",selected:!1},{name:"Gabriel",age:58,memberShip:"Silver",selected:!1,childs:[{name:"Marina",age:22,selected:!1}]},{name:"Laís",age:23,memberShip:"Bronze",selected:!1},{name:"Laura",age:34,memberShip:"Silver",selected:!1},{name:"Merlin",age:92,memberShip:"Diamont",selected:!1,childs:[{name:"Raquel",age:67,selected:!1},{name:"Rafaela",age:59,selected:!1}]},{name:"Vitória",age:24,memberShip:"Diamont",selected:!1},{name:"Anna",age:26,memberShip:"Gold",selected:!1},{name:"Mônica",age:65,memberShip:"Bronze",selected:!1,childs:[{name:"Marta",age:34,selected:!1},{name:"Marco",age:33,selected:!1}]},{name:"Jeremias",age:49,memberShip:"Silver",selected:!1,childs:[{name:"Denise",age:31,selected:!1},{name:"Arthur",age:25,selected:!1}]},{name:"Henrique",age:53,memberShip:"Gold",selected:!1,childs:[{name:"Caroline",age:17,selected:!1}]},{name:"Marcela",age:34,memberShip:"Bronze",selected:!1},{name:"Daniel",age:73,memberShip:"Silver",selected:!1,childs:[{name:"Milene",age:39,selected:!1},{name:"Átila",age:38,selected:!1}]},{name:"Gustavo",age:43,memberShip:"Diamont",selected:!1,childs:[{name:"Fabiano",age:5,selected:!1}]},{name:"Lucca",age:21,memberShip:"Gold",selected:!1},{name:"Giulia",age:29,memberShip:"Silver",selected:!1}],n={columns:[{label:"Name",value:"name",sortable:!0,width:"20%"},{label:"Age",value:"age",sortable:!0,width:"10%"},{label:"Membership",value:"memberShip",width:"20%"}],items:te,sortOptions:{by:"",desc:!1},page:1,itemsPerPage:10,numberOfItems:te.length,renderPaginationInBackEnd:!1,hideFooter:!1,isHeaderFixed:!1,enableSelection:!1,enableAggregation:!1,loading:!1,noShadow:!1,hasHover:!1,sortBy:function(a,se){},pageItems:function(a,se){},selectAll:function(){}},s=function(a){return{components:{Table:t},setup:function(){return{args:a}},template:`
    <Table
        :columns="args.columns"
        :items="args.items"
        :sort-options="args.sortOptions"
        v-model:page="args.page"
        v-model:items-per-page="args.itemsPerPage"
        :number-of-items="args.numberOfItems"
        :render-pagination-in-back-end="args.renderPaginationInBackEnd"
        :hide-footer="args.hideFooter"
        :is-header-fixed="args.isHeaderFixed"
        :enable-selection="args.enableSelection"
        :enable-aggregation="args.enableAggregation"
        :loading="args.loading"
        :no-shadow="args.noShadow"
        :has-hover="args.hasHover"
    >
        <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
          <td>{{ item[header.value] }}</td>
        </template>
    </Table>
  `}},l={render:function(a){return{components:{Table:t},setup:function(){return{args:a}},template:`
      <Table
          :columns="args.columns"
          :items="args.items"
          :sort-options="args.sortOptions"
          v-model:page="args.page"
          v-model:items-per-page="args.itemsPerPage"
          :number-of-items="args.numberOfItems"
          :render-pagination-in-back-end="args.renderPaginationInBackEnd"
          :hide-footer="args.hideFooter"
          :is-header-fixed="args.isHeaderFixed"
          :enable-selection="args.enableSelection"
          :enable-aggregation="args.enableAggregation"
          :loading="args.loading"
          :no-shadow="args.noShadow"
          :has-hover="args.hasHover"
          @sort-by="args.sortBy"
          @page-items="args.pageItems"
          @select-all="args.selectAll"
      >
          <template v-slot:select="{ item }" v-if="args.enableSelection">
            <td>
              <Checkbox v-model="item.selected"/>
            </td>
          </template>
          <template v-slot:aggregation="{ item }" v-if="args.enableAggregation">
              <td>
                <div class="flex items-center justify-center p-xxs rounded-full cursor-pointer hover:bg-neutral-surface-highlight">
                  <b-icon
                    name="arrow_drop_down"
                    class="transition-transform"
                    :class="{ 'rotate-180': item.expanded }"
                    @click="item.expanded = !item.expanded"
                  />
                </div>
              </td>
          </template>
          <template v-slot:name="{ item }">
              <td>{{ item.name }}</td>
          </template>
          <template v-slot:age="{ item }">
              <td>
                  <span class="ml-xs">{{ item.age }}</span>
              </td>
          </template>
          <template v-slot:memberShip="{ item }">
              <td>{{ item.memberShip }}</td>
          </template>

          <template #actions>
              <td class="flex items-center justify-end">
                <Button color="primary" variant="plain" icon="more_vert" round />
              </td>
          </template>

          <template #childs="{ item, index }">
              <template v-if="item.expanded">
              <tr
                  v-for="(child, childIndex) in item.childs"
                  :key="childIndex"
                  class="bg-neutral-surface-highlight text-neutral-foreground-low [&>*]:py-xs [&>*]:px-lg"
              >
                  <td />
                  <td v-if="args.enableSelection">
                    <Checkbox v-model="child.selected" />
                  </td>
                  <td>
                      {{ child.name }}
                  </td>
                  <td>
                    <span class="ml-[.6em]">{{ child.age }}</span>
                  </td>
                  <td>
                      {{ item.memberShip }}
                  </td>
                  <td />
              </tr>
              </template>
            </template>

          <template #empty-state>
              <div class="flex items-center justify-center p-xxs rounded-full text-xl">
                  <Icon name="sentiment_dissatisfied" size="1em" />
              </div>
          </template>

          <template #items-per-page>
              Items per page
          </template>

          <template #showing-page="{ min, max, total }">
              Showing {{ min }}-{{ max }} of {{ total }}
          </template>
      </Table>
    `}},args:n},r={render:s,args:e(e({},n),{sortOptions:{by:"name",desc:!0}})},i={render:s,args:e(e({},n),{loading:!0})},o={render:function(a){return{components:{Table:t},setup:function(){return{args:a}},template:`
      <Table 
        :columns="args.columns"
        :items="args.items"
        :enable-selection="args.enableSelection"
      >
          <template #select="{ item }">
            <td>
              <Checkbox v-model="item.selected" />
            </td>
          </template>

          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>
      </Table>
    `}},args:e(e({},n),{enableSelection:!0})},m={render:function(a){return{components:{Table:t},setup:function(){return{args:a}},template:`
      <Table 
          :columns="args.columns"
          :items="args.items"
          :enable-aggregation="args.enableAggregation"
      >
          <template #aggregation="{ item }">
              <td>
                <Button
                  color="neutral"
                  variant="plain"
                  size="small"
                  icon="arrow_drop_down"
                  round
                  class="transition-transform"
                  :class="{ 'rotate-180': item.expanded }"
                  @click="item.expanded = !item.expanded"
                />
              </td>
          </template>

          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #childs="{ item, index }">
              <template v-if="item.expanded">
                <tr
                    v-for="(child, childIndex) in item.childs"
                    :key="childIndex"
                    class="bg-neutral-surface-highlight text-neutral-foreground-low [&>*]:py-xs [&>*]:px-lg"
                >
                    <td />
                    <td v-for="header in args.columns">{{ child[header.value] }}</td>
                </tr>
          </template>
      </Table>
    `}},args:e(e({},n),{enableAggregation:!0})},d={render:s,args:e(e({},n),{itemsPerPage:100,isHeaderFixed:!0})},c={render:s,args:e(e({},n),{hasHover:!0})},g={render:s,args:e(e({},n),{hideFooter:!0})},p={render:s,args:e(e({},n),{noShadow:!0})},u={render:function(a){return{components:{Table:t},setup:function(){return{args:a}},template:`
      <Table 
        :columns="args.columns"
        :items="args.items"
      >
          <template #empty-state>
              <div class="flex items-center justify-center p-xxs rounded-full text-xl">
                  <Icon name="sentiment_dissatisfied" size="1em" />
              </div>
          </template>
      </Table>
    `}},args:e(e({},n),{items:[]})},h={render:function(a){return{components:{Table:t},setup:function(){return{args:a}},template:`
      <Table 
        :columns="args.columns"
        :items="args.items"
      >
          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #footer>
            Footer
          </template>
      </Table>
    `}},args:e(e({},n),{items:[]})},f={render:function(a){return{components:{Table:t},setup:function(){return{args:a}},template:`
      <Table 
        :columns="args.columns"
        :items="args.items"
      >
          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #items-per-page>
            Slot: Items per page
          </template>
      </Table>
    `}},args:e(e({},n),{items:[]})},v={render:function(a){return{components:{Table:t},setup:function(){return{args:a}},template:`
      <Table 
        :columns="args.columns"
        :items="args.items"
      >
          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #showing-page="{ min, max, total }">
            Slot: Showing page; Min: {{ min }}; Max: {{ max }}; Total: {{ total }}
          </template>
      </Table>
    `}},args:e(e({},n),{items:[]})};l.parameters=e(e({},l.parameters),{docs:e(e({},(b=l.parameters)===null||b===void 0?void 0:b.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Table
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Table
          :columns="args.columns"
          :items="args.items"
          :sort-options="args.sortOptions"
          v-model:page="args.page"
          v-model:items-per-page="args.itemsPerPage"
          :number-of-items="args.numberOfItems"
          :render-pagination-in-back-end="args.renderPaginationInBackEnd"
          :hide-footer="args.hideFooter"
          :is-header-fixed="args.isHeaderFixed"
          :enable-selection="args.enableSelection"
          :enable-aggregation="args.enableAggregation"
          :loading="args.loading"
          :no-shadow="args.noShadow"
          :has-hover="args.hasHover"
          @sort-by="args.sortBy"
          @page-items="args.pageItems"
          @select-all="args.selectAll"
      >
          <template v-slot:select="{ item }" v-if="args.enableSelection">
            <td>
              <Checkbox v-model="item.selected"/>
            </td>
          </template>
          <template v-slot:aggregation="{ item }" v-if="args.enableAggregation">
              <td>
                <div class="flex items-center justify-center p-xxs rounded-full cursor-pointer hover:bg-neutral-surface-highlight">
                  <b-icon
                    name="arrow_drop_down"
                    class="transition-transform"
                    :class="{ 'rotate-180': item.expanded }"
                    @click="item.expanded = !item.expanded"
                  />
                </div>
              </td>
          </template>
          <template v-slot:name="{ item }">
              <td>{{ item.name }}</td>
          </template>
          <template v-slot:age="{ item }">
              <td>
                  <span class="ml-xs">{{ item.age }}</span>
              </td>
          </template>
          <template v-slot:memberShip="{ item }">
              <td>{{ item.memberShip }}</td>
          </template>

          <template #actions>
              <td class="flex items-center justify-end">
                <Button color="primary" variant="plain" icon="more_vert" round />
              </td>
          </template>

          <template #childs="{ item, index }">
              <template v-if="item.expanded">
              <tr
                  v-for="(child, childIndex) in item.childs"
                  :key="childIndex"
                  class="bg-neutral-surface-highlight text-neutral-foreground-low [&>*]:py-xs [&>*]:px-lg"
              >
                  <td />
                  <td v-if="args.enableSelection">
                    <Checkbox v-model="child.selected" />
                  </td>
                  <td>
                      {{ child.name }}
                  </td>
                  <td>
                    <span class="ml-[.6em]">{{ child.age }}</span>
                  </td>
                  <td>
                      {{ item.memberShip }}
                  </td>
                  <td />
              </tr>
              </template>
            </template>

          <template #empty-state>
              <div class="flex items-center justify-center p-xxs rounded-full text-xl">
                  <Icon name="sentiment_dissatisfied" size="1em" />
              </div>
          </template>

          <template #items-per-page>
              Items per page
          </template>

          <template #showing-page="{ min, max, total }">
              Showing {{ min }}-{{ max }} of {{ total }}
          </template>
      </Table>
    \`
  }),
  args: defaultArgs
}`},(S=(x=l.parameters)===null||x===void 0?void 0:x.docs)===null||S===void 0?void 0:S.source)})});r.parameters=e(e({},r.parameters),{docs:e(e({},(y=r.parameters)===null||y===void 0?void 0:y.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    sortOptions: {
      by: "name",
      desc: true
    }
  }
}`},(w=(T=r.parameters)===null||T===void 0?void 0:T.docs)===null||w===void 0?void 0:w.source)})});i.parameters=e(e({},i.parameters),{docs:e(e({},(_=i.parameters)===null||_===void 0?void 0:_.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    loading: true
  }
}`},(P=(A=i.parameters)===null||A===void 0?void 0:A.docs)===null||P===void 0?void 0:P.source)})});o.parameters=e(e({},o.parameters),{docs:e(e({},(I=o.parameters)===null||I===void 0?void 0:I.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Table
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Table 
        :columns="args.columns"
        :items="args.items"
        :enable-selection="args.enableSelection"
      >
          <template #select="{ item }">
            <td>
              <Checkbox v-model="item.selected" />
            </td>
          </template>

          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>
      </Table>
    \`
  }),
  args: {
    ...defaultArgs,
    enableSelection: true
  }
}`},(F=(k=o.parameters)===null||k===void 0?void 0:k.docs)===null||F===void 0?void 0:F.source)})});m.parameters=e(e({},m.parameters),{docs:e(e({},(z=m.parameters)===null||z===void 0?void 0:z.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Table
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Table 
          :columns="args.columns"
          :items="args.items"
          :enable-aggregation="args.enableAggregation"
      >
          <template #aggregation="{ item }">
              <td>
                <Button
                  color="neutral"
                  variant="plain"
                  size="small"
                  icon="arrow_drop_down"
                  round
                  class="transition-transform"
                  :class="{ 'rotate-180': item.expanded }"
                  @click="item.expanded = !item.expanded"
                />
              </td>
          </template>

          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #childs="{ item, index }">
              <template v-if="item.expanded">
                <tr
                    v-for="(child, childIndex) in item.childs"
                    :key="childIndex"
                    class="bg-neutral-surface-highlight text-neutral-foreground-low [&>*]:py-xs [&>*]:px-lg"
                >
                    <td />
                    <td v-for="header in args.columns">{{ child[header.value] }}</td>
                </tr>
          </template>
      </Table>
    \`
  }),
  args: {
    ...defaultArgs,
    enableAggregation: true
  }
}`},(B=(M=m.parameters)===null||M===void 0?void 0:M.docs)===null||B===void 0?void 0:B.source)})});d.parameters=e(e({},d.parameters),{docs:e(e({},(D=d.parameters)===null||D===void 0?void 0:D.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    itemsPerPage: 100,
    isHeaderFixed: true
  }
}`},(C=(H=d.parameters)===null||H===void 0?void 0:H.docs)===null||C===void 0?void 0:C.source)})});c.parameters=e(e({},c.parameters),{docs:e(e({},(O=c.parameters)===null||O===void 0?void 0:O.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    hasHover: true
  }
}`},(G=(j=c.parameters)===null||j===void 0?void 0:j.docs)===null||G===void 0?void 0:G.source)})});g.parameters=e(e({},g.parameters),{docs:e(e({},(V=g.parameters)===null||V===void 0?void 0:V.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    hideFooter: true
  }
}`},(E=(L=g.parameters)===null||L===void 0?void 0:L.docs)===null||E===void 0?void 0:E.source)})});p.parameters=e(e({},p.parameters),{docs:e(e({},(R=p.parameters)===null||R===void 0?void 0:R.docs),{source:e({originalSource:`{
  render: defaultRender,
  args: {
    ...defaultArgs,
    noShadow: true
  }
}`},(N=(J=p.parameters)===null||J===void 0?void 0:J.docs)===null||N===void 0?void 0:N.source)})});u.parameters=e(e({},u.parameters),{docs:e(e({},(q=u.parameters)===null||q===void 0?void 0:q.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Table
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Table 
        :columns="args.columns"
        :items="args.items"
      >
          <template #empty-state>
              <div class="flex items-center justify-center p-xxs rounded-full text-xl">
                  <Icon name="sentiment_dissatisfied" size="1em" />
              </div>
          </template>
      </Table>
    \`
  }),
  args: {
    ...defaultArgs,
    items: []
  }
}`},(U=(W=u.parameters)===null||W===void 0?void 0:W.docs)===null||U===void 0?void 0:U.source)})});h.parameters=e(e({},h.parameters),{docs:e(e({},($=h.parameters)===null||$===void 0?void 0:$.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Table
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Table 
        :columns="args.columns"
        :items="args.items"
      >
          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #footer>
            Footer
          </template>
      </Table>
    \`
  }),
  args: {
    ...defaultArgs,
    items: []
  }
}`},(Q=(K=h.parameters)===null||K===void 0?void 0:K.docs)===null||Q===void 0?void 0:Q.source)})});f.parameters=e(e({},f.parameters),{docs:e(e({},(X=f.parameters)===null||X===void 0?void 0:X.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Table
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Table 
        :columns="args.columns"
        :items="args.items"
      >
          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #items-per-page>
            Slot: Items per page
          </template>
      </Table>
    \`
  }),
  args: {
    ...defaultArgs,
    items: []
  }
}`},(Z=(Y=f.parameters)===null||Y===void 0?void 0:Y.docs)===null||Z===void 0?void 0:Z.source)})});v.parameters=e(e({},v.parameters),{docs:e(e({},(ee=v.parameters)===null||ee===void 0?void 0:ee.docs),{source:e({originalSource:`{
  render: (args: any) => ({
    components: {
      Table
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <Table 
        :columns="args.columns"
        :items="args.items"
      >
          <template v-for="header in args.columns" v-slot:[header.value]="{ item, index }">
            <td>{{ item[header.value] }}</td>
          </template>

          <template #showing-page="{ min, max, total }">
            Slot: Showing page; Min: {{ min }}; Max: {{ max }}; Total: {{ total }}
          </template>
      </Table>
    \`
  }),
  args: {
    ...defaultArgs,
    items: []
  }
}`},(ne=(ae=v.parameters)===null||ae===void 0?void 0:ae.docs)===null||ne===void 0?void 0:ne.source)})});const ie=Object.freeze(Object.defineProperty({__proto__:null,Aggregation:m,EmptyState:u,Footer:h,HasHover:c,HideFooter:g,IsHeaderFixed:d,ItemsPerPage:f,Loading:i,NoShadow:p,Options:r,Primary:l,Selection:o,ShowingPage:v,default:le},Symbol.toStringTag,{value:"Module"}));export{m as A,u as E,h as F,c as H,d as I,i as L,p as N,r as O,l as P,o as S,ie as T,g as a,f as b,v as c};
