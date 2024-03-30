import { useGetTokenPrice } from '@/actions/hive/get-token-price'
import { Card, Grid, Image, Text } from '@mantine/core'
import useStyles from './style'

type Props = {
  name: string
  image: any
}

export default function CoinCard({ name, image }: Props) {
  const { classes, theme } = useStyles()
  const { data } = useGetTokenPrice(name)

  const countPrice = () => {
    return (
      parseFloat(data?.hivePrice?.hive?.usd) * parseFloat(data?.tokenPrice?.result?.highestBid)
    ).toPrecision(6)
  }

  return (
    <>
      <Card
        className={classes.glassmorphismCard}
        mih={'100%'}
      >
        <Grid>
          <Grid.Col span={9}>
            <Text size={24} weight={500} c={'#ffffff'}>
              {name}
            </Text>
            <Text size={32} weight={800} c={'#ffffff'}>
              ${countPrice()}
            </Text>
            <Text size={16} weight={500} c={'#ffffff'}>
              {data?.tokenPrice?.result?.priceChangePercent}
            </Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Image src={image.src} />
          </Grid.Col>
        </Grid>
      </Card>
    </>
  )
}
