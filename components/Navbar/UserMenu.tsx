'use client'

import { comumnityData } from '@/data/communityData'
import { logoutUser } from '@/zustand/stores/useAuthorizationStore'
import { Avatar, Menu, NavLink, ScrollArea } from '@mantine/core'
import {
  IconBookmark,
  IconChevronDown,
  IconChevronUp,
  IconLogout,
  IconUser,
  IconUsers,
} from '@tabler/icons'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { UserButton } from '../UserButton/UserButton'
import useStyles from './style'

type Props = {
  userImage: string
  username: string
  userReputation: number
  setUserMenuOpened: Dispatch<SetStateAction<boolean>>
}

export function UserMenu({ userImage, username, userReputation, setUserMenuOpened }: Props) {
  const { classes, theme } = useStyles()
  const router = useRouter()
  const [showCommunityMenu, setShowCommunityMenu] = useState(false)

  return (
    <>
      <Menu
        width={260}
        position="bottom-end"
        transition="pop-top-right"
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        classNames={classes}
      >
        <Menu.Target>
          <UserButton image={userImage} name={username} reputation={userReputation} />
        </Menu.Target>
        <Menu.Dropdown bg={'#072f37'} sx={{ borderColor: '#031418' }}>
          <Menu.Item
            className={classes.subLink}
            onClick={() => window.open(`https://www.peakd.com/@${username}`, '_blank')}
            icon={<IconUser color={'white'} size={20} stroke={1.5} />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            className={classes.subLink}
            onClick={() => router.push('/bookmarks')}
            icon={<IconBookmark color={'white'} size={20} stroke={1.5} />}
          >
            Bookmarks
          </Menu.Item>
          <Menu.Divider />
          <NavLink
            label="Communities"
            className={classes.subLink}
            onClick={(e) => {
              setShowCommunityMenu(!showCommunityMenu)
            }}
            icon={<IconUsers color={'white'} size={20} stroke={1.5} />}
            rightSection={
              !showCommunityMenu ? (
                <IconChevronDown size={20} stroke={1.5} />
              ) : (
                <IconChevronUp size={20} stroke={1.5} />
              )
            }
          />
          {showCommunityMenu && (
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
                    router.push(`/community/` + item.tag)
                  }}
                  disabled={item.tag === 'none'}
                />
              ))}
            </ScrollArea>
          )}

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
    </>
  )
}
