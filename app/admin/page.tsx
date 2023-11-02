'use client'

import { AdminPage } from '@/components/Admin/Admin/AdminPage'
import { AdminPanel } from '@/components/Admin/AdminPanel'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import NotFound from '../not-found'

export const runtime = 'experimental-edge'

export default function Page() {
  const role = useAuthorizationStore((state: { role: string }) => state.role)

  return (
    <>
      {role == 'admin' ? (
        <AdminPanel>
          <AdminPage />
        </AdminPanel>
      ) : (
        <NotFound />
      )}
    </>
  )
}
