"use client"


import { ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { ReactNode, useState } from 'react';

export function ColorProvider({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>{children}</ColorSchemeProvider>
}
