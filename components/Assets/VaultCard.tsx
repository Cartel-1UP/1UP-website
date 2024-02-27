import { Card, Grid, Group, Image, Space, Text } from '@mantine/core'

import useStyles from './style'

export default function VaultCard() {
  const { classes, theme } = useStyles()

  return (
    <>
      <Card
        p="lg"
        radius={'sm'}
        bg={'rgba(255, 255, 255, 0.1)'}
        withBorder
        sx={{ borderColor: '#80aab3', borderWidth: 3 }}
        mih={'100%'}
      >
        <Grid>
          <Grid.Col span={8}>
            <Text size="xl" weight={500} c={'#F1F3F5'}>
              $CARTEL treasure chest
            </Text>
            <Text size="lg" color="#F1F3F5" mb="lg">
              Welcome to our Crypto Guild Vault, safeguarding assets from blockchain gaming and
              NFTs.
            </Text>
            <Group>
              <Image
                maw={24}
                mah={24}
                fit="contain"
                src={
                  'data:image/png;base64,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'
                }
              />
              <Text fz={'lg'}>
                <Text span fw={400} c={'#F1F3F5'} inherit>
                  10,000 HIVE
                </Text>
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col span={4}>
            <Image
              src={
                'https://cdn.discordapp.com/attachments/976940914343821373/978430436059512862/King-1UP.png?ex=65dd165a&is=65caa15a&hm=7389aa499d94554cbc783efa661277e4303f39226f6f2c695b53503f357e399b&'
              }
              fit={'cover'}
            />
          </Grid.Col>
        </Grid>
        <Space h="xl" />
      </Card>
    </>
  )
}
