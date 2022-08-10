import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MantineProvider } from '@mantine/core';

export function AppProvider({ children }) {
  return (
    <HelmetProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <Router>{children}</Router>
      </MantineProvider>
    </HelmetProvider>
  );
}
