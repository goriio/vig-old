import { Nav } from '../components/Nav';
import { Container, Footer, Text } from '@mantine/core';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <>
      <Nav />
      <Container my="80px">
        <main style={{ minHeight: '65vh' }}>
          <Outlet />
        </main>
      </Container>
      <Footer p="md" mt="lg">
        <Container>
          <Text size="sm">&copy; {new Date().getFullYear()} VIG</Text>
        </Container>
      </Footer>
    </>
  );
}
