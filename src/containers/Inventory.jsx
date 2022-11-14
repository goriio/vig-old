import {
  Button,
  Image,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import {
  addDoc,
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { BiCheck } from 'react-icons/bi';
import { ItemList } from '../components/ItemList';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export function Inventory() {
  const [items, setItems] = useState(null);
  const [opened, setOpened] = useState(false);
  const [adding, setAdding] = useState(false);
  const { currentUser } = useAuth();
  const form = useForm({
    initialValues: {
      title: '',
      price: '',
      image: '',
      wallet: localStorage.getItem('wallet') || '',
    },
    validate: {
      title: (value) => (!value ? 'Item name is required' : null),
      price: (value) =>
        !value
          ? 'Price is required'
          : !/\d+/.test(value)
          ? 'Price is invalid'
          : null,
      image: (value) => (!value ? 'Image link is required' : null),
      wallet: (value) =>
        !value
          ? 'Phone number is required'
          : !/^09\d{9}$/.test(value)
          ? 'Phone number is invalid'
          : null,
    },
  });

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
  }, []);

  async function addItem({ title, price, image, wallet }) {
    localStorage.setItem('wallet', wallet);

    const item = {
      createdAt: Timestamp.now(),
      inMarket: false,
      image,
      owner: {
        id: currentUser.uid,
        wallet,
      },
      price,
      title,
    };

    try {
      setAdding(true);
      await addDoc(collection(db, 'items'), item);
      showNotification({
        title: '🎉 Successful',
        message: 'You have added an item in your inventory.',
        icon: <BiCheck />,
        color: 'teal',
      });
      form.reset();
      setOpened(false);
    } catch (error) {
      showNotification({
        title: 'Something went wrong',
        message: error.message,
        color: 'red',
      });
    } finally {
      setAdding(false);
    }
  }

  return (
    <>
      <Modal
        title="Add a virtual item to inventory"
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <form onSubmit={form.onSubmit(addItem)}>
          <Stack>
            <TextInput
              label="Item name"
              placeholder="Item name"
              {...form.getInputProps('title')}
            />
            <NumberInput
              label="Price (PHP)"
              placeholder="Price"
              hideControls
              {...form.getInputProps('price')}
            />
            <TextInput
              label="Image"
              placeholder="Image link (png or jpeg)"
              {...form.getInputProps('image')}
            />
            <Image
              height={200}
              fit="contain"
              src={form.values.image}
              withPlaceholder
            />
            <TextInput
              label="Your GCash"
              placeholder="09123456789"
              {...form.getInputProps('wallet')}
            />
            <Button type="submit" loading={adding} mt="sm">
              Add item
            </Button>
          </Stack>
        </form>
      </Modal>
      <ItemList
        title="Inventory"
        rightButton={
          <Button variant="light" onClick={() => setOpened(true)}>
            Add Item
          </Button>
        }
        items={items}
        noItem={{
          message: `You don't have items in inventory`,
        }}
      />
    </>
  );
}
