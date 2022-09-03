import { Center, SimpleGrid, Skeleton, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ItemCard } from './ItemCard';

export function ItemList({ title, items, noItem }) {
  return (
    <>
      {title && (
        <Title order={4} mt="xl" mb="md">
          {title}
        </Title>
      )}
      <SimpleGrid
        cols={6}
        breakpoints={[
          { maxWidth: 755, cols: 4, spacing: 'sm' },
          { maxWidth: 600, cols: 2, spacing: 'sm' },
        ]}
        spacing="xs"
        style={{ position: 'relative' }}
      >
        {items ? (
          items.docs?.length ? (
            items.docs?.map((item) => (
              <ItemCard key={item.id} item={{ id: item.id, ...item.data() }} />
            ))
          ) : (
            <Center
              style={{
                position: 'absolute',
                width: '100%',
                height: '60vh',
              }}
            >
              <Stack>
                <Title order={2} color="dimmed">
                  {noItem.message}
                </Title>
                {noItem.redirect && (
                  <Link to={noItem.redirect.link}>
                    {noItem.redirect.message}
                  </Link>
                )}
              </Stack>
            </Center>
          )
        ) : (
          Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} height={180} />
          ))
        )}
      </SimpleGrid>
    </>
  );
}
