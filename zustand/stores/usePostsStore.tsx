import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PostsStoreState = {
  posts: [];
  lastUser: {
    author: string,
    link: string
  };
  setPosts: (post: []) => void;
  setLastUser: (user: {
    author: string,
    link: string
  }) => void;
};

export const usePostsStore = create<PostsStoreState>()(immer((set) => ({
  posts: [],
  lastUser: {
    author: '',
    link: ''
  },
  setPosts: (post) => {
    set((state) => {
      state.posts = post;
    });
  },
  setLastUser: (user) => {
    set((state) => {
      state.lastUser = user;
    });
  },
})))

export const { setPosts, setLastUser } = usePostsStore.getState();