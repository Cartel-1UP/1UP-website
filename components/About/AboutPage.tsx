'use client'
import { Communities } from './Communities'
import { Home } from './Home'
import { Join } from './Join'
import { Owned } from './Owned'
import { Pools } from './Pools'

export function AboutPage() {
  return (
    <>
      <Home />
      <Owned />
      <Join />
      <Pools />
      <Communities />
    </>
  )
}
