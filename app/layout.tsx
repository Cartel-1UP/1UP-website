'use client'

import { Footer } from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar/Navbar'
import { ColorProvider } from '@/providers/color-provider.tsx'
import { MantineUIProvider } from '@/providers/mantine-provider'
import { ReactQueryProvider } from '@/providers/reactquery-provider'
import { NotificationsProvider } from '@mantine/notifications'

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <ReactQueryProvider>
      <ColorProvider>
        <MantineUIProvider>
          <NotificationsProvider limit={3}>
            <html lang="en">
              <head />
              <body>
                <Navbar />
                {children}
                <Footer links={[]} />
              </body>
            </html>
          </NotificationsProvider>
        </MantineUIProvider>
      </ColorProvider>
    </ReactQueryProvider>
  )
}
