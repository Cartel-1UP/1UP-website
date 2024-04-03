import Axios from 'axios'

const apiBeeSwap = Axios.create({
  baseURL: 'https://engine.beeswap.tools/',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

apiBeeSwap.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    console.error('Error', error)
  }
)

export default apiBeeSwap
