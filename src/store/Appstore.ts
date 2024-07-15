import { create } from "zustand";
import { CommentType, PostType, userType } from "../interface/interface";
import axios from "axios";
import { apiUrl } from "../common/common";

interface appStoreType {
  loading: boolean;
  users: userType | userType[];
  user: userType[];
  getUsers: () => Promise<void>;
  posts: PostType | PostType[];
  getPosts: (url: string) => Promise<void>;
  comments: CommentType | CommentType[];
  getComments: () => Promise<void>;
  getUser : (id:number) => Promise<void>;
  post : PostType[];
  getPost:(id:number) => Promise<void>;
}

const useAppStore = create<appStoreType>((set) => ({
  loading: false,
  users: [],
  user:[],
  posts: [],
  post : [],
  comments: [],
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
  getComments: async () => {
    set({ loading: true });
    const response = await axios.get(`${apiUrl}/comments`);
    set({ loading: false, comments: response.data });
  },
  getUser : async(id) => {
    set({loading:true})
    const response = await axios.get(`${apiUrl}/users/${id}`);
    set({loading:false , user:response.data})
  },
  getPost : async(id) => {
    set({loading:true})
    const response = await axios.get(`${apiUrl}posts/${id}`)
    set({loading:false , post : response.data})
  }
}));

export default useAppStore;
