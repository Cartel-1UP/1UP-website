'use client'

import { galleryData } from '@/data/galleryData'
import { Center, Container, Flex, Grid, Image, Stack, Text } from '@mantine/core'

export const runtime = 'experimental-edge'

export default function NotFound() {
  return (
    <Flex
      mih={'100vh'}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      bg={`linear-gradient(to bottom, #072f37 0%, #072f37 10%,  #f3f3f3 100%)`}
    >
      <Container fluid pb={40}>
        <Grid grow>
          <Center>
            <Center>
              <Image
                src={galleryData[0].image}
                alt={galleryData[0].name}
                fit="contain"
                withPlaceholder
                maw={600}
              />
            </Center>
            <Stack align="center" spacing={'xs'}>
              <Text
                size={48}
                fw={700}
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                c={'#ffffff'}
              >
                Not Found 404
              </Text>
              <Text
                color="#ffffff"
                size={24}
                fw={500}
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              >
                Could not find the requested resource
              </Text>
            </Stack>
          </Center>
        </Grid>
      </Container>
    </Flex>
  )
}
