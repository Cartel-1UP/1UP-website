'use client'
import { Communities } from '../Communities/Communities'
import { Home } from '../Home/Home'
import { Join } from '../Join/Join'
import { Owned } from '../Owned/Owned'

export function AboutPage() {
  return (
    <>
      <Home />
      <Communities />
      <Owned />
      <Join />
    </>
  )
}
