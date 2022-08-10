import { Card, Image, Text } from '@mantine/core';

export function ItemCard({ label, image, price }) {
  return (
    <Card>
      <Card.Section p="md" shadow="sm">
        <Image src={image} alt={label} withPlaceholder />
        <Text weight={600} size="sm">
          {label}
        </Text>
        <Text color="blue" size="sm" weight="bold">
          PHP {price}
        </Text>
      </Card.Section>
    </Card>
  );
}
