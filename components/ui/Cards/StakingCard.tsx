import { useGetTokenPrice } from '@/actions/hive/get-token-price';
import { Pool } from '@/types/pool.type';
import useSettings from '@/utils/methods/useSettings';
import { Card, Grid, Group, Image, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import useStyles from './style';



export default function StakingCard({ tokenPair, baseQuantity, quoteQuantity, basePrice, quotePrice }: Pool) {

    const { ...settings } = useSettings()
    const { classes } = useStyles();
    const queryCache = useQueryClient()
    const name = tokenPair?.split(':')[0]
    const secondName = tokenPair?.split(':')[1]
    const { data: firstTokenData } = useGetTokenPrice(name, queryCache.getQueryData('hivePrice') as string)
    const { data: secondTokenData } = useGetTokenPrice(secondName, queryCache.getQueryData('hivePrice') as string)

    const countPrice = () => {
        const price1 = parseFloat(firstTokenData?.hivePrice?.hive?.usd) * parseFloat(firstTokenData?.tokenPrice?.result?.highestBid || 1) * parseFloat(baseQuantity);
        const price2 = parseFloat(secondTokenData?.hivePrice?.hive?.usd) * parseFloat(secondTokenData?.tokenPrice?.result?.highestBid || 1) * parseFloat(quoteQuantity);
        const totalPrice = price1 + price2;
        return totalPrice
    }

    const [initialImage, setInitialImage] = useState('')


    useEffect(() => {
        switch (tokenPair) {
            case 'ONEUP:SPT':
                setInitialImage('https://images.hive.blog/p/C3TZR1g81UNaPs7vzNXHueW5ZM76DSHWEY7onmfLxcK2iQT28NdpY9XxR2pRhs5LbShvGpSZKYhgyqss7Pj7hWDuevAKgoDTHqPgaymWN5bwTCAWsQYHxpv?format=match&mode=fit')
                break;
            case 'PIZZA:ONEUP':
                setInitialImage('https://images.hive.blog/p/2bP4pJr4wVimqCWjYimXJe2cnCgnCPhvuAKsuu5ynaS?format=match&mode=fit')
                break;
            case 'STELLARUM:ONEUP':
                setInitialImage('https://images.hive.blog/p/W5LtFUPm6g74mmh3bgTnk3HLNLHQwtSHtgdF7nFNMwCsaFhLmYKwfednuwX4hiRmWy91z7TxYXcGn6pozvXz1vJhbhoTT66uBY4cqKD7fhW5Cv3DT1RiybYjTaawomH4aMma6aUWKmEvMM2gNhNo97dZH4bc9?format=match&mode=fit')
                break;
            case 'SWAP.HIVE:ONEUP':
                setInitialImage('https://images.hive.blog/p/4PYjjVwJ1UdtC5FGc4dbeF1E4FitPfBjR7UqkAYqBLuRR1wQLaLaSR6TWWXn1z5NTyqnENDBgHLxbXabw2wZXiwUBo1pnCcnjJK7AUJYAK8?format=match&mode=fit')
                break;
            case 'ONEUP:LEO':
                setInitialImage('https://images.hive.blog/p/2xVmzkbNCvpx19L9UqTZsdqHJfcuQ2roufW6e9YqaSbcnxRiwVL9a18RK39MciwCLLirx8zqbXFvc5RVYSXR4DnifaYM9Xw2QkUHo7d5j8SbNKiPnxw5KhYKCJZaWNAbWZ3xG2vg2uSee9rSbWB3sfqK1RdXjhZMi8w1TvN9cCWSvGcn3v1gSmmVoQDGMBcF3bp32Yyt?format=match&mode=fit')
                break;
        }
    }, [tokenPair])


    return (
        <>
            <Card className={classes.glassmorphismCard}>
                <Group>
                    <Text c={'#fff'} ta="left" fz={28} fw={500}>
                        <Group spacing={15}>
                            <Image
                                src={initialImage}
                                width={'2.5rem'}
                                height={'2.5rem'}
                                fit="contain"
                            />
                            {tokenPair}
                        </Group>
                    </Text>
                </Group>
                <Card mt={20} className={classes.glassmorphismCard}>
                    <Grid>
                        <Grid.Col span={settings.isSm ? 6 : 4}>
                            <Text c={'#fff'} ta="left" fz={18} fw={400}>
                                Liquidity
                            </Text>
                            <Text c={'#fff'} ta="left" fz={22} fw={400}>
                                <Group
                                    spacing={5}
                                >
                                    {(countPrice() / firstTokenData?.hivePrice?.hive?.usd).toFixed(2)}
                                    <Image
                                        src={'https://images.hive.blog/p/4PYjjVwJ1UdtC5FGc4dbeF1E4FitPfBjR7UqkAYqBLuRR1wQLaLaSR6TWWXn1z5NTyqnENDBgHLxbXabw2wZXiwUBo1pnCcnjJK7AUJYAK8?format=match&mode=fit'}
                                        width={'25px'}
                                        height={'25px'}
                                        fit="contain"
                                    />
                                </Group>

                                <Text c={'#fff'} ta="left" fz={18} fw={400}>
                                    worth ${countPrice().toFixed(2)}
                                </Text>
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={settings.isSm ? 6 : 4}>
                            <Text c={'#fff'} ta="left" fz={18} fw={400}>

                                {tokenPair?.split(':')[0]} price
                            </Text>
                            <Text c={'#fff'} ta="left" fz={22} fw={400}>
                                {parseFloat(basePrice as string).toFixed(5)}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={settings.isSm ? 6 : 4}>
                            <Text c={'#fff'} ta="left" fz={18} fw={400}>
                                {tokenPair?.split(':')[1]} price
                            </Text>
                            <Text c={'#fff'} ta="left" fz={22} fw={400}>
                                {parseFloat(quotePrice as string).toFixed(5)}
                            </Text>
                        </Grid.Col>
                    </Grid>


                </Card>
            </Card >
        </>
    );
}


