import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { Icon } from '../Icon/Icon';

const meta = {
  component: Table,
  argTypes: {
    columns: {
      description: 'This property will be the table header.',
    },
    items: {
      description: 'This property will be selected page items displayed in the table.',
    },
    sortOptions: {
      description: 'This property will be the sort settings.',
    },
    page: {
      table: { defaultValue: { summary: '1' } },
      description: 'This property will be the current page.',
    },
    itemsPerPage: {
      table: { defaultValue: { summary: '10' } },
      description: 'This property will be the number of items in 1 page.',
    },
    loading: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Determine the data is loading.',
    },
    enableSelection: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Determine if the user can select all items.',
    },
    enableAggregation: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Determine if the table has a space for aggregations.',
    },
    isHeaderFixed: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Determine if the table header will be fixed and if the table will have y scroll.',
    },
    hasHover: {
      table: { defaultValue: { summary: 'false' } },
      description: 'When hasHover property is true, the row will have a hover effect.',
    },
    hideFooter: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Determine if the default footer is shown.',
    },
    noShadow: {
      table: { defaultValue: { summary: 'false' } },
      description: 'When noShadow property is true, the card will have no shadow.',
    },
    numberOfItems: {
      table: { defaultValue: { summary: '0' } },
      description: 'This property will be the total of items in general.',
    },
    renderPaginationInBackEnd: {
      table: { defaultValue: { summary: 'false' } },
      description: 'Determine if the pagination is rendered in back-end.',
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

const items = [
  {
    name: 'Joanna',
    age: 43,
    memberShip: 'Platinum',
    selected: false,
    childs: [
      { name: 'José', age: 2, selected: false },
    ],
  },
  {
    name: 'Jhonny',
    age: 23,
    memberShip: 'Gold',
    selected: false,
    childs: [],
  },
  {
    name: 'Jeffry',
    age: 55,
    memberShip: 'Bronze',
    selected: false,
    childs: [
      { name: 'Clara', age: 5, selected: false },
    ],
  },
  {
    name: 'Leon',
    age: 76,
    memberShip: 'Silver',
    selected: false,
    childs: [
      { name: 'Maria', age: 40, selected: false },
      { name: 'Cristina', age: 45, selected: false },
    ],
  },
  {
    name: 'Luana',
    age: 33,
    memberShip: 'Diamont',
    selected: false,
  },
  {
    name: 'Carlos',
    age: 34,
    memberShip: 'Silver',
    selected: false,
    childs: [
      { name: 'Carlos', age: 11, selected: false },
      { name: 'Carol', age: 6, selected: false },
      { name: 'Mariana', age: 1, selected: false },
    ],
  },
  {
    name: 'Jake',
    age: 23,
    memberShip: 'Gold',
    selected: false,
  },
  {
    name: 'Linda',
    age: 19,
    memberShip: 'Bronze',
    selected: false,
  },
  {
    name: 'Carol',
    age: 80,
    memberShip: 'Diamont',
    selected: false,
    childs: [
      { name: 'Cristiano', age: 38, selected: false },
    ],
  },
  {
    name: 'Atena',
    age: 55,
    memberShip: 'Diamont',
    selected: false,
  },
  {
    name: 'Leandra',
    age: 19,
    memberShip: 'Bronze',
    selected: false,
  },
  {
    name: 'Davi',
    age: 19,
    memberShip: 'Bronze',
    selected: false,
  },
  {
    name: 'Matheus',
    age: 37,
    memberShip: 'Platinum',
    selected: false,
    childs: [
      { name: 'Lucas', age: 1, selected: false },
    ],
  },
  {
    name: 'Rafael',
    age: 39,
    memberShip: 'Diamont',
    selected: false,
  },
  {
    name: 'Fernando',
    age: 36,
    memberShip: 'Diamont',
    selected: false,
    childs: [
      { name: 'Ana', age: 16, selected: false },
      { name: 'Marina', age: 12, selected: false },
    ],
  },
  {
    name: 'Flávia',
    age: 30,
    memberShip: 'Gold',
    selected: false,
  },
  {
    name: 'Taís',
    age: 75,
    memberShip: 'Silver',
    selected: false,
    childs: [
      { name: 'Austin', age: 66, selected: false },
      { name: 'Gertrudes', age: 45, selected: false },
    ],
  },
  {
    name: 'Nilta',
    age: 79,
    memberShip: 'Gold',
    selected: false,
    childs: [
      { name: 'Irã', age: 56, selected: false },
      { name: 'Ana Izabel', age: 55, selected: false },
      { name: 'Marcelo', age: 54, selected: false },
      { name: 'Danielle', age: 51, selected: false },
    ],
  },
  {
    name: 'Eduardo',
    age: 18,
    memberShip: 'Bronze',
    selected: false,
  },
  {
    name: 'Melissa',
    age: 33,
    memberShip: 'Silver',
    selected: false,
  },
  {
    name: 'Lucca',
    age: 66,
    memberShip: 'Platinum',
    selected: false,
    childs: [
      { name: 'Nilce', age: 22, selected: false },
      { name: 'Luiz', age: 25, selected: false },
    ],
  },
  {
    name: 'Jéssica',
    age: 22,
    memberShip: 'Platinum',
    selected: false,
  },
  {
    name: 'Marcelo',
    age: 56,
    memberShip: 'Gold',
    selected: false,
    childs: [
      { name: 'Emerson', age: 13, selected: false },
      { name: 'Anne', age: 8, selected: false },
    ],
  },
  {
    name: 'Fernanda',
    age: 45,
    memberShip: 'Silver',
    selected: false,
    childs: [
      { name: 'Eduardo', age: 12, selected: false },
      { name: 'Daniel', age: 8, selected: false },
    ],
  },
  {
    name: 'Milena',
    age: 24,
    memberShip: 'Bronze',
    selected: false,
  },
  {
    name: 'Carla',
    age: 77,
    memberShip: 'Gold',
    selected: false,
    childs: [
      { name: 'Camilla', age: 34, selected: false },
      { name: 'Márcio', age: 25, selected: false },
    ],
  },
  {
    name: 'Danilo',
    age: 82,
    memberShip: 'Diamont',
    selected: false,
    childs: [
      { name: 'Valentina', age: 45, selected: false },
      { name: 'Enzo', age: 44, selected: false },
      { name: 'Luiz', age: 43, selected: false },
    ],
  },
  {
    name: 'Thiago',
    age: 33,
    memberShip: 'Bronze',
    selected: false,
    childs: [
      { name: 'Alice', age: 3, selected: false },
    ],
  },
  {
    name: 'Elizabeth',
    age: 100,
    memberShip: 'Platinum',
    selected: false,
  },
  {
    name: 'Miranda',
    age: 33,
    memberShip: 'Gold',
    selected: false,
  },
  {
    name: 'Gabriel',
    age: 58,
    memberShip: 'Silver',
    selected: false,
    childs: [
      { name: 'Marina', age: 22, selected: false },
    ],
  },
  {
    name: 'Laís',
    age: 23,
    memberShip: 'Bronze',
    selected: false,
  },
  {
    name: 'Laura',
    age: 34,
    memberShip: 'Silver',
    selected: false,
  },
  {
    name: 'Merlin',
    age: 92,
    memberShip: 'Diamont',
    selected: false,
    childs: [
      { name: 'Raquel', age: 67, selected: false },
      { name: 'Rafaela', age: 59, selected: false },
    ],
  },
  {
    name: 'Vitória',
    age: 24,
    memberShip: 'Diamont',
    selected: false,
  },
  {
    name: 'Anna',
    age: 26,
    memberShip: 'Gold',
    selected: false,
  },
  {
    name: 'Mônica',
    age: 65,
    memberShip: 'Bronze',
    selected: false,
    childs: [
      { name: 'Marta', age: 34, selected: false },
      { name: 'Marco', age: 33, selected: false },
    ],
  },
  {
    name: 'Jeremias',
    age: 49,
    memberShip: 'Silver',
    selected: false,
    childs: [
      { name: 'Denise', age: 31, selected: false },
      { name: 'Arthur', age: 25, selected: false },
    ],
  },
  {
    name: 'Henrique',
    age: 53,
    memberShip: 'Gold',
    selected: false,
    childs: [
      { name: 'Caroline', age: 17, selected: false },
    ],
  },
  {
    name: 'Marcela',
    age: 34,
    memberShip: 'Bronze',
    selected: false,
  },
  {
    name: 'Daniel',
    age: 73,
    memberShip: 'Silver',
    selected: false,
    childs: [
      { name: 'Milene', age: 39, selected: false },
      { name: 'Átila', age: 38, selected: false },
    ],
  },
  {
    name: 'Gustavo',
    age: 43,
    memberShip: 'Diamont',
    selected: false,
    childs: [
      { name: 'Fabiano', age: 5, selected: false },
    ],
  },
  {
    name: 'Lucca',
    age: 21,
    memberShip: 'Gold',
    selected: false,
  },
  {
    name: 'Giulia',
    age: 29,
    memberShip: 'Silver',
    selected: false,
  },
];

const defaultColumns = [
  { label: 'Name', value: 'name', sortable: true, width: '20%' },
  { label: 'Age', value: 'age', sortable: true, width: '10%' },
  { label: 'Membership', value: 'memberShip', width: '20%' },
];

export const Primary: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <Table
        columns={[
          {
            label: 'Name',
            value: 'name',
            sortable: true,
            width: '20%',
            render: (value) => <span>{value}</span>,
          },
          {
            label: 'Age',
            value: 'age',
            sortable: true,
            width: '10%',
            render: (value) => <span className="ml-xs">{value}</span>,
          },
          {
            label: 'Membership',
            value: 'memberShip',
            width: '20%',
            render: (value) => <span>{value}</span>,
          },
        ]}
        items={items}
        sortOptions={{ by: '', desc: false }}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
        renderPaginationInBackEnd={false}
        hideFooter={false}
        isHeaderFixed={false}
        enableSelection={false}
        enableAggregation={false}
        loading={false}
        noShadow={false}
        hasHover={false}
        onSortBy={(_key, _isDesc) => {}}
        onPageItems={(_p, _ipp) => {}}
        onSelectAll={() => {}}
      >
        <Table.EmptyState>
          <div className="flex items-center justify-center p-xxs rounded-full text-xl">
            <Icon name="sentiment_dissatisfied" size="1em" />
          </div>
        </Table.EmptyState>
        <Table.Actions>
          <div className="flex items-center justify-end">
            <Icon name="more_vert" />
          </div>
        </Table.Actions>
      </Table>
    );
  },
};

export const Options: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <Table
        columns={defaultColumns}
        items={items}
        sortOptions={{ by: 'name', desc: true }}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
      />
    );
  },
};

export const Loading: Story = {
  render: () => {
    return (
      <Table
        columns={defaultColumns}
        items={items}
        sortOptions={{ by: '', desc: false }}
        numberOfItems={items.length}
        loading={true}
      />
    );
  },
};

export const Selection: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <Table
        columns={defaultColumns}
        items={items}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
        enableSelection={true}
      />
    );
  },
};

export const Aggregation: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <Table
        columns={defaultColumns}
        items={items}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
        enableAggregation={true}
      />
    );
  },
};

export const IsHeaderFixed: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);

    return (
      <Table
        columns={defaultColumns}
        items={items}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
        isHeaderFixed={true}
      />
    );
  },
};

export const HasHover: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <Table
        columns={defaultColumns}
        items={items}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
        hasHover={true}
      />
    );
  },
};

export const HideFooter: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <Table
        columns={defaultColumns}
        items={items}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
        hideFooter={true}
      />
    );
  },
};

export const NoShadow: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <Table
        columns={defaultColumns}
        items={items}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
        noShadow={true}
      />
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    return (
      <Table
        columns={defaultColumns}
        items={[]}
        numberOfItems={0}
      >
        <Table.EmptyState>
          <div className="flex items-center justify-center p-xxs rounded-full text-xl">
            <Icon name="sentiment_dissatisfied" size="1em" />
          </div>
        </Table.EmptyState>
      </Table>
    );
  },
};

export const Footer: Story = {
  render: () => {
    return (
      <Table
        columns={defaultColumns}
        items={[]}
        numberOfItems={0}
      >
        <Table.Footer>
          <span>Footer</span>
        </Table.Footer>
      </Table>
    );
  },
};

export const ItemsPerPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    return (
      <Table
        columns={defaultColumns}
        items={items}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
      >
        <Table.Footer>
          <span>Slot: Items per page</span>
        </Table.Footer>
      </Table>
    );
  },
};

export const ShowingPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const currentMin = page === 1 ? 1 : (page - 1) * itemsPerPage + 1;
    const currentMax = Math.min(page * itemsPerPage, items.length);
    const total = items.length;

    return (
      <Table
        columns={defaultColumns}
        items={items}
        page={page}
        onPageChange={setPage}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
        numberOfItems={items.length}
      >
        <Table.Footer>
          <span>Slot: Showing page; Min: {currentMin}; Max: {currentMax}; Total: {total}</span>
        </Table.Footer>
      </Table>
    );
  },
};
