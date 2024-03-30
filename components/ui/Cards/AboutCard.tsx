import useSettings from '@/utils/methods/useSettings';
import { Card, Center, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import useStyles from './style';

type Props = {
  title: string;
  description: string;
  icon: any;
};

export default function AboutCard({ title, description, icon }: Props) {
  const { classes } = useStyles();
  const { ...settings } = useSettings();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Card
        className={classes.glassmorphismCard}
        mih={'100%'}
        h={settings.isMd ? 240 : 350}
        pt={settings.isMd ? 10 : 20}
        pb={settings.isMd ? 10 : 25}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: 'transform 0.4s ',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        <Center style={{ height: '100%' }}>
          <Stack
            align="center"
            justify="center"
            style={{ height: '100%' }}
          >
            {isHovered ? null : icon}
            <Text
              ta="center"
              fz={settings.isMd ? 24 : 32}
              fw={600}
              c={'#fff'}
              style={{
                textAlign: 'center',
                fontSize: isHovered ? (settings.isMd ? 16 : 24) : (settings.isMd ? 24 : 32),
              }}
            >
              {isHovered ? description : title}
            </Text>
          </Stack>
        </Center>
      </Card>
    </>
  );
}
