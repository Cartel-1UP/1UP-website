
import { Card, Grid, Image, Text } from "@mantine/core";
import useStyles from "./style";

type Props = {
    name: string,
    price: number,
    change: string,
    image: any
}

export default function CoinCard({ name, price, change, image }: Props) {
    const { classes, theme } = useStyles();

    //   const { data: statsScrapData, isLoading: isStatsScrapDataLoading } = useQuery(
    //     "statsData",
    //     getStatsData,
    //     {
    //       refetchInterval: 300000,
    //     }
    //   );

    return (
        <>
            <Card bg={'linear-gradient(#2ecde6 -100%, #162947 80%)'} className={classes.card} mih={'100%'}>

                <Grid>
                    <Grid.Col span={9}>
                        <Text size={24} weight={500} c={'#ffffff'}>
                            {name}
                        </Text>
                        <Text size={32} weight={800} c={'#ffffff'}>
                            ${price}
                        </Text>
                        <Text size={16} weight={500} c={'#ffffff'}>
                            {change}%
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Image src={image.src} />
                    </Grid.Col>
                </Grid>
            </Card>
        </>
    );
}