'use client'

import { logoutUser, useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { Center, Container, Grid, Group, Header, Image, Menu } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconLogout } from '@tabler/icons'
import Link from 'next/link'
import { useState } from 'react'
import oneuplogo from '../../images/oneup1.png'
import LoginButton from '../LoginButton/LoginButton'
import { UserButton } from '../UserButton/UserButton'
import useStyles from './style'

export function Navbar() {
  const { classes, theme } = useStyles()

  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)
  const userImage = useAuthorizationStore((state: { profile_image: string }) => state.profile_image)
  const userMana = useAuthorizationStore((state: { mana: number }) => state.mana)
  const userReputation = useAuthorizationStore((state: { reputation: number }) => state.reputation)
  const username = useAuthorizationStore((state: { username: string }) => state.username)
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)

  return (
    <Container fluid p={5} pb={25} bg={'#072f37'} sx={{ border: 0 }}>
      <Container size={'xl'}>
        <Header height={'100%'} bg={'#072f37'} sx={{ border: 0 }}>
          <Grid justify="space-between" align="center">
            <Grid.Col
              span={3}
              pl={20}
              sx={{ display: 'flex', justifyContent: 'left' }}
              className={classes.hiddenMobile}
            >
              <Center>
                <Group spacing={0}></Group>
              </Center>
            </Grid.Col>
            <Grid.Col span={isMd ? 9 : 6}>
              <Link href={''}>
                <Image src={oneuplogo.src} alt="Logo" fit="contain" />
              </Link>
            </Grid.Col>
            <Grid.Col span={3} pr={20} sx={{ display: 'flex', justifyContent: 'right' }}>
              <Group className={classes.hiddenMobile}>
                {authorized ? (
                  <Menu
                    width={260}
                    position="bottom-end"
                    transition="pop-top-right"
                    onClose={() => setUserMenuOpened(false)}
                    onOpen={() => setUserMenuOpened(true)}
                    classNames={classes}
                  >
                    <Menu.Target>
                      <UserButton
                        image={userImage}
                        name={username}
                        className={classes.hiddenMobileLogin}
                        mana={userMana}
                        reputation={userReputation}
                      />
                    </Menu.Target>
                    <Menu.Dropdown bg={'#072f37'} sx={{ borderColor: '#031418' }}>
                      <Menu.Item
                        className={classes.subLink}
                        onClick={() => logoutUser()}
                        icon={<IconLogout color={'white'} size={20} stroke={1.5} />}
                      >
                        Log out
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                ) : (
                  <LoginButton />
                )}
              </Group>
              {/* <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} /> */}
            </Grid.Col>
          </Grid>
        </Header>
      </Container>
    </Container>
  )
}
