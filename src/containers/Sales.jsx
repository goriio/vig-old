import {
  Button,
  Card,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

function truncate(string) {
  const maxLength = 40;
  if (string.length < maxLength) {
    return string;
  }
  return string.slice(0, maxLength) + '...';
}

function Item({ item }) {
  return (
    <Card>
      <Group position="apart">
        <Group>
          <Text fw={700} title={item.title}>
            {truncate(item.title)}
          </Text>
          <Text>Ref. No. {item.owner.id}</Text>
        </Group>
        <Group>
          <Button variant="subtle">Ignore</Button>
          <Button>Confirm</Button>
        </Group>
      </Group>
    </Card>
  );
}

export function Sales() {
  const [items, setItems] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const items = await getDocs(
        query(
          collection(db, 'items'),
          where('inMarket', '==', false),
          where('owner.id', '==', currentUser.uid)
        )
      );
      setItems(items);
    })();
  });

  return (
    <>
      <Group position="apart" mb="md">
        <Title order={4}>Sales</Title>
        <Button variant="subtle" onClick={() => navigate('/')}>
          Go home
        </Button>
      </Group>
      <Stack>
        {items ? (
          items.docs?.length ? (
            items.docs?.map((item) => {
              return <Item key={item.id} item={item.data()} />;
            })
          ) : (
            <h1>Nothing</h1>
          )
        ) : (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={70} />
          ))
        )}
      </Stack>
    </>
  );
}
