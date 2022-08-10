import { Nav } from '../components/Nav';
import { Container, Footer, Text } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <>
      <Nav />
      <Container my="80px">
        <main>
          <Outlet />
        </main>
      </Container>
      <Footer p="md" mt="lg">
        <Container>
          <Text size="sm">&copy; VIG</Text>
        </Container>
      </Footer>
    </>
  );
}
