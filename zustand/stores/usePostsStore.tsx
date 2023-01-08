import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PostsStoreState = {
  posts: [];
  nextUser: {
    author: string,
    link: string
  };
  recentUser: {
    author: string,
    link: string
  };
  setPosts: (post: []) => void;
  setNextUser: (user: {
    author: string,
    link: string
  }) => void;
  setRecentUser: (user: {
    author: string,
    link: string
  }) => void;
};

export const usePostsStore = create<PostsStoreState>()(immer((set) => ({
  posts: [],
  nextUser: {
    author: '',
    link: ''
  },
  recentUser: {
    author: '',
    link: ''
  },
  setPosts: (post) => {
    set((state) => {
      state.posts = post;
    });
  },
  setNextUser: (user) => {
    set((state) => {
      state.nextUser = user;
    });
  },
  setRecentUser: (user) => {
    set((state) => {
      state.recentUser = user;
    });
  },
})))

export const { setPosts, setNextUser, setRecentUser } = usePostsStore.getState();