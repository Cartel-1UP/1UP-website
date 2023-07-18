import Axios from 'axios';

const api = Axios.create({
  baseURL: "https://ha.smt-api.dtools.dev/"
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