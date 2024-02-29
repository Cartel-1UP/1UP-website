'use client'

import { Footer } from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar/Navbar'
import { ColorProvider } from '@/providers/color-provider.tsx'
import { MantineUIProvider } from '@/providers/mantine-provider'
import { ReactQueryProvider } from '@/providers/reactquery-provider'
import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { Analytics } from '@vercel/analytics/react'
import { useEffect, useState } from 'react'
import Loading from './loading'

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <ReactQueryProvider>
      <ColorProvider>
        <MantineProvider>
          <MantineUIProvider>
            <NotificationsProvider limit={3} zIndex={999}>
              <html lang="en">
                <head />
                <body>
                  {loading ?
                    <>
                      <Navbar />
                      {children}
                      <Footer links={[]} />
                    </>
                    :
                    <Loading />
                  }
                  <Analytics />
                </body>
              </html>
            </NotificationsProvider>
          </MantineUIProvider>
        </MantineProvider>
      </ColorProvider>
    </ReactQueryProvider>
  )
}
