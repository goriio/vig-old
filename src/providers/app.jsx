import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationsProvider } from '@mantine/notifications';

export function AppProvider({ children }) {
  return (
    <HelmetProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <NotificationsProvider>
          <Router>
            <AuthProvider>{children}</AuthProvider>
          </Router>
        </NotificationsProvider>
      </MantineProvider>
    </HelmetProvider>
  );
}
