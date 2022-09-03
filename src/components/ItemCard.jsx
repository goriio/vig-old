import { Badge, Card, Image, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Purchase } from './Purchase';

export function ItemCard({ title, image, price }) {
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
          <Image src={image} alt={title} mb="md" withPlaceholder />
          <Text color="blue" size="sm" mb="auto">
            {title}
          </Text>
          <Badge>PHP {price}</Badge>
        </Card.Section>
      </Card>
      <Purchase
        item={{ title, image, price }}
        opened={isModalOpened}
        setOpened={setIsModalOpened}
      />
    </>
  );
}
