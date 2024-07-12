import { create } from "zustand";
import { userType } from "../interface/interface";
import axios from "axios";
import { apiUrl } from "../common/common";

interface appStoreType {
  users: userType | userType[];
  getUsers: () => Promise<void>;
}

const useAppStore = create<appStoreType>((set) => ({
  users: [],
  getUsers: async () => {
    const response = await axios.get(`${apiUrl}/users`);
    // console.log(response.data, "::::::::respon");
    set({ users: response.data});
  },
}));

export default useAppStore;
