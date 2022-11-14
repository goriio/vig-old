import { Button, Group, Indicator } from '@mantine/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemList } from '../components/ItemList';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export function Sell() {
  const [items, setItems] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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
      rightButton={
        <Group>
          <Button variant="subtle" onClick={() => navigate('/sales-report')}>
            View sales report
          </Button>
          <Indicator inline dot processing label={1} size={22}>
            <Button variant="light" onClick={() => navigate('/sales')}>
              Sales
            </Button>
          </Indicator>
        </Group>
      }
      items={items}
      noItem={{
        message: `You don't have items on sell`,
      }}
    />
  );
}
