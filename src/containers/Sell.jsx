import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { ItemList } from '../components/ItemList';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export function Sell() {
  const [items, setItems] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const items = await getDocs(
        query(
          collection(db, 'items'),
          where('inMarket', '==', true),
          where('owner.id', '==', currentUser.uid)
        )
      );
      setItems(items);
    })();
  }, []);

  return (
    <ItemList
      title="Sell"
      items={items}
      noItem={{
        message: `You don't have items in sell`,
        redirect: {
          link: '/inventory',
          message: 'Try to add in inventory',
        },
      }}
    />
  );
}
