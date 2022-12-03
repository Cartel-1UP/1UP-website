import produce from 'immer';
import { State, StateCreator } from 'zustand';

export const immer =
  <T extends State>(config: StateCreator<T, (fn: (draft: T) => void) => void>): StateCreator<T> =>
  (set, get, api) => {
    return config((fn) => set(produce(fn as any) as (state: T) => T), get, api);
  };