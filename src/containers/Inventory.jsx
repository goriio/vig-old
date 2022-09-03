import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { ItemList } from '../components/ItemList';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export function Inventory() {
  const [items, setItems] = useState(null);
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
  }, []);

  return (
    <ItemList
      title="Inventory"
      items={items}
      noItem={{
        message: `You don't have items in inventory`,
        redirect: {
          link: '/',
          message: 'Try buying an item',
        },
      }}
    />
  );
}
