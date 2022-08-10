import { Nav } from '../components/Nav';
import { Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <>
      <Nav />
      <Container my="lg">
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
}
