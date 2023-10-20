import Axios from 'axios'

const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_KEY,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

api.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    console.error('Error', error)
  }
)

export default api
