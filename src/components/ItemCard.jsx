import { Card, Image, Skeleton, Text } from '@mantine/core';

export function ItemCard({ title, image, price }) {
  return (
    <Card>
      <Card.Section p="md" shadow="sm">
        <Image
          src={image}
          alt={title}
          mb="md"
          withPlaceholder
          placeholder={<Skeleton height={90} />}
        />
        <Text color="blue" size="sm">
          {title}
        </Text>
        <Text size="xs">PHP {price}</Text>
      </Card.Section>
    </Card>
  );
}
