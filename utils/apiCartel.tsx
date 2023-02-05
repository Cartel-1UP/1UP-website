import Axios from 'axios';
import { logoutUser } from '../zustand/stores/useAuthorizationStore';

const api = Axios.create({
  baseURL: "https://ha.smt-api.dtools.dev/"
});

api.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    console.error('Error', error);
    switch (error.response.status) {
      case 401:
        console.error('401');
        logoutUser();
        break;
      case 403:
        console.error('Brak uprawnien');
        window.history.pushState('', 'Brak uprawnień', '/');
        logoutUser();
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default api;