import create from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PostsStoreState = {
  posts: [];
  latestPosts: [];
  nextUser: {
    author: string,
    link: string
  };
  recentUser: {
    author: string,
    link: string
  };
  setPosts: (post: []) => void;
  setLatestPosts: (post: []) => void;
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
  latestPosts: [],
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
  setLatestPosts: (post) => {
    set((state) => {
      state.latestPosts = post;
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

export const { setPosts, setLatestPosts, setNextUser, setRecentUser } = usePostsStore.getState();