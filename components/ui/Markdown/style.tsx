'use client'

import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
    maxWidth: '100%',
    height: 'auto',
    width: 'auto',
  },

  tweet: {
    margin: '20px',
    marginBottom: '40px',
    maxHeight: '600px',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  centeredImage: {
    display: 'block',
    margin: '0 auto',
  },

  responsiveImage: {
    maxWidth: '100%',
    height: 'auto',
  },

  table: {
    // borderCollapse: 'collapse',
    // width: '100%',
    // marginTop: '20px'
    // Add any other table styles you want
  },
  tableHeader: {
    // Add styles for table headers if needed
  },
  tableCell: {
    // border: '1px solid #ddd',
    // padding: '8px',
    // Add any other styles for table cells
  },

  video: {
    // Define your styles for the video container
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
  },

  link: {
    color: '#228be6', // Example usage of a color from the theme
    textDecoration: 'none',
    '&:hover': {
      // color: theme.color.red,
      textDecoration: 'underline',
    },
  },

  blockquote: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing.xs,
    paddingLeft: theme.spacing.md,
    borderLeft: `4px solid ${theme.colors.blue[6]}`,
    backgroundColor: theme.colors.blue[0],
    borderRadius: theme.radius.sm,
    marginBottom: theme.spacing.md,
  },
  blockquoteIcon: {
    fontSize: 24,
    marginRight: theme.spacing.xs,
    color: theme.colors.blue[6],
  },
  blockquoteText: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    color: theme.colors.gray[7],
  },
  code: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[0],
    borderRadius: theme.radius.sm,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.md,
    width: '100%', // Set the width to 100% to prevent it from overflowing.
    overflowX: 'auto', // Add horizontal scrollbar if content overflows.
  },
  hr: {
    border: 0,
    borderTop: `1px solid ${theme.colors.gray[2]}`,
    margin: `${theme.spacing.md}px 0`,
  },
}))

export default useStyles
