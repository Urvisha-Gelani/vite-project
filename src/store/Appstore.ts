/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { PostType, userType } from "../interface/interface";
import axios from "axios";
import {
  apiUrl,
  loadPostsFromLocalStorage,
  savePostsToLocalStorage,
} from "../common/common";

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
  createPost: (values: PostType) => Promise<void>;
  getAllPosts: () => Promise<void>;
  updatePost: (values: PostType) => Promise<void>;
  deletePost: (postId: number) => void;
}

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
  createPost: async (values) => {
    const response = await axios.post(`${apiUrl}posts`, values, {
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
  getAllPosts: async () => {
    set({ loading: true });
    const response = await axios.get(`${apiUrl}posts`);
    set({ loading: false });
    set(() => {
      const updatedPosts = response.data;
      savePostsToLocalStorage(updatedPosts);
      return {
        posts: updatedPosts,
      };
    });
  },
  updatePost: async (data) => {
    const response = await axios.patch(`${apiUrl}posts/${data.userId}`, data);
    console.log(response.data, "*****repo*****");
    set((state) => {
      const updatedPosts = (state.posts as PostType[]).map((post: PostType) =>
        post.id === response.data.id && post.userId === response.data.userId
          ? response.data
          : post
      );
      savePostsToLocalStorage(updatedPosts);
      return {
        posts: updatedPosts,
      };
    });
  },
  deletePost: async (postId) => {
    const response = await axios.delete(`${apiUrl}posts/${postId}`);
    console.log(response.data , "*****sdcfgv");
    set((state) => {
      const updatedPosts = (state.posts as PostType[]).filter((post:PostType) => post.id !== postId);
      savePostsToLocalStorage(updatedPosts);
      return { posts: updatedPosts };
    });
  },
}));

export default useAppStore;
