'use client'

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Footer } from '../components/Footer/Footer';
import { WebHeader } from '../components/Header/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
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
            <Footer links={[]}/>
          </body>
        </html>
      </MantineProvider>
    </ColorSchemeProvider>
    </QueryClientProvider>
  )
}
