import Axios from 'axios';

const api = Axios.create({
  baseURL: "https://oneup-pi.vercel.app/api",
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    console.error('Error', error);
  }
);

export default api;