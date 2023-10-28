'use client'

import { AssetsPage } from "@/components/Assets/AssetsPage/AssetsPage"
import { AssetsSection } from "@/components/Assets/AssetsSection"

export const runtime = 'experimental-edge'

export default function Page() {
  return (
    <div>
      <AssetsSection>
        <AssetsPage />
      </AssetsSection>
    </div>
  )
}
