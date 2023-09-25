import Axios from 'axios'

const apiHive = Axios.create({
  baseURL: 'https://api.hive.blog/',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

apiHive.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    console.error('Error', error)
  }
)

export default apiHive
