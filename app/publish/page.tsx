'use client'

import PublishEditor from '@/components/ui/PublishEditor/PublishEditor'
import useSettings from '@/utils/methods/useSettings'
import { Container, Space } from '@mantine/core'

export default function Page() {
  const { ...settings } = useSettings()
  return (
    <>
      <Container
        fluid
        pb={40}
        bg={`linear-gradient(to bottom, #072f37 0%, #072f37 10%, #f3f3f3 30%, #f3f3f3 100%)`}
      >
        {settings.isMd ? (
          <></>
        ) : (
          <Container size={'xl'}>
            <Space h="xl" />
            <PublishEditor />
          </Container>
        )}
      </Container>
    </>
  )
}
