'use client'

import { communityAssetsData } from '@/data/communityData'
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Select,
  Space,
  Stack,
  Text,
} from '@mantine/core'
import Link from 'next/link'
import { forwardRef, useState } from 'react'
import { CommunityStats } from './CommunityStats'
import VaultCard from './VaultCard'
import useStyles from './style'

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string
  label: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
)

export function AssetsPage() {
  const { classes, theme } = useStyles()
  const [searchValue, onSearchChange] = useState(communityAssetsData[0].value)

  return (
    <>
      <Container size="xl" pt={0}>
        <Space h="xl" />
        <Space h="xl" />
        <Grid grow>
          <Grid.Col span={8}>
            <VaultCard />
          </Grid.Col>
          <Grid.Col span={4}>
            <Grid grow>
              <Grid.Col span={12}>
                <Card
                  bg={'rgba(255, 255, 255, 0.06)'}
                  withBorder
                  sx={{ borderColor: '#80aab3', borderWidth: 3 }}
                >
                  <Container size="xl">
                    <Group spacing={30}>
                      <Image
                        mah={64}
                        maw={64}
                        fit={'cover'}
                        src={
                          'https://images.hive.blog/p/k75bsZMwYNu2L3iBMXq5y7xeiy1isFJsZxnMZSXuXEsxe4ee1cUkGyPRiszoAzZU9NTKTFv2BcDUBxfybQss5piLFcV85mKLFmyGRzXpDoz5XQoLnEDRBhR5iLCk6NQbnyEDGGQwuzyU5YEYZEFm7gBeDFk4KztGn?format=match&mode=fit'
                        }
                      />
                      <Stack spacing={1.7}>
                        <Text size={18} fw={400} c={'#ffffff'}>
                          Price $0.00008
                        </Text>
                        <Text size={18} fw={400} c={'#ffffff'}>
                          Market Cap $100,000.00
                        </Text>
                        <Text size={18} fw={400} c={'#ffffff'}>
                          Change 7.72%
                        </Text>
                      </Stack>
                    </Group>
                  </Container>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: theme.spacing.xs,
                    }}
                  >
                    <div />
                    <Link
                      style={{ color: '#DEE2E6', textAlign: 'right' }}
                      className={classes.link}
                      href="https://hive-engine.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to live data
                    </Link>
                  </Box>
                </Card>
              </Grid.Col>
              <Grid.Col span={12}>
                <Card
                  bg={'rgba(255, 255, 255, 0.06)'}
                  className={classes.card}
                  withBorder
                  sx={{ borderColor: '#80aab3', borderWidth: 3 }}
                >
                  <Container size="xl">
                    <Group spacing={30}>
                      <Image
                        mah={64}
                        maw={64}
                        fit={'cover'}
                        src={
                          'https://images.hive.blog/p/7b4bio5hobgt1ToxyJNZ2CBe2hrJJxxFumrTYgdiB16dsHGkxy5u76CW7igs4HuCtHruJ9i83UrvVXvhX9xseQkodwpbist8cgZf9YmPrygLnRP15pmfPKzLtJYXBoH1KbbFpTfygQTDFsheRThSEhUEVfiv?format=match&mode=fit'
                        }
                      />
                      <Stack spacing={1.5}>
                        <Text size={18} fw={400} c={'#ffffff'}>
                          Price - $0.00008
                        </Text>
                        <Text size={18} fw={400} c={'#ffffff'}>
                          Market Cap - $100,000.00
                        </Text>
                        <Text size={18} fw={400} c={'#ffffff'}>
                          Change - 7.72%
                        </Text>
                      </Stack>
                    </Group>
                  </Container>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: theme.spacing.xs,
                    }}
                  >
                    <div />
                    <Link
                      style={{ color: '#DEE2E6', textAlign: 'right' }}
                      className={classes.link}
                      href="https://hive-engine.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to live data
                    </Link>
                  </Box>
                </Card>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={12}>
            <Space h="xl" />
            <Card className={classes.card} bg={'rgba(255, 255, 255, 0.06)'}>
              <Container size="xl" h={400}>
                <Grid grow>
                  <Grid.Col span={12}>
                    <Select
                      maw={300}
                      pt={20}
                      placeholder="Pick community"
                      itemComponent={SelectItem}
                      defaultValue={communityAssetsData[0].value}
                      searchValue={searchValue}
                      onSearchChange={onSearchChange}
                      data={communityAssetsData}
                      searchable
                      maxDropdownHeight={220}
                      nothingFound="Nobody here"
                      filter={(value, item) =>
                        Boolean(
                          item.label &&
                            item.label.toLowerCase().includes(value.toLowerCase().trim())
                        )
                      }
                    />
                    <Grid grow>
                      <Grid.Col span={12}>
                        <CommunityStats value={searchValue} />
                      </Grid.Col>
                    </Grid>
                  </Grid.Col>
                </Grid>
              </Container>
            </Card>
          </Grid.Col>
        </Grid>
        <Space h="xl" />
      </Container>
    </>
  )
}
