import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { MainLayout } from '../layouts/MainLayout';
import { Container } from '@mantine/core';
import { SignupForm } from '../components/SignupForm';
import { Home } from '../containers/Home';
import { NotFound } from '../containers/NotFound';
import { useAuth } from '../contexts/AuthContext';
import { Inventory } from '../containers/Inventory';
import { Sell } from '../containers/Sell';
import { Search } from '../containers/Search';
import { SalesReport } from '../containers/SalesReport';
import { Sales } from '../containers/Sales';

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
          <Route path="/sell" element={<Sell />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/sales" element={<Sales />} />
        </Route>
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/search/:string" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
