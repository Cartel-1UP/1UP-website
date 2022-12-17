'use client'

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WebHeader } from '../components/Header/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <html lang="en">
          <head />
          <body>
            <WebHeader />
            {children}
          </body>
        </html>
      </MantineProvider>
    </ColorSchemeProvider>
    </QueryClientProvider>
  )
}
