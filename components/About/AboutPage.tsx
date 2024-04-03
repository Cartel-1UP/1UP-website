'use client'
import { useGetHivePrice } from '@/actions/hive/get-token-price'
import { Communities } from './Communities'
import { Home } from './Home'
import { Join } from './Join'
import { Owned } from './Owned'
import { Pools } from './Pools'

export function AboutPage() {
  const { data: hivePrice, isLoading } = useGetHivePrice()
  console.log(hivePrice)



  return (
    <>
      <Home />
      {
        !isLoading && (
          <>
            <Owned />
            <Join />
            <Pools />
            <Communities />
          </>
        )
      }

    </>
  )
}
