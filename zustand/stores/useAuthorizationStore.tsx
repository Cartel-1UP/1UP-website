import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type AuthorizationStoreState = {
  authorized: boolean;
  currentUserName: string;
  logoutUser: () => void;
  setCurrentUserName: (name: string) => void;
  setAuthorized: (flag: boolean) => void;
};

const useAuthorizationStore = create<AuthorizationStoreState>()(immer((set) => ({
  currentUserName: '',
  authorized: false,
  logoutUser: () => {
    set((state) => {
      state.authorized = false;
    });
  },
  setCurrentUserName: (name) => {
    set((state) => {
      state.currentUserName = name;
    });
  },
  setAuthorized: (flag) => {
    set((state) => {
      state.authorized = flag;
    });
  },
})))

export const { logoutUser, setCurrentUserName, setAuthorized } = useAuthorizationStore.getState();