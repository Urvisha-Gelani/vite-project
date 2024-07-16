/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { PostType, userType } from "../interface/interface";
import axios from "axios";
import { apiUrl } from "../common/common";

interface appStoreType {
  loading: boolean;
  users: userType | userType[];
  user: userType;
  getUsers: () => Promise<void>;
  posts: PostType | PostType[];
  getPosts: (url: string) => Promise<void>;
  getUser: (id: number) => Promise<void>;
  post: PostType;
  getPost: (id: number) => Promise<void>;
  createPost: (url: string, values: PostType) => Promise<void>;
}
const savePostsToLocalStorage = (posts: any) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

const loadPostsFromLocalStorage = () => {
  const posts = localStorage.getItem("posts");
  return posts ? JSON.parse(posts) : [];
};

const useAppStore = create<appStoreType>((set) => ({
  loading: false,
  users: [],
  user: { id: 0, name: "", username: "", email: "" },
  posts: loadPostsFromLocalStorage(),
  post: {
    userId: 0,
    id: 0,
    title: "",
    body: "",
  },
  getUsers: async () => {
    set({ loading: true });
    const response = await axios.get(`${apiUrl}/users`);
    // console.log(response.data, "::::::::respon");
    set({ loading: false, users: response.data });
  },
  getPosts: async (url) => {
    set({ loading: true });
    const response = await axios.get(url);
    set({ loading: false, posts: response.data });
  },
  getUser: async (id) => {
    set({ loading: true });
    const response = await axios.get(`${apiUrl}/users/${id}`);
    set({ loading: false, user: response.data });
  },
  getPost: async (id) => {
    set({ loading: true });
    const response = await axios.get(`${apiUrl}posts/${id}`);
    set({ loading: false, post: response.data });
  },
  createPost: async (url, values) => {
    const response = await axios.post(url, values, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    set((state) => {
      const updatedPosts = [...state.posts, response.data];
      savePostsToLocalStorage(updatedPosts);
      return {
        posts: updatedPosts,
      };
    });
  },
}));

export default useAppStore;
