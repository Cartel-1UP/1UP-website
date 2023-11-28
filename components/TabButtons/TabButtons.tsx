import { Tabs } from '@/enums/blog.enum'
import { Button } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useState } from 'react'
import useStyles from '../Admin/style'

type Props = {
  authorized: boolean
  defaultTab: Tabs
  isCommunity?: boolean
  onChange: (tab: Tabs) => void
}

const TabButtons = ({ authorized, defaultTab, isCommunity, onChange }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const { classes, theme } = useStyles()
  const isMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`)

  const handleTabClick = (tab: Tabs) => {
    setActiveTab(tab)
    if (onChange) {
      onChange(tab)
    }
  }

  const tabEntries = Object.entries(Tabs) as [keyof typeof Tabs, Tabs][]

  return (
    <>
      {tabEntries.map(
        ([tabKey, tabValue]) =>
          (!isCommunity || tabValue !== Tabs.Following) &&
          (authorized || tabValue !== Tabs.Following) && (
            <Button
              m={isMd ? 1 : 2}
              size={isMd ? 'xs' : 'sm'}
              key={tabKey}
              variant="subtle"
              sx={{
                color: '#072f37',
                backgroundColor: activeTab === tabValue ? '#072f371A' : 'default',
                '&:hover': {
                  color: '#072f37',
                  backgroundColor: '#072f371A',
                },
              }}
              onClick={() => handleTabClick(tabValue)}
            >
              {tabKey}
            </Button>
          )
      )}
    </>
  )
}

export default TabButtons
