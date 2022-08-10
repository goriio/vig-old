import { Card, Image, Text } from '@mantine/core';

export function ItemCard({ label, image, price }) {
  return (
    <Card>
      <Card.Section p="lg">
        <Image src={image} alt={label} height={160} withPlaceholder />
        <Text weight={600}>{label}</Text>
        <Text color="blue">PHP {price}</Text>
      </Card.Section>
    </Card>
  );
}
