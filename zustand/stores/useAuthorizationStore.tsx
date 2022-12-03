import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from '../immerMiddleware';

type AuthorizationStoreState = {
  authorized: boolean;
  currentUserName: string;
  logoutUser: () => void;
  setCurrentUserName: (name: string) => void;
  setAuthorized: (flag: boolean) => void;
};
export const useAuthorizationStore = create<AuthorizationStoreState>(
  devtools(
    immer((set) => ({
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
    }))
  )
);

export const { logoutUser, setCurrentUserName, setAuthorized } = useAuthorizationStore.getState();