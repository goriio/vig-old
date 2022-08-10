import { Route, Routes } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { MainLayout } from '../layouts/MainLayout';
import { Container } from '@mantine/core';
import { SignupForm } from '../components/SignupForm';
import { Home } from '../containers/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Container
            size="xs"
            sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}
          >
            <LoginForm />
          </Container>
        }
      />
      <Route
        path="/signup"
        element={
          <Container
            size="xs"
            sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}
          >
            <SignupForm />
          </Container>
        }
      />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hehe" element={<h1>Hehe</h1>} />
        <Route path="/sample" element={<h1>Sample</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Route>
    </Routes>
  );
}
