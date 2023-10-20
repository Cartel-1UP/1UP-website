'use client'

import { comumnityData } from '@/data/communityData'
import { logoutUser, useAuthorizationStore } from '@/zustand/stores/useAuthorizationStore'
import { Avatar, Badge, Burger, Center, Container, Divider, Drawer, Grid, Group, Header, Image, Menu, NavLink, ScrollArea, Text } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconBookmark, IconExchange, IconLogout, IconPhoto, IconUser, IconUsers } from '@tabler/icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import oneuplogo from '../../images/oneup1.png'
import LoginButton from '../LoginButton/LoginButton'
import { UserButton } from '../UserButton/UserButton'
import useStyles from './style'

export function Navbar() {
  const { classes, theme } = useStyles()
  const router = useRouter();

  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const authorized = useAuthorizationStore((state: { authorized: boolean }) => state.authorized)
  const userImage = useAuthorizationStore((state: { profile_image: string }) => state.profile_image)
  const userMana = useAuthorizationStore((state: { mana: number }) => state.mana)
  const userReputation = useAuthorizationStore((state: { reputation: number }) => state.reputation)
  const username = useAuthorizationStore((state: { username: string }) => state.username)
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)


  const [opened, { open, close }] = useDisclosure(false);


  return (
    <div className={classes.mobileStickyHeader}>
      <Container fluid sx={{ padding: isMd ? 0 : 5, paddingBottom: isMd ? 0 : 25, }} bg={'#072f37'} className={classes.navbar}>
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
                  <Group>
                    <div>
                      <NavLink
                        label="Swap"
                        className={classes.subLink}
                        onClick={() => {
                          close()
                          window.open(`https://swap.oneup-cartel.com/`, '_blank')
                        }}
                      />
                    </div>
                    <div>
                      <NavLink
                        label="Resources"
                        className={classes.subLink}
                        onClick={() => {
                          close()
                          router.push('/resources')
                        }}
                      />
                    </div>
                  </Group>
                </Center>
              </Grid.Col>
              <Grid.Col span={isMd ? 8 : 6}>
                {isMd ?
                  <Image src={oneuplogo.src} alt="Logo" fit="contain" onClick={() => router.push('/')} sx={{ cursor: 'pointer' }} /> :
                  <Link href="/">
                    <Image src={oneuplogo.src} alt="Logo" fit="contain" />
                  </Link>
                }
              </Grid.Col>
              <Grid.Col span={isMd ? 4 : 3} pr={20} sx={{ display: 'flex', justifyContent: 'right' }}>
                <Group className={classes.hiddenMobileLogin}>
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
                          mana={userMana}
                          reputation={userReputation}
                        />
                      </Menu.Target>
                      <Menu.Dropdown bg={'#072f37'} sx={{ borderColor: '#031418' }}>
                        <Menu.Item
                          className={classes.subLink}
                          onClick={() => window.open(`https://www.peakd.com/@${username}`, '_blank')}
                          icon={<IconUser
                            color={'white'} size={20} stroke={1.5} />}
                        >
                          Profile
                        </Menu.Item>
                        <Menu.Item
                          className={classes.subLink}
                          onClick={() => router.push('/bookmarks')}
                          icon={<IconBookmark
                            color={'white'} size={20} stroke={1.5} />}
                        >
                          Bookmarks
                        </Menu.Item>
                        <Menu.Divider />
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
                <Burger opened={opened} onClick={open} className={classes.hiddenDesktop} color={'#E9ECEF'} />
              </Grid.Col>
            </Grid>
          </Header>
        </Container>
        <Drawer
          styles={{
            closeButton: {
              '& svg': {
                width: 50,
                height: 50,
                color: '#E9ECEF'
              }
            }
          }}
          opened={opened}
          onClose={close}
          size="100%"
          padding="md"
          zIndex={1000000}
          className={classes.drawer}
        >
          {authorized ? (
            <>
              <Group>
                <Avatar src={userImage} radius="xl" />
                <div style={{ flex: 1 }}>
                  <Text size="md" weight={400} color="#E9ECEF">
                    {username}{' '}
                    <Badge
                      sx={(theme) => ({ padding: 5 })}
                      ml={5}
                      radius="sm"
                      color="gray"
                      variant="outline"
                    >
                      {userReputation.toFixed()}
                    </Badge>
                  </Text>
                </div>
              </Group>
              <Divider mt={20} mb={10} />
              <NavLink
                label="Profile"
                className={classes.subLink}
                icon={<IconUser color={'white'} size={20} stroke={1.5} />}
                onClick={() => {
                  close()
                  window.open(`https://www.peakd.com/@${username}`, '_blank')

                }}
              />
              <NavLink
                label="Bookmarks"
                className={classes.subLink}
                icon={<IconBookmark color={'white'} size={20} stroke={1.5} />}
                onClick={() => {
                  close()
                  router.push('/bookmarks')

                }}
              />
              <NavLink
                label="Swap"
                className={classes.subLink}
                icon={<IconExchange color={'white'} size={20} stroke={1.5} />}
                onClick={() => {
                  close()
                  window.open(`https://swap.oneup-cartel.com/`, '_blank')

                }}
              />
              <NavLink
                label="Swap"
                className={classes.subLink}
                icon={<IconPhoto color={'white'} size={20} stroke={1.5} />}
                onClick={() => {
                  close()
                  router.push('/resources')
                }}
              />
              <Menu.Divider />
              <NavLink
                className={classes.subLink}
                label="Partners"
                childrenOffset={28}
                icon={<IconUsers color={'white'} size={20} stroke={1.5} />}
              >
                <ScrollArea
                  h={250}
                  styles={(theme) => ({
                    scrollbar: {
                      '&:hover': {
                        background: '#06272e',
                      },
                    }
                  })}>
                  {comumnityData.map((item) => (
                    <NavLink
                      className={classes.subLink}
                      label={item.name}
                      key={item.name}
                      icon={<Avatar radius="xl" src={item.image} />}
                      onClick={() => {
                        close()
                        router.push('community/' + item.tag)
                      }
                      }
                      disabled={item.tag === 'none'}

                    />
                  ))}
                </ScrollArea>
              </NavLink>
              <Menu.Divider />
              <NavLink
                label="Log out"
                className={classes.subLink}
                icon={<IconLogout color={'white'} size={20} stroke={1.5} />}
                onClick={() => { close(), logoutUser() }}
              />
            </>
          ) : (
            <LoginButton />
          )}
        </Drawer>
      </Container>
    </div>
  )
}
