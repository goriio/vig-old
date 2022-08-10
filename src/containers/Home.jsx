import { Group, Select, SimpleGrid, TextInput } from '@mantine/core';
import { BiSearch } from 'react-icons/bi';
import Item1 from '../assets/item-1.png';
import Item2 from '../assets/item-2.png';
import Item3 from '../assets/item-3.png';
import { ItemCard } from '../components/ItemCard';

const itemsData = [
  {
    id: 1,
    label: 'Ano to',
    image: Item1,
    price: 12.98,
  },
  {
    id: 2,
    label: 'Di ko alam tawag',
    image: Item2,
    price: 143.23,
  },
  {
    id: 3,
    label: '???',
    image: Item3,
    price: 122.8,
  },
  {
    id: 4,
    label: 'Ano to',
    image: Item1,
    price: 12.98,
  },
  {
    id: 5,
    label: 'Di ko alam tawag',
    image: Item2,
    price: 143.23,
  },
  {
    id: 6,
    label: '???',
    image: Item3,
    price: 122.8,
  },
  {
    id: 7,
    label: 'Ano to',
    image: Item1,
    price: 12.98,
  },
  {
    id: 8,
    label: 'Di ko alam tawag',
    image: Item2,
    price: 143.23,
  },
  {
    id: 9,
    label: '???',
    image: Item3,
    price: 122.8,
  },
];

export function Home() {
  return (
    <>
      <Group position="apart" mb="lg">
        <TextInput
          aria-label="Search"
          placeholder="Search..."
          icon={<BiSearch />}
          size="md"
        />
        <Select
          aria-label="Sort"
          placeholder="Sort"
          data={[
            { value: 'date', label: 'Date' },
            { value: 'price', label: 'Price' },
          ]}
          width={40}
          size="md"
        />
      </Group>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 755, cols: 3, spacing: 'sm' },
          { maxWidth: 600, cols: 2, spacing: 'sm' },
        ]}
      >
        {itemsData.map((item) => (
          <ItemCard
            key={item.id}
            label={item.label}
            image={item.image}
            price={item.price}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
