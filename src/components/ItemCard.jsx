import { Card, Image, Text } from '@mantine/core';

export function ItemCard({ label, image, price }) {
  return (
    <Card>
      <Card.Section p="md">
        <Image src={image} alt={label} withPlaceholder />
        <Text weight={600}>{label}</Text>
        <Text color="blue">PHP {price}</Text>
      </Card.Section>
    </Card>
  );
}
