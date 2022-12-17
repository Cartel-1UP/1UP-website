import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type AuthorizationStoreState = {
  authorized: boolean;
  username: string;
  logoutUser: () => void;
  setUsername: (name: string) => void;
  setAuthorized: (flag: boolean) => void;
};

export const useAuthorizationStore = create<AuthorizationStoreState>()(immer((set) => ({
  username: '',
  authorized: false,
  logoutUser: () => {
    set((state) => {
      state.authorized = false;
    });
  },
  setUsername: (name) => {
    set((state) => {
      state.username = name;
    });
  },
  setAuthorized: (flag) => {
    set((state) => {
      state.authorized = flag;
    });
  },
})))

export const { logoutUser, setUsername, setAuthorized } = useAuthorizationStore.getState();