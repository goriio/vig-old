import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { MainLayout } from '../layouts/MainLayout';
import { Container } from '@mantine/core';
import { SignupForm } from '../components/SignupForm';
import { Home } from '../containers/Home';
import { NotFound } from '../containers/NotFound';
import { useAuth } from '../contexts/AuthContext';

function PublicRoutes() {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to={'/'} /> : <Outlet />;
}

function ProtectedRoutes() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to={'/login'} />;
}

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
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
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
      </Route>

      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<MainLayout />}>
          <Route path="/hehe" element={<h1>Hehe</h1>} />
          <Route path="/sample" element={<h1>Sample</h1>} />
        </Route>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
