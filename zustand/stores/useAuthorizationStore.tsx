import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type AuthorizationStoreState = {
  authorized: boolean;
  username: string;
  balance: string;
  hbd_balance: string;
  profile_image: string;
  reputation: number;
  mana: number;
  logoutUser: () => void;
  setUsername: (name: string) => void;
  setAuthorized: (flag: boolean) => void;
  setBalance: (bal: string) => void;
  setHBDBalance: (bal: string) => void;
  setProfileImage: (src: string) => void;
  setReputation: (rep: number) => void;
  setMana: (mana: number) => void;
};

export const useAuthorizationStore = create<AuthorizationStoreState>()(immer((set) => ({
  username: '',
  authorized: false,
  balance: '',
  hbd_balance: '',
  profile_image: '',
  reputation: 0,
  mana: 0,
  logoutUser: () => {
    set((state) => {
      state.authorized = false;
    });
    localStorage.removeItem('username') 
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
  setBalance: (bal) => {
    set((state) => {
      state.balance = bal;
    });
  },
  setHBDBalance: (bal) => {
    set((state) => {
      state.hbd_balance = bal;
    });
  },
  setProfileImage: (src) => {
    set((state) => {
      state.profile_image = src;
    });
  },
  setReputation: (rep) => {
    set((state) => {
      state.reputation = rep;
    });
  },
  setMana: (mana) => {
    set((state) => {
      state.mana = mana;
    });
  },
})))

export const { logoutUser, setUsername, setAuthorized, setBalance, setHBDBalance,  setProfileImage, setReputation, setMana} = useAuthorizationStore.getState();