import { Badge, Card, Image, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Purchase } from './Purchase';

export function ItemCard({ item }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setIsModalOpened(true);
  }

  return (
    <>
      <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <Card.Section p="md" shadow="sm">
          <Image src={item.image} alt={item.title} mb="md" withPlaceholder />
          <Text color="blue" size="sm" mb="auto">
            {item.title}
          </Text>
          <Badge>PHP {item.price}</Badge>
        </Card.Section>
      </Card>
      <Purchase
        item={item}
        opened={isModalOpened}
        setOpened={setIsModalOpened}
      />
    </>
  );
}
