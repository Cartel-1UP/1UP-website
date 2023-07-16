import { createStyles } from '@mantine/styles'

const useStyles = createStyles((theme) => ({
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0',
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


}))

export default useStyles
