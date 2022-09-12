import { Nav } from '../components/Nav';
import { Container, Footer, Group, Text } from '@mantine/core';
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
          <Group position="apart">
            <Text size="sm" color="dimmed">
              &copy; {new Date().getFullYear()} VIG
            </Text>
            <Text size="sm" color="dimmed">
              VIG is not affiliated with nor endorsed by VALVE corporation.
            </Text>
          </Group>
        </Container>
      </Footer>
    </>
  );
}
