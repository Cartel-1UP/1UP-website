'use client'

import useSettings from '@/utils/methods/useSettings'
import { useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { Burger, Center, Container, Grid, Group, Header, Image } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBookmark, IconExchange, IconPhoto, IconUser } from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import oneuplogo from '../../images/oneup1.png'
import LoginButton from '../ui/LoginButton/LoginButton'
import { NavDrawer } from './NavDrawer'
import { NavLinkSection } from './NavLinkSection'
import { UserMenu } from './UserMenu'
import useStyles from './style'

export function Navbar() {
  const { classes, theme } = useStyles()
  const { ...settings } = useSettings();
  const router = useRouter()


  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)
  const userImage = useAuthorizationStore((state: { profile_image: string }) => state.profile_image)
  const userReputation = useAuthorizationStore((state: { reputation: number }) => state.reputation)
  const username = useAuthorizationStore((state: { username: string }) => state.username)

  const [userMenuOpened, setUserMenuOpened] = useState(false)
  const [opened, { open, close: closeDrawer }] = useDisclosure(false)

  const navLinks = [
    {
      label: 'Community',
      handleAction: () => {
        router.push('/blog')
      },
    },
    {
      label: 'Swap',
      handleAction: () => {
        window.open(`https://swap.oneup-cartel.com/`, '_blank')
      },
    },
    {
      label: 'Resources',
      handleAction: () => {
        router.push('/resources')
      },
    },
  ]

  const navLinksMobile = [
    {
      label: 'Profile',
      icon: <IconUser color={'white'} size={20} stroke={1.5} />,
      loggedIn: true,
      handleAction: () => {
        closeDrawer()
        window.open(`https://www.peakd.com/@${username}`, '_blank')
      },
    },
    {
      label: 'Bookmarks',
      icon: <IconBookmark color={'white'} size={20} stroke={1.5} />,
      loggedIn: true,
      handleAction: () => {
        closeDrawer()
        router.push('/bookmarks')
      },
    },
    {
      label: 'Swap',
      icon: <IconExchange color={'white'} size={20} stroke={1.5} />,
      handleAction: () => {
        closeDrawer()
        window.open(`https://swap.oneup-cartel.com/`, '_blank')
      },
    },
    {
      label: 'Resources',
      icon: <IconPhoto color={'white'} size={20} stroke={1.5} />,
      handleAction: () => {
        closeDrawer()
        router.push('/resources')
      },
    },
  ]

  return (
    <div className={classes.header}>
      <Container fluid bg={'#072f37'} className={classes.navbar}>
        <Container size={'xl'}>
          <Header height={'100%'} bg={'#072f37'} sx={{ border: 0 }}>
            <Grid align="left">
              <Grid.Col span={settings.isMd ? 8 : 3}>
                {settings.isMd ? (
                  <Image
                    src={oneuplogo.src}
                    alt="Logo"
                    fit="contain"
                    onClick={() => router.push('/')}
                    sx={{ cursor: 'pointer' }}
                  />
                ) : (
                  <Link href="/">
                    <Image src={oneuplogo.src} alt="Logo" fit="contain" />
                  </Link>
                )}
              </Grid.Col>
              <Grid.Col
                span={7}
                pl={20}
                className={classes.hiddenMd}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Center>
                  <Group>
                    <NavLinkSection navLinks={navLinks} />
                  </Group>
                </Center>
              </Grid.Col>

              <Grid.Col
                span={settings.isMd ? 4 : 2}
                pr={20}
                sx={{ display: 'flex', justifyContent: 'right' }}
              >
                <Group className={classes.hiddenSm}>
                  {authorized ? (
                    <UserMenu
                      userImage={userImage}
                      username={username}
                      userReputation={userReputation}
                      setUserMenuOpened={setUserMenuOpened}
                    />
                  ) : (
                    <LoginButton />
                  )}
                </Group>
                <Burger
                  opened={opened}
                  onClick={open}
                  className={classes.hiddenDesktop}
                  color={'#f3f3f3'}
                />
              </Grid.Col>
            </Grid>
          </Header>
        </Container>
        <NavDrawer
          opened={opened}
          closeDrawer={closeDrawer}
          authorized={authorized}
          userImage={userImage}
          userReputation={userReputation}
          username={username}
          navLinksMobile={navLinksMobile}
        />
      </Container>
    </div>
  )
}
