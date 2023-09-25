'use client'

import { DefaultSnackbar } from '@/components/DefaultSnackbar/DefaultSnackbar'
import { Footer } from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar/Navbar'
import { ColorProvider } from '@/providers/color-provider.tsx'
import { MantineUIProvider } from '@/providers/mantine-provider'
import { ReactQueryProvider } from '@/providers/reactquery-provider'
import { useNotifiactionStore } from '@/zustand/stores/useNotificationStore'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const snackbars = useNotifiactionStore((state) => state.snackbars)

  return (
    <ReactQueryProvider>
      <ColorProvider>
        <MantineUIProvider>
          <html lang="en">
            <head />
            <body>
              <Navbar />
              {children}
              <Footer links={[]} />
              {snackbars.map((snackbar) => (
                <DefaultSnackbar
                  key={snackbar.id}
                  id={snackbar.id}
                  title={snackbar.title}
                  message={snackbar.message}
                  queryKey={snackbar.queryKey}
                  color={snackbar.color}
                />
              ))}
            </body>
          </html>
        </MantineUIProvider>
      </ColorProvider>
    </ReactQueryProvider>
  )
}
