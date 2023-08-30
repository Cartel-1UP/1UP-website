'use client'

import { BlogPage } from "../../../../../../components/Blog/BlogPage";
import { DefaultSnackbar } from "../../../../../../components/DefaultSnackbar/DefaultSnackbar";
import { useNotifiactionStore } from "../../../../../../zustand/stores/useNotificationStore";


export default function Page({ params }: { params: { id: string, username: string } }) {
  const snackbars = useNotifiactionStore((state) => state.snackbars);
  return (
    <>
      <BlogPage id={params.id} username={params.username} />
      {snackbars.map((snackbar) => (
        <DefaultSnackbar
          key={snackbar.id}
          id={snackbar.id}
          title={snackbar.title}
          message={snackbar.message}
          queryKey={snackbar.queryKey}
        />
      ))}
    </>
  )
}
