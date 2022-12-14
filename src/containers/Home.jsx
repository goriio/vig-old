import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Hero } from '../components/Hero';
import { ItemList } from '../components/ItemList';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export function Home() {
  const [items, setItems] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    (async () => {
      const items = currentUser
        ? await getDocs(
            query(
              collection(db, 'items'),
              where('inMarket', '==', true),
              where('owner.id', '!=', currentUser.uid)
            )
          )
        : await getDocs(
            query(collection(db, 'items'), where('inMarket', '==', true))
          );
      setItems(items);
    })();
  }, [currentUser]);

  return (
    <>
      <Hero />
      <ItemList title="Market" items={items} />
    </>
  );
}
