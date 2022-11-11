import { Button, Card, Group, Image, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Purchase } from './Purchase';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { showNotification } from '@mantine/notifications';
import { BiCheck } from 'react-icons/bi';

export function ItemCard({ item }) {
  const [opened, setOpened] = useState(false);
  const [moving, setMoving] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const isOwner = currentUser?.uid === item.owner.id;

  function handleClick() {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setOpened(true);
  }

  async function moveToInventory() {
    try {
      setMoving(true);
      await updateDoc(doc(db, 'items', item.id), {
        inMarket: false,
      });
      navigate('/inventory');
      showNotification({
        message: `${item.title} has been moved to inventory.`,
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
      setOpened(false);
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
        message: `${item.title} is now on sell.`,
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
      setOpened(false);
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
      </Card>
      {!isOwner && (
        <Purchase item={item} opened={opened} setOpened={setOpened} />
      )}
      {isOwner && (
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          withCloseButton={false}
        >
          <Text align="center" pb="lg">
            Move "{item.title}".
          </Text>
          <Group position="apart" grow>
            <Button
              variant="subtle"
              color="red"
              onClick={() => setOpened(false)}
            >
              Cancel
            </Button>

            {item.inMarket ? (
              <Button fullWidth onClick={moveToInventory} loading={moving}>
                Inventory
              </Button>
            ) : (
              <Button fullWidth onClick={moveToSell} loading={moving}>
                Sell
              </Button>
            )}
          </Group>
        </Modal>
      )}
    </>
  );
}
