'use client'

import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { lazy, Suspense, useState } from 'react';
import { WebHeader } from '../components/Header/Header';
import Loading from './loading';

const Home = lazy(() => import('./page'))

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
    const [showPreview, setShowPreview] = useState(false);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <html lang="en">
          {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
          <head />
          <body>
          <Suspense fallback={<Loading/>}>
            <WebHeader />
            <Home/>
          </Suspense>
          </body>
        </html>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
