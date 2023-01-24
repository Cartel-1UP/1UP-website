'use client'

import {
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Grid,
  Group,
  Header,
  HoverCard,
  Image,
  Menu, ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconArticle, IconChevronDown, IconLogout, IconUserCircle, IconWallet } from '@tabler/icons'
import { useState } from 'react'
import useStyles from '.'
import { logoutUser, useAuthorizationStore } from '../../zustand/stores/useAuthorizationStore'
import LoginButton from '../LoginButton/LoginButton'
import { ToggleColor } from '../ToggleColor/ToggleColor'
import { UserButton } from '../UserButton/UserButton'
import { mockdata } from './data'

import oneuplogo from '../../images/oneup1.png'


export function WebHeader() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false)
  const { classes, theme } = useStyles()
  const authorized = useAuthorizationStore((state: { authorized: boolean; }) => state.authorized)
  const userImage = useAuthorizationStore((state: { profile_image: string; }) => state.profile_image)
  const username = useAuthorizationStore((state: { username: string; }) => state.username)

  
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  
  const links = mockdata.map((item, index) => (
    <UnstyledButton className={classes.subLink} key={index}>
      <Group noWrap align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={'#06272e'} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500} sx={{color: 'white' }}>
            {item.title}
          </Text>
          <Text size="xs" color="white">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ))

  return (
    <Box pb={0}>
      <Header height={75} pl="xl" pr="xl" className={classes.header}>
        {/* <Group position="apart" sx={{ height: '100%' }}> */}
        <Grid justify="space-between" align="center"> 
        <Grid.Col span={3} pl={20} sx={{display:'flex', justifyContent:'left'}}>
        <Center>
          <Group spacing={0} className={classes.hiddenMobile}>
            <a href="/news" className={classes.link}>
              News
            </a>
            <a href="/posts" className={classes.link}>
              Posts
            </a>
            <a href="/proposals" className={classes.link}>
              Proposals
            </a>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      More
                    </Box>
                    <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown sx={{ overflow: 'hidden' }} className={classes.dropdownBody}>
                <Group position="apart" mx="-md" my="-md" sx={{backgroundColor: '#06272e'}}>
                  <Text weight={500} sx={{ color: 'white'}} m={"md"}>More</Text>
                </Group>

                <Divider
                  my="md"
                  mx="-md"
                  color={theme.colorScheme === 'dark' ? '#031418' : '#031418'}
                />

                <SimpleGrid cols={2} spacing={0} sx={{ color: 'white' }}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group position="apart">
                    <div>
                      <Text weight={500} size="sm" sx={{ color: 'white' }}>
                        Get contact
                      </Text>
                      <Text size="xs" color="dimmed" sx={{ color: 'white' }}>
                        Come and contact with us if you have new ideas
                      </Text>
                    </div>
                    <Button variant="default">Get contact</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>
          </Group>
        </Center>
        </Grid.Col>
        <Grid.Col span={6}>
        <Center>
          <Image
               src={oneuplogo.src}
               alt="Logo"
               width={540}
               height={100}
               />
        </Center>
        </Grid.Col>
        <Grid.Col span={3} pr={20} sx={{display:'flex', justifyContent:'right'}}>
        
          <Group className={classes.hiddenMobile} >
            {authorized ? 
              <Menu 
              width={260}
              position="bottom-end"
              transition="pop-top-right"
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              classNames = {classes}
              >
              <Menu.Target>
                <UserButton
                      image={userImage}
                      name={username}
                      className={classes.hiddenMobileLogin} 
                      email={''}                />
              </Menu.Target>
              <Menu.Dropdown sx={{backgroundColor: '#072f37', borderColor: '#031418'}}  >
              <Menu.Item   sx={{color: 'white'}} className={classes.subLink}  icon={<IconUserCircle size={20} color={'white'} stroke={1.5} />}>
                Profile
              </Menu.Item>
              <Menu.Item   sx={{color: 'white'}} className={classes.subLink} icon={<IconArticle size={20} color={'white'} stroke={1.5} />}>
                My blog
              </Menu.Item>
              <Menu.Item  sx={{color: 'white'}} className={classes.subLink} icon={<IconWallet size={20} color={'white'} stroke={1.5} />}>
                Wallet
              </Menu.Item>
              <Menu.Divider color={theme.colorScheme === 'dark' ? '#031418' : '#031418'}/>
              <Menu.Item className={classes.subLink} sx={{color: 'white'}} onClick={() => logoutUser()}  icon={<IconLogout color={'white'} size={20} stroke={1.5} />}>
                Log out
              </Menu.Item>
            </Menu.Dropdown>
            </Menu> :
            <LoginButton/>
            }
            <ToggleColor/>
          </Group>
        </Grid.Col>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
          </Grid>
        {/* </Group> */}
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea sx={{ height: 'calc(100vh - 60px)' }} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <a href="/news" className={classes.link}>
            News
          </a>
          <a href="/posts" className={classes.link}>
            Posts
          </a>
          <a href="/proposals" className={classes.link}>
            Proposals
          </a>

          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                More
              </Box>
              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  )
}
