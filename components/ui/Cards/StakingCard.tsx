import { Card, Group, Image, Text } from '@mantine/core';
import useStyles from './style';

type Props = {
    title: string;
    liquidity: string;
    apr: string;
    timer: string;
    icon: any;
};

export default function StakingCard({ liquidity, title, icon, apr, timer }: Props) {
    const { classes } = useStyles();
    return (
        <>
            <Card className={classes.glassmorphismCard}>
                <Group>
                    <Image src={icon.src} maw={64} h={64} />
                    <Text c={'#fff'} ta="left" fz={28} fw={500}>
                        {title}
                    </Text>
                </Group>
                <Card mt={20} className={classes.glassmorphismCard}>
                    <Text c={'#fff'} ta="left" fz={22} fw={400}>
                        Liquidity {liquidity}
                    </Text>
                    <Text c={'#fff'} ta="left" fz={32} fw={700}>
                        APR {apr}%
                    </Text>
                    <Text c={'#fff'} ta="left" fz={18} fw={400}>
                        Next rewards in {timer}
                    </Text>
                </Card>
            </Card>
        </>
    );
}


