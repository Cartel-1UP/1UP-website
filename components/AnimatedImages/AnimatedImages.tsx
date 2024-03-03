import { galleryData2 } from '@/data/galleryData'
import { Image } from '@mantine/core'
import { animated, config, useTransition } from '@react-spring/web'
import { useState } from 'react'

const slides = galleryData2

export default function AnimatedImages() {
  const [index, set] = useState(0)
  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { ...config.stiff, duration: 6000 },
    onRest: () => {
      const timer = setTimeout(() => {
        set((state) => (state + 1) % slides.length)
      }, 6000)
      return () => clearTimeout(timer)
    },
    exitBeforeEnter: true,
  })

  return (
    <div>
      {transitions((style, i) => (
        <animated.div style={style} key={i}>
          {' '}
          {/* Add key */}
          <Image src={galleryData2[i].image} fit="contain" mah={240} />
        </animated.div>
      ))}
    </div>
  )
}
