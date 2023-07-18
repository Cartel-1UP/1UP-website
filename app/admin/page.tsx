import { AdminPage } from "../../components/Grids/Admin/Admin/AdminPage";
import { AdminPanel } from "../../components/Grids/Admin/AdminPanel";


// export const runtime = 'experimental-edge';

export default function Page() {

  return (
    <>
      <AdminPanel>
        <AdminPage />
      </AdminPanel>
    </>
  )
}
