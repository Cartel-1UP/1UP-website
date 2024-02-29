'use client'

import { Button, NavLink, Text } from '@mantine/core'
import React from 'react'
import useStyles from './style'

type Props = {
  navLinks: {
    label: string
    icon?: React.ReactNode
    loggedIn?: boolean
    handleAction: () => void
    closeDrawer?: () => void
  }[]
  authorized?: boolean
}

export function NavLinkSection({ navLinks, authorized }: Props) {
  const { classes, theme } = useStyles()

  return (
    <>
      {authorized
        ? navLinks.map((link) => (
          <div key={link.label}>
            <NavLink
              icon={link.icon}
              label={link.label}
              className={classes.subLink}
              onClick={() => {
                link.handleAction()
                link.closeDrawer && link.closeDrawer()
              }}
            />
          </div>
        ))
        : navLinks.map(
          (link) =>
            !link.loggedIn && (
              <div key={link.label}>
                <Button

                  leftIcon={link.icon}
                  variant="subtle"
                  className={classes.subLink}
                  onClick={() => {
                    link.handleAction()
                    link.closeDrawer && link.closeDrawer()
                  }}
                >
                  <Text
                    c={'#fff'}
                    sx={{
                      fontFamily: 'Segoe UI',
                    }}

                    fz={16}
                    fw={400}
                  >{link.label}</Text>
                </Button>
              </div>
            )
        )}
    </>
  )
}
