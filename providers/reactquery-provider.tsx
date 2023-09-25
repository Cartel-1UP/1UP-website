'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
