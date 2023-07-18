'use client'
import { CommunityPage } from "../../../components/Grids/CommunityPage/CommunityPage";
import { DefaultSnackbar } from "../../../components/Grids/DefaultSnackbar/DefaultSnackbar";
import { RecommendedCardsGrid } from "../../../components/Grids/Recommended/RecommendedSection";
import { useNotifiactionStore } from "../../../zustand/stores/useNotificationStore";

// export const runtime = 'experimental-edge';

export default function Page({ params }: { params: { slug: string } }) {
  const snackbars = useNotifiactionStore((state) => state.snackbars);
  return (
    <>
      <CommunityPage tag={params.slug} image={params.slug} />
      <RecommendedCardsGrid />
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
