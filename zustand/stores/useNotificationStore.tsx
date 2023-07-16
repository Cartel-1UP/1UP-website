import create from 'zustand';
import { immer } from 'zustand/middleware/immer';


type Snackbar = {
  id: string;
  title: string;
  message: string;
  queryKey?: string;
};

type NotificationStoreState = {
  snackbars: Snackbar[];
  addSnackbar: (snackbar: Snackbar) => void;
  removeSnackbar: (id: string) => void;
};

export const useNotifiactionStore = create<NotificationStoreState>()(immer((set) => ({
  snackbars: [],
  addSnackbar: (snackbar) =>
    set((state) => ({ snackbars: [...state.snackbars, snackbar] })),
  removeSnackbar: (id) =>
    set((state) => ({
      snackbars: state.snackbars.filter((snackbar) => snackbar.id !== id),
    })),
})))