'use client'

import { BookmarkSection } from "@/components/Sections/Bookmark/BookmarkSection"
import { Container, Grid } from "@mantine/core"


export const runtime = 'experimental-edge'

export default function Page() {
  return (
    <>
      <Container fluid bg={'#E9ECEF'}>
        <Grid>
          <Grid.Col span={12}>
            <BookmarkSection />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  )
}
