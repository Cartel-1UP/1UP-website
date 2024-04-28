'use client'
import useSettings from '@/utils/methods/useSettings'
import { Grid, Space } from '@mantine/core'
import PublishEditor from '../ui/CommentEditor/CommentEditor'



export function CommunityPage() {

  const { ...settings } = useSettings()

  return settings.isMd ? (
    <>
    </>
  ) : (
    <>
      <Grid>
        <Grid.Col span={12}>
          <Space h="xl" />
          <PublishEditor />
        </Grid.Col>
      </Grid>
    </>
  )
}
