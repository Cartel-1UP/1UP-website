'use client'

import { NavLink } from '@mantine/core'
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
      {navLinks.map(
        (link) =>
          !link.loggedIn && (
            <div key={link.label}>
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
            </div>
          )
      )}
    </>
  )
}
