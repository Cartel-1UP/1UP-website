'use client'

import { ColorScheme, MantineProvider } from '@mantine/core'
import { ReactNode, useState } from 'react'

export function MantineUIProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

  return (
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  )
}
