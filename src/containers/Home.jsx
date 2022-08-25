import { SimpleGrid, Title } from '@mantine/core';
import Item1 from '../assets/item-1.png';
import Item2 from '../assets/item-2.png';
import Item3 from '../assets/item-3.png';
import { Hero } from '../components/Hero';
import { ItemCard } from '../components/ItemCard';

const itemsData = [
  {
    id: 1,
    label: 'Paracord Knife | Fade',
    image: Item1,
    price: 12.98,
  },
  {
    id: 2,
    label: 'Five-SeveN | Monkey Business',
    image: Item2,
    price: 143.23,
  },
  {
    id: 3,
    label: 'Talon Knife | Fade',
    image: Item3,
    price: 122.8,
  },
  {
    id: 4,
    label: 'Paracord Knife | Fade',
    image: Item1,
    price: 12.98,
  },
  {
    id: 5,
    label: 'Five-SeveN | Monkey Business',
    image: Item2,
    price: 143.23,
  },
  {
    id: 6,
    label: 'Talon Knife | Fade',
    image: Item3,
    price: 122.8,
  },
  {
    id: 7,
    label: 'Paracord Knife | Fade',
    image: Item1,
    price: 12.98,
  },
  {
    id: 8,
    label: 'Five-SeveN | Monkey Business',
    image: Item2,
    price: 143.23,
  },
  {
    id: 9,
    label: 'Talon Knife | Fade',
    image: Item3,
    price: 122.8,
  },
  {
    id: 10,
    label: 'Paracord Knife | Fade',
    image: Item1,
    price: 12.98,
  },
  {
    id: 11,
    label: 'Five-SeveN | Monkey Business',
    image: Item2,
    price: 143.23,
  },
  {
    id: 12,
    label: 'Talon Knife | Fade',
    image: Item3,
    price: 122.8,
  },
];

export function Home() {
  return (
    <>
      <Hero />
      <Title order={4} mt="xl" mb="md">
        Market
      </Title>
      <SimpleGrid
        cols={6}
        breakpoints={[
          { maxWidth: 755, cols: 4, spacing: 'sm' },
          { maxWidth: 600, cols: 2, spacing: 'sm' },
        ]}
        spacing="xs"
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
