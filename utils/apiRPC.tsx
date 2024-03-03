import Axios from 'axios'

const apiRPC = Axios.create({
  baseURL: 'https://enginerpc.com/',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

apiRPC.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    console.error('Error', error)
  }
)

export default apiRPC
