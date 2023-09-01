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


}))

export default useStyles
