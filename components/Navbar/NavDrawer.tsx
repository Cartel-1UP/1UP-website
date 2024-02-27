'use client'

import { comumnityData } from '@/data/communityData'
import { logoutUser } from '@/zustand/stores/useAuthorizationStore'
import {
  Avatar,
  Badge,
  Divider,
  Drawer,
  Group,
  Menu,
  NavLink,
  ScrollArea,
  Text,
} from '@mantine/core'
import { IconLogout, IconUsers } from '@tabler/icons'
import { useRouter } from 'next/navigation'
import LoginButton from '../LoginButton/LoginButton'
import { NavLinkSection } from './NavLinkSection'
import useStyles from './style'

type Props = {
  opened: boolean
  closeDrawer: () => void
  authorized: boolean
  userImage: string
  userReputation: number
  username: string
  navLinksMobile: any
}

export function NavDrawer({
  opened,
  closeDrawer,
  authorized,
  userImage,
  userReputation,
  username,
  navLinksMobile,
}: Props) {
  const { classes, theme } = useStyles()
  const router = useRouter()

  return (
    <Drawer
      styles={{
        closeButton: {
          '& svg': {
            width: 50,
            height: 50,
            color: '#f3f3f3',
          },
        },
      }}
      opened={opened}
      onClose={closeDrawer}
      size="100%"
      padding="md"
      zIndex={100000}
      className={classes.drawer}
    >
      <>
        {authorized && (
          <>
            <Group pl={10}>
              <Avatar src={userImage} radius="xl" />
              <div style={{ flex: 1 }}>
                <Text size="md" weight={400} color="#f3f3f3">
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
          </>
        )}
        <NavLinkSection navLinks={navLinksMobile} authorized={authorized} />
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
              },
            })}
          >
            {comumnityData.map((item) => (
              <NavLink
                className={classes.subLink}
                label={item.name}
                key={item.name}
                icon={<Avatar radius="xl" src={item.image} />}
                onClick={() => {
                  closeDrawer()
                  router.push(`/` + item.tag)
                }}
                disabled={item.tag === 'none'}
              />
            ))}
          </ScrollArea>
        </NavLink>
        <Menu.Divider />
        {authorized ? (
          <NavLink
            label="Log out"
            className={classes.subLink}
            icon={<IconLogout color={'white'} size={20} stroke={1.5} />}
            onClick={() => {
              closeDrawer(), logoutUser()
            }}
          />
        ) : (
          <LoginButton closeDrawer={closeDrawer} />
        )}
      </>
    </Drawer>
  )
}
