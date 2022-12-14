import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ItemList } from '../components/ItemList';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export function Search() {
  const { string } = useParams();
  const [items, setItems] = useState(null);
  const [filtered, setFiltered] = useState(null);
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

  useEffect(() => {
    if (items?.docs) {
      const filteredItems = items?.docs.filter((item) => {
        const { title } = item.data();
        if (title.toLowerCase().includes(string.toLowerCase())) {
          return item;
        }
      });
      setFiltered({ docs: filteredItems });
    }
  }, [string, items]);

  return (
    <ItemList
      title={`Search results for: ${string}`}
      items={filtered}
      noItem={{
        message: `No results for ${string}`,
      }}
    />
  );
}
