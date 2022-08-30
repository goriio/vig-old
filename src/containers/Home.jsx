import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { Hero } from '../components/Hero';
import { ItemList } from '../components/ItemList';
import { db } from '../firebase';

export function Home() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      const items = await getDocs(
        query(collection(db, 'items'), where('inMarket', '==', true))
      );
      setItems(items);
    })();
  }, []);

  return (
    <>
      <Hero />
      <ItemList title="Market" items={items} />
    </>
  );
}
