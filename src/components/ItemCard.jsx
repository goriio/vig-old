import { Button, Card, Image, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Purchase } from './Purchase';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { showNotification } from '@mantine/notifications';
import { BiCheck } from 'react-icons/bi';

export function ItemCard({ item }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [moving, setMoving] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isOwner = currentUser?.uid === item.owner.id;

  function handleClick() {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setIsModalOpened(true);
  }

  async function moveToInventory() {
    try {
      setMoving(true);
      await updateDoc(doc(db, 'items', item.id), {
        inMarket: false,
      });
      navigate('/inventory');
      showNotification({
        message: 'The item has been moved to inventory.',
        icon: <BiCheck />,
        color: 'teal',
      });
    } catch (error) {
      showNotification({
        title: 'Something went wrong',
        message: error.message,
        color: 'red',
      });
    } finally {
      setMoving(false);
    }
  }

  async function moveToSell() {
    try {
      setMoving(true);
      await updateDoc(doc(db, 'items', item.id), {
        inMarket: true,
      });
      navigate('/sell');
      showNotification({
        message: 'The item is now on sell.',
        icon: <BiCheck />,
        color: 'teal',
      });
    } catch (error) {
      showNotification({
        title: 'Something went wrong',
        message: error.message,
        color: 'red',
      });
    } finally {
      setMoving(false);
    }
  }

  return (
    <>
      <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <Card.Section p="md" shadow="sm">
          <Image src={item.image} alt={item.title} mb="md" withPlaceholder />
          <Text size="sm" mb="xs">
            {item.title}
          </Text>
          <Text size="xs" color="blue">
            PHP {item.price}
          </Text>
        </Card.Section>
        {isOwner ? (
          item.inMarket ? (
            <Button
              fullWidth
              variant="default"
              onClick={moveToInventory}
              size="xs"
              loading={moving}
            >
              Inventory
            </Button>
          ) : (
            <Button
              fullWidth
              variant="default"
              onClick={moveToSell}
              size="xs"
              loading={moving}
            >
              Sell
            </Button>
          )
        ) : null}
      </Card>
      {!isOwner && (
        <Purchase
          item={item}
          opened={isModalOpened}
          setOpened={setIsModalOpened}
        />
      )}
    </>
  );
}
