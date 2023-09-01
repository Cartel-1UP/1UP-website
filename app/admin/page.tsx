import { AdminPage } from "@/components/Admin/Admin/AdminPage";
import { AdminPanel } from "@/components/Admin/AdminPanel";

export const runtime = 'experimental-edge';

export default function Page() {

  return (
    <>
      <AdminPanel>
        <AdminPage />
      </AdminPanel>
    </>
  )
}
