import { Card, Image, Text } from '@mantine/core';

export function ItemCard({ label, image, price }) {
  return (
    <Card>
      <Card.Section p="md" shadow="sm">
        <Image src={image} alt={label} />
        <Text size="sm">{label}</Text>
        <Text color="blue" size="xs">
          PHP {price}
        </Text>
      </Card.Section>
    </Card>
  );
}
